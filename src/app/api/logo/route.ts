import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Candidate files in priority order
    const candidates = [
      // Primary requested logo
      path.join(process.cwd(), 'src', 'logo', '1_20250824_200606_0000.svg'),
      // Previous primary as fallback
      path.join(process.cwd(), 'src', 'logo', '2_20250824_200606_0001.svg'),
      // Additional fallbacks in case new versions appear later
      path.join(
        process.cwd(),
        'src',
        'logo',
        'Diseño sin título_20250824_191816_0000.svg'
      ),
      path.join(process.cwd(), 'src', 'logo', '2_20250824_154250_0001.svg'),
      path.join(
        process.cwd(),
        'src',
        'logo',
        'InvoLuck_20250824_004044_0000.svg'
      )
    ];

    let svgRaw: string | null = null;
    for (const p of candidates) {
      try {
        svgRaw = await fs.readFile(p, 'utf8');
        break;
      } catch {
        // Silently continue to next candidate
        continue;
      }
    }

    if (!svgRaw) {
      return new Response('Logo not found', { status: 404 });
    }

    return new Response(svgRaw, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        // Cache aggressively but allow quick updates via SWR
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
      }
    });
  } catch (error) {
    console.error('Error loading logo:', error);
    return new Response('Error loading logo', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
