'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { about } from '@/content/home';
import { site } from '@/content/site';
import { useReveal } from '@/hooks/useReveal';
import { col } from '@/lib/grid';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import styles from './About.module.css';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      // Words fill in as you read.
      SplitText.create(text.current!, {
        type: 'words', autoSplit: true, ignore: `.${styles.pill}, .${styles.ico}, .${styles.chip}`,
        onSplit: (self) =>
          gsap.fromTo(self.words, { opacity: 0.14 }, {
            opacity: 1, stagger: 0.1, ease: 'none',
            scrollTrigger: { trigger: text.current, start: 'top 80%', end: 'bottom 55%', scrub: true },
          }),
      });
      gsap.from(`.${styles.pill}, .${styles.ico}, .${styles.chip}`, {
        scale: 0, duration: 0.9, ease: 'back.out(2)', stagger: 0.15,
        scrollTrigger: { trigger: text.current, start: 'top 70%' },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec" id="about" data-narrate="about">
      <SectionHead index="01" title="About" />
      <div className="grid">
        <p ref={text} className={styles.text} style={col('3/13', '1/-1')}>
          I’m Taszid <span className={styles.ico} aria-hidden />, a product designer and creative director who works hand in hand with
          AI. As creative director at{' '}
          <a className={styles.chip} href={site.employer.url} target="_blank" rel="noopener" data-cursor={`Visit ${site.employer.name} ↗`}>
            {site.employer.name}
          </a>
          , I use it to get from a rough idea{' '}
          <span className={styles.pill}><Image src={about.pillImage} alt="" fill sizes="120px" /></span> to a tested product faster, and
          my experience to make sure it still feels human.
        </p>
      </div>
      <div className={`grid ${styles.notes}`}>
        {about.notes.map((n, i) => (
          <p key={n.label} className={styles.note} style={col(['3/6', '7/10', '10/13'][i], '1/-1')} data-reveal>
            <span className="label muted">↳ {n.label}</span>
            {n.text}
          </p>
        ))}
        <p style={col('3/6', '1/-1')} data-reveal>
          <TransitionLink href="/about" className={`t-s ${styles.more}`}>More about me <span aria-hidden>→</span></TransitionLink>
        </p>
      </div>
    </section>
  );
}
