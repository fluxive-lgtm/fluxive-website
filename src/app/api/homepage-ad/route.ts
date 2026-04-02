import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT ad_media_url,ad_media_type,ad_title FROM homepage_settings WHERE id=1 LIMIT 1'
    ) as any[];
    const settings = (rows as any[])[0];
    if (!settings || !settings.ad_media_url) {
      return NextResponse.json({ ad_media_url: null, ad_media_type: 'image', ad_title: 'Featured Update' });
    }
    return NextResponse.json({
      ad_media_url: settings.ad_media_url,
      ad_media_type: settings.ad_media_type,
      ad_title: settings.ad_title || 'Featured Update',
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const { ad_media_url, ad_media_type, ad_title } = data;
  try {
    await pool.execute(
      'UPDATE homepage_settings SET ad_media_url=?,ad_media_type=?,ad_title=? WHERE id=1',
      [ad_media_url, ad_media_type || 'image', ad_title || 'Featured Update']
    );
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await pool.execute('UPDATE homepage_settings SET ad_media_url=NULL,ad_media_type=\'image\',ad_title=\'Featured Update\' WHERE id=1');
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { ad_title } = await req.json();
  if (!ad_title) return NextResponse.json({ error: 'Title required' }, { status: 400 });
  try {
    await pool.execute('UPDATE homepage_settings SET ad_title=? WHERE id=1', [ad_title]);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
