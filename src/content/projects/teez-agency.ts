import type { Project } from '../types';

/** Work led as Creative Director at GY6 — https://www.gy6.io/work/teez-agency */
export const teez: Project = {
  slug: 'teez-agency',
  title: 'Teez Agency',
  summary: 'An editorial, food-first website for a premium F&B content agency.',
  tags: ['Creative Direction', 'Web Design', 'UI/UX'],
  type: 'Website',
  images: [
    { kind: 'image', src: '/images/projects/teez/cover.jpg', alt: 'Teez Agency — cover', width: 'a' },
    { kind: 'image', src: '/images/projects/teez/02-poster.jpg', alt: 'Teez Agency — visual 1', width: 'b' },
    { kind: 'image', src: '/images/projects/teez/04.jpg', alt: 'Teez Agency — visual 2', width: 'c' },
  ],

  client: 'Teez Agency',
  role: 'Creative Director',
  studio: 'GY6',
  industry: ['Creative Agency', 'Food & Beverage'],
  services: ['Creative Direction', 'Web Design', 'UI/UX', 'Case Study Layouts', 'Contact Flow'],
  live: { label: 'View on GY6', href: 'https://www.gy6.io/work/teez-agency' },
  cover: { src: '/images/projects/teez/cover.jpg', w: 1920, h: 1080, alt: 'Teez Agency cover' },
  intro: 'A visually immersive, editorial website for Teez, a premium creative marketing agency specialising in food and beverage content.',
  overview: 'Their photography and video lead the way, balancing the brand’s colourful energy with a polished, high-end feel.',
  gallery: [
    { layout: 'full', images: [{ src: '/images/projects/teez/01.jpg', w: 1400, h: 1212, alt: 'Teez Agency — visual 1' }] },
    { layout: 'full', images: [{ src: '/images/projects/teez/02-poster.jpg', video: '/images/projects/teez/02.mp4', w: 1400, h: 922, alt: 'Teez Agency — visual 2' }] },
    { layout: 'trio', images: [{ src: '/images/projects/teez/03.jpg', w: 1400, h: 1369, alt: 'Teez Agency — visual 3' }, { src: '/images/projects/teez/04.jpg', w: 1401, h: 1133, alt: 'Teez Agency — visual 4' }, { src: '/images/projects/teez/05.jpg', w: 1400, h: 1494, alt: 'Teez Agency — visual 5' }] },
    { layout: 'pair', images: [{ src: '/images/projects/teez/06-poster.jpg', video: '/images/projects/teez/06.mp4', w: 1400, h: 922, alt: 'Teez Agency — visual 6' }, { src: '/images/projects/teez/07.jpg', w: 1410, h: 760, alt: 'Teez Agency — visual 7' }] },
    { layout: 'pair', images: [{ src: '/images/projects/teez/08-poster.jpg', video: '/images/projects/teez/08.mp4', w: 1400, h: 922, alt: 'Teez Agency — visual 8' }, { src: '/images/projects/teez/09.jpg', w: 1401, h: 1058, alt: 'Teez Agency — visual 9' }] },
    { layout: 'full', images: [{ src: '/images/projects/teez/10.jpg', w: 1400, h: 1361, alt: 'Teez Agency — visual 10' }] },
    { layout: 'pair', images: [{ src: '/images/projects/teez/11-poster.jpg', video: '/images/projects/teez/11.mp4', w: 1400, h: 922, alt: 'Teez Agency — visual 11' }, { src: '/images/projects/teez/12.jpg', w: 1401, h: 1198, alt: 'Teez Agency — visual 12' }] },
    { layout: 'full', images: [{ src: '/images/projects/teez/13-poster.jpg', video: '/images/projects/teez/13.mp4', w: 1400, h: 622, alt: 'Teez Agency — visual 13' }] },
  ],
};
