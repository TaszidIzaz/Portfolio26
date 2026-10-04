import type { CSSProperties, ReactNode } from 'react';
import styles from './Folk.module.css';

/**
 * Almanac mode pieces (theme id: folk): woodcut stamps, small silhouettes, colour shards and a seal.
 * Everything except <FolkDefs> is wrapped in data-only="folk", so it's invisible in other modes.
 * The stamps are chunky solid shapes; the hand-cut look (rough edges, ink specks, white gouges)
 * comes from the SVG filters + masks in <FolkDefs>. No captions: the pictures carry it.
 */

type Pos = CSSProperties & Record<`--${string}`, string | number>;

/* ---------- Geometry helpers (all shapes live in a 100×100 box) ---------- */

/** Round to 2 decimals so server and browser maths print identical attributes (no hydration mismatch). */
const n2 = (n: number) => Math.round(n * 100) / 100;

/** A pointed leaf, base at 0,0, pointing up. */
const petal = (len: number, w: number) =>
  `M0 0 C${n2(w)} ${n2(-len * 0.25)} ${n2(w * 0.7)} ${n2(-len * 0.8)} 0 ${n2(-len)} C${n2(-w * 0.7)} ${n2(-len * 0.8)} ${n2(-w)} ${n2(-len * 0.25)} 0 0Z`;
const at = (x: number, y: number, rot: number) => `translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)})`;

/** Deterministic pseudo-random (same output on server and client). */
const rand = (i: number) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

const FIG = 'M50 6 C56 6 58 14 60 20 C80 28 92 46 90 66 C88 86 70 96 50 96 C30 96 12 86 10 66 C8 46 20 28 40 20 C42 14 44 6 50 6Z';
const ENOKI_TOPS: [number, number][] = [[20, 28], [31, 17], [43, 10], [56, 11], [68, 18], [79, 29], [37, 32], [62, 32], [50, 24]];
const MINT_LEAVES: [number, number][] = [[80, 30], [60, 26], [40, 21], [24, 15]];
const MOREL_PITS: [number, number][] = [[44, 18], [56, 18], [37, 30], [50, 30], [63, 30], [36, 43], [49, 43], [62, 43], [42, 55], [56, 55]];
const hole = (cx: number, cy: number, rx: number, ry: number, rot = 0) => (
  <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} fill="#000" stroke="none" />
);

interface Shape { body: ReactNode; cuts?: ReactNode; extra?: ReactNode }

