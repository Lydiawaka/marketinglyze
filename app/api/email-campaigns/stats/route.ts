import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [totalTemplates, contactsCount, recentCampaigns] = await Promise.all([
      prisma.emailTemplate.count(),
      prisma.contact.count(),
      prisma.emailCampaign.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      })
    ]);

    return NextResponse.json({
      totalTemplates,
      contactsCount,
      recentCampaigns,
      successRate: 98 // You can calculate this based on actual data
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}