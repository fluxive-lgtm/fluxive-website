import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  // Rate limit: 10 attempts per 15 min
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - 900;
  await pool.execute('DELETE FROM rate_limits WHERE request_time < ?', [windowStart]);
  const [rateRows] = await pool.execute(
    'SELECT COUNT(*) as cnt FROM rate_limits WHERE ip_address=? AND action=? AND request_time>?',
    [ip, 'admin_login_fail', windowStart]
  ) as any[];
  if ((rateRows as any[])[0].cnt >= 10) {
    return NextResponse.json({ error: 'Too many failed login attempts. Please try again in 15 minutes.' }, { status: 429 });
  }

  const { username, password } = await req.json();

  const [rows] = await pool.execute('SELECT id,password_hash FROM admins WHERE username=?', [username]) as any[];
  const user = (rows as any[])[0];

  // Validate password using bcrypt-compatible check
  // Since PHP uses password_hash() which is bcrypt, we need bcryptjs
  let valid = false;
  if (user) {
    try {
      const bcrypt = await import('bcryptjs');
      valid = await bcrypt.compare(password, user.password_hash);
    } catch {
      valid = false;
    }
  }

  if (!valid) {
    await pool.execute('INSERT INTO rate_limits (ip_address,action,request_time) VALUES (?,?,?)', [ip, 'admin_login_fail', now]);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 86400000).toISOString().slice(0, 19).replace('T', ' ');
  await pool.execute('INSERT INTO admin_tokens (token,expires_at) VALUES (?,?)', [token, expiresAt]);

  return NextResponse.json({ success: true, token });
}
