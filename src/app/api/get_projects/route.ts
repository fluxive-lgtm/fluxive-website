import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const projects: any[] = [];

export async function GET() {
    return NextResponse.json(projects);
}
