import { Stamp } from '@/components/ui/Collage';
import { Seal } from '@/components/ui/Folk';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { allWorkHref, projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { col } from '@/lib/grid';
import { CaseMedia } from './CaseMedia';
import styles from './Case.module.css';

/**
 * Opening screen (after afternow.co): the project's identity top-left, its facts pinned bottom-left,
 * and the cover filling the rest of the screen.
 */
export function CaseHero({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  const facts = [
    { label: 'Client', value: project.client },
    { label: 'Role', value: project.studio ? `${project.role} · ${project.studio}` : project.role },
    { label: 'Industry', value: project.industry.slice(0, 2).join(', ') },
    project.year && { label: 'Year', value: String(project.year) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section id="top" data-narrate="caseStudy" className={`grid ${styles.hero}`}>
      <div className={styles.heroSide} style={col('1/4', '1/-1')}>
        <div className={styles.heroIntro}>
          <TransitionLink href={allWorkHref} className="label muted ul">← Back to work</TransitionLink>
          <h1 className={`t-l ${styles.title}`}>{project.title}</h1>
          <p className="t-m regular muted">{project.summary}</p>
          <ul className={styles.chips} aria-label="Services">{project.services.map((s) => <li key={s} className={styles.chip}>{s}</li>)}</ul>
        </div>
        <div className={styles.info}>
          {facts.map((f) => (
            <p key={f.label} className={styles.infoRow}><span className="label muted">{f.label}</span><span className="t-s">{f.value}</span></p>
          ))}
          {project.live && (
            <a className={`${styles.infoRow} ${styles.live}`} href={project.live.href} target="_blank" rel="noopener">
              <span className="label">{project.live.label}</span><span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
      <div className={styles.heroMedia} style={col('4/13', '1/-1')}>
        <Stamp text={`CASE ${String(index).padStart(2, '0')} • ${project.title.toUpperCase()} • `} style={{ top: '-30px', right: '-20px' }} />
        <Seal sub={`CASE ${String(index).padStart(2, '0')}`} style={{ top: '-24px', right: '-14px' }} />
        <CaseMedia img={project.cover} sizes="(max-width: 767px) 100vw, 75vw" priority fill />
      </div>
    </section>
  );
}
