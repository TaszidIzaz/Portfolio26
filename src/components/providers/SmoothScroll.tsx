'use client';

import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

const LenisContext = createContext<Lenis | null>(null);

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ lerp: 0.085, smoothWheel: true });
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

/** Smooth-scroll to a selector or pixel offset (falls back to native when Lenis is off). */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (target: string | number) => {
      if (lenis) return lenis.scrollTo(target, { duration: 1.6 });
      if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
      else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    },
    [lenis],
  );
}
