import type { Project } from '../types';
import { img } from './_img';

const W = 2000;
const H = 1333;
const pic = (file: string, alt: string) => img('obsidian', file, W, H, `Obsidian Advisory — ${alt}`);

/** Brand identity, website, social and print for a strategic advisory firm. */
export const obsidian: Project = {
  slug: 'obsidian-advisory',
  title: 'Obsidian Advisory',
  summary: 'A calm, classical identity and website for a strategic advisory firm.',
  tags: ['Creative Direction', 'Branding', 'Website'],
  type: 'Brand, Web & Social',
  year: 2026,
  images: [
    { kind: 'image', src: '/images/projects/obsidian/cover-stationery.webp', alt: 'Obsidian Advisory — stationery', width: 'a' },
    { kind: 'image', src: '/images/projects/obsidian/11-social-profile.webp', alt: 'Obsidian Advisory — social profile', width: 'b' },
    { kind: 'image', src: '/images/projects/obsidian/04-web-responsive.webp', alt: 'Obsidian Advisory — responsive website', width: 'c' },
  ],

  client: 'Obsidian Advisory',
  role: 'Creative Direction & Design',
  industry: ['Strategic Advisory', 'Professional Services'],
  services: ['Creative Direction', 'Brand Identity', 'Visual System', 'Website Design & Development', 'Social Media', 'Print & Stationery'],
  cover: pic('cover-stationery.webp', 'letterhead, envelope, folder and business cards'),
  preview: pic('03-app-letter.webp', 'mobile wordmark and The Advisory Letter'),
  intro: 'A complete identity for an advisory firm that guides founders and enterprises through legal, operational and structural complexity.',
  overview: 'Columns, statuary and fluting from classical architecture became a quiet navy system: a serif and sans pairing, a grain-textured palette and a mark built from intersecting arcs, carried from the letterhead to the website, social and print.',
  palette: ['#0B1E2D', '#1F325A', '#B3CFDD', '#F3F8FA', '#E3EDF2', '#FFFFFF'],
  outcome: 'One system across every touchpoint, so the firm looks as considered as the advice it gives.',
  gallery: [
    { layout: 'full', images: [pic('01-type-colour.webp', 'typography and colour palette')] },
    { layout: 'pair', images: [pic('02b-business-cards.webp', 'fluted business cards'), pic('02-cards-grid.webp', 'business card system')] },
    { layout: 'full', images: [pic('03-app-letter.webp', 'mobile wordmark and The Advisory Letter')] },
    { layout: 'full', images: [pic('04-web-responsive.webp', 'responsive website')] },
    { layout: 'full', images: [pic('05-web-details.webp', 'website hero, numbers, booking form and article')] },
    { layout: 'pair', images: [pic('06-web-inner-pages.webp', 'about, services and insights pages'), pic('07-web-mobile.webp', 'mobile pages')] },
    { layout: 'full', images: [pic('08-web-desktop.webp', 'full desktop pages')] },
    { layout: 'full', images: [pic('09-social-launch.webp', 'social launch series')] },
    { layout: 'pair', images: [pic('10-social-squares.webp', 'social posts'), pic('11-social-profile.webp', 'social profile')] },
    { layout: 'full', images: [pic('12-print.webp', 'print posters')] },
    { layout: 'full', images: [pic('13-briefing.webp', 'quarterly briefing spread')] },
  ],
};
