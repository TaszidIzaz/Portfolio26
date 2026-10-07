import { SectionHead } from '@/components/ui/SectionHead';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { allWorkHref, featuredProjects, projects } from '@/content/projects';
import { col } from '@/lib/grid';
import { WorkFloat } from './WorkFloat';
import { WorkGrid } from './WorkGrid';
import styles from './Works.module.css';

export function Works() {
  return (
    <section className={`sec ${styles.works}`} id="work" data-narrate="work">
      <SectionHead index="02" title="Selected work" note={`${String(projects.length).padStart(2, "0")} projects`} />
      <div className={`grid ${styles.head}`}>
        <SplitHeading text="Recent work, *human-led.*" className={`t-l ${styles.title}`} style={col('3/13', '1/-1')} />
      </div>

      {/* Brutalist keeps the floating collage; Swiss + Almanac get the clean two-up grid (an even count, so rows stay full) */}
      <div data-only="brutalist" className={styles.only}><WorkFloat projects={featuredProjects} /></div>
      <div data-only="swiss folk" className={styles.only}><WorkGrid projects={projects.slice(0, featuredProjects.length + (featuredProjects.length % 2))} /></div>

      <TransitionLink className={`grid ${styles.all}`} href={allWorkHref} data-cursor="All work →">
        <span className={styles.idx} style={col('1/3', '1/2')}>→</span>
        <span className={`t-m ${styles.allText}`} style={col('3/11', '2/5')}>See all the work</span>
        <span className="label right hide-m" style={col('11/13')}>({String(projects.length).padStart(2, '0')})</span>
      </TransitionLink>
    </section>
  );
}
