import { NextRequest } from 'next/server';
import pool from './db';

export async function requireAuth(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get('Authorization') || '';
  const match = authHeader.match(/Bearer\s+(\S+)/);
  if (!match) return false;

  const token = match[1];
  const [rows] = await pool.execute(
    'SELECT id FROM admin_tokens WHERE token = ? AND expires_at > NOW()',
    [token]
  ) as any[];

  return rows.length > 0;
}
