import type { Project } from '../types';

/** Work led as Creative Director at GY6 — https://www.gy6.io/work/revora */
export const revora: Project = {
  slug: 'revora',
  title: 'Revora',
  summary: 'A complete brand and website revamp for an innovative SaaS company.',
  tags: ['Creative Direction', 'Brand Identity', 'Web Design'],
  type: 'Rebrand & Website',
  images: [
    { kind: 'image', src: '/images/projects/revora/cover.jpg', alt: 'Revora — cover', width: 'a' },
    { kind: 'image', src: '/images/projects/revora/01-poster.jpg', alt: 'Revora — visual 1', width: 'b' },
    { kind: 'image', src: '/images/projects/revora/06-poster.jpg', alt: 'Revora — visual 2', width: 'c' },
  ],

  client: 'Revora',
  role: 'Creative Director',
  studio: 'GY6',
  industry: ['SaaS', 'Technology'],
  services: ['Creative Direction', 'Brand Identity', 'Web Design', 'Product Design'],
  live: { label: 'View on GY6', href: 'https://www.gy6.io/work/revora' },
  cover: { src: '/images/projects/revora/cover.jpg', w: 1400, h: 844, alt: 'Revora cover' },
  intro: 'A cohesive brand identity and a user-friendly website for an innovative SaaS company.',
  overview: 'The goal was a brand that reflects the company’s values and a website that improves the experience across every touchpoint.',
  gallery: [
    { layout: 'full', images: [{ src: '/images/projects/revora/01-poster.jpg', video: '/images/projects/revora/01.mp4', w: 2800, h: 1694, alt: 'Revora — visual 1' }] },
    { layout: 'pair', images: [{ src: '/images/projects/revora/02-poster.jpg', video: '/images/projects/revora/02.mp4', w: 2800, h: 2360, alt: 'Revora — visual 2' }, { src: '/images/projects/revora/03-poster.jpg', video: '/images/projects/revora/03.mp4', w: 2800, h: 2576, alt: 'Revora — visual 3' }] },
    { layout: 'full', images: [{ src: '/images/projects/revora/04-poster.jpg', video: '/images/projects/revora/04.mp4', w: 1400, h: 1942, alt: 'Revora — visual 4' }] },
    { layout: 'pair', images: [{ src: '/images/projects/revora/05-poster.jpg', video: '/images/projects/revora/05.mp4', w: 1400, h: 1192, alt: 'Revora — visual 5' }, { src: '/images/projects/revora/06-poster.jpg', video: '/images/projects/revora/06.mp4', w: 1400, h: 1032, alt: 'Revora — visual 6' }] },
    { layout: 'pair', images: [{ src: '/images/projects/revora/07-poster.jpg', video: '/images/projects/revora/07.mp4', w: 1400, h: 766, alt: 'Revora — visual 7' }, { src: '/images/projects/revora/08-poster.jpg', video: '/images/projects/revora/08.mp4', w: 1400, h: 582, alt: 'Revora — visual 8' }] },
  ],
};
