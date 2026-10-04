'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SECTION_TONES, TONE_PICK } from '@/content/themes';

const VARS = ['--bg', '--fg', '--accent', '--on-accent'] as const;

/**
 * Gives each narrated section its own colour (SECTION_TONES): when a section reaches mid-screen,
 * its tone is set on <html> and CSS fades to it (registered @property).
 * In Swiss mode the sections paint their own colour (SwissStack); this keeps the top bar and dock in step.
 */
export function ToneManager() {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const clear = () => { VARS.forEach((v) => html.style.removeProperty(v)); delete html.dataset.tone; };
    const tones = SECTION_TONES[theme];
    if (!tones) { clear(); return; }
    const pick = TONE_PICK[theme] ?? ((_: string, i: number) => i);

    let raf = 0;
    let current = '';
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.5;
      const sections = [...document.querySelectorAll<HTMLElement>('[data-narrate]')];
      let idx = 0;
      sections.forEach((el, i) => {
        const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
        if (box.getBoundingClientRect().top <= line) idx = i;
      });
      const el = sections[idx];
      if (!el) return;
      const t = tones[pick(el.dataset.narrate ?? '', idx) % tones.length];
      if (t.id + idx === current) return;
      current = t.id + idx;
      html.style.setProperty('--bg', t.bg);
      html.style.setProperty('--fg', t.fg);
      html.style.setProperty('--accent', t.accent);
      html.style.setProperty('--on-accent', t.onAccent);
      html.dataset.tone = t.id;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const settle = setTimeout(check, 150);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      clear();
    };
  }, [theme, pathname]);

  return null;
}
