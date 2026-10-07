import type { Project } from '../types';

/** Work led as Creative Director at GY6 — https://www.gy6.io/work/paperless */
export const paperless: Project = {
  slug: 'paperless',
  title: 'Paperless',
  summary: 'Brand identity and launch kit for an AI tax and compliance assistant.',
  tags: ['Creative Direction', 'Brand Identity', 'Launch Kit'],
  type: 'Brand Identity',
  metric: { value: '5 wks', label: 'from mood boards to a full launch kit' },
  images: [
    { kind: 'image', src: '/images/projects/paperless/cover.jpg', alt: 'Paperless — cover', width: 'a' },
    { kind: 'image', src: '/images/projects/paperless/01.jpg', alt: 'Paperless — visual 1', width: 'b' },
    { kind: 'image', src: '/images/projects/paperless/02-poster.jpg', alt: 'Paperless — visual 2', width: 'c' },
  ],

  client: 'Paperless by Ace Advisory',
  role: 'Creative Director',
  studio: 'GY6',
  industry: ['AI', 'Tax & Compliance'],
  services: ['Creative Direction', 'Brand Identity', 'Visual Identity', 'Launch Kit', 'Social Templates'],
  live: { label: 'View on GY6', href: 'https://www.gy6.io/work/paperless' },
  cover: { src: '/images/projects/paperless/cover.jpg', w: 1920, h: 1080, alt: 'Paperless cover' },
  intro: 'A brand built from the ground up for Paperless, an AI tax and compliance assistant from Ace Advisory.',
  overview: 'Mood boards, a signature visual device and social media templates, delivered as a full launch kit in a five-week sprint.',
  gallery: [
    { layout: 'full', images: [{ src: '/images/projects/paperless/01.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 1' }] },
    { layout: 'full', images: [{ src: '/images/projects/paperless/02-poster.jpg', video: '/images/projects/paperless/02.mp4', w: 1808, h: 1014, alt: 'Paperless — visual 2' }] },
    { layout: 'pair', images: [{ src: '/images/projects/paperless/03.jpg', w: 1809, h: 1589, alt: 'Paperless — visual 3' }, { src: '/images/projects/paperless/04.jpg', w: 1809, h: 2135, alt: 'Paperless — visual 4' }] },
    { layout: 'pair', images: [{ src: '/images/projects/paperless/05.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 5' }, { src: '/images/projects/paperless/06.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 6' }] },
    { layout: 'pair', images: [{ src: '/images/projects/paperless/07-poster.jpg', video: '/images/projects/paperless/07.mp4', w: 1808, h: 1014, alt: 'Paperless — visual 7' }, { src: '/images/projects/paperless/08.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 8' }] },
    { layout: 'full', images: [{ src: '/images/projects/paperless/09.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 9' }] },
    { layout: 'pair', images: [{ src: '/images/projects/paperless/10.jpg', w: 1809, h: 1671, alt: 'Paperless — visual 10' }, { src: '/images/projects/paperless/11.jpg', w: 1809, h: 1253, alt: 'Paperless — visual 11' }] },
    { layout: 'pair', images: [{ src: '/images/projects/paperless/12-poster.jpg', video: '/images/projects/paperless/12.mp4', w: 1808, h: 1014, alt: 'Paperless — visual 12' }, { src: '/images/projects/paperless/13.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 13' }] },
    { layout: 'full', images: [{ src: '/images/projects/paperless/14.jpg', w: 1809, h: 1015, alt: 'Paperless — visual 14' }] },
  ],
};
