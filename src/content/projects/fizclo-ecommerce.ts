import { testimonials } from '../testimonials';
import type { Project } from '../types';
import { img } from './_img';

const f = 'fizclo';

export const fizclo: Project = {
  slug: 'fizclo-ecommerce',
  title: 'FIZCLO',
  summary: 'AI-driven personalisation that made shoppers actually finish checkout.',
  tags: ['E-commerce', 'AI Integration', 'Frontend'],
  year: 2025,
  metric: { value: '+45%', label: 'average order value, −35% cart abandonment' },
  images: [
    { kind: 'image', src: `/images/projects/${f}/01.jpg`, alt: 'FIZCLO storefront', width: 'a' },
    { kind: 'image', src: `/images/projects/${f}/hero.jpg`, alt: 'FIZCLO on a laptop', width: 'b' },
    { kind: 'image', src: `/images/projects/${f}/02.jpg`, alt: 'FIZCLO product pages', width: 'c' },
  ],

  client: 'FIZCLO',
  role: 'UX Design & Frontend Development',
  industry: ['E-commerce', 'Retail', 'Fashion Tech'],
  services: ['UX Design', 'AI Integration', 'E-commerce', 'Frontend Development'],
  live: { label: 'Visit store', href: 'https://fizclo.com/' },
  cover: img(f, '01.jpg', 1800, 960, 'FIZCLO storefront'),
  intro: 'A personalised shopping experience that lifted engagement, order value and retention for a growing fashion brand.',
  overview:
    'Machine-learning recommendations, an adaptive interface and data-driven operations turned a generic store into one that feels made for each shopper.',
  stats: [
    { value: '−35%', label: 'Cart abandonment' },
    { value: '+45%', label: 'Average order value' },
    { value: '+60%', label: 'Inventory turnover' },
    { value: '+50%', label: 'Customer retention' },
  ],
  outcome: 'FIZCLO became a reference for AI-powered e-commerce, setting a new standard for personalised shopping.',
  testimonial: testimonials.find((t) => t.name.startsWith('Mohammad')),
  gallery: [
    { layout: 'full', images: [img(f, '02.jpg', 1800, 960, 'FIZCLO product pages')] },
    { layout: 'pair', images: [img(f, '03.jpg', 2000, 1067, 'Personalised recommendations'), img(f, '04.jpg', 2000, 1067, 'Product detail')] },
    { layout: 'full', images: [img(f, '05.jpg', 2000, 1067, 'Collection page')] },
    { layout: 'pair', images: [img(f, '06.jpg', 2000, 1067, 'Checkout'), img(f, '07.jpg', 2000, 1067, 'Analytics dashboard')] },
    { layout: 'pair', images: [img(f, '08.jpg', 2000, 1067, 'Mobile store'), img(f, '09.jpg', 2000, 1067, 'Design system')] },
    { layout: 'full', images: [img(f, 'hero.jpg', 1024, 816, 'FIZCLO on a laptop')] },
  ],
};
