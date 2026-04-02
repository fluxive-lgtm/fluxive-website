import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

type MediaItem = { filePath: string; fileType?: string };

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, title, titleNl, titleFr, description, descriptionNl, descriptionFr,
    contentEn, contentNl, contentFr, imageUrl, media } = body;

  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 });

  const projectData = {
    title, titleNl, titleFr, description, descriptionNl, descriptionFr,
    contentEn, contentNl, contentFr, imageUrl,
  };

  const upserted = id
    ? await prisma.project.update({ where: { id }, data: projectData })
    : await prisma.project.create({ data: projectData });

  const projectId: number = upserted.id;

  if (Array.isArray(media)) {
    await prisma.projectMedia.deleteMany({ where: { projectId } });
    if (media.length > 0) {
      await prisma.projectMedia.createMany({
        data: media.map((m: MediaItem, i: number) => ({
          projectId,
          filePath: m.filePath,
          fileType: m.fileType || 'image',
          displayOrder: i,
        })),
      });
    }
  }

  const result = await prisma.project.findUnique({
    where: { id: projectId },
    include: { media: { orderBy: { displayOrder: 'asc' } } },
  });
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
