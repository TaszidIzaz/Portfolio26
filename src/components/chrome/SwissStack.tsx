'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SWISS_DARK_SECTIONS } from '@/content/themes';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Swiss mode only:
 *  - Each top-level section in <main> gets its own colour (paper, or black for SWISS_DARK_SECTIONS).
 *  - The second section slides up over the first, which lags at half speed and dims (parallax overlap).
 *    Every other section scrolls normally.
 *  - The footer sits underneath: the content above lifts away while the footer barely moves (sticky reveal).
 * Positions are measured from layout (offsetTop), so the transforms don't feed back into the triggers.
 */
export function SwissStack() {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (theme !== 'swiss') return;
    const main = document.getElementById('main');
    if (!main) return;
    let ctx: gsap.Context | undefined;
    let stack = () => {};
    const sheets = () => [...main.children].filter((el): el is HTMLElement => el instanceof HTMLElement && el.tagName !== 'SCRIPT');

    const setup = () => {
      const kids = sheets().filter((el) => el.offsetHeight > 0);
      const last = kids[kids.length - 1];
      const footer = last?.tagName === 'FOOTER' ? last : undefined;
      let prev = 'paper';
      kids.forEach((el) => {
        const narrated = el.matches('[data-narrate]') ? el : el.querySelector<HTMLElement>('[data-narrate]');
        const tone = narrated ? (SWISS_DARK_SECTIONS.includes(narrated.dataset.narrate ?? '') ? 'ink' : 'paper') : prev;
        prev = tone;
        el.dataset.swissTone = tone;
      });
      // Later sheets sit on top; the footer sits underneath everything. Re-applied after every refresh,
      // because ScrollTrigger rewrites the styles of pin-spacers (pinned sections) when it recalculates.
      stack = () => kids.forEach((el, i) => { el.style.zIndex = el === footer ? '0' : String(i + 1); });
      stack();
      ScrollTrigger.addEventListener('refresh', stack);
      if (prefersReducedMotion()) return;

      const top = (el: HTMLElement) => main.offsetTop + el.offsetTop;
      const vh = () => window.innerHeight;
      ctx = gsap.context(() => {
        // Only the second section slides over the first (on the homepage: the story over the hero).
        const [first, second] = kids;
        if (first && second && second !== footer) {
          gsap.fromTo(first, { y: 0, '--cover': 0 }, {
            y: () => vh() * 0.5, '--cover': 0.5, ease: 'none',
            scrollTrigger: { start: () => top(second) - vh(), end: () => top(second), scrub: true, invalidateOnRefresh: true },
          });
        }
        if (footer) {
          gsap.fromTo(footer, { y: () => -vh() * 0.7 }, {
            y: 0, ease: 'none',
            scrollTrigger: { start: () => top(footer) - vh(), end: () => top(footer), scrub: true, invalidateOnRefresh: true },
          });
        }
      });
      ScrollTrigger.refresh();
    };

    // Wait a beat so the page's own ScrollTriggers (e.g. the pinned story) exist first.
    const id = setTimeout(setup, 80);
    return () => {
      clearTimeout(id);
      ctx?.revert();
      ScrollTrigger.removeEventListener('refresh', stack);
      sheets().forEach((el) => { delete el.dataset.swissTone; el.style.zIndex = ''; el.style.removeProperty('--cover'); });
      ScrollTrigger.refresh();
    };
  }, [theme, pathname]);

  return null;
}
