import type { Img } from '../types';

/** Shorthand for an image in /public/images/projects/<folder>/ */
export const img = (folder: string, file: string, w: number, h: number, alt: string): Img => ({
  src: `/images/projects/${folder}/${file}`,
  w,
  h,
  alt,
});
