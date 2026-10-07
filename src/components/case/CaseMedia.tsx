'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { Img } from '@/content/types';
import styles from './Case.module.css';

/** A still image or looping video, shown as-is (no parallax). Videos play only while on screen. */
export function CaseMedia({ img, ratio, sizes, priority, fill }: { img: Img; ratio?: string; sizes: string; priority?: boolean; fill?: boolean }) {
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { rootMargin: '200px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`${styles.media} ${fill ? styles.mediaFill : ''} print`} style={fill ? undefined : { aspectRatio: ratio ?? `${img.w} / ${img.h}` }}>
      {img.video ? (
        <video ref={vid} src={img.video} poster={img.src} muted loop playsInline preload={priority ? 'auto' : 'none'} aria-label={img.alt} />
      ) : (
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} />
      )}
    </figure>
  );
}
