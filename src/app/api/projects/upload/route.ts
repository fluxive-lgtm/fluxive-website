import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

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

  let project;
  if (id) {
    project = await prisma.project.update({ where: { id }, data: projectData });
    if (Array.isArray(media)) {
      await prisma.projectMedia.deleteMany({ where: { projectId: id } });
      if (media.length > 0) {
        await prisma.projectMedia.createMany({
          data: media.map((m: { filePath: string; fileType?: string }, i: number) => ({
            projectId: id,
            filePath: m.filePath,
            fileType: m.fileType || 'image',
            displayOrder: i,
          })),
        });
      }
    }
  } else {
    project = await prisma.project.create({ data: projectData });
    if (Array.isArray(media) && media.length > 0) {
      await prisma.projectMedia.createMany({
        data: media.map((m: { filePath: string; fileType?: string }, i: number) => ({
          projectId: project.id,
          filePath: m.filePath,
          fileType: m.fileType || 'image',
          displayOrder: i,
        })),
      });
    }
  }

  const result = await prisma.project.findUnique({
    where: { id: project.id },
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
