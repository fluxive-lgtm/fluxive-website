import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });

  await prisma.newsletterSubscriber.create({ data: { email } });
  return NextResponse.json({ success: true });
}
