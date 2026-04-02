import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

function decodeMultilingualFields(post: any) {
  for (const field of ['title', 'excerpt', 'content']) {
    if (post[field] && typeof post[field] === 'string') {
      try {
        const decoded = JSON.parse(post[field]);
        if (typeof decoded === 'object') post[field] = decoded;
      } catch {}
    }
  }
  return post;
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  try {
    if (slug) {
      const [rows] = await pool.execute('SELECT * FROM Post WHERE slug = ?', [slug]) as any[];
      const post = rows[0];
      if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      post.tags = JSON.parse(post.tags || '[]');
      post.media = JSON.parse(post.media || '[]');
      post.author = { name: post.authorName, role: post.authorRole, image: post.authorImage };
      post.featured = Boolean(post.featured);
      return NextResponse.json(decodeMultilingualFields(post));
    }
    const [rows] = await pool.execute('SELECT * FROM Post ORDER BY date DESC') as any[];
    const posts = (rows as any[]).map((p: any) => {
      p.tags = JSON.parse(p.tags || '[]');
      p.media = JSON.parse(p.media || '[]');
      p.author = { name: p.authorName, role: p.authorRole, image: p.authorImage };
      p.featured = Boolean(p.featured);
      return decodeMultilingualFields(p);
    });
    return NextResponse.json(posts);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  if (!data.slug) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  const authorName = data.author?.name || 'Admin';
  const authorRole = data.author?.role || 'Editor';
  const authorImage = data.author?.image || null;
  const tags = JSON.stringify(data.tags || []);
  const media = JSON.stringify(data.media || []);
  const featured = data.featured ? 1 : 0;
  const coverImage = data.coverImage || null;
  let videoEmbed = data.videoEmbed || null;
  if (videoEmbed && !/^<iframe.*src=["']https?:\/\/(www\.)?(youtube\.com|vimeo\.com|player\.vimeo\.com).*iframe>$/i.test(videoEmbed)) {
    videoEmbed = null;
  }
  const title = typeof data.title === 'object' ? JSON.stringify(data.title) : data.title;
  const excerpt = typeof data.excerpt === 'object' ? JSON.stringify(data.excerpt) : data.excerpt;
  const content = typeof data.content === 'object' ? JSON.stringify(data.content) : data.content;

  try {
    const [existing] = await pool.execute('SELECT id FROM Post WHERE slug = ?', [data.slug]) as any[];
    if ((existing as any[]).length > 0) {
      await pool.execute(
        `UPDATE Post SET title=?,excerpt=?,content=?,date=?,readingTime=?,category=?,authorName=?,authorRole=?,authorImage=?,image=?,coverImage=?,videoEmbed=?,tags=?,featured=?,media=?,updatedAt=NOW() WHERE slug=?`,
        [title, excerpt, content, data.date, data.readingTime, data.category, authorName, authorRole, authorImage, data.image, coverImage, videoEmbed, tags, featured, media, data.slug]
      );
    } else {
      await pool.execute(
        `INSERT INTO Post (id,slug,title,excerpt,content,date,readingTime,category,authorName,authorRole,authorImage,image,coverImage,videoEmbed,tags,featured,media,createdAt,updatedAt) VALUES (UUID(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())`,
        [data.slug, title, excerpt, content, data.date, data.readingTime, data.category, authorName, authorRole, authorImage, data.image, coverImage, videoEmbed, tags, featured, media]
      );
    }
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  try {
    await pool.execute('DELETE FROM Post WHERE slug = ?', [slug]);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
