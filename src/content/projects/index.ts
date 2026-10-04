import type { Project } from '../types';
import { algorizin } from './algorizin-opt';
import { bsic } from './bsic';
import { centeredData } from './centered-data';
import { fizclo } from './fizclo-ecommerce';
import { paperless } from './paperless';
import { profyl } from './profyl-ai';
import { revora } from './revora';
import { storyflow } from './storyflow';
import { teez } from './teez-agency';

/**
 * All work, in display order (/work shows every project).
 * To add a project: create `<slug>.ts` next to this file, then add it here.
 */
export const projects: Project[] = [
  bsic, revora, paperless, storyflow, teez,
  algorizin, profyl, fizclo, centeredData,
];

/** How many projects the homepage features (the first N above). */
export const FEATURED_COUNT = 5;
export const featuredProjects = projects.slice(0, FEATURED_COUNT);

export const allWorkHref = '/work';
export const projectHref = (slug: string) => `/work/${slug}`;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The project after `slug`, wrapping around. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
