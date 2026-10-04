'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { faqIntro, faqs } from '@/content/faq';
import { site } from '@/content/site';
import { col } from '@/lib/grid';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './Faq.module.css';

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const answers = useRef<(HTMLDivElement | null)[]>([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    answers.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { height: i === open ? 'auto' : 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => ScrollTrigger.refresh() });
    });
  }, [open]);

  return (
    <section className="sec" data-narrate="faq">
      <SectionHead index="06" title="Questions" />
      <div className={`grid ${styles.grid}`}>
        <div className={styles.side} style={col('1/6', '1/-1')}>
          <SplitHeading text={faqIntro.title} className={styles.title} />
          <p className={styles.lede}>{faqIntro.lede}</p>
          <p className={styles.links}>
            <a href={`mailto:${site.email}`} className="ul">{site.email}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="ul">WhatsApp ↗</a>
          </p>
        </div>
        <div style={col('7/13', '1/-1')}>
          {faqs.map((f, i) => (
            <div key={f.q} className={`${styles.item} ${open === i ? styles.open : ''}`}>
              <button
                className={styles.q}
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{f.q}</span>
                <i className={styles.icon} aria-hidden />
              </button>
              <div id={`faq-${i}`} ref={(el) => { answers.current[i] = el; }} className={styles.a} role="region">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
