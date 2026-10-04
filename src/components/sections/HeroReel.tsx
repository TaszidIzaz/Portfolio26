'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Tape } from '@/components/ui/Collage';
import { hero } from '@/content/home';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './Hero.module.css';

/** Row of work that scrolls on its own; page scrolling briefly speeds it up. */
export function HeroReel() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Two identical sets → move by exactly one set (-50%) and repeat seamlessly.
      const loop = gsap.to(track.current, { xPercent: -50, duration: hero.reel.length * 4.5, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
          gsap.to(loop, {
            timeScale: boost, duration: 0.25, overwrite: true,
            onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2, ease: 'power2.out' }); },
          });
        },
      });
    },
    { scope: ref },
  );

  const items = [...hero.reel, ...hero.reel];
  return (
    <div ref={ref} className={styles.reel} data-hero-reel>
      <div ref={track} className={styles.track}>
        {items.map((item, i) => (
          <figure key={i} className={`${styles.card} ${styles[item.size]} print`} aria-hidden={i >= hero.reel.length}>
            <Image src={item.src} alt={i < hero.reel.length ? item.alt : ''} fill sizes="(max-width: 767px) 62vw, 23vw" priority={i < 4} />
            <Tape style={{ top: '8px', left: i % 2 ? '58%' : '14%', '--r': i % 2 ? '5deg' : '-6deg' }} />
          </figure>
        ))}
      </div>
    </div>
  );
}
