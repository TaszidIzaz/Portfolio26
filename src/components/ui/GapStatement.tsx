'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './GapStatement.module.css';

/** Two words; the image between them opens up as you scroll, pushing them apart. */
export function GapStatement({ left, right, image, text, narrate }: { left: string; right: string; image: string; text?: string; narrate?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(`.${styles.img}`, {
        width: () => Math.min(window.innerWidth * (window.innerWidth < 768 ? 0.18 : 0.3), 520),
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'center 45%', scrub: true, invalidateOnRefresh: true },
      });
      gsap.from(`.${styles.text}`, { y: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: `.${styles.text}`, start: 'top 90%' } });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={styles.gap} data-narrate={narrate}>
      <div className={styles.row}>
        <span className={styles.word}>{left}</span>
        <span className={styles.img}><Image src={image} alt="" fill sizes="30vw" /></span>
        <span className={styles.word}>{right}</span>
      </div>
      {text && <p className={`t-m regular ${styles.text}`}>{text}</p>}
    </section>
  );
}
