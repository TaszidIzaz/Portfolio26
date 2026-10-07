# Taszid Izaz — Portfolio

Next.js 16 (App Router) · React 19 · TypeScript · GSAP 3 (ScrollTrigger, SplitText) · Lenis

## Run it

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerendered as static HTML)
npm run start    # serve the production build
npm run typecheck
```

Deploy: push to GitHub and import into Vercel (zero config). Images are resized and converted to AVIF/WebP on demand there.

## Where things live

```
src/
├─ app/                     Routes. One folder = one URL.
│  ├─ layout.tsx            <html>, fonts, metadata, global chrome (topbar, dock, loader…)
│  ├─ page.tsx              Homepage: the list of sections, in scroll order
│  ├─ work/page.tsx         /work index
│  ├─ work/[slug]/page.tsx  Case-study template (one static page per project)
│  ├─ about/ approach/      Inner pages
│  ├─ insights/page.tsx     Insights index · insights/[slug] = article template
│  ├─ globals.css           Design tokens, the 3 modes, grid, type utilities
│  ├─ fonts.ts              Neue Haas Grotesk Display + mode fonts (Silk Remington, Feature Display)
│  ├─ sitemap.ts / robots.ts
│  └─ not-found.tsx         404
│
├─ content/                 ✏️  ALL copy, links, projects and image paths. Edit here first.
│  ├─ site.ts               Name, email, socials, availability, booking link
│  ├─ projects/             One file per project (list + case study) · index.ts sets the order + FEATURED_COUNT for the homepage
│  ├─ about.ts, approach.ts Inner-page copy (about is sourced from the résumé)
│  ├─ insights.ts           Facts carousel + articles (block-based body)
│  ├─ home.ts               Hero (+ scrolling reel), story (sideways design process, section 2), about, stats, ticker, expertise (stacking service cards)
│  ├─ testimonials.ts, faq.ts, navigation.ts
│  ├─ narration.ts          What the dock says per section
│  ├─ loader.ts             Intro title, status messages, slideshow images + speed
│  ├─ work.ts               /work page copy
│  ├─ themes.ts             Mode names + accent colours + per-section tones (Brutalist, Folk)
│  └─ types.ts              Shapes of the content above
│
├─ components/
│  ├─ sections/             Homepage sections (+ shared Contact, Faq, WorkRow)
│  ├─ case/                 Case-study building blocks (header, chapters, gallery, stats, next…)
│  ├─ about/ approach/ insights/   Page-specific sections
│  ├─ chrome/               Always-on UI: Topbar, Dock, Loader, Cursor, GridOverlay, ToneManager,
│                           SwissStack (Swiss: section 2 slides over the hero + sticky footer reveal)
│  ├─ ui/                   Swiss.tsx (Bauhaus shapes, marks, blur words, pixel reveal), Collage.tsx (Brutalist), Folk.tsx (Folk)
│                           Reusable pieces: PageIntro, ParallaxImage, Reveal,
│                           Button, SectionHead, SplitHeading, Odometer, TransitionLink…
│  └─ providers/            SmoothScroll (Lenis), ThemeProvider (modes + curtain wipe),
│                           PageTransitions (View Transitions API)
│
├─ hooks/                   useMagnetic, useReveal
├─ lib/                     gsap (plugin registration), grid helper, events, scramble, rich text
└─ fonts/                   WOFF2 files

public/images/
├─ projects/<slug>/         Project images (hero, 01, 02…)
├─ shots/                   Misc. work shots (deck, menu thumbs)
└─ people/                  Testimonial avatars
```

## Common edits

| I want to… | Do this |
|---|---|
| Change any text | Find it in `src/content/*` |
| Add a project | Images → `public/images/projects/<folder>/`; copy any file in `content/projects/` as a template; add it to `content/projects/index.ts`. Its case page is generated automatically |
| Add an article | Add an entry to `articles` in `content/insights.ts` (body = list of blocks: p, h2, list, quote, image) |
| Reorder / remove a homepage section | Edit the list in `app/page.tsx` |
| Add a new section | Create `components/sections/Foo.tsx` + `Foo.module.css`, add `data-narrate="foo"` and a line in `content/narration.ts`, drop `<Foo />` into `page.tsx` |
| Add a page (e.g. /about) | Create `src/app/about/page.tsx`. Topbar, dock, fonts, modes and page transitions come from `layout.tsx` automatically |
| Link between pages | Use `<TransitionLink href="/about">` — it plays the page transition. `"#id"` scrolls on the current page, `"/#id"` goes home then scrolls |
| Tweak the page transition | `app/globals.css` → "Page transitions" block (`vt-shrink`, `vt-away`, `vt-in`, `--ease-page`) |
| Change loader images / title / speed | `content/loader.ts` (each image needs its width `w` and height `h`) |
| Change the hero's scrolling images | `content/home.ts` → `hero.reel` (`size: 'tall'` = square, `'short'` = 3:2) |
| Change colours of a mode | `app/globals.css` → `html[data-theme="…"]` |
| Change type scale / spacing | `app/globals.css` → `:root` tokens |

## Typography

Three sizes only, everywhere:

| Class | Size | Use |
|---|---|---|
| `t-l` (and `.hl`) | 60px on large screens → 24px on small | Titles |
| `t-m` | 24px | Secondary text: statements, card titles, quotes, metrics (`t-m regular` for paragraphs) |
| `t-s` / `label` | 16px | Subtext, body, labels |

Headings (`t-l`, `t-m`) are Medium at −4% tracking; subtext is Roman at −2%. No italics: `*word*` in content renders muted.
Sizes live in `globals.css` (`--fs-l`, `--fs-m`, `--fs-s`); module CSS uses only those tokens.

## Case studies

Alphamark structure, images first: header → cover → services + intro → details → **gallery** (rows of 1/2/3 images or looping videos) with the testimonial after row 3 → impact → outcome → CTA → next project + discover more.
A gallery item becomes a video by adding `video: '/path.mp4'` (its `src` is the poster). Videos load and play only while on screen.
Projects done at GY6 set `studio: 'GY6'`, which shows "with GY6" in the meta.

## Conventions

- **Grid:** wrap rows in `className="grid"` and place children with `style={col('3/7', '1/-1')}` (desktop 12 cols / mobile 4 cols).
- **Italic in content:** write `*word*` in content strings; `rich()` turns it into `<em>`.
- **Animation:** import from `@/lib/gsap` and use `useGSAP(() => …, { scope: ref })`. It cleans up for you.
- **Internal links:** always `TransitionLink`, never a plain `<a>`, so page transitions and smooth scroll work.
- **Talking to the dock:** call `narrate('text')` from `@/lib/events`.
- **Mode-specific content:** `<span data-only="folk">…</span>` shows only in that mode.

## Modes

| Mode | Type | Character |
|---|---|---|
| Swiss | Neue Haas Grotesk | Black on paper: blurred keyword clouds that sharpen near the cursor (`<BlurWords>`), images that resolve from pixels as they scroll in |
| Brutalist | Silk Remington (headings −16%) | Collage: tape, clips, stamps, doodles, pictogram tiles; loud section colours |
| Almanac (id `folk`) | Feature Display (headings −4%) | Editorial + woodcut print: chunky woodcut stamps (`<Cut>`: mushrooms, pig, hen, cow, herbs, fig, pot), stamp icons, colour shards, red seal, paper fibres, halftone photos; earthy section colours |

Almanac stamps live in `components/ui/Folk.tsx` (`SHAPES`): add a shape there and it works as a `<Cut name>` and a `<FolkIcon name>`. Section-head icons per title are in `SectionHead.tsx`.
