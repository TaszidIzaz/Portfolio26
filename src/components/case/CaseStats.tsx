import { Reveal } from '@/components/ui/Reveal';
import type { Project } from '@/content/types';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

/** Impact numbers (and the brand palette for identity work). */
export function CaseStats({ project }: { project: Project }) {
  if (!project.stats?.length && !project.palette?.length) return null;
  return (
    <Reveal className={`grid ${styles.stats}`}>
      <p className="label" style={col('1/4', '1/-1')} data-reveal>{project.stats?.length ? 'Impact' : 'Palette'}</p>
      <div style={col('4/13', '1/-1')}>
        {project.stats?.length ? (
          <div className={styles.statGrid}>
            {project.stats.map((s) => (
              <div key={s.label} className={styles.stat} data-reveal>
                <p className="t-l">{s.value}</p>
                <p className="t-s">{s.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.palette}>
            {project.palette!.map((c) => (
              <div key={c} className={styles.swatch} data-reveal>
                <i style={{ background: c }} />
                <span className="label">{c}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
