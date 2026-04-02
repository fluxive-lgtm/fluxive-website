import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { put } from '@vercel/blob';

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contentType = req.headers.get('content-type') || '';

  let id: number | undefined;
  let title = '';
  let titleNl = '';
  let titleFr = '';
  let description = '';
  let descriptionNl = '';
  let descriptionFr = '';
  let contentEn = '';
  let contentNl = '';
  let contentFr = '';
  let imageUrl: string | undefined;
  const uploadedMedia: { filePath: string; fileType: string }[] = [];

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();

    const rawId = formData.get('id');
    if (rawId) id = parseInt(rawId as string);

    title = (formData.get('title') as string) || '';
    titleNl = (formData.get('title_nl') as string) || '';
    titleFr = (formData.get('title_fr') as string) || '';
    description = (formData.get('description') as string) || '';
    descriptionNl = (formData.get('description_nl') as string) || '';
    descriptionFr = (formData.get('description_fr') as string) || '';
    contentEn = (formData.get('content_en') as string) || '';
    contentNl = (formData.get('content_nl') as string) || '';
    contentFr = (formData.get('content_fr') as string) || '';

    const mediaFiles = formData.getAll('media[]') as File[];
    for (const file of mediaFiles) {
      if (file && file.size > 0) {
        const blob = await put(`projects/${Date.now()}-${file.name}`, file, { access: 'public' });
        uploadedMedia.push({
          filePath: blob.url,
          fileType: file.type.startsWith('video') ? 'video' : 'image',
        });
      }
    }

    // Use first image as thumbnail; fall back to first file of any type
    if (uploadedMedia.length > 0) {
      const firstImage = uploadedMedia.find((m) => m.fileType === 'image');
      imageUrl = firstImage?.filePath ?? uploadedMedia[0].filePath;
    }
  } else {
    // JSON fallback (legacy / programmatic calls)
    const body = await req.json();
    id = body.id;
    title = body.title || '';
    titleNl = body.titleNl || body.title_nl || '';
    titleFr = body.titleFr || body.title_fr || '';
    description = body.description || '';
    descriptionNl = body.descriptionNl || body.description_nl || '';
    descriptionFr = body.descriptionFr || body.description_fr || '';
    contentEn = body.contentEn || body.content_en || '';
    contentNl = body.contentNl || body.content_nl || '';
    contentFr = body.contentFr || body.content_fr || '';
    imageUrl = body.imageUrl || body.image_url;
    if (Array.isArray(body.media)) {
      for (const m of body.media as { filePath: string; fileType?: string }[]) {
        uploadedMedia.push({ filePath: m.filePath, fileType: m.fileType || 'image' });
      }
    }
  }

  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 });

  // Build update/create payload — only include imageUrl if we have a new one
  const projectData = {
    title,
    titleNl,
    titleFr,
    description,
    descriptionNl,
    descriptionFr,
    contentEn,
    contentNl,
    contentFr,
    ...(imageUrl ? { imageUrl } : {}),
  };

  const upserted = id
    ? await prisma.project.update({ where: { id }, data: projectData })
    : await prisma.project.create({ data: projectData });

  const projectId: number = upserted.id;

  // Only replace media when new files were uploaded
  if (uploadedMedia.length > 0) {
    await prisma.projectMedia.deleteMany({ where: { projectId } });
    await prisma.projectMedia.createMany({
      data: uploadedMedia.map((m, i) => ({
        projectId,
        filePath: m.filePath,
        fileType: m.fileType,
        displayOrder: i,
      })),
    });
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
