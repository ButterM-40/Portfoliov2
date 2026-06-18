import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url') || '';
  if (!url) return NextResponse.json({ error: 'Missing url param' }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) return NextResponse.json({ error: `Scholar returned HTTP ${res.status}` }, { status: 502 });

    const html = await res.text();

    if (html.includes('detected unusual traffic') || html.toLowerCase().includes('captcha') || html.includes('sorry')) {
      return NextResponse.json({ error: 'Google Scholar blocked this request (bot protection). Try again later or add papers manually.' }, { status: 429 });
    }

    // Parse title links and their hrefs
    const titleRe = /class="gsc_a_at"[^>]*href="([^"]+)"[^>]*>([^<]+)</g;
    // Parse gray lines (authors on even index, venue on odd)
    const grayRe = /class="gs_gray">([^<]+)<\/div>/g;
    // Parse years
    const yearRe = /class="gsc_a_h[^"]*"[^>]*>(\d{4})</g;
    // Parse citation counts
    const citRe = /class="gsc_a_ac[^"]*"[^>]*>\s*(\d*)\s*<\/a>/g;

    const titles  = Array.from(html.matchAll(titleRe));
    const grays   = Array.from(html.matchAll(grayRe));
    const years   = Array.from(html.matchAll(yearRe));
    const cits    = Array.from(html.matchAll(citRe));

    type ScholarPaper = {
      title: string; authors: string; venue: string;
      year: string; citations: string; href: string;
    };
    const papers: ScholarPaper[] = titles.map((m, i) => ({
      title:     m[2].trim(),
      href:      'https://scholar.google.com' + m[1],
      authors:   (grays[i * 2]?.[1] ?? '').trim(),
      venue:     (grays[i * 2 + 1]?.[1] ?? '').trim(),
      year:      (years[i]?.[1] ?? '').trim(),
      citations: (cits[i]?.[1] ?? '0').trim(),
    }));

    if (papers.length === 0) {
      return NextResponse.json({ error: 'No papers found — Scholar may have changed its HTML structure.' }, { status: 422 });
    }

    return NextResponse.json({ papers });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
