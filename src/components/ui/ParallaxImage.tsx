'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { PixelLayers, revealPixels } from './Swiss';
import styles from './ParallaxImage.module.css';

interface Props {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16 / 9". Defaults to the image's own ratio when w/h given. */
  ratio?: string;
  w?: number;
  h?: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  caption?: string;
  /** Looping muted video; `src` becomes its poster. Plays only while on screen. */
  video?: string;
}

/** Image (or video) that opens up (clip) and settles (scale) as it scrolls into view. */
export function ParallaxImage({ src, alt, ratio, w, h, sizes, priority, className = '', style, caption, video }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const fig = ref.current!.querySelector('figure')!;
      const media = fig.querySelector('img:not([data-px]), video');
      revealPixels(fig, fig);
      gsap.fromTo(fig, { clipPath: 'inset(8% 4% 8% 4%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top bottom', end: 'top 35%', scrub: true },
      });
      gsap.fromTo(media, { scale: 1.18 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    },
    { scope: ref },
  );

  // Videos: load + play only when visible, pause when off screen.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { rootMargin: '200px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const aspect = ratio ?? (w && h ? `${w} / ${h}` : '16 / 9');
  return (
    <div ref={ref} className={className} style={style}>
      <figure className={`${styles.figure} print`} style={{ aspectRatio: aspect }}>
        {video ? (
          <video ref={vid} className={styles.video} src={video} poster={src} muted loop playsInline preload="none" aria-label={alt} />
        ) : (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
        )}
        <PixelLayers src={src} />
      </figure>
      {caption && <p className={`t-s ${styles.caption}`}>{caption}</p>}
    </div>
  );
}
