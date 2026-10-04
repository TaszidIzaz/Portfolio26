'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/SmoothScroll';
import { useTheme } from '@/components/providers/ThemeProvider';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { narration } from '@/content/narration';
import { navigation } from '@/content/navigation';
import { site } from '@/content/site';
import { THEMES } from '@/content/themes';
import { NARRATE_EVENT } from '@/lib/events';
import { gsap } from '@/lib/gsap';
import { scramble } from '@/lib/scramble';
import styles from './Dock.module.css';

const swatch = (bg: string, accent: string) => ({ background: `linear-gradient(135deg, ${bg} 50%, ${accent} 50%)` });

/**
 * Bottom dock: a narrator that comments on whichever section is on screen,
 * and the site menu that expands upward from it.
 */
export function Dock() {
  const [open, setOpen] = useState(false);
  const dock = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const narr = useRef<HTMLParagraphElement>(null);
  const toggleLabel = useRef<HTMLSpanElement>(null);
  const current = useRef<string>(narration.hero);
  const lenis = useLenis();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  /* ---- Narrator ---- */
  const say = useCallback((text: string) => {
    const box = narr.current;
    if (!box || !text || text === current.current) return;
    current.current = text;
    const old = box.querySelector<HTMLElement>('span[data-on]');
    const next = document.createElement('span');
    next.dataset.on = '';
    next.textContent = text;
    box.appendChild(next);
    if (old) {
      delete old.dataset.on;
      gsap.to(old, { yPercent: -120, opacity: 0, duration: 0.45, ease: 'power3.in', onComplete: () => old.remove() });
    }
    gsap.fromTo(next, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: old ? 0.12 : 0 });
  }, []);

  useEffect(() => {
    // The narrated section most recently scrolled past the 55% line wins, so un-narrated
    // stretches keep the last line. Pinned sections use their pin-spacer (includes pin duration).
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.55;
      const all = [...document.querySelectorAll<HTMLElement>('[data-narrate]')];
      let current: HTMLElement | undefined = all[0];
      for (const el of all) {
        const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
        if (box.getBoundingClientRect().top <= line) current = el;
      }
      const text = current && narration[current.dataset.narrate as keyof typeof narration];
      if (text) say(text);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    const onNarrate = (e: Event) => say((e as CustomEvent<string>).detail);
    const settle = setTimeout(check, 120); // new page: pick up its first section
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(NARRATE_EVENT, onNarrate);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(NARRATE_EVENT, onNarrate);
    };
  }, [say, pathname]);

  /* ---- Menu ---- */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open && !wasOpen.current) return; // nothing to undo (and don't fight the loader's scroll lock)
    wasOpen.current = open;
    const p = panel.current!;
    if (toggleLabel.current) scramble(toggleLabel.current, open ? 'Close' : 'Menu', 10);
    if (open) {
      gsap.to(p, { height: 'auto', duration: 0.75, ease: 'expo.out' });
      gsap.fromTo(p.querySelectorAll('[data-item]'), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.045, delay: 0.08 });
      lenis?.stop();
    } else {
      gsap.to(p, { height: 0, duration: 0.55, ease: 'expo.inOut' });
      lenis?.start();
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const click = (e: MouseEvent) => !dock.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener('keydown', key);
    document.addEventListener('click', click);
    return () => {
      window.removeEventListener('keydown', key);
      document.removeEventListener('click', click);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav ref={dock} className={`${styles.dock} ${open ? styles.open : ''}`} aria-label="Main" data-dock>
      <div ref={panel} className={styles.panel} id="dock-panel" data-lenis-prevent>
        <div className={styles.panelIn}>
          <div className={styles.top} data-item>
            <p><b>{site.name}</b><span>{site.role}, {site.city}</span></p>
            <a className={styles.talk} href={site.bookCall} target="_blank" rel="noopener">Let’s talk</a>
          </div>

          {navigation.map((item, i) => (
            <TransitionLink key={item.label} href={item.href} className={styles.row} onNavigate={close}>
              <span className={styles.n} data-item>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.thumb} data-item>
                <Image src={item.thumb} alt="" fill sizes="56px" />
              </span>
              <span className={styles.label} data-item>{item.label}</span>
              <span className={styles.chips} data-item>{item.chips.map((c) => <i key={c}>{c}</i>)}</span>
            </TransitionLink>
          ))}

          <div className={styles.bottom} data-item>
            <p className={styles.soc}>
              {site.socials.filter((s) => s.label !== 'X / Twitter').map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener">{s.label}</a>
              ))}
            </p>
            <div className={styles.modes} role="group" aria-label="Mode">
              {THEMES.map((t) => (
                <button key={t.id} style={swatch(t.bg, t.accent)} aria-label={`${t.name} mode`} aria-pressed={theme === t.id} onClick={() => setTheme(t.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bar}>
        <TransitionLink href="#top" className={styles.logo} aria-label="Back to top">{site.initials}</TransitionLink>
        <p ref={narr} className={styles.narr} aria-live="polite"><span data-on="">{narration.hero}</span></p>
        <button
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="dock-panel"
          onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        >
          <span ref={toggleLabel}>Menu</span>
          <i className={styles.plus} />
        </button>
      </div>
    </nav>
  );
}
