'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useLenis, useScrollTo } from '@/components/providers/SmoothScroll';
import { ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

type Navigate = (href: string, opts?: { delay?: number }) => void;
const NavigateContext = createContext<Navigate>(() => {});

/** Navigate with the page transition (or smooth-scroll when the target is on this page). */
export const useNavigate = () => useContext(NavigateContext);

/**
 * Page transitions via the View Transitions API.
 * The browser snapshots the old page, we swap routes, and CSS in globals.css
 * animates old → new (shrink + tilt away / slide + tilt in).
 * Browsers without support simply navigate.
 */
export function PageTransitions({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const scrollTo = useScrollTo();

  const lenisRef = useRef(lenis);
  const scrollToRef = useRef(scrollTo);
  const resolveRef = useRef<(() => void) | null>(null);
  const transitionRef = useRef<ViewTransition | null>(null);
  const hashRef = useRef<string | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    lenisRef.current = lenis;
    scrollToRef.current = scrollTo;
  }, [lenis, scrollTo]);

  const resetScroll = () => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  };

  // New route has committed: release the transition so the "new" snapshot animates in.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (!resolveRef.current) resetScroll(); // fallback path (no View Transitions)
    ScrollTrigger.refresh();
    resolveRef.current?.();
    resolveRef.current = null;

    const hash = hashRef.current;
    hashRef.current = null;
    if (hash) {
      const done = transitionRef.current?.finished ?? Promise.resolve();
      done.finally(() => setTimeout(() => scrollToRef.current(hash), 60));
    }
  }, [pathname]);

  const navigate = useCallback<Navigate>(
    (href, { delay = 0 } = {}) => {
      const url = new URL(href, window.location.href);
      const target = url.hash && url.hash !== '#top' ? url.hash : 0;

      if (url.pathname === window.location.pathname) {
        setTimeout(() => scrollToRef.current(target), delay);
        return;
      }

      hashRef.current = typeof target === 'string' ? target : null;
      const go = () => router.push(url.pathname + url.search, { scroll: false });

      setTimeout(() => {
        if (!('startViewTransition' in document) || prefersReducedMotion()) return go();
        transitionRef.current = document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              // Old page is already snapshotted here, so reset scroll before the new page mounts.
              resetScroll();
              resolveRef.current = resolve;
              go();
              setTimeout(resolve, 4000); // safety: never hang on a slow route
            }),
        );
      }, delay);
    },
    [router],
  );

  return <NavigateContext.Provider value={navigate}>{children}</NavigateContext.Provider>;
}
