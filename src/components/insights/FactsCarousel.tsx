'use client';

import { useRef, useState } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { facts, insightsPage } from '@/content/insights';
import { gsap, useGSAP } from '@/lib/gsap';
import { rich } from '@/lib/rich';
import styles from './Insights.module.css';

const MAX = 160; // chart scale (before = 100)

/** "Some numbers are just that, numbers." — results from real projects, before vs after. */
export function FactsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const fact = facts[i];

  // Animate bars + text whenever the fact changes (and on first scroll into view).
  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>('[data-bar]');
      gsap.fromTo(bars, { height: '0%' }, {
        height: (k: number) => `${((k === 0 ? fact.before : fact.after) / MAX) * 100}%`,
        duration: 1.2, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: i === 0 ? { trigger: ref.current, start: 'top 75%' } : undefined,
      });
      gsap.fromTo('[data-fact]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' });
    },
    { scope: ref, dependencies: [i], revertOnUpdate: true },
  );

  const go = (n: number) => setI((n + facts.length) % facts.length);

  return (
    <section className={styles.facts} data-narrate="insightsPage">
      <div ref={ref} className={styles.card}>
        <div className={styles.left}>
          <h2 className="t-l">{rich(insightsPage.factsTitle)}</h2>
          <div className={styles.dots} role="tablist" aria-label="Facts">
            {facts.map((_, k) => <button key={k} aria-label={`Fact ${k + 1}`} aria-current={k === i} onClick={() => go(k)} />)}
          </div>
        </div>
        <div className={styles.right}>
          <p className={`t-m ${styles.factText}`} data-fact>
            {fact.lead} <b>{fact.highlight}</b> {fact.rest}
          </p>
          <div className={`t-s ${styles.legend}`} data-fact>
            <span><i style={{ background: 'var(--accent)' }} />{fact.afterLabel}</span>
            <span><i style={{ background: 'var(--muted)' }} />{fact.beforeLabel}</span>
          </div>
          <div className={styles.chart} aria-hidden>
            <div className={`${styles.bar} ${styles.barBefore}`} data-bar><span className="label muted">{fact.before}</span></div>
            <div className={`${styles.bar} ${styles.barAfter}`} data-bar><span className="label">{fact.after}</span></div>
          </div>
          <div className={`label ${styles.source}`}>
            <span>Source: {fact.source} (before = 100)</span>
            <TransitionLink href={fact.href} className="ul">Read case →</TransitionLink>
          </div>
          <button className={styles.next} onClick={() => go(i + 1)} data-cursor="Next fact">Next</button>
        </div>
      </div>
    </section>
  );
}
