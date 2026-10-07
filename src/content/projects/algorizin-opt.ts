import { testimonials } from '../testimonials';
import type { Project } from '../types';
import { img } from './_img';

const f = 'algorizin';

export const algorizin: Project = {
  slug: 'algorizin-opt',
  title: 'Algorizin OPT',
  summary: 'Making OPT self-employment painless for international students.',
  tags: ['Product Design', 'Web Dev', 'UX Research'],
  type: 'Product & Website',
  year: 2024,
  metric: { value: '100s', label: 'of students onboarded in the first few months' },
  images: [
    { kind: 'image', src: `/images/projects/${f}/hero.jpg`, alt: 'Algorizin OPT dashboard on a laptop', width: 'a' },
    { kind: 'image', src: `/images/projects/${f}/02.jpg`, alt: 'Algorizin OPT screens', width: 'b' },
    { kind: 'image', src: `/images/projects/${f}/01.jpg`, alt: 'Algorizin OPT welcome dashboard', width: 'c' },
  ],

  client: 'Algorizin',
  role: 'Product Designer — design lead & UX research',
  industry: ['Legal Tech', 'Education', 'Immigration'],
  services: ['Product Design', 'UX Research', 'Web Development'],
  live: { label: 'Visit platform', href: 'https://app.algorizin.com/login' },
  cover: img(f, '01.jpg', 1800, 960, 'Algorizin OPT dashboard'),
  intro: 'End-to-end design of a platform that makes OPT self-employment simple, compliant and safe for international students.',
  overview:
    'By merging legal compliance with an intuitive user experience, the platform lets students set up self-employed businesses without the risk of non-compliance or procedural missteps.',
  stats: [
    { value: '100s', label: 'International students onboarded in the first few months' },
    { value: '#1', label: 'Champion of Algorizin’s Design-a-thon, which led to the role' },
  ],
  outcome:
    'A once-complicated process became accessible, automated and compliant, so students can build their careers without fearing immigration risk.',
  testimonial: testimonials.find((t) => t.name.startsWith('Toukir')),
  gallery: [
    { layout: 'full', images: [img(f, '02.jpg', 1800, 960, 'Algorizin OPT screens')] },
    { layout: 'pair', images: [img(f, '03.jpg', 2000, 1067, 'Onboarding flow'), img(f, '04.jpg', 2000, 1067, 'Status dashboard')] },
    { layout: 'full', images: [img(f, '05.jpg', 2000, 1067, 'Consultation booking')] },
    { layout: 'pair', images: [img(f, '06.jpg', 2000, 1067, 'Document generation'), img(f, '07.jpg', 2000, 1067, 'Compliance tracking')] },
    { layout: 'pair', images: [img(f, '08.jpg', 2000, 1067, 'Mobile views'), img(f, '09.jpg', 2000, 1067, 'Design system')] },
    { layout: 'full', images: [img(f, 'hero.jpg', 1800, 1434, 'Algorizin OPT on a laptop')] },
  ],
};
