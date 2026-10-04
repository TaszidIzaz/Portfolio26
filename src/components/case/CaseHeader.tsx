import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Stamp } from '@/components/ui/Collage';
import { Seal } from '@/components/ui/Folk';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

export function CaseHeader({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  const meta = [`Case ${String(index).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`, project.year, project.studio && `with ${project.studio}`].filter(Boolean).join(' — ');
  return (
    <section id="top" data-narrate="caseStudy" style={{ position: 'relative' }}>
      <Stamp text={`CASE ${String(index).padStart(2, '0')} • ${project.title.toUpperCase()} • `} style={{ top: '110px', right: '6vw' }} />
      <Seal sub={`CASE ${String(index).padStart(2, '0')}`} style={{ top: '120px', right: '6vw' }} />
      <div className={`grid ${styles.header}`}>
        <div className={styles.meta} style={col('1/4', '1/-1')}>
          <p className="label">{meta}</p>
          <ul className={styles.metaRow}>{project.industry.map((t) => <li key={t} className={styles.chip}>{t}</li>)}</ul>
        </div>
        <SplitHeading as="h1" text={project.title} className={`t-l ${styles.title}`} style={col('4/13', '1/-1')} />
      </div>
      <ParallaxImage className={styles.cover} src={project.cover.src} video={project.cover.video} alt={project.cover.alt} ratio="16 / 9" sizes="100vw" priority />
    </section>
  );
}
