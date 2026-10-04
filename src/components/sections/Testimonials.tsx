'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHead } from '@/components/ui/SectionHead';
import { testimonials } from '@/content/testimonials';
import { col } from '@/lib/grid';
import { gsap } from '@/lib/gsap';
import styles from './Testimonials.module.css';

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (i: number) => {
    const n = (i + testimonials.length) % testimonials.length;
    setIndex(n);
    gsap.to(track.current, { xPercent: -100 * n, duration: 1.1, ease: 'expo.inOut' });
    const quote = track.current?.children[n]?.querySelector('blockquote');
    if (quote) gsap.fromTo(quote, { opacity: 0.2 }, { opacity: 1, duration: 1, delay: 0.3 });
  };

  return (
    <section className="sec" data-narrate="testimonials">
      <SectionHead index="05" title="Kind words" />
      <div
        className={styles.viewport}
        data-cursor="Drag"
        onPointerDown={(e) => { startX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          startX.current = null;
        }}
      >
        <div ref={track} className={styles.track}>
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`grid ${styles.quote}`} aria-hidden={i !== index}>
              <blockquote style={col('3/13', '1/-1')}>{t.quote}</blockquote>
              <figcaption className={styles.person} style={col('3/13', '1/-1')}>
                <span className={styles.avatar}><Image src={t.avatar} alt="" fill sizes="48px" /></span>
                <span><b>{t.name}</b><span className="muted">{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className={`grid ${styles.ctrl}`}>
        <p className="label" style={col('3/5', '1/3')}>
          {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </p>
        <div className={styles.btns} style={col('11/13', '3/5')}>
          <Button variant="round" onClick={() => go(index - 1)} aria-label="Previous testimonial">←</Button>
          <Button variant="round" onClick={() => go(index + 1)} aria-label="Next testimonial">→</Button>
        </div>
      </div>
    </section>
  );
}
