import localFont from 'next/font/local';

/**
 * Neue Haas Grotesk Display — self-hosted, preloaded, with a size-adjusted
 * fallback so text doesn't jump when the font arrives.
 */
export const neueHaas = localFont({
  src: [
    { path: '../fonts/NeueHaasDisplay-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/NeueHaasDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/NeueHaasDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-nhd',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
});

/** Silk Remington — the Brutalist mode's typewriter face (headings, labels, buttons). */
export const remington = localFont({
  src: [{ path: '../fonts/SilkRemington-SemiBold.woff2', weight: '400', style: 'normal' }],
  variable: '--font-remington',
  display: 'swap',
  preload: false, // only needed when Brutalist mode is on
  // The font has blank glyphs for curly quotes, dashes, ·, •, © — limit it to what it draws,
  // so those characters fall back to Neue Haas instead of disappearing.
  declarations: [{ prop: 'unicode-range', value: 'U+0020-007E, U+00A0-00A8, U+00AA-00B6, U+00B8-00FF, U+2026' }],
  fallback: ['ui-monospace', 'monospace'],
});

/** Feature Display — the Folk mode's editorial serif (headings). */
export const featureDisplay = localFont({
  src: [{ path: '../fonts/FeatureDisplay-Regular.woff2', weight: '400', style: 'normal' }],
  variable: '--font-feature',
  display: 'swap',
  preload: false, // only needed when Folk mode is on
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
