'use client';

import Image from 'next/image';
import { useRef, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Tape } from '@/components/ui/Collage';
import { aboutPage, journey } from '@/content/about';
import { site } from '@/content/site';
import type { Img } from '@/content/types';
import { rich } from '@/lib/rich';
import { col } from '@/lib/grid';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import styles from './AboutJourney.module.css';

/**
 * About page, told as a journey (after the "who am I?" storytelling references):
 *  <JourneyHero>  a cinematic image with hand-labelled tags, polaroids of the work and a short intro
 *  <Journey>      one line that winds down the page through stops and cards, drawing itself as you scroll
 *  <Favourites>   what I love, as plain lists beside a small photo grid
 */

const TAG_SPOTS: CSSProperties[] = [
  { left: '12%', top: '30%' },
  { right: '20%', top: '16%' },
  { right: '10%', top: '64%' },
  { left: '24%', top: '72%' },
];

function Polaroid({ img, className = '', sizes = '20vw', tilt = 0, tape = true }: { img: Img; className?: string; sizes?: string; tilt?: number; tape?: boolean }) {
  return (
    <figure className={`${styles.polaroid} ${className}`} style={{ rotate: `${tilt}deg` }}>
      <div className={`${styles.polaroidImg} print`}><Image src={img.src} alt={img.alt} fill sizes={sizes} /></div>
      {tape && <Tape style={{ top: '-12px', left: '30%', '--w': '72px', '--r': `${-tilt * 2}deg` }} />}
    </figure>
  );
}

