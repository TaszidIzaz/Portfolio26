'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { PixelLayers, revealPixels } from '@/components/ui/Swiss';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { previewOf, projectHref } from '@/content/projects';
import type { Project } from '@/content/types';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './WorkGrid.module.css';

/**
 * Clean index for Swiss + Almanac: two projects per row, the visual on top and a single caption line
 * (name · kind of work · industry). The cover shows first; the motion preview flips in on scroll.
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
        // Only the backdrop shows at first; the motion preview tilts up into the centre as the card scrolls in (after bymonolog.com).
        // It never drifts with the parallax, so it always sits dead centre of the frame.
        if (preview) {
          gsap.fromTo(
            preview,
            { autoAlpha: 0, rotateX: -38, yPercent: 14, scale: 0.9 },
            { autoAlpha: 1, rotateX: 0, yPercent: 0, scale: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 55%', toggleActions: 'play none none reverse' } },
          );
        }
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
                // Outer box only centres (CSS); the inner screen is what animates, so the two never fight
                <div className={styles.previewPos}>
                  <div className={styles.preview} data-preview>
                    {prev.video ? (
                      <video src={prev.video} poster={prev.src} muted loop playsInline preload="none" aria-hidden />
                    ) : (
                      <Image src={prev.src} alt="" fill sizes="(max-width: 767px) 60vw, 28vw" />
                    )}
                  </div>
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
