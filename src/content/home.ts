import type { DoodleName } from '@/components/ui/Collage';
import type { FolkShape } from '@/components/ui/Folk';
import type { Picto } from '@/components/sections/StoryTile';
import type { ThemeId } from './types';

/** Hero copy for the homepage. */
export const hero = {
  /** Headline lines; the final italic word swaps per mode. */
  lines: ['AI-speed design,', 'steered by human', 'judgement\u00a0&'],
  swap: { swiss: 'taste.', brutalist: 'grit.', folk: 'soul.' } satisfies Record<ThemeId, string>,
  lede: 'AI helps me research, explore and prototype in days instead of weeks. My experience decides what stays, and the finishing touches are always done by hand.',
  cta: 'Let’s discuss your project',
  /** Swiss mode: blurred keyword cloud behind the hero (sharpens near the cursor) */
  words: ['Product design', 'UX/UI', 'Creative direction', 'AI prototyping', 'Research', 'Branding', 'Motion', 'Strategy', '(with AI)'],
  /** Auto-scrolling reel under the hero. `tall` cards are square, `short` ones are 2:3 height. */
  reel: [
    { src: '/images/shots/bespoke.webp', alt: 'Bespoke tailoring website, editorial layout', size: 'tall' },
    { src: '/images/projects/bsic/cover.jpg', alt: 'BSIC launch identity', size: 'short' },
    { src: '/images/shots/lumera.webp', alt: 'Luméra skincare product page', size: 'tall' },
    { src: '/images/shots/obsidian.webp', alt: 'Obsidian Advisory website', size: 'short' },
    { src: '/images/projects/storyflow/01-poster.jpg', alt: 'Storyflow website', size: 'tall' },
    { src: '/images/shots/arbok.webp', alt: 'Arbok Furniture website', size: 'short' },
    { src: '/images/shots/editorial.webp', alt: 'Fashion editorial website', size: 'tall' },
    { src: '/images/projects/revora/cover.jpg', alt: 'Revora', size: 'short' },
    { src: '/images/shots/loungewear.webp', alt: 'Loungewear online shop', size: 'tall' },
    { src: '/images/shots/qredibility.webp', alt: 'Qredibility recruitment website', size: 'short' },
    { src: '/images/projects/paperless/cover.jpg', alt: 'Paperless brand identity', size: 'tall' },
    { src: '/images/shots/fizclo-orders.webp', alt: 'FIZCLO order details dashboard', size: 'short' },
    { src: '/images/shots/designer-portfolio.webp', alt: 'Product designer portfolio website', size: 'tall' },
    { src: '/images/shots/insights-blog.webp', alt: 'Insights blog section', size: 'short' },
  ] as { src: string; alt: string; size: 'tall' | 'short' }[],
};

/**
 * Second section: the design process told sideways (after catalyst.app), in Taszid's own words.
 * Seven days, start to finish (research takes two). Each step has a short story, a highlighted
 * line (`quote`), an illustration tile (`picto` + `tone`, see components/sections/StoryTile) and
 * stickers per mode: swiss: a typographic sticker · brutalist: a rubber stamp + doodle · folk (Almanac): a woodcut stamp.
 * `visual`: 'fan' fans out the moodboard tiles, 'bin' drops the layout drafts that didn't make it.
 */
type Stickers = { swiss: string; brutalist: { stamp: string; doodle: DoodleName }; folk: FolkShape };
type StoryStep = {
  word: string; days: number[]; kicker: string; title: string; text: string; quote: string; stickers: Stickers;
  picto?: Picto; tone: number; visual?: 'fan' | 'bin'; log?: [string, string][]; cta?: { label: string; href: string };
};

