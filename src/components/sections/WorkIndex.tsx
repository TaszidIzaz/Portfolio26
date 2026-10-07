import { PageIntro } from '@/components/ui/PageIntro';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { workIndex } from '@/content/work';
import { col } from '@/lib/grid';
import { WorkGrid } from './WorkGrid';
import { WorkRow } from './WorkRow';
import styles from './WorkIndex.module.css';

/** /work — split intro, a static "Work" heading, then every project row. */
export function WorkIndex() {
  return (
    <>
      <PageIntro
        label={workIndex.label}
        title={workIndex.title}
        aside={{ text: workIndex.aside, cta: { label: 'Start a project', href: site.bookCall } }}
        narrate="workIndex"
      />
      <section className={styles.list} data-narrate="work">
        <div className={`grid ${styles.head}`}>
          <h2 className="t-l" style={col('1/7', '1/3')}>Work</h2>
          <p className="label muted right" style={col('10/13', '3/5')}>{String(projects.length).padStart(2, '0')} projects</p>
        </div>
        <div data-only="brutalist" className={styles.only}>
          {projects.map((p, i) => <WorkRow key={p.slug} project={p} index={i} />)}
        </div>
        <div data-only="swiss folk" className={styles.only}><WorkGrid projects={projects} /></div>
      </section>
    </>
  );
}
