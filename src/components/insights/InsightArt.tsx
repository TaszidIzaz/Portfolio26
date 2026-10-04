'use client';

import { useId, type ReactNode } from 'react';
import styles from './InsightArt.module.css';

/**
 * Generated cover art for Insights (after the "collage brain" reference): a big gradient subject on a
 * starfield, overlaid with a cluster of outlined squares (solid fills, wave / zigzag / contour patterns,
 * zoomed-in details of the subject) and magnifier circles on leader lines.
 * Deterministic from `seed`, so server and browser draw the same picture. Colours come from CSS
 * variables, so each mode gets its own palette (see InsightArt.module.css).
 */

/* ---------- Subjects (drawn in a 100×100 box) ---------- */
const S: Record<string, { fill: ReactNode; folds?: string }> = {
  brain: {
    fill: <path d="M18 56 C12 42 20 26 36 24 C40 14 56 11 64 17 C76 12 90 23 87 37 C95 45 91 61 79 63 C77 71 67 75 59 71 L57 81 C57 86 51 88 49 84 L47 73 C39 77 27 73 25 65 C17 65 14 61 18 56Z" />,
    folds: 'M30 34 C36 30 42 32 44 38 M50 22 C48 30 54 34 60 32 M66 26 C70 32 76 32 80 30 M26 50 C32 46 40 48 42 54 M48 44 C54 40 62 42 64 48 M70 40 C74 46 80 46 84 44 M34 62 C40 58 48 60 50 64 M58 56 C64 54 70 56 74 60',
  },
  target: {
    fill: (
      <>
        <path d="M50 8 A42 42 0 1 1 49.9 8Z M50 22 A28 28 0 1 0 50.1 22Z" fillRule="evenodd" />
        <circle cx="50" cy="50" r="13" />
        <path d="M62 60 L90 70 L78 76 L88 90 L82 94 L72 80 L64 90Z" />
      </>
    ),
  },
  branches: {
    fill: (
      <>
        <circle cx="16" cy="50" r="10" />
        {[14, 32, 50, 68, 86].map((y) => <circle key={y} cx="84" cy={y} r="8" />)}
        <path d="M24 50 C46 50 50 14 76 14 M24 50 C46 50 52 32 76 32 M24 50 H76 M24 50 C46 50 52 68 76 68 M24 50 C46 50 50 86 76 86" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </>
    ),
  },
  window: {
    fill: <path d="M8 16 H92 V84 H8Z M14 30 V78 H86 V30Z M14 20 a3 3 0 1 0 0.1 0Z" fillRule="evenodd" />,
    folds: 'M20 38 H56 M20 46 H48 M20 58 H80 M20 66 H80 M62 38 H80',
  },
  chunks: {
    fill: <>{[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={10 + c * 28} y={10 + r * 28} width="24" height="24" rx="3" />))}</>,
  },
  clock: {
    fill: <path d="M50 6 A44 44 0 1 1 49.9 6Z M50 16 A34 34 0 1 0 50.1 16Z M47 24 H53 V50 L68 62 L64 67 L47 54Z" fillRule="evenodd" />,
  },
  gem: {
    fill: <path d="M24 14 H76 L94 38 L50 92 L6 38Z" />,
    folds: 'M6 38 H94 M24 14 L36 38 L50 92 M76 14 L64 38 L50 92 M36 38 L50 14 L64 38',
  },
  peak: {
    fill: <path d="M4 90 L36 34 L50 56 L66 24 L96 90Z M66 24 V6 L82 12 L66 18" />,
    folds: 'M36 34 L44 46 M66 24 L74 40',
  },
  balance: {
    fill: (
      <>
        <path d="M47 14 H53 V82 H47Z M28 84 H72 V92 H28Z M14 24 H86 V30 H14Z" />
        <path d="M6 58 L20 30 L34 58Z M66 58 L80 30 L94 58Z" />
        <path d="M4 58 H36 C36 68 26 72 20 72 C14 72 4 68 4 58Z M64 58 H96 C96 68 86 72 80 72 C74 72 64 68 64 58Z" />
      </>
    ),
  },
  standout: {
    fill: <>{[0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => (r === 1 && c === 2 ? <rect key={`${r}${c}`} x={10 + c * 22} y={10 + r * 22} width="18" height="18" rx="2" /> : <circle key={`${r}${c}`} cx={19 + c * 22} cy={19 + r * 22} r="6" />)))}</>,
  },
  proximity: {
    fill: <>{[[24, 30], [36, 30], [24, 42], [36, 42], [64, 58], [76, 58], [64, 70], [76, 70], [70, 46]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5.5" />)}</>,
  },
  similarity: {
    fill: <>{[0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => (c % 2 ? <rect key={`${r}${c}`} x={12 + c * 22} y={12 + r * 22} width="14" height="14" /> : <circle key={`${r}${c}`} cx={19 + c * 22} cy={19 + r * 22} r="7" />)))}</>,
  },
  region: {
    fill: (
      <>
        <path d="M8 18 H46 V82 H8Z M14 24 V76 H40 V24Z" fillRule="evenodd" />
        <path d="M54 18 H92 V82 H54Z M60 24 V76 H86 V24Z" fillRule="evenodd" />
        {[30, 50, 70].flatMap((y) => [{ x: 27 }, { x: 73 }].map(({ x }) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" />))}
      </>
    ),
  },
  pragnanz: {
    fill: (
      <>
        <path d="M34 12 A24 24 0 1 1 33.9 12Z M34 20 A16 16 0 1 0 34.1 20Z" fillRule="evenodd" />
        <path d="M46 46 H90 V90 H46Z M54 54 V82 H82 V54Z" fillRule="evenodd" />
        <path d="M70 8 L92 44 H48Z M70 22 L60 38 H80Z" fillRule="evenodd" />
      </>
    ),
  },
  connected: {
    fill: (
      <>
        {[[18, 24], [50, 24], [82, 24], [18, 76], [50, 76], [82, 76]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="8" />)}
        <path d="M18 24 H50 M50 76 H82 M18 76 L18 24" fill="none" stroke="currentColor" strokeWidth="4" />
      </>
    ),
  },
  cursorCode: {
    fill: (
      <>
        <path d="M30 22 L8 50 L30 78 L36 72 L19 50 L36 28Z M70 22 L92 50 L70 78 L64 72 L81 50 L64 28Z" />
        <path d="M44 30 L66 50 L56 52 L62 66 L56 69 L50 55 L44 62Z" />
      </>
    ),
  },
  bubble: {
    fill: <path d="M10 22 C10 14 16 8 24 8 H76 C84 8 90 14 90 22 V58 C90 66 84 72 76 72 H40 L20 90 L23 72 C15 72 10 66 10 58Z M50 20 C52 32 56 36 68 40 C56 44 52 48 50 60 C48 48 44 44 32 40 C44 36 48 32 50 20Z" fillRule="evenodd" />,
  },
  calendar: {
    fill: <path d="M10 18 H90 V90 H10Z M16 34 V84 H84 V34Z M26 8 H34 V24 H26Z M66 8 H74 V24 H66Z M22 42 H34 V52 H22Z M40 42 H52 V52 H40Z M58 42 H70 V52 H58Z M22 60 H34 V70 H22Z M40 60 H52 V70 H40Z" fillRule="evenodd" />,
  },
  loop: {
    fill: (
      <>
        <path d="M50 14 A36 36 0 0 1 86 50 L76 50 A26 26 0 0 0 50 24Z M50 86 A36 36 0 0 1 14 50 L24 50 A26 26 0 0 0 50 76Z" />
        <path d="M70 44 L92 44 L81 60Z M30 56 L8 56 L19 40Z" />
      </>
    ),
  },
  lens: {
    fill: (
      <>
        <path d="M40 8 A32 32 0 1 1 39.9 8Z M40 18 A22 22 0 1 0 40.1 18Z" fillRule="evenodd" />
        <path d="M60 62 L68 54 L94 80 L86 88Z" />
      </>
    ),
  },
  shield: {
    fill: <path d="M50 6 L88 20 V46 C88 70 70 86 50 94 C30 86 12 70 12 46 V20Z M32 50 L44 62 L70 36 L64 30 L44 50 L38 44Z" fillRule="evenodd" />,
  },
  badge: {
    fill: <path d="M50 4 L62 14 L78 12 L82 28 L96 36 L88 50 L96 64 L82 72 L78 88 L62 86 L50 96 L38 86 L22 88 L18 72 L4 64 L12 50 L4 36 L18 28 L22 12 L38 14Z M30 50 L44 64 L72 36 L66 30 L44 52 L36 44Z" fillRule="evenodd" />,
  },
};
export type ArtSubject = keyof typeof S;

/* ---------- Deterministic randomness ---------- */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- Patterns, drawn inside a clipped square or circle ---------- */
type Pat = 'waves' | 'zigzag' | 'contour' | 'scan';
function pattern(kind: Pat, x: number, y: number, s: number, rand: () => number): ReactNode {
  const lines: ReactNode[] = [];
  if (kind === 'waves') {
    for (let i = 0; i < 12; i++) {
      const yy = y + (i + 0.5) * (s / 12);
      lines.push(<path key={i} d={`M${x} ${r1(yy)} q${r1(s / 8)} -${r1(s / 14)} ${r1(s / 4)} 0 t${r1(s / 4)} 0 t${r1(s / 4)} 0 t${r1(s / 4)} 0`} />);
    }
  } else if (kind === 'zigzag') {
    for (let i = 0; i < 10; i++) {
      const yy = y + (i + 0.5) * (s / 10);
      let d = `M${x} ${r1(yy)}`;
      for (let k = 1; k <= 8; k++) d += ` L${r1(x + (k * s) / 8)} ${r1(yy + (k % 2 ? -s / 22 : s / 22))}`;
      lines.push(<path key={i} d={d} />);
    }
  } else if (kind === 'scan') {
    for (let i = 0; i < 26; i++) {
      const xx = x + (i + 0.5) * (s / 26);
      const amp = (Math.sin(i / 2.2) * 0.5 + 0.5) * s * 0.42;
      lines.push(<path key={i} d={`M${r1(xx)} ${r1(y + s / 2 - amp)} V${r1(y + s / 2 + amp)}`} />);
    }
  } else {
    const cx = x + s * (0.3 + rand() * 0.4);
    const cy = y + s * (0.3 + rand() * 0.4);
    for (let i = 1; i <= 9; i++) {
      const rx = (s / 9) * i * (0.9 + rand() * 0.25);
      const ry = rx * (0.55 + rand() * 0.3);
      lines.push(<ellipse key={i} cx={r1(cx)} cy={r1(cy)} rx={r1(rx)} ry={r1(ry)} transform={`rotate(${Math.round(rand() * 60 - 30)} ${r1(cx)} ${r1(cy)})`} />);
    }
  }
  return lines;
}

interface Props {
  subject: ArtSubject;
  seed: string;
  /** CSS aspect-ratio of the frame, e.g. "4 / 3" */
  ratio?: string;
  className?: string;
  label?: string;
}

const W = 1600;
const H = 1000;
const CELL = 140;

export function InsightArt({ subject, seed, ratio = '16 / 10', className = '', label }: Props) {
  const uid = useId().replace(/:/g, '');
  const rand = rng(seed);
  const sub = S[subject] ?? S.brain;
  const cx = W / 2;
  const cy = H / 2 + 20;
  const size = 780;
  const scale = size / 100;
  const subjectAt = (sx: number, sy: number, k: number) => `translate(${r1(sx - (size * k) / 2)} ${r1(sy - (size * k) / 2)}) scale(${r1(scale * k * 100) / 100})`;

  const Subject = ({ k = 1, x = cx, y = cy }: { k?: number; x?: number; y?: number }) => (
    <g transform={subjectAt(x, y, k)}>
      <g fill={`url(#${uid}g)`} className={styles.subject}>{sub.fill}</g>
      {sub.folds && <path d={sub.folds} className={styles.fold} />}
    </g>
  );

  // Stars
  const stars = Array.from({ length: 220 }, () => ({ x: r1(rand() * W), y: r1(rand() * H), r: r1(1.2 + rand() * rand() * 9), o: r1(0.3 + rand() * 0.7) }));

  // A clustered set of grid cells around the subject
  const ox = cx - CELL / 2;
  const oy = cy - CELL / 2;
  const cells: { x: number; y: number; kind: 'solid' | 'zoom' | 'empty' | Pat }[] = [];
  const kinds = ['solid', 'zoom', 'waves', 'zigzag', 'contour', 'scan', 'empty', 'zoom', 'solid'] as const;
  // Cluster up and to the left of centre, leaving the lower right of the subject clear
  for (let r = -2; r <= 1; r++) {
    for (let c = -3; c <= 2; c++) {
      if (c >= 0 && r >= 1) continue;
      const near = Math.abs(c + 0.5) + Math.abs(r + 0.5);
      if (rand() < 0.58 - near * 0.12) cells.push({ x: ox + c * CELL, y: oy + r * CELL, kind: kinds[Math.floor(rand() * kinds.length)] });
    }
  }
  if (cells.length < 6) cells.push({ x: ox, y: oy, kind: 'zoom' }, { x: ox + CELL, y: oy - CELL, kind: 'solid' }, { x: ox - CELL, y: oy + CELL, kind: 'waves' });

  // Two magnifier circles on leader lines
  const big = { x: 250, y: H - 230, r: 150 };
  const small = { x: W - 220, y: 170, r: 58 };
  const toBig = cells.reduce((a, b) => (b.x + b.y * 0.2 < a.x + a.y * 0.2 ? b : a), cells[0]);
  const toSmall = cells.reduce((a, b) => (b.x - b.y > a.x - a.y ? b : a), cells[0]);

  return (
    <div className={`${styles.art} ${className}`} style={{ aspectRatio: ratio }} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--art-c1)' }} />
            <stop offset=".55" style={{ stopColor: 'var(--art-c1)' }} />
            <stop offset=".95" style={{ stopColor: 'var(--art-c2)' }} />
          </linearGradient>
          {cells.map((cell, i) => <clipPath key={i} id={`${uid}c${i}`}><rect x={cell.x} y={cell.y} width={CELL} height={CELL} /></clipPath>)}
          <clipPath id={`${uid}big`}><circle cx={big.x} cy={big.y} r={big.r} /></clipPath>
          <clipPath id={`${uid}small`}><circle cx={small.x} cy={small.y} r={small.r} /></clipPath>
        </defs>

        <rect width={W} height={H} className={styles.bg} />
        <g className={styles.stars}>{stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />)}</g>

        <Subject />

        {/* Grid cells */}
        {cells.map((cell, i) => (
          <g key={i}>
            <g clipPath={`url(#${uid}c${i})`}>
              {cell.kind === 'solid' && <rect x={cell.x} y={cell.y} width={CELL} height={CELL} className={styles.solid} />}
              {cell.kind === 'zoom' && (<><rect x={cell.x} y={cell.y} width={CELL} height={CELL} className={styles.bg} /><Subject k={2.2} x={cell.x + CELL / 2 + (cx - cell.x - CELL / 2) * 2.2} y={cell.y + CELL / 2 + (cy - cell.y - CELL / 2) * 2.2} /></>)}
              {(cell.kind === 'waves' || cell.kind === 'zigzag' || cell.kind === 'contour' || cell.kind === 'scan') && (
                <>
                  <rect x={cell.x} y={cell.y} width={CELL} height={CELL} className={styles.bg} />
                  <g className={cell.kind === 'scan' || cell.kind === 'waves' ? styles.patInk : styles.patBlue}>{pattern(cell.kind, cell.x, cell.y, CELL, rand)}</g>
                </>
              )}
            </g>
            <rect x={cell.x} y={cell.y} width={CELL} height={CELL} className={styles.outline} />
          </g>
        ))}

        {/* Magnifiers */}
        <path d={`M${big.x + big.r * 0.7} ${big.y - big.r * 0.7} L${toBig.x} ${toBig.y + CELL}`} className={styles.outline} />
        <path d={`M${small.x - small.r * 0.7} ${small.y + small.r * 0.7} L${toSmall.x + CELL} ${toSmall.y}`} className={styles.outline} />
        {[{ c: big, id: 'big' }, { c: small, id: 'small' }].map(({ c, id }) => (
          <g key={id}>
            <g clipPath={`url(#${uid}${id})`}>
              <circle cx={c.x} cy={c.y} r={c.r} className={styles.bg} />
              <g className={styles.patBlue}>{pattern('contour', c.x - c.r, c.y - c.r, c.r * 2, rand)}</g>
            </g>
            <circle cx={c.x} cy={c.y} r={c.r} className={styles.outline} />
          </g>
        ))}
      </svg>
    </div>
  );
}