export const story = {
  label: '(How we get from)',
  title: '“I have an idea…”',
  titleEm: '→ “Oh, this is it.”',
  lede: 'I like to keep things simple. You bring the idea, I bring the questions, curiosity and a slightly unhealthy obsession with making things feel right.',
  hint: 'Seven days, roughly. Scroll sideways',
  steps: [
    {
      word: 'Talk', days: [1], kicker: 'Before I open Figma', picto: 'talk', tone: 0,
      title: 'First, let’s talk.',
      text: 'We hop on a call and I hear the idea in your words. What are you building? What do you love? What do you hate? I might even ask what you like to eat, because those little things tell me a lot about your taste.',
      quote: 'Design is a language. If you don’t speak it, that’s okay. I’ll translate it until you say, “Yep. That’s exactly what I meant.”',
      stickers: { swiss: 'So… what do you like to eat?', brutalist: { stamp: 'LET’S TALK • NO PREP NEEDED • ', doodle: 'smiley' }, folk: 'pot' },
    },
    {
      word: 'Research', days: [2, 3], kicker: 'Down the rabbit hole', picto: 'research', tone: 1,
      title: 'Then I go down the rabbit hole.',
      text: 'Ideas, patterns, culture, behaviour, and inspiration from places you wouldn’t expect. One thing I deliberately don’t do much: obsess over competitors. I don’t want to design a slightly prettier version of what everyone else made.',
      quote: 'The goal? Find something that feels like you, not everyone else.',
      stickers: { swiss: 'Competitor screenshots: 0', brutalist: { stamp: 'NO COPYCATS • FRESH CANVAS • ', doodle: 'scribble' }, folk: 'rabbit' },
    },
    {
      word: 'Moodboard', days: [4], kicker: 'My favourite part', tone: 2,
      title: 'Now we get to play.',
      text: 'I collect the pieces of the world we’re creating: colours, type, imagery, textures, layouts, motion and little sparks of inspiration. If the site needs it, I storyboard the experience too.',
      quote: 'First, “What should this feel like?” Only then, “What should this button look like?”',
      visual: 'fan',
      stickers: { swiss: 'Feel first. Buttons later.', brutalist: { stamp: 'MOODBOARD • PLAY TIME • ', doodle: 'star' }, folk: 'fig' },
    },
    {
      word: 'Iterate', days: [5], kicker: 'Ideas meet reality', tone: 3,
      title: 'Okay, now let’s make it work.',
      text: 'Wireframes, user flows, different approaches. Move it here. Try it there. Nope. What if we did this? We iterate until the experience starts to click.',
      quote: 'Pretty is nice. Pretty and effortless? That’s the sweet spot.',
      visual: 'bin',
      stickers: { swiss: 'Nope. Nope. Ooh, yes.', brutalist: { stamp: 'NOPE • TRY AGAIN • NOPE • ', doodle: 'arrow' }, folk: 'hen' },
    },
    {
      word: 'Polish', days: [6], kicker: 'Lights on', picto: 'polish', tone: 4,
      title: 'Time to turn the lights on.',
      text: 'High-fidelity design, typography, colour, components, imagery, motion and the tiny details that make something feel finished. This is where the rough idea becomes a real product.',
      quote: 'Yes, I obsess over 4px of spacing nobody will consciously notice. But they’ll feel it.',
      log: [
        ['09:12', 'Nudged the spacing 4px'],
        ['10:30', 'Swapped the typeface'],
        ['11:05', 'Tuned the easing'],
        ['13:40', 'Rewrote one button label'],
        ['15:20', 'Nudged the spacing 4px (again)'],
        ['16:45', 'Nobody will notice. They’ll feel it.'],
      ],
      stickers: { swiss: '+4px (you’ll feel it)', brutalist: { stamp: '4PX MATTERS • DETAILS • ', doodle: 'asterisk' }, folk: 'candle' },
    },
    {
      word: 'Real', days: [7], kicker: 'And then… the good part', picto: 'real', tone: 5,
      title: 'Something unmistakably you.',
      text: 'You don’t really pay me to make screens. You pay me to take the thing living in your head and make it real. Something useful. Something beautiful. Something people remember.',
      quote: 'You bring the idea. I’ll help make it unforgettable.',
      cta: { label: 'Bring me your idea', href: 'https://cal.com/taszid-izaz/onboarding-meeting' },
      stickers: { swiss: '“Yep. That’s exactly what I meant.”', brutalist: { stamp: 'UNFORGETTABLE • MADE WITH YOU • ', doodle: 'star' }, folk: 'heart' },
    },
  ] satisfies StoryStep[],
  /** Mini tiles that fan out in step 03: the pieces of a moodboard */
  moodboard: ['palette', 'type', 'image', 'layout', 'motion', 'dots', 'spark'] satisfies Picto[],
  /** How many layout drafts pile up in step 04 (all but one get binned) */
  drafts: 7,
};


export const about = {
  notes: [
    { label: 'How I work', text: 'AI takes on the heavy lifting: synthesis, variations, first drafts. That frees my time for the decisions that matter.' },
    { label: 'What stays human', text: 'Taste, empathy and judgement. AI can suggest a hundred options; it can’t tell you which one your users will trust.' },
    { label: 'Availability', text: 'Open to freelance projects and full-time roles.' },
  ],
};

export const stats = [
  { value: '5', suffix: '+', label: 'Years of design judgement\nbehind every AI draft' },
  { value: '50', suffix: '+', label: 'Brands worked with,\nfrom Dhaka to Miami' },
  { value: '10', suffix: '+', label: 'AI-powered products\nbuilt' },
  { value: '7', suffix: '\u00a0days', label: 'From first call to a\ntested prototype' },
];

export const ticker = [
  'AI-enabled product design',
  'Faster iterations',
  'Human judgement',
  'Based in Dhaka, working worldwide',
  'Landing pages from $499',
];

/**
 * Services: cards that stack over each other as you scroll (after storeyarchitecture.co.uk).
 * Each has a short description, the things it covers, and an image of real work.
 */
export const expertise = {
  title: 'Ways I can *help.*',
  intro: 'I work across brand, web, product and creative direction, for teams who want their digital product to feel considered from every angle.',
  services: [
    {
      title: 'Brand & Visual Systems',
      text: 'Identities that hold together everywhere they show up, from the logo to the last social post.',
      points: ['Logo & Identity Systems', 'Visual Identity Development', 'Brand Design Systems', 'Art & Illustration', 'Packaging Design', 'Brand Applications (Digital & Physical)'],
      loop: 'brand' as const,
    },
    {
      title: 'Website Design & Development',
      text: 'Websites that look considered and are built to perform: designed in Figma, built in Next.js or Webflow, shipped fast with AI in the loop.',
      points: ['Marketing & Landing Pages', 'Portfolio & Editorial Sites', 'E-commerce & Product Pages', 'Web Design Systems', 'Motion & Interaction', 'Development in Next.js & Webflow'],
      loop: 'web' as const,
    },
    {
      title: 'Product & Interaction Design',
      text: 'Apps and platforms people understand on first use, researched, prototyped and tested before anything gets built.',
      points: ['UX Research & Strategy', 'User Flows & Information Architecture', 'Wireframes & Prototypes', 'UI Design for Web & Mobile Apps', 'Dashboards & SaaS Platforms', 'AI Product UX'],
      loop: 'product' as const,
    },
    {
      title: 'Creative Direction for Digital Products',
      text: 'One story, look and feel across every team and touchpoint, the way I lead creative at GY6.',
      points: ['Creative Strategy & Concepts', 'Art Direction', 'Campaign & Launch Visuals', 'Design Team Leadership', 'Quality & Consistency Reviews', 'Storytelling & Motion Direction'],
      loop: 'direction' as const,
    },
  ],
};
