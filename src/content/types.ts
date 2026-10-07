export type ThemeId = 'swiss' | 'brutalist' | 'folk';

/** Text fields support *italic* via `rich()`. */
export type RichText = string;

/** Image with intrinsic size (needed for natural-ratio layouts). */
export interface Img {
  /** Image, or the poster frame when `video` is set */
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Optional looping, muted MP4 shown instead of the still */
  video?: string;
  /** Photographer credit for stock photos, e.g. "Hal Gatewood / Unsplash" */
  credit?: string;
}

/** Image strip on list rows (home + /work). a = wide, b = narrow, c = medium. */
export type ProjectImage =
  | { kind: 'image'; src: string; alt: string; width: 'a' | 'b' | 'c' }
  | { kind: 'nda'; width: 'a' | 'b' | 'c' };

/** Case-study gallery row: 1, 2 or 3 images across. */
export interface GalleryRow {
  layout: 'full' | 'pair' | 'trio';
  images: Img[];
}

export interface Project {
  slug: string;
  title: string;
  /** One-liner used in lists */
  summary: string;
  tags: string[];
  /** Short kind of work for the grid caption, e.g. "Rebrand & Website" (falls back to the first tag) */
  type?: string;
  year?: number;
  metric?: { value: string; label: string };
  /** Strip shown on list rows */
  images: ProjectImage[];

  /* ---- Case study ---- */
  client: string;
  role: string;
  /** Studio the work was done with, e.g. "GY6" */
  studio?: string;
  industry: string[];
  services: string[];
  live?: { label: string; href: string };
  cover: Img;
  /** Visual that floats centred over the cover in the work lists (defaults to the first video, else the first other still) */
  preview?: Img;
  /** Statement under the cover (keep it to one or two sentences) */
  intro: string;
  /** Optional short paragraph; the rest of the story is told with images */
  overview?: string;
  stats?: { value: string; label: string }[];
  palette?: string[];
  /** Closing statement */
  outcome?: string;
  testimonial?: Testimonial;
  /** The case study itself: rows of images / videos, top to bottom */
  gallery: GalleryRow[];
  nda?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Faq {
  q: string;
  a: string;
}
