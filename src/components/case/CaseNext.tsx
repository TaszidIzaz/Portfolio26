import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { getNextProject, projectHref } from '@/content/projects';
import { col } from '@/lib/grid';
import { ProjectList } from './ProjectList';
import styles from './Case.module.css';

/** Big link to the next project, then the full project list. */
export function CaseNext({ slug }: { slug: string }) {
  const next = getNextProject(slug);
  return (
    <section data-narrate="caseNext">
      <TransitionLink href={projectHref(next.slug)} className={styles.next} data-cursor="Next case →">
        <div className={`grid ${styles.nextHead}`}>
          <p className="label" style={col('1/4', '1/-1')}>Next project</p>
          <p className={`t-l ${styles.nextTitle}`} style={col('4/13', '1/-1')}>{next.title}</p>
        </div>
        <ParallaxImage className={styles.nextImg} src={next.cover.src} alt={next.cover.alt} ratio="21 / 9" sizes="100vw" />
      </TransitionLink>
      <ProjectList exclude={slug} />
    </section>
  );
}
