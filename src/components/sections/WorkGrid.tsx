'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { PixelLayers, revealPixels } from '@/components/ui/Swiss';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { projectHref } from '@/content/projects';
import type { Img, Project } from '@/content/types';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './WorkGrid.module.css';

/** Prefer a video from the gallery for the floating preview, else the second still. */
function previewOf(p: Project): Img | undefined {
  const all = p.gallery.flatMap((r) => r.images);
  return all.find((i) => i.video) ?? all.find((i) => i.src !== p.cover.src);
}

/**
 * Clean index for Swiss + Almanac: two projects per row, the visual on top and a single caption line
 * (name · kind of work · industry). Same visuals as the floating layout, without the stagger.
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
        const frame = card.querySelector<HTMLElement>('[data-frame]')!;
        const preview = card.querySelector<HTMLElement>('[data-preview]');
        const range = { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 };
        revealPixels(frame, card);
        gsap.fromTo(frame, { clipPath: 'inset(6% 4% 6% 4%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 50%', scrub: true } });
        gsap.fromTo(card.querySelector('[data-media]'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: range });
        if (preview) gsap.fromTo(preview, { y: 40 }, { y: -40, ease: 'none', scrollTrigger: range });
        gsap.from(card.querySelectorAll('[data-cap]'), { y: 16, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: card, start: 'bottom 95%' } });
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
    <div ref={ref} className={`grid ${styles.grid}`}>
      {projects.map((p) => {
        const prev = previewOf(p);
        return (
          <TransitionLink key={p.slug} href={projectHref(p.slug)} className={styles.card} data-card data-cursor="View case →">
            <div className={`${styles.frame} print`} data-frame>
              <div className={styles.media} data-media>
                <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(max-width: 767px) 100vw, 48vw" />
              </div>
              <PixelLayers src={p.cover.src} />
              {prev && (
                <div className={styles.preview} data-preview>
                  {prev.video ? (
                    <video src={prev.video} poster={prev.src} muted loop playsInline preload="none" aria-hidden />
                  ) : (
                    <Image src={prev.src} alt="" fill sizes="(max-width: 767px) 60vw, 28vw" />
                  )}
                </div>
              )}
            </div>
            <div className={styles.cap}>
              <h3 className={`t-m ${styles.name}`} data-cap>{p.title}</h3>
              <span className={`t-s ${styles.type}`} data-cap>{p.type ?? p.tags[0]}</span>
              <span className={`t-s ${styles.industry}`} data-cap>{p.industry[0]}</span>
            </div>
          </TransitionLink>
        );
      })}
    </div>
  );
}
