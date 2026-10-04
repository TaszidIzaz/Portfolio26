'use client';

import { useId, type ReactNode } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import styles from './StoryTile.module.css';

/**
 * Illustration tile for the process story: a soft, blurred colour field with a woven texture
 * and a bold white pictogram cut out on top (after the pictogram-on-fabric references).
 * The palette changes per mode (Swiss greys, Brutalist brights, Almanac earth tones), and in
 * Almanac the pictogram gets hand-cut edges.
 */

/** body: the white shape · cut: carved out of the body (gaps, holes) · extra: drawn on top, uncut */
type Draw = { body: ReactNode; cut?: ReactNode; extra?: ReactNode };

const star4 = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} C${cx + r * 0.12} ${cy - r * 0.3} ${cx + r * 0.3} ${cy - r * 0.12} ${cx + r} ${cy} C${cx + r * 0.3} ${cy + r * 0.12} ${cx + r * 0.12} ${cy + r * 0.3} ${cx} ${cy + r} C${cx - r * 0.12} ${cy + r * 0.3} ${cx - r * 0.3} ${cy + r * 0.12} ${cx - r} ${cy} C${cx - r * 0.3} ${cy - r * 0.12} ${cx - r * 0.12} ${cy - r * 0.3} ${cx} ${cy - r}Z`;

const SMALL_BUBBLE = 'M44 50 C44 45 48 41 53 41 H80 C85 41 89 45 89 50 V68 C89 73 85 77 80 77 H78 L82 89 L68 77 H53 C48 77 44 73 44 68Z';
const hole = (cx: number, cy: number, r: number) => `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Layout sketches for the "Iterate" pile: index 0 is the one that survives. */
const LAYOUTS: number[][][] = [
  [[10, 12, 80, 12], [10, 30, 46, 38], [60, 30, 30, 17], [60, 51, 30, 17], [10, 74, 80, 14]],
  [[10, 12, 80, 14], [10, 32, 80, 30], [10, 68, 24, 20], [38, 68, 24, 20], [66, 68, 24, 20]],
  [[10, 12, 24, 76], [40, 12, 50, 40], [40, 58, 50, 30]],
  [[10, 12, 80, 50], [10, 68, 80, 20]],
  [[10, 12, 38, 36], [52, 12, 38, 36], [10, 54, 38, 34], [52, 54, 38, 34]],
  [[10, 12, 80, 14], [10, 32, 50, 56], [64, 32, 26, 56]],
  [[24, 12, 52, 76]],
];
const layout = (k: number): Draw => ({
  body: LAYOUTS[k % LAYOUTS.length].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="3" />),
  // the keeper gets a tick carved into its big block
  cut: k % LAYOUTS.length === 0 ? <path d="M21 50 L30 59 L45 41" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /> : undefined,
});

export const PICTOS = {
  talk: {
    body: <path d="M10 22 C10 15 15 10 22 10 H58 C65 10 70 15 70 22 V46 C70 53 65 58 58 58 H34 L19 71 L22 58 C15 58 10 53 10 46Z" />,
    cut: <path d={SMALL_BUBBLE} strokeWidth="8" strokeLinejoin="round" />,
    extra: <path d={`${SMALL_BUBBLE} ${hole(56, 59, 3.6)} ${hole(66.5, 59, 3.6)} ${hole(77, 59, 3.6)}`} fillRule="evenodd" />,
  },
  research: {
    body: (
      <>
        <path d="M8 36 C22 30 36 30 48 38 V86 C36 78 22 78 8 84Z" />
        <path d="M52 38 C64 30 78 30 92 36 V84 C78 78 64 78 52 86Z" />
      </>
    ),
    cut: (
      <>
        <circle cx="62" cy="32" r="17" strokeWidth="17" />
        <path d="M74 45 L90 61" strokeWidth="19" strokeLinecap="round" />
        <path d="M16 50 L38 46 M16 60 L38 56 M16 70 L32 67" fill="none" strokeWidth="3.4" strokeLinecap="round" />
      </>
    ),
    extra: (
      <>
        <circle cx="62" cy="32" r="17" fill="none" stroke="currentColor" strokeWidth="9" />
        <path d="M74 45 L90 61" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
      </>
    ),
  },
  polish: {
    body: (
      <>
        <rect x="8" y="42" width="84" height="16" rx="8" />
        <path d="M38 58 H62 L69 78 H31Z" />
        <rect x="22" y="78" width="56" height="12" rx="2" />
        <path d={star4(28, 22, 13)} />
        <path d={star4(52, 12, 8)} />
        <path d={star4(72, 26, 10)} />
      </>
    ),
  },
  real: {
    body: (
      <>
        <circle cx="44" cy="40" r="17" />
        <path d="M10 94 C10 72 25 62 44 62 C63 62 78 72 78 94Z" />
        <path d={star4(80, 22, 15)} />
      </>
    ),
  },
  palette: {
    body: <path d="M50 14 C74 14 92 30 92 50 C92 64 82 70 72 66 C64 63 58 68 60 76 C62 84 56 88 48 88 C26 88 8 72 8 50 C8 30 26 14 50 14Z" />,
    cut: <>{[[30, 42], [46, 30], [66, 32]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6.5" />)}<circle cx="32" cy="66" r="8" /></>,
  },
  type: { body: <text x="50" y="72" textAnchor="middle" fontSize="64" fontWeight="700" style={{ fontFamily: 'var(--font-nhd)', letterSpacing: '-0.06em' }}>Aa</text> },
  image: {
    body: (
      <>
        <path d="M8 82 L38 44 L54 64 L66 52 L92 82Z" />
        <circle cx="70" cy="28" r="10" />
      </>
    ),
  },
  layout: layout(0),
  motion: {
    body: (
      <>
        <path d="M8 56 C20 32 32 32 44 56 S68 80 80 56" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
        <path d="M74 44 L94 50 L80 66Z" />
      </>
    ),
  },
  dots: { body: <>{[22, 50, 78].flatMap((x) => [24, 50, 76].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={9} />))}</> },
  spark: { body: <path d={star4(50, 50, 44)} /> },
} satisfies Record<string, Draw>;
export type Picto = keyof typeof PICTOS;

interface Props {
  /** A named pictogram, or a layout-sketch index for the Iterate pile */
  picto: Picto | { layout: number };
  /** 0–5: which colour of the mode's palette */
  tone: number;
  num?: string;
  className?: string;
}

export function StoryTile({ picto, tone, num, className = '' }: Props) {
  const { theme } = useTheme();
  const id = useId().replace(/:/g, '');
  const draw: Draw = typeof picto === 'string' ? PICTOS[picto] : layout(picto.layout);
  return (
    <div className={`${styles.tile} ${className}`} data-tone={tone % 6}>
      {num && <span className={`label ${styles.num}`}>{num}</span>}
      <svg className={styles.picto} viewBox="0 0 100 100" aria-hidden overflow="visible">
        {draw.cut && (
          <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
            <rect x="-10" y="-10" width="120" height="120" fill="#fff" />
            <g fill="#000" stroke="#000">{draw.cut}</g>
          </mask>
        )}
        <g fill="currentColor" filter={theme === 'folk' ? 'url(#folk-rough)' : undefined}>
          <g mask={draw.cut ? `url(#${id})` : undefined}>{draw.body}</g>
          {draw.extra}
        </g>
      </svg>
    </div>
  );
}
