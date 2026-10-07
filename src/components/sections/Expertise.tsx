'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { expertise } from '@/content/home';
import { col } from '@/lib/grid';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Expertise.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Services as stacking cards (after storeyarchitecture.co.uk "Our areas of expertise").
 * Cards are sticky; each next card slides up over the previous one, which dims and eases back.
 */
export function Expertise({ index = '03' }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]', ref.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const top = () => parseFloat(getComputedStyle(next).top) || 0;
          gsap.timeline({
            scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${top()}px`, scrub: true, invalidateOnRefresh: true },
          })
            .to(card.querySelector('[data-shade]'), { opacity: 0.45, ease: 'none' }, 0)
            .to(card.querySelector('[data-body]'), { scale: 0.96, yPercent: -2, ease: 'none' }, 0);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={styles.expertise} id="services" data-narrate="expertise">
      <SectionHead index={index} title="Services" note="Four ways I can help" />
      <div className={`grid ${styles.head}`}>
        <SplitHeading text={expertise.title} className={styles.title} style={col('1/8', '1/-1')} />
        <p className={`t-m regular ${styles.intro}`} style={col('9/13', '1/-1')}>{expertise.intro}</p>
      </div>

      <div className={styles.stack}>
        {expertise.services.map((s, i) => (
          <article key={s.title} className={styles.card} style={{ ['--i' as string]: i }} data-card>
            <div className={styles.body} data-body>
              <div className={`grid ${styles.row}`}>
                <h3 className={`t-m ${styles.cardTitle}`} style={col('1/6', '1/-1')}>{s.title}</h3>
                <p className={`t-m regular ${styles.text}`} style={col('7/12', '1/-1')}>{s.text}</p>
              </div>
              <div className={`grid ${styles.row2}`}>
                <ul className={`t-s ${styles.points}`} style={col('1/6', '1/-1')}>
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <figure className={`${styles.img} print`} style={col('7/10', '1/-1')}>
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 767px) 92vw, 26vw" />
                </figure>
                <span className={styles.num} style={col('11/13', '1/-1')} aria-hidden>{pad(i + 1)}</span>
              </div>
            </div>
            <span className={styles.shade} data-shade aria-hidden />
          </article>
        ))}
      </div>
    </section>
  );
}
