import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function toSnakeCase(idea: {
  id: number;
  idea: string;
  businessName: string | null;
  email: string | null;
  status: string;
  ipAddress: string;
  createdAt: Date;
}) {
  return {
    id: idea.id,
    idea: idea.idea,
    business_name: idea.businessName,
    email: idea.email,
    status: idea.status,
    ip_address: idea.ipAddress,
    created_at: idea.createdAt,
  };
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const ideas = await prisma.ideaSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ ok: true, ideas: ideas.map(toSnakeCase) });
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const body = await req.json();
  // Accept both snake_case and camelCase
  const idea = body.idea;
  const businessName = body.business_name || body.businessName || null;
  const email = body.email || null;

  if (!idea) return NextResponse.json({ error: 'Idea required' }, { status: 400 });
  await prisma.ideaSubmission.create({
    data: {
      idea,
      businessName,
      email,
      ipAddress: ip,
      userAgent: req.headers.get('user-agent') || '',
    },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.ideaSubmission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
