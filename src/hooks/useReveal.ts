'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Fades/slides in every [data-reveal] inside `scope` as it enters the viewport. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    },
    { scope },
  );
}
