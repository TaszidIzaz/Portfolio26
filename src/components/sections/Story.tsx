'use client';

import { useRef, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Doodle, Stamp, Tape } from '@/components/ui/Collage';
import { Cut } from '@/components/ui/Folk';
import { Sticker } from '@/components/ui/Swiss';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { story } from '@/content/home';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Story.module.css';
import { StoryTile } from './StoryTile';

const pad = (n: number) => String(n).padStart(2, '0');
const DAYS = [1, 2, 3, 4, 5, 6, 7];
const dayLabel = (d: number[]) => (d.length > 1 ? `Days ${d[0]}–${d[d.length - 1]}` : `Day ${d[0]}`);

/**
 * Second homepage section: the design process, told sideways (after catalyst.app).
 * Seven days, six steps. The section pins and the track scrolls horizontally; inner pieces animate
 * against that horizontal movement (GSAP containerAnimation): drifting words, illustration tiles
 * wiping in, the moodboard tiles fanning out, drafts getting a "Nope." and dropping into the bin,
 * and the polish log.
 * Every step carries stickers for each mode (Swiss sticker, Brutalist stamp + doodle, Almanac woodcut).
 */
export function Story() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = ref.current!;
      const tr = track.current!;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, section);
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
        const panels = q('[data-step]');
        const marks = q('[data-mark]');
        let current = -2;
        const setStep = (i: number) => {
          if (i === current) return;
          current = i;
          const s = story.steps[i];
          if (status.current) status.current.textContent = s ? `${pad(i + 1)} / ${pad(story.steps.length)} — ${s.word}` : `00 / ${pad(story.steps.length)} — Start`;
          marks.forEach((m) => m.toggleAttribute('data-on', !!s && s.days.includes(Number(m.dataset.mark))));
        };
        setStep(-1);

        const scroll = gsap.to(tr, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top', end: () => `+=${dist()}`,
            pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
              const x = self.progress * dist() + window.innerWidth * 0.5;
              let idx = -1;
              panels.forEach((p, i) => { if (p.offsetLeft <= x) idx = i; });
              setStep(idx);
            },
          },
        });
        const along = (trigger: Element, start: string, end: string) => ({ trigger, containerAnimation: scroll, start, end, scrub: true });

        // Big spaced words drift against the scroll
        q('[data-word]').forEach((w) => gsap.fromTo(w, { xPercent: 25 }, { xPercent: -25, ease: 'none', scrollTrigger: along(w, 'left right', 'right left') }));
        // Illustration tiles wipe open as they arrive
        q('[data-wipe]').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: along(el, 'left 95%', 'left 50%') }));
        // Stickers pop on as their panel arrives
        q('[data-sticker]').forEach((el) => gsap.from(el, { scale: 0.4, opacity: 0, ease: 'back.out(2)', scrollTrigger: along(el, 'left 92%', 'left 70%') }));

        // 03 Moodboard: a messy pile of references fans out
        const fan = section.querySelector('[data-fan]');
        if (fan) {
          const cards = gsap.utils.toArray<HTMLElement>('[data-card]', fan);
          const mid = (cards.length - 1) / 2;
          gsap.set(cards, { transformOrigin: '50% 280%', rotation: () => gsap.utils.random(-6, 6), x: () => gsap.utils.random(-16, 16) });
          gsap.to(cards, { rotation: (i) => (i - mid) * 12, x: 0, y: (i) => Math.abs(i - mid) * 7, ease: 'power2.inOut', scrollTrigger: along(fan, 'left 90%', 'center 55%') });
        }

        // 04 Iterate: each draft gets a "Nope." and drops into the bin, until one is left
        const bin = section.querySelector('[data-bin]');
        const count = section.querySelector('[data-count]');
        if (bin) {
          const cards = gsap.utils.toArray<HTMLElement>('[data-card]', bin);
          gsap.set(cards, { rotation: (i) => (i ? gsap.utils.random(-7, 7) : 0) });
          gsap.set(bin.querySelectorAll('[data-nope]'), { scale: 0.6 });
          const tl = gsap.timeline({
            scrollTrigger: {
              ...along(bin, 'left 80%', 'right 45%'),
              onUpdate: (self) => { if (count) count.textContent = String(Math.round(50 - 49 * self.progress)); },
            },
          });
          cards.slice(1).reverse().forEach((c, i) => {
            const t = i * 0.6;
            tl.to(c.querySelector('[data-nope]'), { opacity: 1, scale: 1, duration: 0.15 }, t)
              .to(c, { yPercent: 160, x: gsap.utils.random(-90, 90), rotation: gsap.utils.random(-50, 50), opacity: 0, ease: 'power2.in', duration: 1 }, t + 0.2);
          });
          tl.to(cards[0], { scale: 1.08, duration: 0.6, ease: 'power2.out' });
        }

        // 05 Polish: the log fills in, line by line
        const log = section.querySelector('[data-log]');
        if (log) gsap.from(log.querySelectorAll('li'), { opacity: 0, y: 14, stagger: 0.5, ease: 'power2.out', scrollTrigger: along(log, 'left 95%', 'left 35%') });
      });
    },
    { scope: ref },
  );

  const card = (tile: ReactNode, i: number, nope = false) => (
    <div key={i} className={styles.card} data-card>
      {tile}
      {nope && i > 0 && <span className={`t-m ${styles.nope}`} data-nope aria-hidden>Nope.</span>}
    </div>
  );

  return (
    <section ref={ref} className={styles.story} data-narrate="deck" aria-label="How I work, from idea to product">
      <div ref={track} className={styles.track}>
        <div className={`${styles.panel} ${styles.intro}`}>
          <p className="label muted">{story.label}</p>
          <h2 className={`hl ${styles.title}`}>{story.title}<br /><em>{story.titleEm}</em></h2>
          <p className={`t-m regular ${styles.lede}`}>{story.lede}</p>
          <p className={`label ${styles.hint}`}>{story.hint} <span className={styles.arrow} aria-hidden>→</span></p>
          <Sticker text="You bring the idea →" style={{ bottom: '26%', right: '8%', '--r': '-6deg' }} />
          <Cut name="chanterelle" style={{ bottom: '22%', right: '8%', '--s': '120px', '--c': 'var(--accent)' }} />
          <Doodle name="arrow" style={{ bottom: '24%', right: '8%', '--s': '110px', '--r': '-8deg' }} />
        </div>

        {story.steps.map((s, i) => {
          return (
            <article key={s.word} className={`${styles.panel} ${styles.step} ${i % 2 ? styles.alt : ''}`} data-step>
              <p className={styles.word} data-word aria-hidden>{s.word}</p>
              <div className={styles.copy}>
                <p className={`label ${styles.meta}`}><span>Step {pad(i + 1)} · {dayLabel(s.days)}</span><span className="muted">{s.kicker}</span></p>
                <h3 className={`t-m ${styles.stepTitle}`}>{s.title}</h3>
                <p className={`t-s ${styles.text}`}>{s.text}</p>
                <blockquote className={`t-s ${styles.quote}`}>{s.quote}</blockquote>
                {s.cta && (
                  <div className={styles.ctas}>
                    <Button href={s.cta.href} arrow>{s.cta.label}</Button>
                    <TransitionLink href="/work" className="label ul">See shipped work →</TransitionLink>
                  </div>
                )}
              </div>

              <div className={styles.visual}>
                {s.picto && (
                  <div className={styles.photo} data-wipe>
                    <StoryTile picto={s.picto} tone={s.tone} num={pad(i + 1)} />
                    <Tape style={{ top: '-10px', left: '12%', '--r': i % 2 ? '5deg' : '-6deg' }} />
                  </div>
                )}
                {s.visual === 'fan' && (
                  <div className={styles.pile} data-fan>
                    {story.moodboard.map((p, k) => card(<StoryTile picto={p} tone={s.tone + k} num={`0${i + 1}.${k + 1}`} />, k))}
                  </div>
                )}
                {s.visual === 'bin' && (
                  <div className={styles.binWrap}>
                    <div className={styles.pile} data-bin>
                      {Array.from({ length: story.drafts }, (_, k) => card(<StoryTile picto={{ layout: k }} tone={s.tone + k} num={`v${story.drafts - k}`} />, k, true))}
                    </div>
                    <p className={styles.count}><span className="t-l" data-count>50</span><span className="label muted">drafts left</span></p>
                  </div>
                )}
                {s.log && (
                  <ul className={`label ${styles.log}`} data-log>
                    <li className={styles.logHead}><span>Polish log</span><span>Day 6</span></li>
                    {s.log.map(([t, what]) => <li key={t}><span className={styles.logTime}>{t}</span><span>{what}</span></li>)}
                  </ul>
                )}

                {/* Stickers, one set per mode (each only shows in its own mode) */}
                <span className={styles.stickers} data-sticker>
                  <Sticker text={s.stickers.swiss} style={{ top: '-18px', right: '-12px', '--r': i % 2 ? '4deg' : '-5deg' }} />
                  <Stamp text={s.stickers.brutalist.stamp} style={{ top: '-46px', right: '-34px', '--r': i % 2 ? '10deg' : '-12deg' }} />
                  <Cut name={s.stickers.folk} style={{ top: '-54px', right: '-40px', '--s': '108px', '--r': i % 2 ? '8deg' : '-8deg', '--c': i % 2 ? 'var(--ink-2)' : 'var(--accent)' }} />
                </span>
                <Doodle name={s.stickers.brutalist.doodle} style={{ bottom: '-34px', left: '-38px', '--s': '76px', '--r': i % 2 ? '-12deg' : '10deg' }} />
              </div>
            </article>
          );
        })}
      </div>

      <div className={`grid ${styles.hud}`} aria-hidden>
        <span ref={status} className={`label ${styles.status}`}>00 / {pad(story.steps.length)} — Start</span>
        <ol className={`label ${styles.days}`}>{DAYS.map((d) => <li key={d} data-mark={d}>Day {d}</li>)}</ol>
        <span className={styles.progress}><span ref={bar} /></span>
      </div>
    </section>
  );
}
