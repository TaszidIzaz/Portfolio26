import type { Project } from '../types';

/** Work led as Creative Director at GY6 — https://www.gy6.io/work/bsic */
export const bsic: Project = {
  slug: 'bsic',
  title: 'BSIC',
  summary: 'Brand and launch identity for Bangladesh’s first bank-backed startup investment company.',
  tags: ['Creative Direction', 'Brand Identity', 'Event Identity'],
  metric: { value: '39', label: 'banks backing the fund' },
  images: [
    { kind: 'image', src: '/images/projects/bsic/cover.jpg', alt: 'BSIC — cover', width: 'a' },
    { kind: 'image', src: '/images/projects/bsic/01.jpg', alt: 'BSIC — visual 1', width: 'b' },
    { kind: 'image', src: '/images/projects/bsic/02.jpg', alt: 'BSIC — visual 2', width: 'c' },
  ],

  client: 'BSIC — Bangladesh Startup Investment Company',
  role: 'Creative Director',
  studio: 'GY6',
  industry: ['Venture Capital', 'Finance'],
  services: ['Creative Direction', 'Brand Identity', 'Event Identity', 'AV & Presentation Design'],
  live: { label: 'View on GY6', href: 'https://www.gy6.io/work/bsic' },
  cover: { src: '/images/projects/bsic/cover.jpg', w: 1920, h: 1080, alt: 'BSIC cover' },
  intro: 'Creative direction for the launch of BSIC, a startup investment company backed by 39 banks, from brand identity to the launch event.',
  overview: 'We developed the brand identity for BSIC and its fund, “The Fund,” and designed the event identity for the launch at the InterContinental Dhaka, including AV films and presentation materials.',
  gallery: [
    { layout: 'full', images: [{ src: '/images/projects/bsic/01.jpg', w: 1400, h: 932, alt: 'BSIC — visual 1' }] },
    { layout: 'pair', images: [{ src: '/images/projects/bsic/02.jpg', w: 1400, h: 932, alt: 'BSIC — visual 2' }, { src: '/images/projects/bsic/03.jpg', w: 1400, h: 932, alt: 'BSIC — visual 3' }] },
    { layout: 'pair', images: [{ src: '/images/projects/bsic/04.jpg', w: 1400, h: 932, alt: 'BSIC — visual 4' }, { src: '/images/projects/bsic/05-poster.jpg', video: '/images/projects/bsic/05.mp4', w: 1280, h: 852, alt: 'BSIC — visual 5' }] },
    { layout: 'pair', images: [{ src: '/images/projects/bsic/06.jpg', w: 1400, h: 932, alt: 'BSIC — visual 6' }, { src: '/images/projects/bsic/07.jpg', w: 1400, h: 932, alt: 'BSIC — visual 7' }] },
    { layout: 'pair', images: [{ src: '/images/projects/bsic/08.jpg', w: 1400, h: 932, alt: 'BSIC — visual 8' }, { src: '/images/projects/bsic/09.jpg', w: 1400, h: 1100, alt: 'BSIC — visual 9' }] },
    { layout: 'pair', images: [{ src: '/images/projects/bsic/10-poster.jpg', video: '/images/projects/bsic/10.mp4', w: 1400, h: 932, alt: 'BSIC — visual 10' }, { src: '/images/projects/bsic/11-poster.jpg', video: '/images/projects/bsic/11.mp4', w: 1400, h: 932, alt: 'BSIC — visual 11' }] },
    { layout: 'full', images: [{ src: '/images/projects/bsic/12.jpg', w: 1400, h: 932, alt: 'BSIC — visual 12' }] },
  ],
};
