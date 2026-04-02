import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const n8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (!n8nUrl) {
    return NextResponse.json({ error: 'Chat configuration missing' }, { status: 500 });
  }

  const body = await req.text();

  const upstream = await fetch(n8nUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' },
  });
}
