import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [projects] = await pool.execute('SELECT * FROM projects ORDER BY created_at DESC') as any[];
    for (const project of projects as any[]) {
      const [media] = await pool.execute(
        'SELECT file_path as path, file_type as type FROM project_media WHERE project_id=? ORDER BY display_order ASC',
        [project.id]
      ) as any[];
      project.media = media;
    }
    return NextResponse.json(projects);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
