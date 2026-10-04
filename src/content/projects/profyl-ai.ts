import { testimonials } from '../testimonials';
import type { Project } from '../types';
import { img } from './_img';

const f = 'profyl';

export const profyl: Project = {
  slug: 'profyl-ai',
  title: 'Profyl.ai',
  summary: 'Smarter, faster, AI-powered hiring for recruiters and job seekers.',
  tags: ['AI/ML', 'Product Design', 'Full-Stack'],
  year: 2024,
  metric: { value: '−40%', label: 'time-to-hire with AI talent matching' },
  images: [
    { kind: 'image', src: `/images/projects/${f}/01.jpg`, alt: 'Profyl.ai interface', width: 'c' },
    { kind: 'image', src: `/images/projects/${f}/hero.jpg`, alt: 'Profyl.ai on a laptop', width: 'b' },
    { kind: 'image', src: `/images/projects/${f}/02.jpg`, alt: 'Profyl.ai landing page', width: 'a' },
  ],

  client: 'Profyl.ai',
  role: 'Founding Product Designer — research, product & creative direction',
  industry: ['HR Tech', 'Artificial Intelligence', 'Recruitment'],
  services: ['Product Design', 'AI/ML Product', 'UX/UI', 'Full-Stack Development'],
  live: { label: 'Visit website', href: 'https://profyl.ai/' },
  cover: img(f, '01.jpg', 1800, 960, 'Profyl.ai interface'),
  intro: 'An AI-driven recruitment platform that connects job seekers and recruiters, built from the ground up.',
  overview:
    'I led product research and design from day one and handled the creative direction for both the website and the web app, keeping the experience simple and clear.',
  stats: [
    { value: '−40%', label: 'Time-to-hire with AI talent matching' },
    { value: '1-click', label: 'Applications with live progress tracking' },
  ],
  outcome: 'By leveraging AI and automation, Profyl.ai makes hiring faster, smarter and more accessible for everyone.',
  testimonial: testimonials.find((t) => t.name.startsWith('Shahriar')),
  gallery: [
    { layout: 'full', images: [img(f, '02.jpg', 1800, 960, 'Profyl.ai landing page')] },
    { layout: 'pair', images: [img(f, '03.jpg', 2000, 1067, 'Candidate matching'), img(f, '04.jpg', 2000, 1067, 'Recruiter dashboard')] },
    { layout: 'full', images: [img(f, '05.jpg', 2000, 1067, 'Job application flow')] },
    { layout: 'pair', images: [img(f, '06.jpg', 2000, 1067, 'Smart profiles'), img(f, '07.jpg', 2000, 1067, 'Messaging')] },
    { layout: 'pair', images: [img(f, '08.jpg', 2000, 1067, 'Pricing'), img(f, '09.jpg', 2000, 1067, 'Mobile views')] },
    { layout: 'full', images: [img(f, 'hero.jpg', 1024, 816, 'Profyl.ai on a laptop')] },
  ],
};
