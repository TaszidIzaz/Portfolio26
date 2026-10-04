'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { projectHref } from '@/content/projects';
import type { Project } from '@/content/types';
import { col, vars } from '@/lib/grid';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Works.module.css';

const SIZES = { a: '(max-width: 767px) 82vw, 44vw', b: '(max-width: 767px) 56vw, 27vw', c: '(max-width: 767px) 70vw, 36vw' };

/** One project: meta row on the grid + a bleeding image strip that drifts sideways on scroll. */
export function WorkRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const dir = index % 2 ? 1 : -1;
      const st = { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true };
      gsap.fromTo(
        `.${styles.strip}`,
        { x: () => (dir > 0 ? -innerWidth * 0.14 : innerWidth * 0.02) },
        { x: () => (dir > 0 ? innerWidth * 0.02 : -innerWidth * 0.14), ease: 'none', scrollTrigger: st },
      );
      gsap.fromTo(`.${styles.img} img`, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { ...st, end: 'center center' } });
      gsap.from(`.${styles.meta} > *`, { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: ref.current, start: 'top 82%' } });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
    <TransitionLink href={projectHref(project.slug)} className={styles.row} data-cursor="View case →">
      <div className={`grid ${styles.meta}`}>
        <p className={`t-m ${styles.idx}`} style={col('1/3', '1/2')}>{String(index + 1).padStart(2, '0')}</p>
        <div style={col('3/7', '2/5')}>
          <h3 className={`t-m ${styles.name}`}>{project.title}</h3>
          <p className={`t-s ${styles.sub}`}>{project.summary}</p>
        </div>
        <ul className={styles.tags} style={col('7/10', '2/5')}>
          {project.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="label hide-m" style={col('10/11')}>{project.studio ? `with ${project.studio}` : project.year}</p>
        {project.metric && (
          <div className={styles.metric} style={col('11/13', '2/5')}>
            <b className="t-m">{project.metric.value}</b>
            <span className="label">{project.metric.label}</span>
          </div>
        )}
      </div>

      <div className={styles.strip}>
        {project.images.map((img, i) =>
          img.kind === 'nda' ? (
            <figure key={i} className={`${styles.img} ${styles[img.width]} ${styles.nda}`} aria-label="Redacted under NDA">
              <span className="label">Classified — №{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.bars}>
                {['92%', '74%', '86%', '40%'].map((w) => <i key={w} style={vars({ '--w': w })} />)}
              </span>
              <span className="label">Protected under NDA. Details on request.</span>
            </figure>
          ) : (
            <figure key={i} className={`${styles.img} ${styles[img.width]}`}>
              <Image src={img.src} alt={img.alt} fill sizes={SIZES[img.width]} />
            </figure>
          ),
        )}
      </div>
    </TransitionLink>
    </div>
  );
}
