import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractVariables } from '@/lib/template-parser';

export async function POST(request: NextRequest) {
  try {
    const { name, subject, body } = await request.json();
    
    const template = await prisma.emailTemplate.create({
      data: {
        name,
        subject,
        body,
        variables: extractVariables(body).concat(extractVariables(subject)),
      },
    });
    
    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const templates = await prisma.emailTemplate.findMany();
  return NextResponse.json(templates);
}