/** Woodcut stamps, after the mushroom / farmyard / herbal references. */
const SHAPES = {
  porcini: {
    body: (
      <>
        <path d="M8 52 C6 30 26 10 52 10 C78 10 96 30 93 50 C92 56 86 58 76 57 L26 58 C14 58 8 57 8 52Z" />
        <path d="M30 56 C22 70 24 86 34 94 C44 99 60 99 70 93 C79 85 78 69 70 56Z" />
      </>
    ),
    cuts: <path d="M22 34 C28 24 38 18 50 17 M30 41 C34 35 40 31 46 30 M63 22 L70 25 M73 31 L80 37 M16 54 C40 51 64 51 88 53 M40 66 C38 76 39 84 43 90 M58 68 C60 76 60 84 57 90 M50 64 L50 72" />,
  },
  chanterelle: {
    body: (
      <>
        <path d="M8 26 C20 18 46 16 60 24 C56 30 48 36 44 46 C42 60 44 78 48 94 L36 94 C34 78 32 60 28 48 C24 38 14 32 8 26Z" />
        <path d="M58 46 C66 40 84 40 94 46 C90 50 84 54 82 60 C80 70 82 82 84 94 L74 94 C74 82 72 70 70 62 C68 54 62 50 58 46Z" />
      </>
    ),
    cuts: <path d="M22 28 C28 36 32 44 34 56 M33 26 C37 34 39 44 39 56 M45 26 C45 34 43 40 41 48 M70 48 C74 54 76 62 76 72 M82 48 C82 54 80 60 78 66" />,
  },
  enoki: {
    body: (
      <>
        {ENOKI_TOPS.map(([x, y]) => (
          <path key={`s${x}`} d={`M50 84 Q${n2(50 + (x - 50) * 0.25)} 58 ${x} ${y}`} fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" />
        ))}
        {ENOKI_TOPS.map(([x, y]) => <ellipse key={`c${x}`} cx={x} cy={y - 2} rx="6.4" ry="4.6" />)}
        <path d="M30 84 C30 75 70 75 70 84 C70 95 30 95 30 84Z" />
      </>
    ),
    cuts: <path d="M38 85 L62 85 M42 90 L58 90" />,
  },
  morel: {
    body: (
      <>
        <path d="M50 6 C66 6 74 28 72 50 C71 62 62 68 50 68 C38 68 29 62 28 50 C26 28 34 6 50 6Z" />
        <path d="M40 66 C38 78 36 88 34 95 H66 C64 88 62 78 60 66Z" />
      </>
    ),
    cuts: (
      <>
        {MOREL_PITS.map(([x, y], i) => hole(x, y, 3.6, 5, (i % 3 - 1) * 14))}
        <path d="M46 74 L45 90 M55 74 L56 90" />
      </>
    ),
  },
  pig: {
    body: (
      <>
        <path d="M12 54 C12 36 30 26 52 26 C68 26 80 32 86 42 L95 42 C98 48 97 56 91 57 C89 64 84 70 78 72 L78 88 L69 88 L67 75 L37 75 L35 88 L26 88 L26 73 C17 69 12 62 12 54Z" />
        <path d="M72 31 L80 16 L86 34Z" />
        <path d="M13 48 C4 46 4 36 11 36 C16 36 15 43 9 43" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    cuts: (
      <>
        <circle cx="78" cy="42" r="2.2" fill="#000" stroke="none" />
        <path d="M93 47 L93 52 M30 40 C40 34 54 33 64 36 M24 52 C30 46 38 44 46 45 M44 63 C52 59 62 59 70 63 M30 78 L30 86 M73 78 L73 86" />
      </>
    ),
  },
  hen: {
    body: (
      <>
        <path d="M24 72 C14 58 18 40 34 35 C40 24 50 18 58 22 C62 16 70 18 70 24 L80 30 L71 36 C77 50 75 66 63 74 L58 75 L60 89 L67 94 L52 94 L54 76 L44 76 L42 89 L48 94 L34 94 L38 76 C31 76 27 75 24 72Z" />
        <path d="M26 66 L4 40 L15 43 L8 26 L23 40 L20 24 L32 40Z" />
        <path d="M54 21 C53 14 58 12 60 16 C62 10 67 12 66 17 C70 15 72 19 68 22Z" />
      </>
    ),
    cuts: (
      <>
        <circle cx="64" cy="27" r="1.9" fill="#000" stroke="none" />
        <path d="M34 50 C42 44 54 46 60 54 M36 58 C44 52 54 54 58 60 M40 65 C46 61 52 62 56 65 M14 44 L24 54 M18 34 L26 46" />
      </>
    ),
  },
  cow: {
    body: (
      <>
        <path d="M14 40 C14 32 20 28 30 28 L66 28 C70 22 78 20 84 22 L92 20 L90 28 C96 32 96 42 90 46 L84 48 C82 52 78 54 74 54 L74 86 L66 86 L65 58 L34 58 L33 86 L25 86 L24 56 C18 54 14 48 14 40Z" />
        <path d="M82 22 C82 14 88 12 90 16 C87 17 86 19 86 23Z" />
        <path d="M15 34 C8 38 6 50 9 62" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M9 60 L5 70 L13 68Z" />
      </>
    ),
    cuts: (
      <>
        <circle cx="86" cy="32" r="1.9" fill="#000" stroke="none" />
        {hole(37, 41, 7.5, 5.2, -6)}
        {hole(56, 38, 5, 3.8, 12)}
        <path d="M28 66 L29 82 M70 64 L70 82 M80 26 L76 30" />
      </>
    ),
  },
  fig: {
    body: <path d={FIG} />,
    cuts: <path d={FIG} transform="translate(50 64) scale(.8) translate(-50 -64)" fill="#000" stroke="none" />,
    extra: (
      <>
        {Array.from({ length: 46 }, (_, i) => {
          const a = rand(i) * 360;
          const d = 5 + rand(i + 99) * 22;
          return <path key={i} d={petal(4 + rand(i + 7) * 3, 1.4)} transform={at(50 + Math.sin((a * Math.PI) / 180) * d, 64 - Math.cos((a * Math.PI) / 180) * d * 0.95, a)} />;
        })}
        <circle cx="50" cy="64" r="3" />
      </>
    ),
  },
  ginseng: {
    body: (
      <>
        <path d="M48 20 C54 20 56 26 55 32 C61 40 63 52 59 62 C65 70 71 80 73 94 C67 88 63 82 57 74 C57 82 55 90 51 97 C49 89 49 80 49 70 C43 78 37 86 29 92 C33 82 39 72 45 62 C39 52 39 40 45 30 C43 26 44 20 48 20Z" />
        <path d="M45 40 L34 36 M58 46 L70 42 M60 64 L74 62 M44 58 L30 60 M66 86 L77 92 M36 84 L25 82 M48 20 L48 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d={petal(12, 5)} transform={at(48, 11, -52)} />
        <path d={petal(14, 5.5)} transform={at(48, 11, 0)} />
        <path d={petal(12, 5)} transform={at(48, 11, 52)} />
      </>
    ),
    cuts: <path d="M46 34 C50 36 54 36 56 34 M44 44 C50 46 56 46 60 44 M44 54 C50 56 54 56 58 54" />,
  },
  mint: {
    body: (
      <>
        <path d="M50 98 C50 70 50 40 50 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {MINT_LEAVES.flatMap(([y, len]) => [-1, 1].map((side) => <path key={`${y}${side}`} d={petal(len, len * 0.5)} transform={at(50, y, side * 62)} />))}
        <path d={petal(12, 6)} transform={at(50, 12, 0)} />
      </>
    ),
    cuts: MINT_LEAVES.flatMap(([y, len]) => [-1, 1].map((side) => <path key={`${y}${side}`} d={`M0 -3 L0 ${n2(-len * 0.75)}`} transform={at(50, y, side * 62)} />)),
  },
  bokchoy: {
    body: (
      <>
        <path d="M44 92 C30 84 10 66 10 46 C12 34 20 30 26 34 C24 52 32 74 46 90Z" />
        <path d="M56 92 C70 84 90 66 90 46 C88 34 80 30 74 34 C76 52 68 74 54 90Z" />
        <path d="M50 96 C38 82 22 62 24 38 C26 18 40 6 50 6 C60 6 74 18 76 38 C78 62 62 82 50 96Z" />
      </>
    ),
    cuts: <path d="M50 92 C49 70 49 40 50 14 M50 40 L40 30 M50 52 L38 42 M50 64 L40 56 M50 40 L60 30 M50 52 L62 42 M50 64 L60 56" />,
  },
  pot: {
    body: (
      <>
        <path d="M4 36 H96 V44 H4Z" />
        <path d="M8 44 H92 L86 52 C82 72 68 86 50 86 C32 86 18 72 14 52Z" />
        <path d="M10 48 L2 46 L2 56 L12 56Z M90 48 L98 46 L98 56 L88 56Z" />
        <path d="M34 30 C30 24 38 20 34 12 M50 30 C46 24 54 20 50 12 M66 30 C62 24 70 20 66 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    cuts: <path d="M24 55 L31 74 M38 57 L43 80 M56 57 L54 80 M72 55 L66 76 M8 40 H92" />,
  },
  rabbit: {
    body: (
      <>
        <path d="M20 88 C12 76 14 56 30 48 C36 44 44 42 52 44 C56 36 60 30 66 28 C64 18 62 8 66 4 C70 8 70 18 70 26 C72 18 76 10 80 8 C82 14 78 24 74 30 C82 32 88 40 86 48 C84 54 78 56 72 56 C76 64 76 76 70 84 L74 86 C76 90 72 92 66 92 L28 92 C24 92 22 90 20 88Z" />
        <circle cx="14" cy="76" r="6.5" />
      </>
    ),
    cuts: (
      <>
        <circle cx="76" cy="42" r="2" fill="#000" stroke="none" />
        <path d="M66 9 L67 24 M78 13 L74 26 M30 60 C38 54 48 54 56 58 M28 72 C36 68 46 68 54 72 M44 87 L64 87" />
      </>
    ),
  },
  candle: {
    body: (
      <>
        <path d="M50 4 C57 12 59 21 50 29 C41 21 43 12 50 4Z" />
        <path d="M40 31 H60 V76 H40Z" />
        <path d="M16 80 C16 75 84 75 84 80 C84 89 16 89 16 80Z" />
        <path d="M84 80 C96 78 96 92 84 90 M30 12 L36 17 M70 12 L64 17" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      </>
    ),
    cuts: <path d="M50 14 L50 22 M46 38 L46 70 M54 44 L54 66 M24 82 H76" />,
  },
  heart: {
    body: <path d="M50 90 C30 74 8 58 8 36 C8 20 20 10 32 10 C40 10 46 14 50 22 C54 14 60 10 68 10 C80 10 92 20 92 36 C92 58 70 74 50 90Z" />,
    cuts: <path d="M24 28 C28 21 35 18 42 20 M30 46 C40 42 50 44 56 50 M40 63 C46 61 54 61 60 65 M66 30 L72 34" />,
  },
} satisfies Record<string, Shape>;

export type FolkShape = keyof typeof SHAPES;
export const FOLK_SHAPES = Object.keys(SHAPES) as FolkShape[];

function Art({ name, rough }: { name: FolkShape; rough: 'lino' | 'rough' }) {
  const s: Shape = SHAPES[name];
  return (
    <g filter={`url(#folk-${rough})`} fill="currentColor">
      <g mask={s.cuts ? `url(#folk-cut-${name})` : undefined}>{s.body}</g>
      {s.extra}
    </g>
  );
}

/**
 * Hidden, always-mounted SVG holding the filters and the gouge masks every Folk piece uses.
 * (Not display:none — some browsers then ignore the filters/masks.)
 */
export function FolkDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        {/* Hand-cut: wobbly edges + ink specks where the roller missed */}
        <filter id="folk-lino" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="cut" />
          <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="2" seed="11" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -24 0 0 0 16.4" result="specks" />
          <feComposite in="cut" in2="specks" operator="in" />
        </filter>
        {/* Small sizes (icons): wobbly edges only */}
        <filter id="folk-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {(Object.entries(SHAPES) as [FolkShape, Shape][]).filter(([, s]) => s.cuts).map(([name, s]) => (
          <mask key={name} id={`folk-cut-${name}`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
            <rect x="-10" y="-10" width="120" height="120" fill="#fff" />
            <g fill="none" stroke="#000" strokeWidth="2.6" strokeLinecap="round">{s.cuts}</g>
          </mask>
        ))}
      </defs>
    </svg>
  );
}

