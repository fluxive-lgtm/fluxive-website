import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (slug) {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  }
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const { id, slug, ...rest } = data;
  if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

  const post = id
    ? await prisma.post.upsert({
        where: { id },
        update: { slug, ...rest },
        create: { id, slug, ...rest },
      })
    : await prisma.post.create({ data: { slug, ...rest } });

  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
