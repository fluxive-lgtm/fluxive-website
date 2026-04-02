import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

async function checkRateLimit(ip: string, action: string, limit: number, window: number): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - window;
  await pool.execute('DELETE FROM rate_limits WHERE request_time < ?', [windowStart]);
  const [rows] = await pool.execute(
    'SELECT COUNT(*) as cnt FROM rate_limits WHERE ip_address=? AND action=? AND request_time>?',
    [ip, action, windowStart]
  ) as any[];
  if ((rows as any[])[0].cnt >= limit) return false;
  await pool.execute('INSERT INTO rate_limits (ip_address,action,request_time) VALUES (?,?,?)', [ip, action, now]);
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  if (!(await checkRateLimit(ip, 'wifi_support_request', 5, 3600))) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const data = await req.json();
  const { name, email, issueType, urgency, message, phone, company, location, lang, website } = data;

  // Honeypot
  if (website) return NextResponse.json({ ok: true });

  if (!name || !email || !issueType || !urgency || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
  }

  const userAgent = req.headers.get('user-agent') || null;
  const referrer = req.headers.get('referer') || null;

  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS wifi_support_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255), email VARCHAR(255), phone VARCHAR(50),
        company VARCHAR(255), location VARCHAR(255), device VARCHAR(255),
        issue_type VARCHAR(100), urgency VARCHAR(50), message TEXT,
        lang VARCHAR(10), status VARCHAR(50) DEFAULT 'new',
        ip_address VARCHAR(45), user_agent TEXT, referrer TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [result] = await pool.execute(
      'INSERT INTO wifi_support_requests (name,email,phone,company,location,device,issue_type,urgency,message,lang,status,ip_address,user_agent,referrer) VALUES (?,?,?,?,?,NULL,?,?,?,?,?,?,?,?)',
      [name, email, phone || null, company || null, location || null, issueType, urgency, message, lang || null, 'new', ip, userAgent, referrer]
    ) as any[];

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: 'Database error' }, { status: 500 });
  }
}
