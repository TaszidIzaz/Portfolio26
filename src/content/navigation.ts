import { projects } from './projects';

/**
 * Site navigation (dock menu + top bar).
 * "/work" = page transition · "#contact" = scroll on this page · "/#about" = go home, then scroll.
 */
export const navigation = [
  { label: 'Index', href: '/', thumb: '/images/shots/shot-10.jpg', chips: [] as string[] },
  { label: 'Work', href: '/work', thumb: '/images/projects/fizclo/hero.jpg', chips: [`${projects.length} projects`] },
  { label: 'About', href: '/about', thumb: '/images/shots/shot-1.jpg', chips: [] as string[] },
  { label: 'Approach', href: '/approach', thumb: '/images/projects/profyl/hero.jpg', chips: ['Process', 'Services'] },
  { label: 'Insights', href: '/insights', thumb: '/images/projects/paperless/cover.jpg', chips: ['Notes'] },
  { label: 'Contact', href: '#contact', thumb: '/images/projects/teez/cover.jpg', chips: ['Book a call'] },
];

/** Top bar links */
export const topNav = navigation.filter((n) => ['Work', 'About', 'Approach', 'Insights'].includes(n.label));
