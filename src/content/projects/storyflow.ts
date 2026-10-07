import type { Project } from '../types';

/** Work led as Creative Director at GY6 — https://www.gy6.io/work/storyflow */
export const storyflow: Project = {
  slug: 'storyflow',
  title: 'Storyflow',
  summary: 'Website for a social-first creative agency focused on culture and storytelling.',
  tags: ['Creative Direction', 'Web Design', 'UI/UX'],
  type: 'Website',
  images: [
    { kind: 'image', src: '/images/projects/storyflow/cover.jpg', alt: 'Storyflow — cover', width: 'a' },
    { kind: 'image', src: '/images/projects/storyflow/01-poster.jpg', alt: 'Storyflow — visual 1', width: 'b' },
    { kind: 'image', src: '/images/projects/storyflow/04.jpg', alt: 'Storyflow — visual 2', width: 'c' },
  ],

  client: 'Storyflow',
  role: 'Creative Director',
  studio: 'GY6',
  industry: ['Creative Agency', 'Social Media'],
  services: ['Creative Direction', 'Website Strategy', 'Wireframes', 'Web Design', 'Responsive UI'],
  live: { label: 'View on GY6', href: 'https://www.gy6.io/work/storyflow' },
  cover: { src: '/images/projects/storyflow/cover.jpg', w: 1400, h: 888, alt: 'Storyflow cover' },
  intro: 'The website for Storyflow, a social-first creative agency focused on culture, storytelling and growth.',
  overview: 'We set the strategic direction, wireframed the homepage and designed polished, responsive pages in Figma, shaping a clear narrative flow for the agency online.',
  gallery: [
    { layout: 'full', images: [{ src: '/images/projects/storyflow/01-poster.jpg', video: '/images/projects/storyflow/01.mp4', w: 1920, h: 1080, alt: 'Storyflow — visual 1' }] },
    { layout: 'pair', images: [{ src: '/images/projects/storyflow/02.jpg', w: 1400, h: 1948, alt: 'Storyflow — visual 2' }, { src: '/images/projects/storyflow/03.jpg', w: 1400, h: 1412, alt: 'Storyflow — visual 3' }] },
    { layout: 'pair', images: [{ src: '/images/projects/storyflow/04.jpg', w: 1400, h: 888, alt: 'Storyflow — visual 4' }, { src: '/images/projects/storyflow/05-poster.jpg', video: '/images/projects/storyflow/05.mp4', w: 1400, h: 1190, alt: 'Storyflow — visual 5' }] },
    { layout: 'full', images: [{ src: '/images/projects/storyflow/06-poster.jpg', video: '/images/projects/storyflow/06.mp4', w: 1280, h: 526, alt: 'Storyflow — visual 6' }] },
    { layout: 'pair', images: [{ src: '/images/projects/storyflow/07.jpg', w: 1400, h: 888, alt: 'Storyflow — visual 7' }, { src: '/images/projects/storyflow/08.jpg', w: 1400, h: 888, alt: 'Storyflow — visual 8' }] },
    { layout: 'pair', images: [{ src: '/images/projects/storyflow/09-poster.jpg', video: '/images/projects/storyflow/09.mp4', w: 1400, h: 1900, alt: 'Storyflow — visual 9' }, { src: '/images/projects/storyflow/10.jpg', w: 1400, h: 1640, alt: 'Storyflow — visual 10' }] },
    { layout: 'full', images: [{ src: '/images/projects/storyflow/11-poster.jpg', video: '/images/projects/storyflow/11.mp4', w: 1400, h: 888, alt: 'Storyflow — visual 11' }] },
    { layout: 'full', images: [{ src: '/images/projects/storyflow/12.jpg', w: 1400, h: 1497, alt: 'Storyflow — visual 12' }] },
  ],
};
