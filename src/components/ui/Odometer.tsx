'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Odometer.module.css';

const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);

/** Slot-machine number that rolls into place when scrolled into view. */
export function Odometer({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const cols = [...root.querySelectorAll<HTMLElement>(`.${styles.col}`)];
      // Size each column to its final digit so "1" doesn't get a "0"-wide slot.
      cols.forEach((c) => {
        const probe = document.createElement('span');
        probe.textContent = c.dataset.d!;
        probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
        root.appendChild(probe);
        c.style.width = `${probe.getBoundingClientRect().width}px`;
        probe.remove();
      });
      gsap.fromTo(
        cols.map((c) => c.firstElementChild),
        { yPercent: 0 },
        {
          yPercent: (i: number) => -(10 + Number(cols[i].dataset.d)) * 5,
          duration: 2.4, ease: 'expo.out', stagger: 0.15,
          scrollTrigger: { trigger: root, start: 'top 88%' },
        },
      );
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={styles.odo} role="img" aria-label={value}>
      {[...value].map((d, i) => (
        <span key={i} className={styles.col} data-d={d} aria-hidden>
          <span className={styles.strip}>
            {DIGITS.map((n, j) => <span key={j}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}
