import type { ThemeId } from './types';

/**
 * The three "modes". Colours for each live in globals.css under html[data-theme="…"].
 * `accent` is used for the curtain wipe, `bg` for the browser theme-color.
 */
export const THEMES: { id: ThemeId; name: string; accent: string; bg: string; quip: string }[] = [
  { id: 'swiss', name: 'Swiss', accent: '#0E0E0E', bg: '#FFFFFF', quip: 'Black lines, clean grid, a little Bauhaus.' },
  { id: 'brutalist', name: 'Brutalist', accent: '#2D5BD8', bg: '#EFE8D8', quip: 'Cut, paste, print. Repeat.' },
  { id: 'folk', name: 'Almanac', accent: '#6F7A35', bg: '#E7E0D0', quip: 'Woodcuts, warm paper, slow seasons.' },
];

export const DEFAULT_THEME: ThemeId = 'swiss';
export const THEME_STORAGE_KEY = 'ti-theme';

export interface Tone { id: string; bg: string; fg: string; accent: string; onAccent: string }

/**
 * Brutalist mode: every narrated section gets its own colour, cycling through these.
 * The page fades between them as you scroll (see components/chrome/ToneManager).
 */
export const BRUTALIST_TONES: Tone[] = [
  { id: 'paper', bg: '#EFE8D8', fg: '#141414', accent: '#2D5BD8', onAccent: '#F4EFE4' },
  { id: 'cobalt', bg: '#2D5BD8', fg: '#F4EFE4', accent: '#F2C230', onAccent: '#141414' },
  { id: 'mustard', bg: '#F2C230', fg: '#141414', accent: '#E8452C', onAccent: '#F4EFE4' },
  { id: 'tomato', bg: '#EC5B2B', fg: '#141414', accent: '#F4EFE4', onAccent: '#141414' },
  { id: 'pink', bg: '#F6A9C8', fg: '#141414', accent: '#2D5BD8', onAccent: '#F4EFE4' },
  { id: 'mint', bg: '#3FCF8E', fg: '#141414', accent: '#F6A9C8', onAccent: '#141414' },
  { id: 'kraft', bg: '#B48A57', fg: '#1A120B', accent: '#F4EFE4', onAccent: '#1A120B' },
  { id: 'ink', bg: '#141414', fg: '#EFE8D8', accent: '#EC5B2B', onAccent: '#141414' },
];

/** Folk mode: earthy, printed-paper colours (bone, olive, kraft, sage, rust…), same scroll fade. */
export const FOLK_TONES: Tone[] = [
  { id: 'bone', bg: '#E7E0D0', fg: '#262A1E', accent: '#6F7A35', onAccent: '#F2EDE2' },
  { id: 'olive', bg: '#262D20', fg: '#E7E0D0', accent: '#C9C65C', onAccent: '#262D20' },
  { id: 'kraft', bg: '#B08A60', fg: '#23180E', accent: '#F2EBDD', onAccent: '#23180E' },
  { id: 'sage', bg: '#AEBBA0', fg: '#1E2318', accent: '#7A3E24', onAccent: '#F2EBDD' },
  { id: 'rust', bg: '#6F3A23', fg: '#F0E6D2', accent: '#E0C86A', onAccent: '#2A1A10' },
  { id: 'chartreuse', bg: '#C6C162', fg: '#22261A', accent: '#F3EEE2', onAccent: '#22261A' },
  { id: 'sky', bg: '#A9C0E0', fg: '#1D2433', accent: '#6F3A23', onAccent: '#F2EBDD' },
  { id: 'moss', bg: '#4B5733', fg: '#EEE6D3', accent: '#E8B98F', onAccent: '#2A2418' },
];

/** Swiss mode: paper and near-black. Sections stack over each other (SwissStack); this drives the top bar + dock. */
export const SWISS_TONES: Tone[] = [
  { id: 'paper', bg: '#FFFFFF', fg: '#0E0E0E', accent: '#0E0E0E', onAccent: '#FFFFFF' },
  { id: 'ink', bg: '#0B0B0B', fg: '#FFFFFF', accent: '#FFFFFF', onAccent: '#0B0B0B' },
];

/** Modes whose sections change colour on scroll. */
export const SECTION_TONES: Partial<Record<ThemeId, Tone[]>> = { swiss: SWISS_TONES, brutalist: BRUTALIST_TONES, folk: FOLK_TONES };


/** Swiss: which sections turn black (by data-narrate id). Everything else stays paper. */
export const SWISS_DARK_SECTIONS = ['deck', 'expertise', 'contact', 'timeline', 'caseNext'];

/** Which tone a section gets. Default: cycle through the mode's tones in page order. */
export const TONE_PICK: Partial<Record<ThemeId, (narrateId: string, index: number) => number>> = {
  swiss: (id) => (SWISS_DARK_SECTIONS.includes(id) ? 1 : 0),
};
