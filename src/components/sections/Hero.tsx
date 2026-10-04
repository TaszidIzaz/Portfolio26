'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Doodle } from '@/components/ui/Collage';
import { Cut } from '@/components/ui/Folk';
import { BlurWords } from '@/components/ui/Swiss';
import { hero } from '@/content/home';
import { site } from '@/content/site';
import type { ThemeId } from '@/content/types';
import { onIntroDone } from '@/lib/events';
import { col } from '@/lib/grid';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { HeroReel } from './HeroReel';
import styles from './Hero.module.css';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Built paused (so everything starts hidden), played when the intro hands over.
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      let played = false;
      SplitText.create('[data-hero-hl]', {
        type: 'lines', mask: 'lines', linesClass: 'ln', autoSplit: true, ignore: '.swap',
        // Re-splits when a late font (Folk / Brutalist) arrives: returning the tween lets SplitText
        // kill the old one; after the intro has played, fresh lines simply stay visible.
        onSplit: (self) => {
          if (played) return;
          const tw = gsap.from(self.lines, { yPercent: 115, duration: 1.3, stagger: 0.08, ease: 'expo.out' });
          tl.add(tw, 0);
          return tw;
        },
      });
      tl.from('[data-hero-fade]', { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.25)
        .from('[data-hero-reel] figure', { y: 80, opacity: 0, duration: 1.4, stagger: 0.05 }, 0.3)
        .from('[data-topbar] > *', { y: -14, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05 }, 0.2)
        .from('[data-dock]', { yPercent: 180, duration: 1.1 }, 0.5);
      return onIntroDone(() => { played = true; tl.play(); });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={styles.hero} id="top" data-narrate="hero">
      <div className={`grid ${styles.top}`}>
        <BlurWords words={hero.words} className={styles.words} />
        {/* Almanac: woodcut stamps beside the text block, so they never drift into the reel */}
        <div className={styles.cuts}>
          <Cut name="porcini" style={{ top: '0', right: '4%', '--s': '124px', '--r': '-6deg', '--c': 'var(--ink-2)' }} />
          <Cut name="enoki" style={{ top: '40%', right: '58%', '--s': '96px', '--r': '8deg', '--c': 'var(--accent)' }} />
          <Cut name="pig" style={{ bottom: '0', right: '18%', '--s': '136px', '--c': 'var(--ink-2)' }} />
        </div>
        <h1 className={`hl ${styles.hl}`} style={col('1/10', '1/-1')} data-hero-hl>
          {hero.lines.map((line, i) => (
            <span key={i}>{line}{i < hero.lines.length - 1 ? <br /> : ' '}</span>
          ))}
          <em className="swap">
            {(Object.keys(hero.swap) as ThemeId[]).map((id) => (
              <span key={id} data-t={id}>{hero.swap[id]}</span>
            ))}
          </em>
        </h1>
        <p className={styles.lede} style={col('1/8', '1/-1')} data-hero-fade>{hero.lede}</p>
        <div className={styles.cta} style={col('1/-1')} data-hero-fade>
          <Button href={site.bookCall} arrow>{hero.cta}</Button>
        </div>
      </div>
      <Doodle name="asterisk" style={{ top: '18vh', right: '8vw', '--s': '110px', '--r': '8deg' }} />
      <Doodle name="smiley" style={{ top: '46vh', right: '30vw', '--s': '70px', '--r': '-10deg' }} />
      <Doodle name="arrow" style={{ top: '40vh', left: '44vw', '--s': '90px', '--r': '20deg' }} />
      <HeroReel />
    </section>
  );
}
