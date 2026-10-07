import { testimonials } from '../testimonials';
import type { Project } from '../types';
import { img } from './_img';

const f = 'centered-data';

export const centeredData: Project = {
  slug: 'centered-data',
  title: 'CenteredData',
  summary: 'A tech-forward identity for a data consultancy. Precise, never cold.',
  tags: ['Brand Identity', 'Logo', 'Visual Design'],
  type: 'Brand Identity',
  year: 2024,
  metric: { value: 'A→Z', label: 'From logo to guidelines, one cohesive system' },
  images: [
    { kind: 'image', src: `/images/projects/${f}/01.jpg`, alt: 'CenteredData brand identity', width: 'c' },
    { kind: 'image', src: `/images/projects/${f}/hero.png`, alt: 'CenteredData logo', width: 'a' },
    { kind: 'image', src: `/images/projects/${f}/02.jpg`, alt: 'CenteredData brand applications', width: 'b' },
  ],

  client: 'CenteredData',
  role: 'Brand Designer — strategy to guidelines',
  industry: ['IT Consulting', 'Data Analytics', 'Technology'],
  services: ['Brand Identity', 'Logo Design', 'Visual Design', 'UI Design'],
  live: { label: 'Visit website', href: 'https://centereddata.com/' },
  cover: img(f, '07.jpg', 2000, 1334, 'CenteredData brand identity'),
  intro: 'A minimal yet powerful identity that signals technical precision while staying approachable.',
  overview:
    'CenteredData is a data-focused consultancy in IT and analytics. The brand had to speak to technical decision-makers and business stakeholders alike, without the usual enterprise look.',
  palette: ['#223440', '#6993AF', '#8C9EAA', '#C8D1D8', '#FFFFFF'],
  outcome: 'Engineered to Inform. Unified to Perform.',
  testimonial: testimonials.find((t) => t.name.startsWith('CenteredData')),
  gallery: [
    { layout: 'full', images: [img(f, '06.jpg', 2000, 876, 'Brand banner')] },
    { layout: 'pair', images: [img(f, '02.jpg', 1200, 900, 'Brand applications'), img(f, '03.jpg', 1200, 900, 'Brand applications')] },
    { layout: 'full', images: [img(f, '01.jpg', 1800, 1201, 'Identity overview')] },
    { layout: 'pair', images: [img(f, '04.jpg', 800, 600, 'Logo construction'), img(f, '05.jpg', 895, 897, 'Brandmark')] },
    { layout: 'full', images: [img(f, '08.jpg', 2000, 1334, 'Brand in use')] },
    { layout: 'full', images: [img(f, '09.jpg', 2000, 1334, 'Brand in use')] },
  ],
};
