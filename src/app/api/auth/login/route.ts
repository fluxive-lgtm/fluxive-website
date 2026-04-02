import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const window = Math.floor(Date.now() / 1000) - 900; // 15 min
  const count = await prisma.rateLimit.count({
    where: { ipAddress: ip, action: 'login_fail', requestTime: { gt: window } },
  });
  return count < 10;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    await prisma.rateLimit.create({
      data: { ipAddress: ip, action: 'login_fail', requestTime: Math.floor(Date.now() / 1000) },
    });
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await prisma.adminToken.create({ data: { token, expiresAt } });

  return NextResponse.json({ token });
}
