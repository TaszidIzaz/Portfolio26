'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Swiss.module.css';

/**
 * Swiss mode pieces (after the bleibtgleich references), black on paper:
 *  - <BlurWords>  a blurred keyword cloud behind content that comes into focus around the cursor
 *  - <Sticker>    a typographic sticker (a short line of text on a pill); straightens on hover
 *  - <PixelLayers> + revealPixels(): images start as big pixels and resolve as they scroll in
 * Each is wrapped in data-only="swiss", so it's invisible in the other modes.
 */

type Pos = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Keyword cloud, blurred like type seen through frosted glass. Words near the pointer sharpen,
 * so it feels like your eye is focusing. Decorative only (aria-hidden); sizes stay on the type scale.
 */
export function BlurWords({ words, className = '', style }: { words: string[]; className?: string; style?: Pos }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box || !matchMedia('(hover: hover)').matches) return;
    const spans = [...box.querySelectorAll<HTMLElement>('span')];
    let raf = 0;
    let px = -9999;
    let py = -9999;
    const apply = () => {
      raf = 0;
      for (const s of spans) {
        const r = s.getBoundingClientRect();
        const dx = Math.max(r.left - px, 0, px - r.right);
        const dy = Math.max(r.top - py, 0, py - r.bottom);
        const d = Math.hypot(dx, dy);
        s.style.setProperty('--b', `${Math.min(7, d / 36).toFixed(2)}px`);
      }
    };
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    const onLeave = () => { px = py = -9999; if (!raf) raf = requestAnimationFrame(apply); };
    const host = box.parentElement ?? box;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => { host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} aria-hidden data-only="swiss" className={`${styles.words} ${className}`} style={style}>
      {words.map((w, i) => <span key={i}>{w}</span>)}
    </div>
  );
}

/** Typographic sticker: Swiss mode's answer to tape and stamps. Position with `style` (top/left/…, --r rotation). */
export function Sticker({ text, style }: { text: string; style?: Pos }) {
  return <span aria-hidden data-only="swiss" className={`label ${styles.sticker}`} style={style}>{text}</span>;
}

/* ---------- Pixel reveal ---------- */
const PIXEL_STEPS = [128, 64, 32]; // Next.js image widths; DOM order fine → coarse, so the coarsest sits on top
const tiny = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

/** Low-res copies of an image, drawn with hard pixels. Place inside the (positioned) image frame. */
export function PixelLayers({ src }: { src: string }) {
  return (
    <>
      {PIXEL_STEPS.map((w) => (
        // eslint-disable-next-line @next/next/no-img-element -- deliberately tiny, upscaled with hard pixels
        <img key={w} src={tiny(src, w)} alt="" aria-hidden data-px data-only="swiss" className={styles.px} loading="lazy" decoding="async" />
      ))}
    </>
  );
}

/** Call inside useGSAP: steps the pixel layers away (coarse → fine → sharp) when `trigger` scrolls into view. */
export function revealPixels(scope: Element, trigger: Element) {
  if (document.documentElement.dataset.theme !== 'swiss') return;
  const layers = [...scope.querySelectorAll<HTMLElement>('[data-px]')].reverse(); // coarse (top) first
  if (!layers.length) return;
  gsap.set(layers, { autoAlpha: 1 });
  const tl = gsap.timeline({ paused: true });
  layers.forEach((l, i) => tl.set(l, { autoAlpha: 0 }, 0.16 * (i + 1)));
  gsap.timeline({ scrollTrigger: { trigger, start: 'top 82%', once: true, onEnter: () => tl.play() } });
}
