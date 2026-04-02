import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const approvedOnly = searchParams.get('approved_only') !== 'false';
  const reviews = await prisma.review.findMany({
    where: approvedOnly ? { isApproved: true } : {},
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const { companyName, reviewText, rating } = await req.json();
  if (!companyName || !reviewText || !rating) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: { companyName, reviewText, rating: parseInt(rating), isApproved: false },
  });
  return NextResponse.json(review);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const review = await prisma.review.update({ where: { id }, data: { isApproved: true } });
  return NextResponse.json(review);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