/** A woodcut stamp, positioned absolutely with `style` (top/left/right/bottom, --s size, --r rotation, --c colour). */
export function Cut({ name, style }: { name: FolkShape; style?: Pos }) {
  return (
    <span aria-hidden data-only="folk" className={styles.cut} style={style}>
      <svg viewBox="0 0 100 100"><Art name={name} rough="lino" /></svg>
    </span>
  );
}

/** Small stamp silhouette (section heads, icon strip). */
export function FolkIcon({ name, className = '' }: { name: FolkShape; className?: string }) {
  return (
    <svg aria-hidden data-only="folk" className={`${styles.icon} ${className}`} viewBox="0 0 100 100">
      <Art name={name} rough="rough" />
    </svg>
  );
}

/** A row of stamps, like the specimen strip on a record sleeve. */
export function IconStrip({ names = ['porcini', 'hen', 'mint', 'enoki', 'pig', 'ginseng', 'pot', 'morel', 'cow', 'bokchoy', 'fig', 'chanterelle'] }: { names?: FolkShape[] }) {
  return (
    <div aria-hidden data-only="folk" className={styles.strip}>
      {names.map((n, i) => <FolkIcon key={`${n}${i}`} name={n} className={i > 5 ? 'hide-m' : ''} />)}
    </div>
  );
}

