import { ImageResponse } from 'next/og';
import { articles, collectionOf, getArticle } from '@/content/insights';
import { site } from '@/content/site';

/** Share image for each insight (used by search, LinkedIn, X…): the neon collage style + the title. */
export const alt = 'Insight by Taszid Izaz';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 197) % 1200, y: (i * 89 + (i % 7) * 31) % 630, r: 2 + ((i * 13) % 7),
}));
const CELLS = [[0, 0, 'solid'], [1, 0, 'line'], [1, 1, 'pink'], [2, 1, 'solid'], [0, 2, 'line'], [2, 2, 'line'], [3, 0, 'pink']] as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  const title = a?.title ?? 'Insights';
  const kicker = a ? `${collectionOf(a)} · ${a.category}` : 'Insights';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#0B0B10', fontFamily: 'sans-serif' }}>
        {STARS.map((s, i) => (
          <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: s.r, height: s.r, borderRadius: 99, background: '#2F4FE0', opacity: 0.8 }} />
        ))}
        <div style={{ position: 'absolute', right: 120, top: 120, width: 330, height: 330, borderRadius: 330, background: 'linear-gradient(135deg, #F08BBE 55%, #9BEA6B)' }} />
        {CELLS.map(([c, r, kind], i) => (
          <div
            key={i}
            style={{
              position: 'absolute', left: 700 + c * 110, top: 110 + r * 110, width: 110, height: 110,
              border: '3px solid #9BEA6B',
              background: kind === 'solid' ? '#2F4FE0' : kind === 'pink' ? 'rgba(240,139,190,.25)' : 'transparent',
              display: 'flex',
            }}
          />
        ))}
        <div style={{ position: 'absolute', left: 1010, top: 470, width: 120, height: 120, borderRadius: 120, border: '3px solid #9BEA6B', background: 'repeating-radial-gradient(circle, #0B0B10 0 8px, #2F4FE0 8px 10px)' }} />
        <div style={{ position: 'absolute', left: 70, top: 70, right: 520, bottom: 70, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#9BEA6B', letterSpacing: 1 }}>{kicker}</div>
          <div style={{ display: 'flex', fontSize: title.length > 60 ? 50 : 60, lineHeight: 1.04, color: '#ECECEC', fontWeight: 700, letterSpacing: -2 }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 24, color: '#ECECEC', opacity: 0.7 }}>{site.name} — Insights</div>
        </div>
      </div>
    ),
    size,
  );
}
