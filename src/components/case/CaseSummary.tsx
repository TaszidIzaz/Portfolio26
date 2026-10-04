import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import type { Project } from '@/content/types';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

export function CaseSummary({ project }: { project: Project }) {
  return (
    <Reveal>
      <div className={`grid ${styles.summary}`}>
        <div style={col('1/4', '1/-1')} data-reveal>
          <p className="label">Services provided</p>
          <ul className={`t-s ${styles.services}`} style={{ marginTop: 12 }}>
            {project.services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <p className="t-m" style={col('4/13', '1/-1')} data-reveal>{project.intro}</p>
      </div>

      <div className={`grid ${styles.details}`}>
        <div className={styles.detail} style={col('1/4', '1/3')} data-reveal>
          <p className="label muted">Client</p><p className="t-s">{project.client}</p>
        </div>
        <div className={styles.detail} style={col('4/7', '3/5')} data-reveal>
          <p className="label muted">Role</p><p className="t-s">{project.role}{project.studio ? ` · ${project.studio}` : ''}</p>
        </div>
        <div className={styles.detail} style={col('7/10', '1/-1')} data-reveal>
          <p className="label muted">Industry</p><p className="t-s">{project.industry.join(', ')}</p>
        </div>
        {project.live && (
          <div className={styles.liveWrap} style={col('10/13', '1/-1')} data-reveal>
            <Button href={project.live.href} variant="ghost" arrow>{project.live.label}</Button>
          </div>
        )}
      </div>

      {project.overview && (
        <div className={`grid ${styles.overview}`}>
          <p className="t-m regular" style={col('4/11', '1/-1')} data-reveal>{project.overview}</p>
        </div>
      )}
    </Reveal>
  );
}
