import type { Img } from './types';

/**
 * Unsplash photo (free licence). Hotlinked as Unsplash asks, capped at 2400px wide;
 * Next.js resizes it further per device. `by` becomes the photo credit.
 * Find a photo on unsplash.com, copy the "photo-…" id from its image URL, plus its size and photographer.
 */
export const unsplash = (id: string, w: number, h: number, alt: string, by: string): Img => ({
  src: `https://images.unsplash.com/${id}?w=2400&q=80&auto=format&fit=crop`,
  w: 2400,
  h: Math.round((2400 * h) / w),
  alt,
  credit: `${by} / Unsplash`,
});
