'use client';

import { useCallback, useRef, useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Clock } from '@/components/ui/Clock';
import { Doodle } from '@/components/ui/Collage';
import { Cut, IconStrip } from '@/components/ui/Folk';
import { BlurWords } from '@/components/ui/Swiss';
import { HalftoneField } from '@/components/ui/HalftoneField';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { SectionHead } from '@/components/ui/SectionHead';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { site } from '@/content/site';
import { narrate, toggleGrid } from '@/lib/events';
import { col } from '@/lib/grid';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Contact.module.css';

/** Swiss mode: blurred words behind the contact title */
const CONTACT_WORDS = ['New product', 'Redesign', 'MVP in a week', 'Design sprint', 'AI prototype', 'Say hello'];

const COPY_IDLE = 'Click to copy. Paste somewhere nice.';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copyLine, setCopyLine] = useState(COPY_IDLE);
  const { nextTheme } = useTheme();
  const [stirring, setStirring] = useState(false);
  const onHoverChange = useCallback((h: boolean) => setStirring(h), []);

  useGSAP(
    () => {
      gsap.from(`.${styles.mail}`, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: `.${styles.row}`, start: 'top 85%' } });
    },
    { scope: ref },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyLine('Copied! Now paste it somewhere nice.');
      narrate('Email copied. The ball is in your inbox.');
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
    setTimeout(() => setCopyLine(COPY_IDLE), 3200);
  };

  return (
    <footer ref={ref} className={styles.contact} id="contact" data-narrate="contact">
      <SectionHead index="07" title="Contact" note={site.availability.booking} />
      <Doodle name="scribble" style={{ top: '9%', right: '10vw', '--s': '120px' }} />
      <Doodle name="star" style={{ top: '30%', right: '30vw', '--s': '64px', '--r': '-14deg' }} />
      <Cut name="hen" style={{ top: '8%', right: '8vw', '--s': '140px', '--c': 'var(--ink-2)' }} />
      <Cut name="bokchoy" style={{ top: '30%', right: '30vw', '--s': '84px', '--r': '-8deg', '--c': 'var(--accent)' }} />
      <BlurWords words={CONTACT_WORDS} className={styles.words} />
      <div className="grid">
        <SplitHeading text="Got an idea? *Let’s build it, faster.*" className={styles.title} />
      </div>

      <div className={`grid ${styles.row}`}>
        <div className={styles.cta} style={col('1/5', '1/-1')}>
          <Button href={site.bookCall} arrow>Book a 30-min call</Button>
          <p className="label muted">No prep needed. Bring your napkin sketch.</p>
        </div>
        <div style={col('6/13', '1/-1')}>
          <button className={styles.mail} onClick={copy} data-cursor="Click to copy">{site.email}</button>
          <p className="label muted" aria-live="polite">{copyLine}</p>
        </div>
      </div>

      <div className={`grid ${styles.cols}`}>
        <div style={col('1/4', '1/3')}>
          <p className="label muted">Socials</p>
          <ul>{site.socials.map((s) => <li key={s.label}><a className="ul" href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>
        </div>
        <div style={col('4/7', '3/5')}>
          <p className="label muted">Elsewhere</p>
          <ul>
            <li><a className="ul" href={site.resume} target="_blank" rel="noopener">Résumé ↗</a></li>
            <li><a className="ul" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a className="ul" href={site.employer.url} target="_blank" rel="noopener">{site.employer.name}</a></li>
          </ul>
        </div>
        <div style={col('7/10', '1/-1')}>
          <p className="label muted">Extras</p>
          <ul>
            <li><button className="ul" onClick={toggleGrid}>Show the grid [G]</button></li>
            <li><button className="ul" onClick={nextTheme}>Change mode</button></li>
          </ul>
        </div>
      </div>

      <IconStrip />
      <div className={`grid ${styles.base}`}>
        <p className="label" style={col('1/5', '1/-1')}>
          {site.city}, {site.country} <Clock /><br /><span className="muted">{site.utcLabel}</span>
        </p>
        <p className="label" style={col('5/9', '1/-1')}>
          <TransitionLink href="#top" className="ul">Back to top ↑</TransitionLink><br />
          <span className="muted">{site.availability.booking}</span>
        </p>
        <p className="label right hide-m" style={col('9/13')}>© 2026 {site.name}</p>
      </div>

      {/* Interactive halftone band — hover (or drag on touch) to stir it */}
      <div className={styles.field} data-cursor="Stir it">
        <HalftoneField className={styles.canvas} onHoverChange={onHoverChange} />
        <div className={`grid ${styles.fieldText}`}>
          <p className="t-l" style={col('1/7', '1/-1')}>{site.name}</p>
          <p className="t-s right hide-m" style={col('9/13')}>Designed in {site.city}, shipped everywhere.</p>
        </div>
        <p className={`label ${styles.hint}`} aria-hidden>{stirring ? 'There you go. Keep stirring.' : 'Hover to stir the dots'}</p>
      </div>
    </footer>
  );
}
