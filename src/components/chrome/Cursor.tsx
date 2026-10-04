'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { isFinePointer } from '@/lib/motion';
import styles from './Cursor.module.css';

/** Accent dot that follows the pointer; shows a label over [data-cursor] elements. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    const c = ref.current!;
    const label = labelRef.current!;
    const xTo = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' });
    let seen = false;

    const move = (e: PointerEvent) => {
      if (!seen) { seen = true; gsap.set(c, { x: e.clientX, y: e.clientY }); gsap.to(c, { opacity: 1, duration: 0.3 }); }
      xTo(e.clientX); yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      if (labelled?.dataset.cursor) {
        label.textContent = labelled.dataset.cursor;
        c.classList.add(styles.withLabel); c.classList.remove(styles.link);
      } else if (t.closest('a, button, [data-drag]')) {
        c.classList.add(styles.link); c.classList.remove(styles.withLabel);
      } else {
        c.classList.remove(styles.link, styles.withLabel);
      }
    };
    const leave = () => gsap.to(c, { opacity: 0, duration: 0.2 });
    const enter = () => seen && gsap.to(c, { opacity: 1, duration: 0.2 });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden>
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
