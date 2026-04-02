import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const id = formData.get('id') as string | null;
  let title = (formData.get('title') as string) || '';
  const title_nl = (formData.get('title_nl') as string) || '';
  const title_fr = (formData.get('title_fr') as string) || '';
  const description = (formData.get('description') as string) || '';
  const description_nl = (formData.get('description_nl') as string) || '';
  const description_fr = (formData.get('description_fr') as string) || '';
  const content_en = (formData.get('content_en') as string) || '';
  const content_nl = (formData.get('content_nl') as string) || '';
  const content_fr = (formData.get('content_fr') as string) || '';
  const imageUrl = (formData.get('image_url') as string) || null;

  if (!title) title = title_nl || title_fr;
  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  try {
    if (id) {
      await pool.execute(
        `UPDATE projects SET title=?,title_nl=?,title_fr=?,description=?,description_nl=?,description_fr=?,content_en=?,content_nl=?,content_fr=?,image_url=? WHERE id=?`,
        [title, title_nl, title_fr, description, description_nl, description_fr, content_en, content_nl, content_fr, imageUrl, id]
      );
      return NextResponse.json({ success: true, id });
    } else {
      const [result] = await pool.execute(
        `INSERT INTO projects (title,title_nl,title_fr,description,description_nl,description_fr,content_en,content_nl,content_fr,image_url) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [title, title_nl, title_fr, description, description_nl, description_fr, content_en, content_nl, content_fr, imageUrl]
      ) as any[];
      return NextResponse.json({ success: true, id: result.insertId });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
  try {
    await pool.execute('DELETE FROM project_media WHERE project_id=?', [id]);
    await pool.execute('DELETE FROM projects WHERE id=?', [id]);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
