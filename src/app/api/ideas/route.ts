import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const ideas = await prisma.ideaSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(ideas);
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { idea, businessName, email } = await req.json();
  if (!idea) return NextResponse.json({ error: 'Idea required' }, { status: 400 });
  await prisma.ideaSubmission.create({
    data: {
      idea, businessName, email,
      ipAddress: ip,
      userAgent: req.headers.get('user-agent') || '',
    },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.ideaSubmission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
