'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
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

  const { card, photo } = faqIntro;
  return (
    <section className="sec" data-narrate="faq">
      <SectionHead index="04" title="Questions" />
      <div className={`grid ${styles.grid}`}>
        {/* Left: a fun title up top, the "still stuck?" card at the bottom (after designme.agency) */}
        <div className={styles.side} style={col('1/6', '1/-1')}>
          <div className={styles.intro}>
            <p className="label muted">{faqIntro.label}</p>
            <SplitHeading text={faqIntro.title} className={styles.title} />
            <p className={styles.lede}>{faqIntro.lede}</p>
          </div>
          <div className={styles.card}>
            <span className={styles.photo}>
              {photo ? <Image src={photo.src} alt={photo.alt} fill sizes="72px" /> : <span aria-hidden>{site.initials}</span>}
            </span>
            <div>
              <p className="t-m">{card.title}</p>
              <p className={styles.cardText}>{card.text}</p>
            </div>
            <div><Button href={site.bookCall} arrow>{card.cta}</Button></div>
            <p className={styles.mail}>
              <span className="muted">Or email me →</span> <a href={`mailto:${site.email}`} className="ul">{site.email}</a>
            </p>
          </div>
        </div>

        <div className={styles.list} style={col('7/13', '1/-1')}>
          {faqs.map((f, i) => (
            <div key={f.q} className={`${styles.item} ${open === i ? styles.open : ''}`}>
              <button
                className={styles.q}
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <i className={styles.icon} aria-hidden />
                <span>{f.q}</span>
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
