import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { put } from '@vercel/blob';

function toSnakeCase(s: {
  id: number;
  adMediaUrl: string | null;
  adMediaType: string;
  adTitle: string | null;
}) {
  return {
    id: s.id,
    ad_media_url: s.adMediaUrl,
    ad_media_type: s.adMediaType,
    ad_title: s.adTitle,
  };
}

async function getOrCreateSettings() {
  let settings = await prisma.homepageSetting.findFirst();
  if (!settings) {
    settings = await prisma.homepageSetting.create({
      data: { adMediaType: 'image', adTitle: 'Featured Update' },
    });
  }
  return settings;
}

export async function GET() {
  const settings = await getOrCreateSettings();
  return NextResponse.json(toSnakeCase(settings));
}

// POST: upload a new ad file (FormData) or set URL directly (JSON)
export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contentType = req.headers.get('content-type') || '';
  let adMediaUrl: string | undefined;
  let adMediaType: string = 'image';

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isImage && !isVideo) {
      return NextResponse.json({ error: 'Only images and videos are supported' }, { status: 400 });
    }

    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large (max ${isVideo ? '100MB' : '10MB'})` },
        { status: 400 }
      );
    }

    const blob = await put(`homepage-ad/${Date.now()}-${file.name}`, file, { access: 'public' });
    adMediaUrl = blob.url;
    adMediaType = isVideo ? 'video' : 'image';
  } else {
    // JSON fallback — accept pre-uploaded URL
    const body = await req.json();
    adMediaUrl = body.adMediaUrl || body.ad_media_url;
    adMediaType = body.adMediaType || body.ad_media_type || 'image';
  }

  const settings = await getOrCreateSettings();
  const updated = await prisma.homepageSetting.update({
    where: { id: settings.id },
    data: { adMediaUrl, adMediaType },
  });
  return NextResponse.json(toSnakeCase(updated));
}

// PATCH: update the ad headline only
export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  // Accept both snake_case and camelCase
  const adTitle = body.ad_title || body.adTitle;
  const settings = await getOrCreateSettings();
  const updated = await prisma.homepageSetting.update({
    where: { id: settings.id },
    data: { adTitle },
  });
  return NextResponse.json(toSnakeCase(updated));
}

// DELETE: clear the current ad
export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const settings = await getOrCreateSettings();
  const updated = await prisma.homepageSetting.update({
    where: { id: settings.id },
    data: { adMediaUrl: null, adMediaType: 'image' },
  });
  return NextResponse.json(toSnakeCase(updated));
}
