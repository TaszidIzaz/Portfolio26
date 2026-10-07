import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';
import type { Project } from '@/content/types';
import styles from './Case.module.css';

export function CaseNda({ project }: { project: Project }) {
  return (
    <Reveal className={styles.block}>
      <p className="label" data-reveal>Protected under NDA</p>
      <div className={styles.ndaCard} data-reveal>
        <p className="label">Classified — {project.title}</p>
        <span className={styles.bars} aria-hidden>
          {['92%', '74%', '86%', '58%', '40%'].map((w) => <i key={w} style={{ width: w }} />)}
        </span>
        <p className="t-s">
          The process, implementation and results are confidential to respect the client’s intellectual property. A walkthrough is available on request.
        </p>
        <div><Button href={`mailto:${site.email}?subject=${encodeURIComponent(`${project.title} case study access`)}`} variant="accent" magnetic={false}>Request access</Button></div>
      </div>
    </Reveal>
  );
}
