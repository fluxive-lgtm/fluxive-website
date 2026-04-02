import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const approvedOnly = req.nextUrl.searchParams.get('approved_only') !== 'false';
  try {
    const sql = approvedOnly
      ? 'SELECT id,company_name,review_text,rating,created_at,is_approved FROM reviews WHERE is_approved=1 ORDER BY created_at DESC'
      : 'SELECT * FROM reviews ORDER BY created_at DESC';
    const [rows] = await pool.execute(sql) as any[];
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { company_name, review_text, rating } = data;
  if (!company_name || !review_text || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
  }
  try {
    await pool.execute(
      'INSERT INTO reviews (company_name,review_text,rating,is_approved) VALUES (?,?,?,0)',
      [company_name, review_text, rating]
    );
    return NextResponse.json({ message: 'Review submitted successfully and is pending approval' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
  try {
    await pool.execute('UPDATE reviews SET is_approved=1 WHERE id=?', [id]);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
  try {
    await pool.execute('DELETE FROM reviews WHERE id=?', [id]);
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
