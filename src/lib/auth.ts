import { NextRequest } from 'next/server';
import prisma from './db';

export async function requireAuth(req: NextRequest): Promise<boolean> {
  const auth = req.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return false;
  const now = new Date();
  const record = await prisma.adminToken.findFirst({
    where: { token, expiresAt: { gt: now } },
  });
  return !!record;
}