export function JourneyHero() {
  const h = journey.hero;
  return (
    <header id="top" className={styles.hero} data-narrate="aboutPage">
      <div className={`${styles.heroImg} print`}>
        <Image src={(aboutPage.portrait ?? h.image).src} alt={(aboutPage.portrait ?? h.image).alt} fill priority sizes="100vw" />
        {h.tags.map((t, i) => (
          <span key={t} className={`label ${styles.tag}`} data-side={i % 2 ? 'right' : 'left'} style={TAG_SPOTS[i % TAG_SPOTS.length]}>{t}</span>
        ))}
      </div>
      <div className={`grid ${styles.heroRow}`}>
        <div className={styles.polaroids} style={col('1/5', '1/-1')}>
          {h.polaroids.map((p, i) => <Polaroid key={p.src} img={p} tilt={i ? 5 : -6} sizes="(max-width: 767px) 40vw, 14vw" className={i ? styles.polaroidB : styles.polaroidA} />)}
        </div>
        <div className={styles.nameBlock} style={col('9/13', '2/-1')}>
          <h1 className={`label ${styles.name}`}><span className={styles.mark} aria-hidden>✦</span>{h.name}</h1>
          <p className="t-s">{h.intro.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
          <Button href={site.bookCall} variant="ghost" arrow>Book a call</Button>
        </div>
      </div>
    </header>
  );
}

function Stop({ stop, image }: { stop: { num: string; label: string; lines: string[] }; image?: Img }) {
  return (
    <div className={styles.stop} style={col('5/9', '1/-1')}>
      <p className={`label ${styles.stopNum}`} data-anchor>{stop.num}</p>
      {image && <figure className={`${styles.stopImg} print`}><Image src={image.src} alt={image.alt} fill sizes="12vw" /></figure>}
      <p className={`label ${styles.stopLabel}`}><span aria-hidden>«</span>{stop.label}<span aria-hidden>»</span></p>
      <p className={`t-s ${styles.stopLines}`}>
        {stop.lines.map((l) => <span key={l} className={l.startsWith('—') ? styles.dash : undefined}>{l}</span>)}
      </p>
    </div>
  );
}

const WHO_COLS = [['7/12', '2/-1'], ['2/7', '1/4'], ['7/13', '2/-1']];
const TEACHER_COLS = [['1/6', '1/-1'], ['7/12', '1/-1'], ['2/7', '1/-1'], ['7/13', '1/-1']];

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const dots = useRef<SVGGElement>(null);
  const scribble = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const section = ref.current!;
      const s = svg.current!;
      const path = line.current!;
      let length = 1;

      // One winding line through every anchor, from the top of the section down.
      const build = () => {
        const box = section.getBoundingClientRect();
        const pts = gsap.utils.toArray<HTMLElement>('[data-anchor]', section).map((el) => {
          const r = el.getBoundingClientRect();
          return [r.left - box.left + r.width / 2, r.top - box.top + 6];
        });
        if (!pts.length) return;
        s.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
        let d = `M${pts[0][0]} 0`;
        let [px, py] = [pts[0][0], 0];
        for (const [x, y] of pts) {
          const my = (py + y) / 2;
          d += ` C${px} ${my} ${x} ${my} ${x} ${y}`;
          [px, py] = [x, y];
        }
        path.setAttribute('d', d);
        length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        if (dots.current) dots.current.innerHTML = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" />`).join('');
      };
      build();
      ScrollTrigger.addEventListener('refreshInit', build);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        path.style.strokeDashoffset = '0';
      } else {
        gsap.fromTo(path, { strokeDashoffset: () => length }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 75%', scrub: 0.6, invalidateOnRefresh: true },
        });
        const sc = scribble.current;
        if (sc) {
          const len = sc.getTotalLength();
          gsap.fromTo(sc, { strokeDasharray: len, strokeDashoffset: len }, {
            strokeDashoffset: 0, ease: 'none',
            scrollTrigger: { trigger: sc, start: 'top 80%', end: 'bottom 40%', scrub: 0.6 },
          });
        }
        gsap.utils.toArray<HTMLElement>('[data-pop]', section).forEach((el) =>
          gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } }),
        );
      }
      return () => ScrollTrigger.removeEventListener('refreshInit', build);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={styles.journey} data-narrate="journey" aria-label="Who I am and who taught me">
      <svg ref={svg} className={styles.lineSvg} aria-hidden preserveAspectRatio="none">
        <path ref={line} className={styles.line} />
        <g ref={dots} className={styles.dots} />
      </svg>

      <div className={`grid ${styles.items}`}>
        <Stop stop={journey.stops.who} image={journey.stops.who.image} />

        {journey.who.map((c, i) => (
          <article key={c.n} className={styles.card} style={col(WHO_COLS[i][0], WHO_COLS[i][1])} data-pop>
            <span className={styles.anchor} data-anchor />
            <p className={`label ${styles.cardLabel}`}><span>{journey.stops.who.label}</span><span>{c.n}</span></p>
            <div className={styles.thumbs}>
              {c.images.map((img) => <figure key={img.src} className={`${styles.thumb} print`}><Image src={img.src} alt={img.alt} fill sizes="12vw" /></figure>)}
            </div>
            <p className={`t-s ${styles.cardText}`}>{c.text}</p>
          </article>
        ))}

        <Stop stop={journey.stops.teachers} />

        {journey.teachers.map((t, i) => (
          <article key={t.name} className={`${styles.card} ${styles.teacher} ${i % 2 ? styles.right : styles.left}`} style={col(TEACHER_COLS[i][0], TEACHER_COLS[i][1])} data-pop>
            <span className={styles.anchor} data-anchor />
            <Polaroid img={t.image} tilt={i % 2 ? 4 : -5} sizes="(max-width: 767px) 50vw, 16vw" className={styles.teacherPhoto} />
            {t.extra && <Polaroid img={t.extra} tilt={-9} sizes="10vw" tape={false} className={styles.teacherExtra} />}
            <p className={`label ${styles.cardLabel}`}><span>{t.medium}</span><span>{t.name}</span></p>
            <h3 className={`t-m ${styles.lesson}`}>{t.lesson}</h3>
            <p className={`t-s ${styles.cardText}`}>{t.text}</p>
            <p className={`label muted ${styles.works}`}>{t.works}</p>
          </article>
        ))}

        <Stop stop={journey.stops.gives} />
      </div>

      {/* A loose hand-drawn scribble across the cards, drawn as you scroll */}
      <svg className={styles.scribble} viewBox="0 0 300 260" aria-hidden>
        <path ref={scribble} d="M18 214 C30 120 58 34 92 30 C124 26 104 118 82 150 C64 176 60 120 96 96 C132 72 168 40 178 70 C188 102 150 160 132 196 C118 224 150 222 170 186 C192 148 212 96 236 92 C262 88 250 150 238 182 C230 204 252 214 284 170" />
      </svg>
    </section>
  );
}

export function Favourites() {
  const f = journey.favourites;
  const photos = journey.teachers.map((t) => t.image);
  return (
    <section className={`grid ${styles.fav}`} data-narrate="favourites">
      <p className={`label ${styles.favLabel}`} style={col('1/3', '1/-1')}>04.<br />{f.label}</p>
      <h2 className={`t-l ${styles.favTitle}`} style={col('3/12', '1/-1')}>{rich(f.title)}</h2>
      <dl className={styles.favLists} style={col('3/7', '1/-1')}>
        {f.groups.map((g) => (
          <div key={g.group}>
            <dt className="label">{g.group}</dt>
            <dd className="t-s">{g.items.map((it) => <span key={it}>{it}</span>)}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.favPhotos} style={col('8/13', '1/-1')}>
        {photos.map((p, i) => (
          <figure key={p.src} className={`${styles.favPhoto} print`} style={{ marginTop: i % 2 ? '18%' : 0 }}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 767px) 45vw, 18vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}
