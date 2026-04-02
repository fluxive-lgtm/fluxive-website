import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { project_id, media_path } = await req.json();
  if (!project_id || !media_path) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  try {
    await pool.execute('DELETE FROM project_media WHERE project_id=? AND file_path=?', [project_id, media_path]);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
