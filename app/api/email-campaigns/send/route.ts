import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';
import { personalizeTemplate } from '@/lib/template-parser';

export async function POST(request: NextRequest) {
  try {
    const { campaignId } = await request.json();
    
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id: campaignId },
      include: { template: true },
    });
    
    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }
    
    const contacts = await prisma.contact.findMany({
      where: {
        id: {
          in: campaign.contacts as string[],
        },
      },
    });
    
    // Send emails
    const results = await Promise.allSettled(
      contacts.map(async (contact) => {
        const variables = {
          name: contact.name || '',
          company: contact.company || '',
          position: contact.position || '',
          email: contact.email,
        };
        
        const personalizedSubject = personalizeTemplate(
          campaign.template.subject,
          variables
        );
        
        const personalizedBody = personalizeTemplate(
          campaign.template.body,
          variables
        );
        
        return sendEmail({
          to: contact.email,
          subject: personalizedSubject,
          html: personalizedBody,
        });
      })
    );
    
    // Update campaign status
    await prisma.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: 'sent',
        sentAt: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      sent: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length,
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send campaign' },
      { status: 500 }
    );
  }
}