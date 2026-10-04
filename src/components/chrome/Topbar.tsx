'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { ModeLabel } from '@/components/ui/ModeLabel';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { topNav } from '@/content/navigation';
import { site } from '@/content/site';
import { col } from '@/lib/grid';
import styles from './Topbar.module.css';

/** Fixed top bar. Hides when scrolling down, returns when scrolling up. */
export function Topbar() {
  const ref = useRef<HTMLElement>(null);
  const { nextTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current!;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle(styles.scrolled, y > 40);
      el.classList.toggle(styles.hidden, y > last && y > 240);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header ref={ref} className={`grid ${styles.bar}`} data-topbar>
      <TransitionLink href="/" className={`label ${styles.name}`} style={col('1/4', '1/3')}>
        <span>{site.name}</span>
        <span className="muted">{site.role}</span>
      </TransitionLink>
      <nav className={`label ${styles.nav}`} style={col('4/9')} aria-label="Primary">
        {topNav.map((n) => {
          const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
          return (
            <TransitionLink key={n.href} href={n.href} className={`${styles.link} ${active ? styles.active : ''}`} aria-current={active ? 'page' : undefined}>
              {n.label}
            </TransitionLink>
          );
        })}
      </nav>
      <button className={`label ${styles.mode}`} style={col('9/11', '3/5')} onClick={nextTheme} aria-label="Change mode">
        <span className={`muted ${styles.modeWord}`}>Mode</span>
        <ModeLabel className={styles.modeName} />
        <span className={styles.dots} aria-hidden><i /><i /><i /></span>
      </button>
      <p className={`label ${styles.avail}`} style={col('11/13')}>
        <i className="dot" />
        {site.availability.short}
      </p>
    </header>
  );
}
