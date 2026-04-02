import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

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
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { adMediaUrl, adMediaType } = await req.json();
  const settings = await getOrCreateSettings();
  const updated = await prisma.homepageSetting.update({
    where: { id: settings.id },
    data: { adMediaUrl, adMediaType: adMediaType || 'image' },
  });
  return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { adTitle } = await req.json();
  const settings = await getOrCreateSettings();
  const updated = await prisma.homepageSetting.update({
    where: { id: settings.id },
    data: { adTitle },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const settings = await getOrCreateSettings();
  const updated = await prisma.homepageSetting.update({
    where: { id: settings.id },
    data: { adMediaUrl: null, adMediaType: 'image' },
  });
  return NextResponse.json(updated);
}
