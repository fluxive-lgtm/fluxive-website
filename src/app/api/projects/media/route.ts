import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { project_id, media_path } = await req.json();
  if (!project_id || !media_path) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  await prisma.projectMedia.deleteMany({
    where: { projectId: project_id, filePath: media_path },
  });
  return NextResponse.json({ success: true });
}
