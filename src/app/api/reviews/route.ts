import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

function toSnakeCase(review: {
  id: number;
  companyName: string;
  reviewText: string;
  rating: number;
  isApproved: boolean;
  createdAt: Date;
}) {
  return {
    id: review.id,
    company_name: review.companyName,
    review_text: review.reviewText,
    rating: review.rating,
    is_approved: review.isApproved ? 1 : 0,
    created_at: review.createdAt,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const approvedOnly = searchParams.get('approved_only') !== 'false';
  const reviews = await prisma.review.findMany({
    where: approvedOnly ? { isApproved: true } : {},
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reviews.map(toSnakeCase));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Accept both snake_case (from public form) and camelCase
  const companyName = body.company_name || body.companyName;
  const reviewText = body.review_text || body.reviewText;
  const rating = body.rating;

  if (!companyName || !reviewText || !rating) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: { companyName, reviewText, rating: parseInt(rating), isApproved: false },
  });
  return NextResponse.json(toSnakeCase(review));
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  const review = await prisma.review.update({ where: { id }, data: { isApproved: true } });
  return NextResponse.json(toSnakeCase(review));
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
