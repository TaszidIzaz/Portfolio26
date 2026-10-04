'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/SmoothScroll';
import { loader } from '@/content/loader';
import { site } from '@/content/site';
import { markIntroDone } from '@/lib/events';
import { col } from '@/lib/grid';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './Loader.module.css';

/**
 * Intro — exactly `loader.duration` seconds from first paint, on every full page load.
 *  1. The title rises in the centre.
 *  2. Snapshots appear on top of it (same height, natural width) and flip through every project.
 *  3. Hand-over with the page-transition motion: the loader shrinks and tilts away
 *     while the page slides in from the right, above it, and settles.
 * Client-side navigation never shows it again (it lives in the root layout).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const active = useRef(true);

  useEffect(() => {
    lenisRef.current = lenis;
    if (active.current) lenis?.stop();
  }, [lenis]);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const el = root.current!;
    const main = document.getElementById('main');
    const html = document.documentElement;
    let cancelled = false;

    const cleanupPage = () => {
      html.classList.remove('is-intro');
      if (main) gsap.set(main, { clearProps: 'transform,transformOrigin,visibility' });
    };
    const finish = () => {
      if (cancelled) return;
      active.current = false;
      cleanupPage();
      lenisRef.current?.start();
      markIntroDone();
      setDone(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    if (prefersReducedMotion()) { finish(); return; }

    const ctx = gsap.context(() => {
      const count = el.querySelector<HTMLElement>('[data-count]')!;
      const msg = el.querySelector<HTMLElement>('[data-msg]')!;
      const slides = gsap.utils.toArray<HTMLElement>('[data-slide]');
      const lines = gsap.utils.toArray<HTMLElement>('[data-line] > span');
      // 3s measured from first paint, not from when JS woke up.
      const D = Math.max(1.8, loader.duration - performance.now() / 1000);

      let current = -1;
      const show = (i: number) => {
        if (current > -1) slides[current].removeAttribute('data-active');
        slides[i].setAttribute('data-active', '');
        current = i;
      };

      /* ---- 3. Hand-over ---- */
      const exit = () => {
        if (cancelled) return;
        ctx.add(() => {
          html.classList.add('is-intro'); // page above loader, clipped to one screen
          gsap.set(el, { zIndex: 0, transformOrigin: '50% 100%' });
          if (main) gsap.set(main, { xPercent: 100, rotate: 5, scale: 0.85, transformOrigin: '50% 100%', force3D: true });
          gsap
            .timeline({ defaults: { ease: 'page', force3D: true }, onComplete: finish })
            .to(el, { scale: 0.8, autoAlpha: 0.8, duration: 0.6 }, 0)
            .to(el, { xPercent: -50, rotate: -5, duration: 0.8 }, 0.1)
            .to(main, { xPercent: 0, rotate: 0, scale: 1, duration: 0.8 }, 0.1)
            .add(() => markIntroDone(), 0.45); // hero content rises as the page lands
        });
      };

      /* ---- 1 + 2. Loading, all on one clock ---- */
      const tl = gsap.timeline();
      tl.set(lines, { visibility: 'visible' }, 0)
        .fromTo(lines, { y: 0, yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.09 }, 0.05)
        .to('[data-ui] > *', { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05 }, 0.15);

      // Snapshots arrive after the title, then every project shows once, evenly spaced.
      const first = 0.85;
      const order = gsap.utils.shuffle(slides.map((_, i) => i));
      tl.call(show, [order[0]], first)
        .to('[data-stage]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' }, first);
      const step = (D - first - 0.1) / order.length;
      order.slice(1).forEach((idx, k) => tl.call(show, [idx], first + (k + 1) * step));

      const counter = { v: 0 };
      tl.to(counter, {
        v: 100, duration: D, ease: 'power1.inOut',
        onUpdate: () => {
          count.textContent = String(Math.round(counter.v));
          const m = loader.messages[Math.min(loader.messages.length - 1, Math.floor((counter.v / 100) * loader.messages.length))];
          if (msg.textContent !== m) msg.textContent = m;
        },
      }, 0);

      tl.call(() => { document.fonts.ready.then(exit); }, [], D);
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
      cleanupPage();
    };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className={styles.loader} aria-hidden>
      <div className={styles.center}>
        <p className={styles.title}>
          {loader.title.map((line) => (
            <span key={line} className={styles.line} data-line><span>{line}</span></span>
          ))}
        </p>
        <div className={styles.stage} data-stage>
          {loader.images.map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              width={img.w}
              height={img.h}
              alt=""
              sizes="(max-width: 767px) 60vw, 40vw"
              className={styles.slide}
              priority={i < 3}
              loading={i < 3 ? undefined : 'eager'}
              data-slide
            />
          ))}
        </div>
      </div>

      <div className={`grid ${styles.ui}`} data-ui>
        <p className="label" style={col('1/4', '1/3')}>{site.name} ©2026</p>
        <p className={`label ${styles.msg}`} style={col('7/13', '3/5')} data-msg>{loader.messages[0]}</p>
        <p className={styles.count} style={col('1/7', '1/3')}><span data-count>0</span></p>
        <p className={`label ${styles.status}`} style={col('7/13', '3/5')}>{site.city}, {site.country} — Loading</p>
      </div>
    </div>
  );
}
