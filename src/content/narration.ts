/** What the dock says while each section is on screen. Keys match `data-narrate` ids. */
export const narration = {
  hero: 'Hi, welcome in. Shoes off, please.',
  deck: 'From “I have an idea” to “Oh, this is it.”',
  about: 'Human first, AI second.',
  numbers: 'Numbers, minus the hype.',
  work: 'Made faster, finished by hand.',
  expertise: 'Four ways I can help.',
  toolbox: 'Tools, old and new.',
  testimonials: 'Words from real humans.',
  faq: 'Ask me anything. Yes, even about AI.',
  contact: 'End of the scroll. Start of something?',
  workIndex: 'The full archive. Take your time.',
  caseStudy: 'A closer look. Scroll for the full story.',
  caseNext: 'One more? There’s always one more.',
  aboutPage: 'The human in the loop.',
  journey: 'Follow the line. It’s a short story.',
  favourites: 'Stories first, screens second.',
  timeline: 'A short history, in years.',
  approachPage: 'How AI fits into the work.',
  services: 'What I can help with.',
  insightsPage: 'Notes on designing with AI.',
  article: 'Reading time. Get comfortable.',
} as const;

export type NarrationId = keyof typeof narration;
