'use client';

import { useRef } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { toolbox } from '@/content/home';
import { col } from '@/lib/grid';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import styles from './Toolbox.module.css';

/** One tool lights up at a time as you scroll. */
export function Toolbox() {
  const ref = useRef<HTMLElement>(null);
  const list = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = [...list.current!.children] as HTMLElement[];
      const paint = (idx: number) =>
        words.forEach((w, i) => {
          w.classList.toggle(styles.on, i === idx);
          w.classList.toggle(styles.past, i < idx);
        });
      ScrollTrigger.create({
        trigger: list.current, start: 'top 70%', end: 'bottom 40%',
        onUpdate: (s) => paint(Math.min(words.length - 1, Math.floor(s.progress * words.length))),
        onLeave: () => paint(words.length),
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec" data-narrate="toolbox">
      <SectionHead index="04" title="Toolbox" />
      <div className="grid">
        <p ref={list} className={styles.list} style={col('3/13', '1/-1')}>
          {toolbox.map((t, i) => (
            <span key={t}>{t}{i < toolbox.length - 1 ? ', ' : ''}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
