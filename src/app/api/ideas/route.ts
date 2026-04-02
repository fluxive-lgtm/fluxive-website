import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - 3600;
  await pool.execute('DELETE FROM rate_limits WHERE request_time < ?', [windowStart]);
  const [rows] = await pool.execute(
    'SELECT COUNT(*) as cnt FROM rate_limits WHERE ip_address=? AND action=? AND request_time>?',
    [ip, 'submit_idea_request', windowStart]
  ) as any[];
  if ((rows as any[])[0].cnt >= 5) return false;
  await pool.execute('INSERT INTO rate_limits (ip_address,action,request_time) VALUES (?,?,?)', [ip, 'submit_idea_request', now]);
  return true;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const [rows] = await pool.execute(
      'SELECT id,idea,business_name,email,status,ip_address,created_at FROM idea_submissions ORDER BY created_at DESC'
    ) as any[];
    return NextResponse.json({ ok: true, ideas: rows });
  } catch (e: any) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const data = await req.json();
  const idea = (data.idea || '').trim();
  const businessName = (data.businessName || '').trim();
  const email = (data.email || '').trim();

  if (!idea) return NextResponse.json({ ok: false, error: 'Idea is required.' }, { status: 400 });
  if (!businessName && !email) return NextResponse.json({ ok: false, error: 'Either Business Name or Email is required.' }, { status: 400 });

  const userAgent = req.headers.get('user-agent') || null;

  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS idea_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        idea TEXT NOT NULL,
        business_name VARCHAR(255), email VARCHAR(255),
        status VARCHAR(50) DEFAULT 'new',
        ip_address VARCHAR(45), user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const [result] = await pool.execute(
      'INSERT INTO idea_submissions (idea,business_name,email,ip_address,user_agent) VALUES (?,?,?,?,?)',
      [idea, businessName || null, email || null, ip, userAgent]
    ) as any[];
    return NextResponse.json({ ok: true, id: (result as any).insertId, message: 'Idea submitted successfully.' });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing idea ID' }, { status: 400 });
  try {
    const [result] = await pool.execute('DELETE FROM idea_submissions WHERE id=?', [id]) as any[];
    if ((result as any).affectedRows === 0) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    return NextResponse.json({ ok: true, message: 'Idea deleted successfully' });
  } catch (e: any) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
