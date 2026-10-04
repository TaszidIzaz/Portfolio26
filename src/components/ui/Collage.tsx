import type { CSSProperties } from 'react';
import styles from './Collage.module.css';

/**
 * Brutalist collage pieces: tape, binder clip, rubber stamp, hand-drawn doodles, pictograms.
 * Every piece is wrapped in data-only="brutalist", so it's invisible in the other modes.
 * Position them with `style` (top/left/right/bottom) inside a relatively-positioned parent.
 */

type Pos = CSSProperties & Record<`--${string}`, string | number>;

export function Tape({ style }: { style?: Pos }) {
  return <i aria-hidden data-only="brutalist" className={styles.tape} style={style} />;
}

export function Clip({ style }: { style?: Pos }) {
  return (
    <svg aria-hidden data-only="brutalist" className={styles.clip} style={style} viewBox="0 0 52 46">
      <path d="M6 18 L26 4 L46 18" fill="none" stroke="#9a9a9a" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 18 L26 10 L38 18" fill="none" stroke="#bdbdbd" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 18 H48 L44 44 H8 Z" fill="#141414" />
      <rect x="8" y="22" width="36" height="3" fill="#3a3a3a" />
    </svg>
  );
}

export function Stamp({ text, style }: { text: string; style?: Pos }) {
  const id = `stamp-${text.replace(/\W+/g, '').slice(0, 12)}`;
  return (
    <svg aria-hidden data-only="brutalist" className={styles.stamp} style={style} viewBox="0 0 120 120">
      <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
      <text fill="currentColor" fontSize="11" letterSpacing="2" style={{ fontFamily: 'var(--font-head)' }}>
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="18" style={{ fontFamily: 'var(--font-head)' }}>✳</text>
    </svg>
  );
}

const DOODLES = {
  asterisk: 'M50 6 C51 30 49 70 50 94 M12 28 C35 41 66 58 88 72 M12 72 C36 57 64 43 88 28 M6 50 C32 51 68 49 94 50',
  star: 'M50 8 L61 38 L93 39 L67 58 L77 90 L50 71 L23 90 L33 58 L7 39 L39 38 Z',
  smiley: 'M50 10 C74 9 92 27 91 51 C90 74 72 91 49 90 C26 89 9 72 10 49 C11 26 28 11 50 10 Z M36 38 L37 46 M62 37 L63 45 M30 60 C40 74 62 75 71 59',
  scribble: 'M20 50 C20 20 80 20 78 48 C76 74 30 76 30 52 C30 32 68 30 68 50 C68 64 42 66 42 52 C42 44 56 42 56 50',
  arrow: 'M10 70 C30 30 60 24 86 34 M70 20 L88 34 L72 50',
} as const;
export type DoodleName = keyof typeof DOODLES;

export function Doodle({ name, style }: { name: DoodleName; style?: Pos }) {
  return (
    <svg aria-hidden data-only="brutalist" className={styles.doodle} style={style} viewBox="0 0 100 100">
      <path d={DOODLES[name]} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- Chunky pictograms (after the icon references) ---- */
const PICTOS = {
  arrow: (
    <g fill="currentColor">
      <path d="M34 12 A40 40 0 0 0 34 88 L40 78 A29 29 0 0 1 40 22 Z" />
      <path d="M66 12 A40 40 0 0 1 66 88 L60 78 A29 29 0 0 0 60 22 Z" />
      <path d="M28 44 H56 V32 L76 50 L56 68 V56 H28 Z" />
    </g>
  ),
  reader: (
    <g fill="currentColor">
      <circle cx="30" cy="26" r="13" />
      <path d="M14 44 C14 38 22 36 30 36 C40 36 46 40 48 48 L50 74 C50 82 44 86 36 86 H22 C16 86 12 82 12 76 Z" />
      <path d="M52 34 L88 26 V72 L52 80 Z" />
      <path d="M58 40 L82 35" stroke="var(--accent)" strokeWidth="3" />
      <path d="M58 50 L82 45" stroke="var(--accent)" strokeWidth="3" />
    </g>
  ),
  blob: (
    <g fill="currentColor">
      {[[26, 26], [50, 22], [74, 26], [22, 50], [78, 50], [26, 74], [50, 78], [74, 74]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="13" />)}
      <rect x="24" y="24" width="52" height="52" rx="10" />
    </g>
  ),
  anvil: (
    <g fill="currentColor">
      <circle cx="42" cy="24" r="9" /><circle cx="58" cy="18" r="9" /><circle cx="56" cy="34" r="8" />
      <rect x="12" y="46" width="76" height="13" rx="6.5" />
      <path d="M40 59 H60 L66 80 H34 Z" />
      <rect x="22" y="80" width="56" height="9" rx="2" />
    </g>
  ),
  bubble: (
    <g fill="currentColor">
      <path d="M14 22 C14 15 19 10 26 10 H74 C81 10 86 15 86 22 V58 C86 65 81 70 74 70 H44 L26 88 L28 70 H26 C19 70 14 65 14 58 Z" />
    </g>
  ),
  question: (
    <g fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round">
      <path d="M32 34 C32 18 44 12 52 12 C64 12 72 20 72 32 C72 46 52 48 52 62" />
      <circle cx="52" cy="84" r="2" fill="currentColor" />
    </g>
  ),
  dots: (
    <g fill="currentColor">
      <circle cx="24" cy="32" r="13" /><circle cx="50" cy="32" r="13" /><circle cx="76" cy="32" r="13" />
      <ellipse cx="34" cy="68" rx="20" ry="14" /><ellipse cx="66" cy="68" rx="20" ry="14" />
    </g>
  ),
  spark: (
    <g fill="currentColor">
      <path d="M50 6 L58 38 L92 30 L64 50 L92 70 L58 62 L50 94 L42 62 L8 70 L36 50 L8 30 L42 38 Z" />
    </g>
  ),
} as const;
export type PictoName = keyof typeof PICTOS;
export const PICTO_NAMES = Object.keys(PICTOS) as PictoName[];

export function Pictogram({ name }: { name: PictoName }) {
  return (
    <span aria-hidden data-only="brutalist" className={styles.tile}>
      <svg viewBox="0 0 100 100">{PICTOS[name]}</svg>
    </span>
  );
}
