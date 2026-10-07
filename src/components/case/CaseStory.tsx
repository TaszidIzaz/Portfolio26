'use client';

import Image from 'next/image';
import { useRef, useState, type ReactNode } from 'react';
import { useLenis } from '@/components/providers/SmoothScroll';
import type { GalleryRow, Project } from '@/content/types';
import { col } from '@/lib/grid';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { CaseMedia } from './CaseMedia';
import { CaseNda } from './CaseNda';
import styles from './Case.module.css';

type Section = { id: string; title: string; body: ReactNode; rows: GalleryRow[] };

/** Split the gallery rows across the sections, in order, as evenly as possible. */
function distribute(rows: GalleryRow[], n: number): GalleryRow[][] {
  const out: GalleryRow[][] = [];
  let start = 0;
  for (let i = 0; i < n; i++) {
    const size = Math.ceil((rows.length - start) / (n - i));
    out.push(rows.slice(start, start + size));
    start += size;
  }
  return out;
}

function sectionsOf(p: Project): Section[] {
  const list: Omit<Section, 'rows'>[] = [
    { id: 'overview', title: 'Overview', body: <p>{p.intro}</p> },
    p.overview ? { id: 'the-work', title: 'The work', body: <p>{p.overview}</p> } : null,
    p.testimonial ? {
      id: 'in-their-words', title: 'In their words',
      body: (
        <>
          <p>{p.testimonial.quote}</p>
          <p className={styles.person}>
            <span className={styles.avatar}><Image src={p.testimonial.avatar} alt="" fill sizes="36px" /></span>
            <span><b>{p.testimonial.name}</b><br />{p.testimonial.role}</span>
          </p>
        </>
      ),
    } : null,
    p.stats?.length ? {
      id: 'impact', title: 'Impact',
      body: <dl className={styles.statList}>{p.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}</dl>,
    } : p.palette?.length ? {
      id: 'palette', title: 'Palette',
      body: <ul className={styles.palette}>{p.palette.map((c) => <li key={c}><i style={{ background: c }} />{c}</li>)}</ul>,
    } : null,
    p.outcome ? { id: 'outcome', title: 'Outcome', body: <p>{p.outcome}</p> } : null,
  ].filter(Boolean) as Omit<Section, 'rows'>[];
  const groups = distribute(p.gallery, list.length);
  return list.map((s, i) => ({ ...s, rows: groups[i] }));
}

function Row({ row }: { row: GalleryRow }) {
  const [first] = row.images;
  const n = row.images.length;
  const sizes = n === 1 ? '(max-width: 767px) 100vw, 74vw' : n === 2 ? '(max-width: 767px) 100vw, 37vw' : '(max-width: 767px) 100vw, 25vw';
  return (
    <div className={styles.row} style={{ ['--n' as string]: n }}>
      {row.images.map((im) => (
        <CaseMedia key={im.video ?? im.src} img={im} ratio={n === 1 ? undefined : `${first.w} / ${first.h}`} sizes={sizes} />
      ))}
    </div>
  );
}

/**
 * The story (after afternow.co): section titles stay stuck on the left, and the one you're reading
 * opens to show its text while its images scroll past on the right. On mobile each section's text
 * sits above its own images instead.
 */
export function CaseStory({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const sections = sectionsOf(project);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  useGSAP(
    () => {
      // The section crossing the middle of the screen is the one that's open
      ref.current!.querySelectorAll<HTMLElement>('[data-group]').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 55%', end: 'bottom 55%',
          onToggle: (self) => { if (self.isActive) setActive(i); },
        });
      });
    },
    { scope: ref, dependencies: [project.slug] },
  );

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -120 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={ref} className={`grid ${styles.story}`}>
      <div className={styles.navCol} style={col('1/4', '1/-1')}>
        <nav className={styles.nav} aria-label="Case study sections">
          {sections.map((s, i) => (
            <div key={s.id} className={`${styles.navItem} ${i === active ? styles.navActive : ''}`}>
              <button type="button" className={`t-s ${styles.navTitle}`} onClick={() => go(s.id)} aria-expanded={i === active}>{s.title}</button>
              <div className={styles.navBody}><div className={`t-s ${styles.navText}`}>{s.body}</div></div>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.flow} style={col('4/13', '1/-1')}>
        {project.nda && <CaseNda project={project} />}
        {sections.map((s) => (
          <section key={s.id} id={s.id} className={styles.group} aria-label={s.title} data-group>
            <header className={styles.groupHead}>
              <h2 className="t-s">{s.title}</h2>
              <div className={`t-s ${styles.navText}`}>{s.body}</div>
            </header>
            {s.rows.map((row, i) => <Row key={i} row={row} />)}
          </section>
        ))}
      </div>
    </div>
  );
}
