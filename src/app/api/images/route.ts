import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dir = path.join(process.cwd(), 'public', 'images');
  try {
    if (!fs.existsSync(dir)) return NextResponse.json({ files: [] });
    const files = fs.readdirSync(dir)
      .filter(f => /\.(png|jpg|jpeg|gif|webp|svg|avif)$/i.test(f))
      .map(f => ({ name: f, url: `/images/${f}` }));
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
