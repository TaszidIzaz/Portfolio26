'use client';

import { useEffect, useRef } from 'react';
import styles from './ServiceLoop.module.css';

export type LoopKind = 'brand' | 'web' | 'product' | 'direction';

/**
 * Small looping animations for the services cards (after designme.agency's service clips).
 * Drawn in SVG with CSS keyframes, so they recolour with the mode (--fg / --accent / --soft),
 * stay sharp at any size and weigh almost nothing. They pause while off screen.
 */
export function ServiceLoop({ kind, label }: { kind: LoopKind; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { el.dataset.playing = e.isIntersecting ? 'true' : 'false'; }, { rootMargin: '100px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.loop} ${styles[kind]}`} role="img" aria-label={label} data-playing="false">
      <svg viewBox="0 0 800 480" aria-hidden>
        {kind === 'brand' && <Brand />}
        {kind === 'web' && <Web />}
        {kind === 'product' && <Product />}
        {kind === 'direction' && <Direction />}
      </svg>
    </div>
  );
}

/** A mark constructs itself on a grid; the palette and type specimen arrive beside it. */
function Brand() {
  return (
    <g className={styles.all}>
      <g className={styles.grid}>
        {[150, 260, 370].map((x) => <line key={`x${x}`} x1={x} y1="40" x2={x} y2="440" />)}
        {[120, 240, 360].map((y) => <line key={`y${y}`} x1="60" y1={y} x2="740" y2={y} />)}
      </g>
      <circle className={styles.bCircle} cx="260" cy="240" r="150" pathLength={100} />
      <path className={styles.bWedge} d="M260 240 L260 90 A150 150 0 0 1 410 240 Z" />
      <rect className={styles.bSquare} x="212" y="192" width="96" height="96" />
      <g className={styles.bSwatches}>
        <rect x="490" y="96" width="72" height="72" className={styles.fg} />
        <rect x="574" y="96" width="72" height="72" className={styles.accent} />
        <rect x="658" y="96" width="72" height="72" className={styles.mid} />
      </g>
      <text className={styles.bType} x="490" y="380">Aa</text>
    </g>
  );
}

/** A page scrolls inside a browser window while the cursor drifts to the button and clicks. */
function Web() {
  const page = (dy: number) => (
    <g transform={`translate(0 ${dy})`}>
      <rect x="112" y="94" width="54" height="10" className={styles.fg} />
      {[566, 608, 650].map((x) => <rect key={x} x={x} y="96" width="30" height="6" className={styles.mid} />)}
      <rect x="112" y="126" width="340" height="24" className={styles.fg} />
      <rect x="112" y="158" width="240" height="24" className={styles.fg} />
      <rect x="112" y="198" width="112" height="32" rx="16" className={`${styles.accent} ${styles.wBtn}`} />
      <rect x="112" y="248" width="576" height="130" className={styles.mid} />
      {[112, 312, 512].map((x) => <rect key={x} x={x} y="394" width="176" height="80" className={styles.stroke} />)}
      <rect x="112" y="490" width="300" height="8" className={styles.mid} />
      <rect x="112" y="506" width="220" height="8" className={styles.mid} />
    </g>
  );
  return (
    <g>
      <defs><clipPath id="sl-web-view"><rect x="82" y="74" width="636" height="364" /></clipPath></defs>
      <rect x="80" y="40" width="640" height="400" rx="12" className={styles.frame} />
      <line x1="80" y1="72" x2="720" y2="72" className={styles.stroke} />
      {[102, 118, 134].map((x) => <circle key={x} cx={x} cy="56" r="4" className={styles.fg} />)}
      <g clipPath="url(#sl-web-view)">
        <g className={styles.wScroll}>{page(0)}{page(440)}</g>
      </g>
      <path className={styles.wCursor} d="M0 0 L0 26 L7 20 L12 31 L17 29 L12 18 L21 18 Z" />
    </g>
  );
}

/** A phone: the top card swipes away and the stack moves up; a setting toggles and a notification lands. */
function Product() {
  const card = (y: number, cls: string) => (
    <g className={cls} key={cls}>
      <rect x="330" y={y} width="140" height="70" rx="10" className={styles.frame} />
      <circle cx="352" cy={y + 22} r="10" className={styles.mid} />
      <rect x="370" y={y + 16} width="74" height="6" className={styles.fg} />
      <rect x="370" y={y + 28} width="50" height="5" className={styles.mid} />
      <rect x="342" y={y + 48} width="114" height="6" className={styles.mid} />
    </g>
  );
  return (
    <g>
      {/* Settings card with a toggle */}
      <rect x="64" y="170" width="200" height="72" rx="14" className={styles.frame} />
      <rect x="86" y="192" width="84" height="8" className={styles.fg} />
      <rect x="86" y="212" width="60" height="6" className={styles.mid} />
      <rect x="196" y="194" width="46" height="24" rx="12" className={styles.stroke} />
      <rect x="196" y="194" width="46" height="24" rx="12" className={`${styles.accent} ${styles.pTrack}`} />
      <circle cx="208" cy="206" r="8" className={`${styles.fg} ${styles.pKnob}`} />

      {/* Phone */}
      <rect x="310" y="24" width="180" height="432" rx="30" className={styles.frame} />
      <rect x="370" y="38" width="60" height="10" rx="5" className={styles.fg} />
      <rect x="332" y="70" width="80" height="9" className={styles.fg} />
      <defs><clipPath id="sl-phone-view"><rect x="314" y="96" width="172" height="240" /></clipPath></defs>
      <g clipPath="url(#sl-phone-view)">
        {card(104, styles.pC1)}
        {card(184, styles.pC2)}
        {card(264, styles.pC3)}
        {card(344, styles.pC4)}
      </g>
      <circle cx="450" cy="408" r="20" className={styles.ripple} />
      <circle cx="450" cy="408" r="20" className={`${styles.accent} ${styles.pFab}`} />
      <path d="M450 400 V416 M442 408 H458" className={styles.onAccent} />

      {/* Notification that lands after the tap */}
      <g className={styles.pNote}>
        <rect x="536" y="250" width="204" height="72" rx="14" className={styles.frame} />
        <circle cx="566" cy="286" r="13" className={styles.accent} />
        <path d="M560 286 L565 291 L573 281" className={styles.onAccent} />
        <rect x="592" y="272" width="122" height="8" className={styles.fg} />
        <rect x="592" y="292" width="84" height="6" className={styles.mid} />
      </g>
    </g>
  );
}

/** A viewfinder: moodboard tiles reshuffle, a crop lands, and one pick gets circled and ticked. */
function Direction() {
  return (
    <g className={styles.all}>
      <path className={styles.stroke} d="M60 76 V40 H96 M704 40 H740 V76 M740 404 V440 H704 M96 440 H60 V404" />
      <g className={styles.grid}>
        <line x1="287" y1="40" x2="287" y2="440" /><line x1="513" y1="40" x2="513" y2="440" />
        <line x1="60" y1="173" x2="740" y2="173" /><line x1="60" y1="307" x2="740" y2="307" />
      </g>
      <rect x="110" y="80" width="170" height="200" className={`${styles.fg} ${styles.dA}`} />
      <g className={styles.dB}>
        <rect x="300" y="80" width="170" height="200" className={styles.frame} />
        <circle cx="436" cy="114" r="13" className={styles.fg} />
        <path d="M316 266 L364 186 L392 230 L412 206 L454 266 Z" className={styles.fg} />
      </g>
      <rect x="490" y="80" width="200" height="320" className={`${styles.mid} ${styles.dC}`} />
      <rect x="110" y="300" width="360" height="100" className={styles.mid} />
      <rect x="508" y="98" width="164" height="284" className={styles.dCrop} />
      <ellipse cx="195" cy="180" rx="112" ry="128" className={styles.dCircle} pathLength={100} />
      <path d="M262 50 L280 70 L314 32" className={styles.dTick} pathLength={100} />
    </g>
  );
}
