import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo_involuck.svg');
    const svgRaw = await fs.readFile(logoPath, 'utf8');

    return new Response(svgRaw, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
      }
    });
  } catch (error) {
    console.error('Error loading logo:', error);
    return new Response('Logo not found', { status: 404 });
  }
}
