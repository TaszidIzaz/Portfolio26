'use client';

import Image from 'next/image';
import { Fragment, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './BigMarquee.module.css';

/** Giant word on a loop with an image between repeats; scrolling speeds it up. */
export function BigMarquee({ word, image, reverse = false }: { word: string; image: string; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.fromTo(track.current, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, duration: 28, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        trigger: ref.current, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => {
          gsap.to(loop, {
            timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6), duration: 0.25, overwrite: true,
            onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2 }); },
          });
        },
      });
    },
    { scope: ref },
  );

  const unit = (k: number) => (
    <Fragment key={k}>
      <span className={styles.word}>{word}</span>
      <span className={styles.img}><Image src={image} alt="" fill sizes="24vw" /></span>
    </Fragment>
  );
  return (
    <div ref={ref} className={styles.wrap} aria-hidden>
      <div ref={track} className={styles.track}>{[0, 1, 2, 3].map(unit)}</div>
    </div>
  );
}