/* ---------- Colour shards (the cut-paper polygons behind cards) ---------- */
const SHARD_CLIPS = [
  'polygon(8% 0, 100% 10%, 92% 100%, 0 84%)',
  'polygon(0 12%, 64% 0, 100% 46%, 86% 100%, 6% 90%)',
  'polygon(14% 4%, 96% 0, 100% 78%, 40% 100%, 0 64%)',
  'polygon(0 0, 88% 6%, 100% 100%, 10% 92%)',
  'polygon(20% 0, 100% 18%, 90% 92%, 30% 100%, 0 40%)',
];
const SHARD_COLOURS = ['#9DB9E3', '#E9D35A', '#9FD3A6', '#B48A60', '#D9876A'];

/** Irregular coloured paper behind a card. Place inside a positioned parent; it sits behind its siblings. */
export function Shard({ index = 0, style }: { index?: number; style?: Pos }) {
  return (
    <i
      aria-hidden
      data-only="folk"
      className={styles.shard}
      style={{ clipPath: SHARD_CLIPS[index % SHARD_CLIPS.length], background: SHARD_COLOURS[index % SHARD_COLOURS.length], ...style }}
    />
  );
}

/** Red chop seal with a monogram and a line of small text. */
export function Seal({ text = 'TI', sub = 'DHAKA', style }: { text?: string; sub?: string; style?: Pos }) {
  return (
    <svg aria-hidden data-only="folk" className={styles.seal} style={style} viewBox="0 0 100 100">
      <g filter="url(#folk-lino)">
        <rect x="6" y="6" width="88" height="88" rx="10" fill="none" stroke="currentColor" strokeWidth="6" />
        <rect x="16" y="16" width="68" height="68" rx="4" fill="currentColor" />
      </g>
      <g filter="url(#folk-rough)">
        <text x="50" y="58" textAnchor="middle" fill="var(--seal-paper, #F2EBDD)" fontSize="34" style={{ fontFamily: 'var(--font-head)', letterSpacing: '-0.04em' }}>{text}</text>
        <text x="50" y="76" textAnchor="middle" fill="var(--seal-paper, #F2EBDD)" fontSize="9" style={{ fontFamily: 'var(--font-nhd)', letterSpacing: '0.2em' }}>{sub}</text>
      </g>
    </svg>
  );
}
