import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

function toSnakeCase(project: {
  id: number;
  title: string;
  titleNl: string | null;
  titleFr: string | null;
  description: string | null;
  descriptionNl: string | null;
  descriptionFr: string | null;
  contentEn: string | null;
  contentNl: string | null;
  contentFr: string | null;
  imageUrl: string | null;
  createdAt: Date;
  media?: { filePath: string; fileType: string; displayOrder: number }[];
}) {
  return {
    id: project.id,
    title: project.title,
    title_nl: project.titleNl,
    title_fr: project.titleFr,
    description: project.description,
    description_nl: project.descriptionNl,
    description_fr: project.descriptionFr,
    content_en: project.contentEn,
    content_nl: project.contentNl,
    content_fr: project.contentFr,
    image_url: project.imageUrl,
    created_at: project.createdAt,
    media: project.media?.map((m) => ({
      type: m.fileType as 'image' | 'video',
      path: m.filePath,
    })),
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { media: { orderBy: { displayOrder: 'asc' } } },
    });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(toSnakeCase(project));
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { media: { orderBy: { displayOrder: 'asc' } } },
  });
  return NextResponse.json(projects.map(toSnakeCase));
}
