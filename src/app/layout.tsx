import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Cursor } from '@/components/chrome/Cursor';
import { Dock } from '@/components/chrome/Dock';
import { GridOverlay } from '@/components/chrome/GridOverlay';
import { Loader } from '@/components/chrome/Loader';
import { SwissStack } from '@/components/chrome/SwissStack';
import { ToneManager } from '@/components/chrome/ToneManager';
import { FolkDefs } from '@/components/ui/Folk';
import { Topbar } from '@/components/chrome/Topbar';
import { PageTransitions } from '@/components/providers/PageTransitions';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeProvider, themeInitScript } from '@/components/providers/ThemeProvider';
import { site } from '@/content/site';
import { DEFAULT_THEME, THEMES } from '@/content/themes';
import { featureDisplay, neueHaas, remington } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.roleLong}`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.roleLong}`,
    description: site.description,
    images: ['/images/projects/algorizin/hero.jpg'],
  },
  twitter: { card: 'summary_large_image', creator: '@TaszidI' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: THEMES.find((t) => t.id === DEFAULT_THEME)!.bg,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} className={`${neueHaas.variable} ${remington.variable} ${featureDisplay.variable}`} suppressHydrationWarning>
      <body>
        {/* Applies the saved mode before hydration so there's no flash */}
        <Script id="theme-init" strategy="beforeInteractive">{themeInitScript}</Script>
        <a className="skip" href="#main">Skip to content</a>
        <ThemeProvider>
          <SmoothScroll>
            <PageTransitions>
              <Loader />
              <ToneManager />
              <FolkDefs />
              <GridOverlay />
              <Cursor />
              <Topbar />
              <main id="main">{children}</main>
              <SwissStack />
              <Dock />
            </PageTransitions>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
