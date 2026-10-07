'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Clip, Stamp, Tape } from '@/components/ui/Collage';
import { Seal, Shard } from '@/components/ui/Folk';
import { PixelLayers, revealPixels } from '@/components/ui/Swiss';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { previewOf, projectHref } from '@/content/projects';
import type { Project } from '@/content/types';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './WorkFloat.module.css';

/**
 * Staggered, floating cards (inspired by art-yakushev.com/work).
 * Pattern of 6, repeating: big · large + small (offset) · medium · large + small (offset).
 * Parallax: the card drifts at its own speed and the image moves inside its frame;
 * the floating preview stays centred on the frame.
 */
type Slot = { c: string; row: number; ratio: string; speed: number; preview: boolean; offset?: boolean; sizes: string };
const PATTERN: Slot[] = [
  { c: '5/12', row: 1, ratio: '806 / 554', speed: 0.6, preview: true, sizes: '(max-width: 767px) 100vw, 58vw' },
  { c: '7/13', row: 2, ratio: '1 / 1', speed: 0.9, preview: true, sizes: '(max-width: 767px) 100vw, 50vw' },
  { c: '1/5', row: 2, ratio: '1 / 1', speed: 1.8, preview: false, offset: true, sizes: '(max-width: 767px) 100vw, 30vw' },
  { c: '2/9', row: 3, ratio: '806 / 490', speed: 0.7, preview: true, sizes: '(max-width: 767px) 100vw, 58vw' },
  { c: '1/7', row: 4, ratio: '1 / 1', speed: 0.9, preview: true, sizes: '(max-width: 767px) 100vw, 50vw' },
  { c: '10/13', row: 4, ratio: '1 / 1', speed: 1.8, preview: false, offset: true, sizes: '(max-width: 767px) 100vw, 30vw' },
];

export function WorkFloat({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
      cards.forEach((card) => {
        const frame = card.querySelector<HTMLElement>('[data-frame]')!;
        const media = card.querySelector<HTMLElement>('[data-media]')!;
        const range = { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 };
        revealPixels(frame, card);

        // Frame opens as it enters
        gsap.fromTo(frame, { clipPath: 'inset(10% 6% 10% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 45%', scrub: true } });
        // Image drifts inside the frame
        gsap.fromTo(media, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: range });

        gsap.matchMedia().add('(min-width: 768px)', () => {
          const speed = Number(card.dataset.speed);
          // Card floats at its own speed (small cards faster = closer)
          gsap.fromTo(card, { y: 90 * speed }, { y: -90 * speed, ease: 'none', scrollTrigger: range });
        });
      });
    },
    { scope: ref },
  );

  // Preview videos play only while visible
  useEffect(() => {
    const vids = [...(ref.current?.querySelectorAll('video') ?? [])];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { rootMargin: '200px 0px' });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`grid ${styles.float}`}>
      {projects.map((p, i) => {
        const slot = PATTERN[i % PATTERN.length];
        const cycle = Math.floor(i / PATTERN.length);
        const prev = slot.preview ? previewOf(p) : undefined;
        return (
          <TransitionLink
            key={p.slug}
            href={projectHref(p.slug)}
            className={`${styles.card} ${slot.offset ? styles.offset : ''}`}
            style={{ ['--c' as string]: slot.c, ['--cm' as string]: '1/-1', gridRow: slot.row + cycle * 4 }}
            data-card
            data-speed={slot.speed}
            data-cursor="View case →"
          >
            {slot.preview ? <Clip style={{ top: '-22px', left: '50%', translate: '-50% 0' }} /> : <Tape style={{ top: '-12px', left: '-18px', '--r': '-28deg' }} />}
            <Shard index={i} style={{ '--r': `${i % 2 ? 3 : -2}deg` }} />
            {i === 0 && <Seal style={{ top: '-28px', right: '-18px' }} />}
            {i === 0 && <Stamp text="SELECTED WORK • DHAKA • 2026 • " style={{ top: '-40px', right: '-30px' }} />}
            <div className={styles.shot}>
            <div className={`${styles.frame} print`} style={{ aspectRatio: slot.ratio }} data-frame>
              <div className={styles.media} data-media>
                <Image src={p.cover.src} alt={p.cover.alt} fill sizes={slot.sizes} />
              </div>
              <PixelLayers src={p.cover.src} />
              {prev && (
                <div className={styles.preview} data-preview>
                  {prev.video ? (
                    <video src={prev.video} poster={prev.src} muted loop playsInline preload="none" aria-hidden />
                  ) : (
                    <Image src={prev.src} alt="" fill sizes="30vw" />
                  )}
                </div>
              )}
            </div>
            </div>
            <div className={styles.meta}>
              <span className={`label ${styles.idx}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`t-m ${styles.title}`}>{p.title}</h3>
              <span className={`t-s hide-m ${styles.tag}`}>{p.tags[0]}</span>
              <span className={`t-s ${styles.cta}`}>{p.summary}</span>
            </div>
          </TransitionLink>
        );
      })}
    </div>
  );
}
