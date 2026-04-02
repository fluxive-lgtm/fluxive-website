import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const body = await req.json();
  const { name, email, phone, company, service, message, lang, honeypot } = body;

  if (honeypot) return NextResponse.json({ success: true });
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const window = Math.floor(Date.now() / 1000) - 3600;
  const count = await prisma.rateLimit.count({
    where: { ipAddress: ip, action: 'contact', requestTime: { gt: window } },
  });
  if (count >= 5) {
    return NextResponse.json({ error: 'Too many submissions. Try again later.' }, { status: 429 });
  }

  await prisma.rateLimit.create({
    data: { ipAddress: ip, action: 'contact', requestTime: Math.floor(Date.now() / 1000) },
  });

  await prisma.contactRequest.create({
    data: {
      name, email, phone, company, service, message, lang,
      ipAddress: ip,
      userAgent: req.headers.get('user-agent') || '',
      referrer: req.headers.get('referer') || '',
    },
  });

  return NextResponse.json({ success: true });
}
