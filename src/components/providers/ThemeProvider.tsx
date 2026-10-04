'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY } from '@/content/themes';
import type { ThemeId } from '@/content/types';
import { narrate } from '@/lib/events';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './Curtain.module.css';

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  nextTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/** Inline script for <head>: applies the saved mode before first paint (no flash). */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(${JSON.stringify(THEMES.map((t) => t.id))}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

const currentId = () => (document.documentElement.dataset.theme as ThemeId) ?? DEFAULT_THEME;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  // Sync React state with whatever the init script applied.
  useEffect(() => {
    const id = currentId();
    if (THEMES.some((t) => t.id === id)) setThemeState(id);
  }, []);

  const apply = useCallback((id: ThemeId) => {
    const t = THEMES.find((x) => x.id === id)!;
    document.documentElement.dataset.theme = id;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg);
    try { localStorage.setItem(THEME_STORAGE_KEY, id); } catch { /* private mode */ }
    setThemeState(id);
  }, []);

  const setTheme = useCallback(
    (id: ThemeId) => {
      if (busy.current || id === currentId()) return;
      const t = THEMES.find((x) => x.id === id)!;
      if (prefersReducedMotion() || !curtain.current) return apply(id);

      busy.current = true;
      const cols = [...curtain.current.children].filter((c) => getComputedStyle(c).display !== 'none');
      gsap.set(cols, { backgroundColor: t.accent, color: t.accent, scaleY: 0, transformOrigin: '50% 0%' });
      gsap
        .timeline({ onComplete: () => { busy.current = false; } })
        .to(cols, { scaleY: 1, duration: 0.5, ease: 'expo.in', stagger: 0.025 })
        .add(() => {
          apply(id);
          narrate(`${t.name} mode. ${t.quip}`);
          ScrollTrigger.refresh();
        })
        .set(cols, { transformOrigin: '50% 100%' })
        .to(cols, { scaleY: 0, duration: 0.6, ease: 'expo.out', stagger: 0.025 }, '+=0.05');
    },
    [apply],
  );

  const nextTheme = useCallback(() => {
    const i = THEMES.findIndex((t) => t.id === currentId());
    setTheme(THEMES[(i + 1) % THEMES.length].id);
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, nextTheme }}>
      {children}
      <div ref={curtain} className={styles.curtain} aria-hidden>
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </div>
    </ThemeContext.Provider>
  );
}
