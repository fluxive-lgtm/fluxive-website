import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const email = (data.email || '').trim();
  const website_url = data.website_url || '';

  // Honeypot
  if (website_url) return NextResponse.json({ ok: true });

  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
  }

  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.execute('INSERT INTO newsletter_subscribers (email,created_at) VALUES (?,NOW())', [email]);
    return NextResponse.json({ ok: true, message: 'Successfully subscribed!' });
  } catch (e: any) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ ok: false, error: 'You are already subscribed!' }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: 'Database error' }, { status: 500 });
  }
}
