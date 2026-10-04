import type { ArtSubject } from '@/components/insights/InsightArt';

/**
 * /insights — facts carousel + articles.
 *
 * Articles follow one structure (after baselayer.com/resources): title + subtitle, meta (author, category,
 * dates, reading time), cover, intro, key takeaways, sections (each becomes an "In this article" link),
 * FAQ (also published as FAQ structured data for search). Reading time is calculated from the words.
 *
 * Inline text supports *muted emphasis* and [links](/work/paperless). Internal links help SEO, so
 * point to case studies, /approach and other articles where it's natural.
 */
export const insightsPage = {
  label: '(Insights)',
  title: 'Notes on designing *with AI.*',
  lede: 'Ideas on AI product design, fast iteration and prototyping, plus the laws of UX and Gestalt principles I design by, in plain words.',
  factsTitle: 'Some numbers are just that, *numbers.*',
  description:
    'Laws of UX, Gestalt principles and guides on AI product design, designing with Claude, fast iteration and prototyping, by product designer Taszid Izaz.',
};

/** Before/after bars are relative (before = 100). */
export const facts = [
  { lead: 'AI talent matching cut', highlight: 'time-to-hire by 40%', rest: 'for recruiters on Profyl.ai.', before: 100, after: 60, beforeLabel: 'Before', afterLabel: 'With AI matching', source: 'Profyl.ai case study', href: '/work/profyl-ai' },
  { lead: 'Personalised recommendations lifted', highlight: 'average order value by 45%', rest: 'at FIZCLO.', before: 100, after: 145, beforeLabel: 'Before', afterLabel: 'Personalised', source: 'FIZCLO case study', href: '/work/fizclo-ecommerce' },
  { lead: 'The same work brought', highlight: 'cart abandonment down 35%', rest: 'on the new store.', before: 100, after: 65, beforeLabel: 'Before', afterLabel: 'After redesign', source: 'FIZCLO case study', href: '/work/fizclo-ecommerce' },
];

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  /** Pull quote, shown in the right margin next to the text that follows */
  | { type: 'quote'; text: string }
  /** Generated illustration (see components/insights/InsightArt) */
  | { type: 'art'; subject: ArtSubject; caption?: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  /** Boxed aside, e.g. a prompt example */
  | { type: 'callout'; title: string; text: string };

export interface ArticleSection {
  /** Anchor id, used by the "In this article" links */
  id: string;
  title: string;
  blocks: Block[];
}

export const CATEGORIES = ['AI Design', 'Process', 'Prototyping', 'Research', 'Case Notes', 'Laws of UX', 'Gestalt'] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Article {
  slug: string;
  title: string;
  /** One-line dek under the title */
  subtitle: string;
  /** Meta description for search results (~150–160 characters) */
  description: string;
  date: string; // ISO, published
  updated?: string; // ISO
  category: Category;
  tags: string[];
  /** Search phrases this article should rank for */
  keywords: string[];
  /** Cover illustration subject (generated art; the share image is generated from the title) */
  art: ArtSubject;
  intro: string[];
  takeaways: string[];
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
}

export const articles: Article[] = [
  /* Ideas (blog posts) */
  /* ------------------------------------------------------------------ */
  {
    slug: 'from-prompt-to-prototype-with-ai',
    title: 'From Prompt to Prototype: Building Clickable Prototypes with AI in Hours',
    subtitle: 'Why I prototype in real code early, how AI makes that possible for designers, and how to keep the result from looking like everyone else’s.',
    description: 'How designers go from prompt to clickable prototype in hours with AI tools like Claude, when coded prototypes beat Figma, and how to avoid generic AI output.',
    date: '2026-10-01',
    category: 'Prototyping',
    tags: ['AI Prototyping', 'Claude', 'Design Process'],
    keywords: ['AI prototyping', 'prompt to prototype', 'clickable prototype with AI', 'AI prototype tools for designers', 'vibe coding for designers', 'coded prototypes', 'prototype with Claude'],
    art: 'cursorCode',
    intro: [
      'A prototype only earns its keep when it answers a question. For years the fastest way to answer one was a linked set of Figma frames. It still works, but it has a ceiling: no real data, no real typing, no real performance, and a lot of “imagine this part works”.',
      'AI has moved that ceiling. With a clear prompt and a good starting sketch, I can have a working, clickable prototype in a browser in a few hours, then spend the rest of the day making it feel right. This guide covers the workflow I use, when it beats a Figma prototype, and how to stop it looking like every other AI-generated screen.',
    ],
    takeaways: [
      'AI tools like Claude can turn a sketch and a clear brief into a working, clickable prototype in hours rather than days.',
      'Coded prototypes are worth it when you need real data, real input, or real devices to answer the question.',
      'Describe the job and the constraints in your prompt, not just the look. The structure matters more than the styling.',
      'The generic “AI look” goes away when a designer applies the type, spacing and brand decisions by hand.',
      'Prototype code is for learning. Treat it as disposable unless it was built with production in mind.',
    ],
    sections: [
      {
        id: 'why-code',
        title: 'Why prototype in code at all?',
        blocks: [
          { type: 'p', text: 'Because some questions can’t be answered with pictures. Does the search feel fast with 2,000 real products? Does the onboarding still make sense when someone types a long company name? Does the checkout hold up on a mid-range Android phone? A coded prototype answers those directly, and people test it like the real thing because it behaves like the real thing.' },
          { type: 'p', text: 'Until recently, coded prototypes meant borrowing an engineer for a week. Now a designer who can describe a product clearly can get most of the way there with AI, and keep design decisions in design hands.' },
        ],
      },
      {
        id: 'figma-vs-code',
        title: 'Figma prototype vs. AI-coded prototype',
        blocks: [
          { type: 'p', text: 'Neither replaces the other. I still explore and finish visuals in Figma. The question is which one answers today’s question faster.' },
          {
            type: 'table',
            head: ['', 'Figma prototype', 'AI-coded prototype'],
            rows: [
              ['Best for', 'Visual direction, layout, early flows', 'Real interactions, data, devices'],
              ['Speed to first version', 'Minutes to hours', 'Hours'],
              ['Real input and data', 'Faked', 'Real'],
              ['Feels like the product', 'Mostly', 'Yes'],
              ['Visual polish', 'High', 'Needs a designer’s pass'],
              ['Reusable for production', 'No', 'Sometimes, if planned for'],
            ],
          },
        ],
      },
      {
        id: 'workflow',
        title: 'My prompt-to-prototype workflow',
        blocks: [
          { type: 'h3', text: '1. Start from a sketch, not a blank prompt' },
          { type: 'p', text: 'A rough wireframe or even a photo of a napkin sketch gives the model structure to follow. Tools like Claude can read images, so the sketch becomes part of the brief.' },
          { type: 'h3', text: '2. Describe the job, not the look' },
          { type: 'p', text: 'I describe who the user is, what they are trying to do, what data the screen shows and what happens on every action. Styling comes later. A prompt that says “modern and clean” gets you the same screen everyone else gets.' },
          {
            type: 'callout',
            title: 'A prompt I reuse',
            text: 'Build a clickable prototype of [screen] for [user] who needs to [job]. It shows [data]. Primary action: [action], which leads to [result]. Include empty, loading and error states. Use plain HTML/CSS with simple components. Keep styling neutral; I’ll apply the brand myself.',
          },
          { type: 'h3', text: '3. Generate the skeleton, then edit like a designer' },
          { type: 'p', text: 'The first output is a skeleton. I go through it the way I would review a junior’s work: hierarchy, spacing, states, copy. Most of the value I add happens here.' },
          { type: 'quote', text: 'The model gets you a working screen. The designer makes it the right screen.' },
          { type: 'h3', text: '4. Bring it on-brand by hand' },
          { type: 'p', text: 'I set the type scale, colour tokens and spacing rules myself, then apply them everywhere. This is the single biggest difference between a generic AI prototype and one that feels designed.' },
          { type: 'h3', text: '5. Fill it with real content and test it' },
          { type: 'p', text: 'Real product names, real prices, real error messages. Then it goes in front of people on their own devices, which is the whole point of building it in code.' },
          { type: 'art', subject: 'window', caption: 'Start from structure: a rough layout is the best prompt you can give.' },
        ],
      },
      {
        id: 'avoid-generic',
        title: 'How to avoid the generic AI look',
        blocks: [
          { type: 'list', items: [
            'Decide the type scale and stick to it. Fewer sizes, used consistently, reads as intentional.',
            'Replace default components with your own patterns once the flow is right.',
            'Write the copy yourself. Default AI copy is polite, vague and recognisable.',
            'Remove things. Generated screens tend to add cards, badges and gradients you never asked for.',
            'Look at it on a phone before you call it done.',
          ] },
        ],
      },
      {
        id: 'when-not',
        title: 'When not to prototype in code',
        blocks: [
          { type: 'p', text: 'If the question is “which visual direction do we like?”, code is slower than a few Figma frames. If the team will mistake a prototype for a finished product and want to ship it, set expectations first. And if the prototype needs real customer data, check what you are allowed to use before you paste anything into any tool.' },
          { type: 'p', text: 'For a sense of how this fits into a full engagement, see [how I work](/approach). This site itself is an example: it was built in Next.js with Claude Code, and every interaction was reviewed and adjusted by eye.' },
        ],
      },
    ],
    faq: [
      { q: 'Do designers need to know how to code to prototype with AI?', a: 'No, but it helps to read code a little. You need to describe behaviour precisely and spot when something is wrong. The AI does the typing; you do the deciding.' },
      { q: 'Can an AI-built prototype go straight to production?', a: 'Usually not. Prototype code is written to answer a question quickly. If you want to reuse it, plan for that from the start with a proper framework, components and an engineer reviewing the code.' },
      { q: 'Which AI tools are best for prototyping?', a: 'I mostly use Claude, for both quick HTML prototypes and larger builds with Claude Code. The best tool is the one that lets you describe behaviour clearly and edit the result easily.' },
      { q: 'How long does it take to build a clickable prototype with AI?', a: 'A focused flow of three to five screens typically takes a few hours to get working and another few hours to make it feel right and test-ready.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'designing-with-claude-product-designer-workflow',
    title: 'Designing with Claude: A Product Designer’s Practical Workflow',
    subtitle: 'How I use Claude across research, UX writing, prototyping and design QA, and where I deliberately keep it out of the loop.',
    description: 'How a product designer uses Claude for UX research synthesis, user flows, UX copy, interactive prototypes and design QA, with reusable prompts and clear limits.',
    date: '2026-09-29',
    category: 'AI Design',
    tags: ['Claude', 'AI Tools', 'UX Design'],
    keywords: ['design with Claude', 'Claude for designers', 'Claude for UX design', 'Claude AI product design', 'Claude prompts for designers', 'AI UX writing', 'Claude Code for designers'],
    art: 'bubble',
    intro: [
      'Most “AI for designers” advice is a list of tools. This is the opposite: one tool, used every day, across a real product design process. I use Claude because it handles long documents well, writes carefully, reads screenshots and can build working prototypes. That covers a surprising amount of a designer’s week.',
      'Below is where it fits in my workflow, the prompts I reuse, and the parts of the job I keep for myself on purpose.',
    ],
    takeaways: [
      'Claude is most useful for the slow, mechanical parts of design: synthesis, first drafts, variations and prototype code.',
      'Its long context makes it good at research synthesis across many interview transcripts or documents at once.',
      'It can read screenshots, which makes it a useful second pair of eyes for design QA and accessibility checks.',
      'Claude can build interactive prototypes, and Claude Code can build real front-ends. This site was built with it.',
      'Taste, brand decisions, real user testing and accountability stay with the designer.',
    ],
    sections: [
      {
        id: 'why-claude',
        title: 'Why Claude, specifically?',
        blocks: [
          { type: 'p', text: 'Three things make it fit design work. It can hold a lot of material at once, so a full set of interview notes or a long product spec fits in one conversation. It writes in a measured, editable way, which matters for UX copy. And it can turn a description into working code, which closes the gap between an idea and something you can click.' },
          { type: 'p', text: 'None of that replaces design skill. It removes the waiting between decisions.' },
        ],
      },
      {
        id: 'research',
        title: '1. Research synthesis',
        blocks: [
          { type: 'p', text: 'After interviews, I give Claude the anonymised transcripts and ask for themes, each backed by direct quotes. The quotes are the important part: they let me check every theme against what people actually said. I then regroup and rename the themes myself, because deciding what matters is the research.' },
          { type: 'callout', title: 'Prompt', text: 'Here are 8 anonymised interview transcripts about [topic]. List the recurring problems people describe. For each, give 2–3 verbatim quotes with the participant number. Flag anything only one person said. Don’t suggest solutions yet.' },
          { type: 'p', text: 'More on where AI helps research and where it doesn’t in [AI for UX research](/insights/ai-for-ux-research-what-to-automate).' },
        ],
      },
      {
        id: 'flows',
        title: '2. User flows and information architecture',
        blocks: [
          { type: 'p', text: 'Given the research and the business goal, I ask for three different flow structures with the trade-offs of each. I rarely take one as-is, but comparing three side by side shows me the decision I actually need to make.' },
        ],
      },
      {
        id: 'copy',
        title: '3. UX writing and microcopy',
        blocks: [
          { type: 'p', text: 'Error messages, empty states, onboarding steps, button labels. I write the voice guidelines, then ask for variations within them and pick or rewrite. It is fast for volume, and the guidelines keep it from sounding generic.' },
          { type: 'quote', text: 'AI drafts quickly. Good copy still comes from knowing exactly who is reading it.' },
        ],
      },
      {
        id: 'prototypes',
        title: '4. From sketch to interactive prototype',
        blocks: [
          { type: 'p', text: 'Claude can build small interactive prototypes straight from a description or a sketch, and Claude Code can work inside a real codebase. I use the first for testing flows and the second for builds like this portfolio, which was made in Next.js with Claude Code while I made the design decisions.' },
          { type: 'art', subject: 'cursorCode', caption: 'Sketch, describe, generate, then edit like a designer.' },
          { type: 'p', text: 'The full workflow is in [From prompt to prototype](/insights/from-prompt-to-prototype-with-ai).' },
        ],
      },
      {
        id: 'qa',
        title: '5. Design QA and accessibility checks',
        blocks: [
          { type: 'p', text: 'I paste a screenshot and ask for a critique against specific criteria: hierarchy, consistency, contrast, touch target sizes, unclear labels. It catches things I have stopped seeing. I confirm anything important with proper tools, like a contrast checker and a real screen reader.' },
        ],
      },
      {
        id: 'split',
        title: 'Who does what',
        blocks: [
          {
            type: 'table',
            head: ['Task', 'Claude', 'Me'],
            rows: [
              ['Interview synthesis', 'First-pass themes with quotes', 'Final themes and priorities'],
              ['User flows', 'Alternative structures', 'The chosen flow and why'],
              ['UX copy', 'Variations within guidelines', 'Voice, final wording'],
              ['Prototypes', 'Working code', 'Interaction quality, brand, states'],
              ['Design QA', 'A critical second look', 'Verification and fixes'],
            ],
          },
        ],
      },
      {
        id: 'limits',
        title: 'Where I keep Claude out',
        blocks: [
          { type: 'list', items: [
            'Final visual decisions. Taste and brand fit are the job, and the reason clients hire a designer.',
            'Talking to users. Interviews and usability tests happen with real people, run by me.',
            'Sensitive client material. I anonymise data and follow each client’s rules on what can go into any tool.',
            'Anything I can’t verify. If I can’t check it, it doesn’t go in front of a client.',
          ] },
        ],
      },
    ],
    faq: [
      { q: 'Can Claude design a user interface?', a: 'Claude can generate working UI code and layouts from a description, which is useful for prototypes. The visual quality and the decisions behind it still need a designer.' },
      { q: 'Is Claude good for UX designers?', a: 'Yes, especially for research synthesis, UX writing, flow alternatives, prototyping and design critique. It is strongest when you give it clear context and verify what it produces.' },
      { q: 'Can Claude work with Figma?', a: 'Claude can read screenshots of Figma designs, and it can connect to Figma through integrations such as Figma’s MCP server in supported setups. I still do final visual work in Figma myself.' },
      { q: 'Is it safe to use client data with Claude?', a: 'Follow your client agreements first. I anonymise transcripts and remove anything sensitive before using any AI tool, and I ask clients when in doubt.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'design-a-product-in-one-week-with-ai',
    title: 'How to Design a Product in One Week with AI',
    subtitle: 'A day-by-day look at the one-week AI design sprint I run with clients, and the parts that still need a human.',
    description: 'A practical one-week AI design sprint: research, exploration, prototyping and testing in five days, with AI for speed and human judgement for every decision.',
    date: '2026-09-24',
    category: 'Process',
    tags: ['Design Sprint', 'AI Design', 'MVP'],
    keywords: ['design a product in one week', 'one-week design sprint', 'AI design sprint', 'AI design process', 'fast product design', 'MVP design in a week', 'rapid product design'],
    art: 'calendar',
    intro: [
      'A week used to be enough time to agree on a direction. With AI handling the slow, mechanical parts of design, a week is now enough to go from a rough idea to a tested, clickable prototype that a team can build from.',
      'That doesn’t mean cutting corners. The decisions take the same thought they always did. What disappears is the waiting between them. Here is how the week works, day by day.',
    ],
    takeaways: [
      'A one-week AI design sprint takes a product idea from problem to tested prototype in five working days.',
      'AI compresses research synthesis, first drafts, variations and prototype building. It doesn’t compress decisions.',
      'Each day has one goal and ends with something you can see, so feedback happens daily, not at the end.',
      'The sprint ends with real user feedback, not just a presentation.',
      'It fits new products, MVPs and redesigns of a single flow. It doesn’t fit a full design system.',
    ],
    sections: [
      {
        id: 'what-is',
        title: 'What is a one-week AI design sprint?',
        blocks: [
          { type: 'p', text: 'It is a five-day design process with a fixed goal: answer one important product question with a prototype tested by real people. It borrows the structure of the classic Design Sprint popularised by Google Ventures, then uses AI to fit in more exploration and a higher-fidelity prototype than a week used to allow.' },
        ],
      },
      {
        id: 'why-now',
        title: 'Why a week is realistic now',
        blocks: [
          { type: 'p', text: 'Most of the time in a design project isn’t spent deciding. It is spent preparing to decide: summarising research, drafting flows, making variations, building prototypes. AI is good at exactly that preparation. When a first draft takes minutes instead of a day, the week fills up with decisions and feedback instead.' },
          { type: 'quote', text: 'AI removes the waiting between decisions. The decisions themselves take the same care.' },
        ],
      },
      {
        id: 'day-by-day',
        title: 'The sprint, day by day',
        blocks: [
          {
            type: 'table',
            head: ['Day', 'Goal', 'Where AI helps', 'Where I decide'],
            rows: [
              ['Mon', 'Understand', 'Synthesising research and competitors', 'The one question we must answer'],
              ['Tue', 'Explore', 'Dozens of flow and layout directions', 'The two or three worth pursuing'],
              ['Wed', 'Decide and design', 'Copy drafts, component variations', 'The final flow and visual direction'],
              ['Thu', 'Prototype', 'Building a clickable, real-data prototype', 'Interaction quality, states, polish'],
              ['Fri', 'Test and hand off', 'Summarising test notes', 'What we learned and what happens next'],
            ],
          },
          { type: 'h3', text: 'Monday: understand' },
          { type: 'p', text: 'A kickoff call, then everything we already know: analytics, support tickets, past research, competitors. AI helps me digest it quickly. By the end of the day we agree on one question the week must answer, for example “will first-time users understand pricing before signing up?”' },
          { type: 'h3', text: 'Tuesday: explore wide' },
          { type: 'p', text: 'This is where AI changes the most. I generate many directions for the key flow, far more than I could sketch by hand, then filter them hard against the goal. The method is in [Fast design iteration with AI](/insights/fast-design-iteration-with-ai).' },
          { type: 'h3', text: 'Wednesday: decide and design' },
          { type: 'p', text: 'We pick a direction together. I design the key screens properly, with real copy and a clear visual direction. This day is mostly human work.' },
          { type: 'h3', text: 'Thursday: prototype' },
          { type: 'p', text: 'I build a clickable prototype, often in real code so it handles real input and works on phones. AI does much of the building; I make it feel right.' },
          { type: 'art', subject: 'chunks', caption: 'Each day ends with something visible, so feedback happens daily, not on Friday.' },
          { type: 'h3', text: 'Friday: test and hand off' },
          { type: 'p', text: 'Five short sessions with real users, then a summary of what worked, what didn’t and what to build next. You leave with a prototype, the design files and a clear decision.' },
        ],
      },
      {
        id: 'what-ai-cant',
        title: 'What AI can’t do in that week',
        blocks: [
          { type: 'list', items: [
            'Choose the problem worth solving. That comes from your business and your users.',
            'Judge what feels right for your brand and audience.',
            'Run user tests and notice the hesitation before someone clicks.',
            'Take responsibility for the outcome.',
          ] },
        ],
      },
      {
        id: 'is-it-right',
        title: 'When a one-week sprint is the right call',
        blocks: [
          { type: 'p', text: 'It works best for a new product or MVP, a redesign of one important flow, or a pitch that needs a convincing prototype. It isn’t the right format for a full design system, a large multi-team platform, or work that depends on research you haven’t done yet. For those, a sprint can still be a useful first week of a longer project.' },
        ],
      },
      {
        id: 'deliverables',
        title: 'What you get at the end',
        blocks: [
          { type: 'list', items: ['A tested, clickable prototype of the key flow.', 'Design files for the core screens.', 'A short report of user feedback and recommendations.', 'A clear next step: build, adjust, or test again.'] },
          { type: 'p', text: 'Pricing and engagement options are on the [Approach](/approach) page.' },
        ],
      },
    ],
    faq: [
      { q: 'Can you really design a product in one week?', a: 'You can design and test the most important flow of a product in one week, with AI handling the slow mechanical work. A complete product with every screen and edge case takes longer.' },
      { q: 'What happens after the one-week sprint?', a: 'Usually one of three things: the team builds from the prototype, we run a second sprint on the next question, or we continue into a longer design engagement.' },
      { q: 'How is this different from a Google Ventures Design Sprint?', a: 'It follows a similar five-day rhythm, but uses AI to explore many more directions and to produce a higher-fidelity, often coded prototype by Thursday.' },
      { q: 'What do I need to prepare?', a: 'A clear goal, access to the people who can make decisions, and anything you already know about your users. A napkin sketch is plenty.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'fast-design-iteration-with-ai',
    title: 'Fast Design Iteration with AI: Explore Wide, Decide Narrow',
    subtitle: 'How AI lets me explore dozens of design directions in an afternoon, and the filter I use to pick the one worth building.',
    description: 'A fast design iteration process with AI: generate many directions quickly, filter them with clear criteria, prototype the best and test with real users.',
    date: '2026-09-17',
    category: 'Prototyping',
    tags: ['Iteration', 'AI Design', 'Design Process'],
    keywords: ['fast design iteration', 'design iteration process', 'AI design iteration', 'rapid iteration UX', 'AI design exploration', 'iterative design with AI', 'how to iterate on a design'],
    art: 'loop',
    intro: [
      'Good design has always come from iteration. What has changed is the cost. When a new direction took a day to sketch, you could afford three. When it takes a few minutes, you can afford thirty, which is useful only if you have a good way to choose between them.',
      'This is the process I use to iterate quickly with AI without drowning in options: explore wide, decide narrow, and test early.',
    ],
    takeaways: [
      'AI makes exploring many design directions cheap. The skill is filtering them, not generating them.',
      'Filter with written criteria (user goal, brand, feasibility, accessibility), not taste alone.',
      'Prototype only the top two or three directions, and test them with real people.',
      'Set a stop rule. Iteration without a deadline turns into polishing.',
      'Watch for AI sameness: many options can still be the same idea in different colours.',
    ],
    sections: [
      {
        id: 'why-speed',
        title: 'Why iteration speed matters more than ever',
        blocks: [
          { type: 'p', text: 'The first idea is rarely the best one. Iteration is how you find out, and the faster each loop runs, the more loops fit before a deadline. AI shortens the most expensive part of each loop: turning an idea into something you can look at.' },
        ],
      },
      {
        id: 'explore-wide',
        title: 'Step 1: Explore wide',
        blocks: [
          { type: 'p', text: 'I start with the problem, the user and the constraints, then ask for many genuinely different directions: different structures, different entry points, different levels of guidance. I push for range, because the goal at this stage is to see the space, not to find the answer.' },
          { type: 'callout', title: 'Prompt', text: 'Give me 10 structurally different approaches to [flow] for [user]. Vary the number of steps, where the key decision happens and how much guidance the user gets. One sentence each, plus its biggest risk.' },
        ],
      },
      {
        id: 'filter',
        title: 'Step 2: Filter with criteria, not taste alone',
        blocks: [
          { type: 'p', text: 'Before I look at the options, I write down what a good answer must do. Then every direction gets judged against the same list. It keeps decisions honest and makes them easy to explain to a client.' },
          {
            type: 'table',
            head: ['Criterion', 'The question I ask'],
            rows: [
              ['User goal', 'Does this get the user to their goal with less effort?'],
              ['Business goal', 'Does it support what the product needs to achieve?'],
              ['Brand', 'Does it feel like this company, or like anyone?'],
              ['Feasibility', 'Can the team build it in the time they have?'],
              ['Accessibility', 'Does it work for people with different abilities and devices?'],
            ],
          },
          { type: 'quote', text: 'Volume is not progress. Choosing well is.' },
        ],
      },
      {
        id: 'prototype',
        title: 'Step 3: Prototype the top three',
        blocks: [
          { type: 'p', text: 'Two or three directions survive. I design them properly and turn them into quick prototypes, often in code, so they can be compared in use rather than as pictures. See [From prompt to prototype](/insights/from-prompt-to-prototype-with-ai) for how.' },
          { type: 'art', subject: 'standout', caption: 'Decide narrow: the directions that survive, compared side by side.' },
        ],
      },
      {
        id: 'test',
        title: 'Step 4: Test with real people',
        blocks: [
          { type: 'p', text: 'Five people trying each direction will tell you more than a week of internal debate. AI can help summarise the sessions, but I watch them myself, because the useful signals are often a pause or a frown rather than a comment.' },
        ],
      },
      {
        id: 'stop-rule',
        title: 'Step 5: Loop, with a stop rule',
        blocks: [
          { type: 'p', text: 'Each loop gets a time box and a question. When the answer is clear, or the time is up, we decide and move on. Without that rule, fast iteration quietly turns into endless polishing.' },
        ],
      },
      {
        id: 'mistakes',
        title: 'Common mistakes',
        blocks: [
          { type: 'list', items: [
            'Iterating on details (colours, icons) before the structure is right.',
            'Mistaking many options for many ideas. Check that directions are genuinely different.',
            'Letting the AI’s defaults set the visual style.',
            'Skipping testing because the internal favourite feels obvious.',
          ] },
          { type: 'p', text: 'You can see where this kind of exploration ends up in the [Revora](/work/revora) case study.' },
        ],
      },
    ],
    faq: [
      { q: 'How many design iterations are enough?', a: 'Enough to answer the question you started with. In practice that is often two or three tested rounds, each focused on one question, rather than a fixed number.' },
      { q: 'Does designing with AI make everything look the same?', a: 'It can, if you accept the defaults. Writing clear criteria, pushing for structurally different options and applying brand decisions by hand keeps the work distinctive.' },
      { q: 'How fast can you iterate on a design with AI?', a: 'Exploring directions can take an afternoon instead of days. Testing and deciding still take real time, and that is where the quality comes from.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ai-for-ux-research-what-to-automate',
    title: 'AI for UX Research: What to Automate and What to Keep Human',
    subtitle: 'AI can turn ten interview transcripts into themes in minutes. It still can’t sit with a user and notice the pause before they answer.',
    description: 'A balanced guide to AI in UX research: what to automate (transcripts, synthesis, desk research) and what stays human (interviews, observation, judgement).',
    date: '2026-09-03',
    category: 'Research',
    tags: ['UX Research', 'AI Tools', 'Synthesis'],
    keywords: ['AI UX research', 'AI user research', 'analyse user interviews with AI', 'AI research synthesis', 'UX research automation', 'AI affinity mapping', 'human-centred design with AI'],
    art: 'lens',
    intro: [
      'Research is where AI saves me the most time and where it can do the most damage if used carelessly. It is excellent at sorting, summarising and finding patterns in a lot of material. It is poor at the thing research is really for: understanding people.',
      'Here is how I split the work.',
    ],
    takeaways: [
      'Automate the mechanical parts: transcription, tagging, first-pass synthesis, desk research and survey analysis.',
      'Keep the human parts human: running interviews, observing behaviour and deciding what matters.',
      'Always ask for direct quotes behind every AI-generated theme, and check them against the source.',
      'AI can amplify bias in what you feed it. Diverse participants matter more, not less.',
      'Anonymise participant data before it goes into any tool.',
    ],
    sections: [
      {
        id: 'short-answer',
        title: 'The short answer',
        blocks: [
          {
            type: 'table',
            head: ['Research task', 'Automate?', 'Why'],
            rows: [
              ['Transcription and tagging', 'Yes', 'Mechanical, easy to verify'],
              ['First-pass synthesis', 'Yes, with quotes', 'Fast patterns, checkable against source'],
              ['Desk research and competitor scans', 'Mostly', 'Good for breadth; verify facts'],
              ['Writing interview guides', 'Draft only', 'Needs your goals and context'],
              ['Running interviews', 'No', 'Rapport, follow-ups, reading the room'],
              ['Deciding what matters', 'No', 'This is the research'],
            ],
          },
        ],
      },
      {
        id: 'automate',
        title: 'What I happily hand to AI',
        blocks: [
          { type: 'h3', text: 'Transcription and tagging' },
          { type: 'p', text: 'Turning recordings into searchable, tagged text used to take hours per session. Now it is close to instant, and it is easy to spot-check.' },
          { type: 'h3', text: 'First-pass synthesis' },
          { type: 'p', text: 'I ask for recurring problems across all sessions, each with verbatim quotes and participant numbers. It is the equivalent of a first round of sticky notes, done in minutes. I then regroup, merge and rename the themes myself.' },
          { type: 'h3', text: 'Desk research' },
          { type: 'p', text: 'Competitor flows, market context, regulations to be aware of. AI gives breadth quickly. Facts get checked against original sources before they influence a decision.' },
        ],
      },
      {
        id: 'human',
        title: 'What stays human',
        blocks: [
          { type: 'h3', text: 'Running interviews' },
          { type: 'p', text: 'The best insights come from follow-up questions you didn’t plan, asked because something in someone’s voice changed. That needs a person in the room.' },
          { type: 'quote', text: 'The most useful thing in an interview is often what someone almost said.' },
          { type: 'h3', text: 'Deciding what matters' },
          { type: 'p', text: 'Five themes can be equally frequent and not equally important. Weighing them against the business, the product and the people affected is a judgement call, and it is the part clients actually pay for.' },
          { type: 'p', text: 'On [Algorizin OPT](/work/algorizin-opt), interviews with international students showed the real problem wasn’t missing information but a lack of a trustworthy path. No summary would have weighted that correctly without hearing how anxious people sounded.' },
        ],
      },
      {
        id: 'workflow',
        title: 'My AI-assisted research workflow',
        blocks: [
          { type: 'list', ordered: true, items: [
            'Define the research question and what decision it will inform.',
            'Draft the interview guide with AI, then rewrite it in my own words.',
            'Run the interviews myself and take notes on behaviour, not just answers.',
            'Transcribe and anonymise, then run a first-pass synthesis with quotes.',
            'Regroup themes by hand, check every quote, and rank by impact.',
            'Share findings as decisions, not just observations.',
          ] },
          { type: 'art', subject: 'proximity', caption: 'AI does the first round of grouping. Deciding what matters is still the research.' },
        ],
      },
      {
        id: 'risks',
        title: 'Risks to watch',
        blocks: [
          { type: 'list', items: [
            'Invented quotes: always trace a theme back to the transcript.',
            'Flattened nuance: summaries smooth over the minority view that might matter most.',
            'Bias in, bias out: if your participants are similar, AI will confidently tell you a narrow story.',
            'Privacy: anonymise data and follow consent agreements before using any tool.',
          ] },
        ],
      },
    ],
    faq: [
      { q: 'Can AI replace UX researchers?', a: 'No. AI speeds up the mechanical parts of research, but understanding people, asking good follow-up questions and deciding what matters still need a researcher.' },
      { q: 'How do you analyse user interviews with AI?', a: 'Transcribe and anonymise them, ask an AI tool for recurring themes backed by verbatim quotes, then verify the quotes and regroup the themes yourself.' },
      { q: 'Is it okay to put interview data into AI tools?', a: 'Only with participant consent and in line with your client’s policies. Remove names and identifying details first.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'what-is-an-ai-enabled-product-designer',
    title: 'What Is an AI-Enabled Product Designer? (And When to Hire One)',
    subtitle: 'The role in plain terms: what changes when a designer works with AI every day, what stays the same, and how to tell if it fits your project.',
    description: 'What an AI-enabled product designer does, how the role differs from a traditional product designer, and when hiring one makes sense for startups and teams.',
    date: '2026-08-20',
    category: 'AI Design',
    tags: ['AI Design', 'Hiring', 'Product Design'],
    keywords: ['AI-enabled product designer', 'AI product designer', 'hire an AI product designer', 'freelance AI product designer', 'AI UX designer', 'product designer for AI startups', 'AI design consultant'],
    art: 'brain',
    intro: [
      '“AI-enabled product designer” is a new phrase for a simple idea: a product designer who uses AI throughout their process to move faster and explore more, while still making every decision themselves.',
      'If you are hiring, it is worth knowing what that actually changes for you, and what it doesn’t.',
    ],
    takeaways: [
      'An AI-enabled product designer uses AI for research, exploration, copy and prototyping, and keeps judgement and craft human.',
      'For clients, the difference is mostly speed: more options explored and prototypes much earlier.',
      'The fundamentals don’t change: research with real people, clear decisions, visual craft and accountability.',
      'Designing with AI is different from designing for AI products. Good designers can do both.',
      'Ask candidates to show where AI helped and where they overruled it.',
    ],
    sections: [
      {
        id: 'definition',
        title: 'What is an AI-enabled product designer?',
        blocks: [
          { type: 'p', text: 'A product designer who has built AI into how they work: synthesising research, exploring directions, drafting copy, building prototypes and checking their own work. The AI handles volume and speed. The designer handles direction, taste and responsibility.' },
        ],
      },
      {
        id: 'vs-traditional',
        title: 'AI-enabled vs. traditional product designer',
        blocks: [
          {
            type: 'table',
            head: ['', 'Traditional workflow', 'AI-enabled workflow'],
            rows: [
              ['Research synthesis', 'Days of manual sorting', 'Hours, verified by hand'],
              ['Exploration', 'A few directions', 'Many directions, filtered hard'],
              ['First prototype', 'Late in the project', 'Within days, often in code'],
              ['UX copy', 'Written last', 'Drafted early, refined throughout'],
              ['Decisions and craft', 'Designer', 'Designer'],
            ],
          },
        ],
      },
      {
        id: 'what-changes',
        title: 'What changes for you as a client',
        blocks: [
          { type: 'list', items: [
            'You see working ideas sooner, so feedback happens earlier and costs less.',
            'More directions get considered before one is chosen.',
            'Small teams can get a lot further with one designer.',
            'Timelines like a [one-week design sprint](/insights/design-a-product-in-one-week-with-ai) become realistic.',
          ] },
        ],
      },
      {
        id: 'what-doesnt',
        title: 'What doesn’t change',
        blocks: [
          { type: 'p', text: 'Good products still come from understanding people, making clear choices and sweating the details. AI can suggest a hundred options; it can’t tell you which one your users will trust. That part still takes experience.' },
          { type: 'quote', text: 'AI drafts, I decide. That is the whole role in four words.' },
        ],
      },
      {
        id: 'with-vs-for',
        title: 'Designing with AI vs. designing for AI',
        blocks: [
          { type: 'p', text: 'Designing with AI is about the process. Designing for AI is about the product: making AI features understandable and trustworthy for the people using them. On [Profyl.ai](/work/profyl-ai), an AI recruitment platform, the most important design work was explaining why the AI recommended each candidate. Time-to-hire dropped by 40%.' },
        ],
      },
      {
        id: 'when-to-hire',
        title: 'When to hire one',
        blocks: [
          { type: 'list', items: [
            'You need to validate a product idea quickly, before committing engineering time.',
            'You are a small team that needs senior design without a large agency.',
            'You are building an AI product and need it to feel trustworthy.',
            'You have a deadline, like a launch or a pitch, that a traditional process won’t meet.',
          ] },
        ],
      },
      {
        id: 'how-to-evaluate',
        title: 'How to evaluate one',
        blocks: [
          { type: 'list', items: [
            'Ask where AI helped on a past project, and where they overruled it.',
            'Look for real research and testing, not just polished screens.',
            'Check that the portfolio looks distinctive, not like default AI output.',
            'Ask how they handle confidential data with AI tools.',
          ] },
          { type: 'p', text: 'If you’d like to see how I work, start with [my approach](/approach) or the [selected work](/work).' },
        ],
      },
    ],
    faq: [
      { q: 'Is an AI-enabled product designer cheaper?', a: 'Often the overall project costs less because it takes less time, even if the day rate is similar. The bigger saving is learning what works before engineering starts.' },
      { q: 'Do AI-enabled designers still use Figma?', a: 'Yes. Figma is still where most visual design happens. AI adds to the toolkit; it doesn’t replace it.' },
      { q: 'What should I prepare before hiring a product designer?', a: 'Your goal, who the product is for, any constraints, and whatever you already know about your users. A rough sketch is plenty to start.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'designing-for-compliance',
    title: 'Designing for Compliance: UX Lessons from a Legal-Tech Product',
    subtitle: 'Lessons from Algorizin OPT, where one wrong form could put a student’s visa at risk.',
    description: 'UX lessons from designing Algorizin OPT, a compliance product for international students: research first, rules as steps, and calm as a feature.',
    date: '2026-08-06',
    category: 'Case Notes',
    tags: ['UX Research', 'Legal Tech', 'Compliance UX'],
    keywords: ['compliance UX design', 'legal tech UX', 'designing for high-stakes products', 'OPT compliance platform', 'onboarding UX for complex rules'],
    art: 'shield',
    intro: [
      'International students who want to work for themselves under OPT face rules that are confusing and unforgiving. When I started on Algorizin OPT, the first job wasn’t design at all. It was listening.',
    ],
    takeaways: [
      'In high-stakes products, research comes before interfaces.',
      'The problem was rarely missing information. It was the lack of a trustworthy path.',
      'Turning rules into guided steps makes compliance the default.',
      'Calm, clear design is a feature when mistakes are expensive.',
    ],
    sections: [
      {
        id: 'interviews',
        title: 'Interviews before interfaces',
        blocks: [
          { type: 'p', text: 'Talking to students showed the same pattern again and again: unclear eligibility, missing documents, and advice gathered from forums. The problem wasn’t a lack of information. It was a lack of a trustworthy path. (I use AI to speed up this kind of synthesis now; see [AI for UX research](/insights/ai-for-ux-research-what-to-automate).)' },
        ],
      },
      {
        id: 'rules-to-steps',
        title: 'Turn rules into steps',
        blocks: [
          { type: 'list', items: ['A guided onboarding that asks one thing at a time.', 'A status dashboard that always answers “where am I, and what’s next?”', 'Expert consultations one tap away when a question is too important to guess.', 'Automated documents, so compliance is the default rather than a hope.'] },
          { type: 'quote', text: 'In high-stakes products, calm is a feature.' },
        ],
      },
      {
        id: 'outcome',
        title: 'What it led to',
        blocks: [
          { type: 'p', text: 'The platform onboarded hundreds of students in its first months and helped them form compliant businesses. The lesson I keep coming back to: when the stakes are high, clarity and reassurance matter more than speed or novelty. The full project is in the [Algorizin OPT case study](/work/algorizin-opt).' },
        ],
      },
    ],
    faq: [
      { q: 'How do you design UX for compliance-heavy products?', a: 'Start with research to find where people get stuck, turn rules into guided steps, show status clearly at all times, and offer human help for high-stakes questions.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'trust-in-ai-hiring',
    title: 'Designing Trust in AI Products: Lessons from an AI Hiring Platform',
    subtitle: 'Profyl.ai cut time-to-hire by 40%. The AI was only half of it.',
    description: 'How designing for trust helped Profyl.ai, an AI recruitment platform, cut time-to-hire by 40%: explainable matches, less effort on both sides, one clear flow.',
    date: '2026-07-23',
    category: 'Case Notes',
    tags: ['AI Products', 'Trust', 'Product Design'],
    keywords: ['designing trust in AI products', 'AI product UX', 'explainable AI UX', 'AI recruitment platform design', 'AI hiring UX'],
    art: 'badge',
    intro: [
      'As founding product designer at Profyl.ai, I helped build a recruitment platform from scratch. The matching model mattered, but recruiters and candidates only benefit from AI they actually trust and use.',
    ],
    takeaways: [
      'People only benefit from AI they trust enough to use.',
      'Show why the AI made a recommendation, not just what it recommended.',
      'Remove effort on both sides of the marketplace.',
      'Time-to-hire dropped 40% because the model and the experience worked together.',
    ],
    sections: [
      {
        id: 'legible',
        title: 'Make the machine legible',
        blocks: [
          { type: 'p', text: 'Smart profiles surface the skills and achievements behind every match, so recruiters can see why someone is recommended instead of taking it on faith.' },
        ],
      },
      {
        id: 'effort',
        title: 'Remove effort on both sides',
        blocks: [
          { type: 'list', items: ['One-click applications with live progress tracking for candidates.', 'A single recruiter dashboard for postings, applicants and insights.', 'In-app messaging so conversations don’t get lost in email.'] },
          { type: 'quote', text: 'AI earns its place when it saves people time they can feel.' },
        ],
      },
      {
        id: 'result',
        title: 'The result',
        blocks: [
          { type: 'p', text: 'Time-to-hire dropped by 40%. That number came from the model and the experience together: good matches, explained clearly, in a flow that respects everyone’s time. More in the [Profyl.ai case study](/work/profyl-ai), and on the role itself in [What is an AI-enabled product designer?](/insights/what-is-an-ai-enabled-product-designer).' },
        ],
      },
    ],
    faq: [
      { q: 'How do you design trust into an AI product?', a: 'Explain why the AI made each recommendation, let people stay in control of the final decision, and make the experience around the AI fast and predictable.' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Laws of UX + Gestalt principles: short, practical notes in my words. */
/* Origins credit the original research; Laws of UX (lawsofux.com) is linked as further reading. */

interface PrincipleInput {
  slug: string; name: string; title: string; definition: string; description: string; date: string;
  category: 'Laws of UX' | 'Gestalt'; keywords: string[]; art: ArtSubject;
  intro: string[]; takeaways: string[]; practice: string[]; ai: string; origins: string; source: string;
  faq: { q: string; a: string }[];
}
const principle = (p: PrincipleInput): Article => ({
  slug: p.slug, title: p.title, subtitle: p.definition, description: p.description, date: p.date,
  category: p.category, tags: [p.category, p.name], keywords: p.keywords, art: p.art,
  intro: p.intro, takeaways: p.takeaways,
  sections: [
    { id: 'how-i-use-it', title: 'How I use it', blocks: [{ type: 'list', items: p.practice }] },
    { id: 'with-ai', title: 'In an AI-first workflow', blocks: [{ type: 'p', text: p.ai }] },
    { id: 'origins', title: 'Origins', blocks: [{ type: 'p', text: `${p.origins} Further reading: [${p.name} on Laws of UX](${p.source}).` }] },
  ],
  faq: p.faq,
});

const principles: Article[] = [
  principle({
    slug: 'jakobs-law', name: 'Jakob’s Law', art: 'window', category: 'Laws of UX', date: '2026-10-03',
    title: 'Jakob’s Law: Users Expect Your Product to Work Like Everything Else',
    definition: 'People spend most of their time in other products, so they arrive expecting yours to work the same way.',
    description: 'Jakob’s Law explained for product designers: why familiar patterns win, where to innovate, and how it applies to AI-generated interfaces.',
    keywords: ['Jakob’s Law', 'laws of UX', 'UX design patterns', 'mental models UX', 'familiar design patterns'],
    intro: ['Nobody learns your product from scratch. They bring habits from every app and website they already use: where the menu lives, what a cart icon does, how a form behaves. Jakob’s Law says to work with those habits, not against them.'],
    takeaways: ['Familiar patterns lower the effort of using something new.', 'Save originality for the moments that make your product different.', 'When you change a convention, give people a way to adjust.'],
    practice: ['Navigation, forms, search and checkout follow the conventions people already know.', 'I spend novelty on brand, storytelling and the one feature that sets the product apart.', 'Before a redesign, I check which habits users have built, so a new layout doesn’t feel broken.', 'Big changes ship with an easy way back or a short moment of guidance.'],
    ai: 'AI-generated layouts tend to follow conventions, which is good for Jakob’s Law. The risk is the opposite: everything starts to look the same. I let AI handle the familiar parts and put my effort into the moments where the product should feel like nothing else.',
    origins: 'Named after usability researcher Jakob Nielsen, co-founder of the Nielsen Norman Group, who described it in 2000.',
    source: 'https://lawsofux.com/jakobs-law/',
    faq: [{ q: 'Does Jakob’s Law mean every product should look the same?', a: 'No. It’s about behaviour, not style. Things can look distinctive and still work the way people expect.' }],
  }),
  principle({
    slug: 'fitts-law', name: 'Fitts’s Law', art: 'target', category: 'Laws of UX', date: '2026-10-02',
    title: 'Fitts’s Law: Make Important Targets Big and Close',
    definition: 'The time to reach a target depends on how far away it is and how big it is.',
    description: 'Fitts’s Law for UI design: button size, touch targets and placement, with practical rules for web and mobile interfaces.',
    keywords: ['Fitts’s Law', 'touch target size', 'button size UX', 'laws of UX', 'mobile UX'],
    intro: ['Every tap and click is a small physical movement. The further away and the smaller the target, the longer it takes and the more often people miss. That’s Fitts’s Law, and it decides more about how an interface feels than most visual choices.'],
    takeaways: ['Make the most important actions the easiest to hit.', 'Give touch targets enough size and spacing.', 'Put actions close to where attention already is.'],
    practice: ['Primary buttons are large and sit where the eye and thumb already are.', 'Touch targets stay comfortably sized (around 44–48px) with space between them.', 'Destructive actions are kept away from common ones, so a miss doesn’t cost anything.', 'On mobile, frequent actions live within thumb reach at the bottom of the screen.'],
    ai: 'Prototyping in code makes it easy to test reach on real phones the same day. I also use AI as a quick reviewer: a screenshot and a prompt to flag small or crowded targets, which I then check by hand.',
    origins: 'Psychologist Paul Fitts published the model in 1954 while studying human motor movement.',
    source: 'https://lawsofux.com/fittss-law/',
    faq: [{ q: 'How big should a touch target be?', a: 'Common platform guidance sits around 44–48px. The real test is watching people use it on their own devices.' }],
  }),
  principle({
    slug: 'hicks-law', name: 'Hick’s Law', art: 'branches', category: 'Laws of UX', date: '2026-09-30',
    title: 'Hick’s Law: More Choices, Slower Decisions',
    definition: 'The time it takes to decide grows with the number and complexity of the choices.',
    description: 'Hick’s Law explained: how the number of choices slows decisions, and how to simplify menus, pricing and onboarding without oversimplifying.',
    keywords: ['Hick’s Law', 'choice overload UX', 'laws of UX', 'simplify UX', 'decision making UX'],
    intro: ['Every extra option is a small question the user has to answer. At moments that matter, like signing up, choosing a plan or checking out, too many of those questions slow people down or make them leave.'],
    takeaways: ['Cut options at the moments where speed matters most.', 'Break complex decisions into smaller steps.', 'Recommend a default, but keep the alternatives within reach.'],
    practice: ['Pricing pages lead with one recommended plan.', 'Onboarding asks one thing at a time instead of one long form.', 'Advanced settings sit behind progressive disclosure.', 'I never simplify so far that people can’t find what they came for.'],
    ai: 'AI can generate fifty directions in an afternoon, and Hick’s Law applies to designers too. I filter hard before showing anything to a client, so they choose between two or three strong options rather than drowning in volume.',
    origins: 'Psychologists William Edmund Hick and Ray Hyman described the relationship in 1952.',
    source: 'https://lawsofux.com/hicks-law/',
    faq: [{ q: 'Does Hick’s Law mean fewer menu items is always better?', a: 'Not always. Well-organised, familiar options can be scanned quickly. It matters most when people must actively choose.' }],
  }),
  principle({
    slug: 'millers-law', name: 'Miller’s Law', art: 'chunks', category: 'Laws of UX', date: '2026-09-27',
    title: 'Miller’s Law: Chunk It So People Can Hold It',
    definition: 'Working memory holds only a handful of items at once, so information is easier to use when it’s grouped into chunks.',
    description: 'Miller’s Law and chunking in UX: why “7 ± 2” is a guideline, not a rule, and how to group content, forms and navigation.',
    keywords: ['Miller’s Law', 'chunking UX', 'cognitive load', 'laws of UX', 'working memory'],
    intro: ['People can only juggle a few things in their head at once. Long, unbroken information forces them to hold too much. Group it into meaningful chunks and the same amount suddenly feels manageable.'],
    takeaways: ['Group related information into small, meaningful chunks.', 'Treat “seven” as a reminder to keep it light, not as a hard limit.', 'Reduce what people must remember from one screen to the next.'],
    practice: ['Long forms become short steps with clear sections.', 'Numbers and codes are spaced into readable groups.', 'Dashboards lead with a few key figures, with detail one click away.', 'I never make people remember something from a previous screen if I can show it again.'],
    ai: 'AI is great at turning a pile of research into a short list of themes, which is chunking in action. The same applies to AI features: long generated answers need structure, headings and summaries so people can take them in.',
    origins: 'Psychologist George A. Miller published “The Magical Number Seven, Plus or Minus Two” in 1956. Later research suggests working memory is closer to about four chunks, which only strengthens the case for grouping.',
    source: 'https://lawsofux.com/millers-law/',
    faq: [{ q: 'Should navigation have at most seven items?', a: 'Not as a rule. Miller’s Law is about memory, and menus are scanned, not memorised. Keep them clear and grouped instead.' }],
  }),
  principle({
    slug: 'doherty-threshold', name: 'Doherty Threshold', art: 'clock', category: 'Laws of UX', date: '2026-09-26',
    title: 'The Doherty Threshold: Respond in Under 400ms',
    definition: 'People stay engaged and productive when a system responds in under about 400 milliseconds.',
    description: 'The Doherty Threshold explained: why response time under 400ms matters, perceived performance, and designing waiting for slower AI features.',
    keywords: ['Doherty Threshold', 'perceived performance', '400ms response time', 'laws of UX', 'AI UX loading states'],
    intro: ['When an interface answers quickly, people stay in flow. When it hesitates, their attention drifts. Below roughly 400ms, the conversation between person and product feels effortless.'],
    takeaways: ['Give feedback for every action immediately, even if the work takes longer.', 'Perceived speed matters as much as real speed.', 'Keep transitions short enough that they never feel like waiting.'],
    practice: ['Buttons react instantly, with optimistic updates where it’s safe.', 'Skeleton screens and progress hints replace blank waits.', 'Interface animations stay quick, so motion supports speed instead of slowing it.', 'Anything longer than a moment tells people what’s happening.'],
    ai: 'AI features break the threshold all the time: a good answer can take seconds. So I design the wait: stream the response as it’s generated, show progress, and keep the rest of the interface usable while the model thinks.',
    origins: 'Walter Doherty and Ahrvind Thadani made the case in a 1982 IBM Systems Journal paper, challenging the earlier two-second standard for response time.',
    source: 'https://lawsofux.com/doherty-threshold/',
    faq: [{ q: 'How do you meet the Doherty Threshold with slow AI models?', a: 'Respond to the action immediately, stream partial results, and show clear progress so the product never feels stuck.' }],
  }),
  principle({
    slug: 'aesthetic-usability-effect', name: 'Aesthetic-Usability Effect', art: 'gem', category: 'Laws of UX', date: '2026-09-22',
    title: 'The Aesthetic-Usability Effect: Beautiful Feels Easier',
    definition: 'People tend to see attractive design as easier to use, and forgive small problems because of it.',
    description: 'The aesthetic-usability effect in UX: why visual polish builds trust, how it can hide usability problems, and what it means for AI-made interfaces.',
    keywords: ['aesthetic-usability effect', 'visual design UX', 'laws of UX', 'design and trust', 'usability testing'],
    intro: ['Polish isn’t decoration. People trust products that look cared for, and that goodwill makes them more patient with small issues. The catch: the same effect can hide real problems during testing.'],
    takeaways: ['Visual quality builds trust and patience.', 'Pretty screens can mask usability problems in testing.', 'Watch what people do, not just what they say they like.'],
    practice: ['I give early prototypes enough polish to feel real, so feedback is honest.', 'In tests I watch behaviour and completion, not only ratings.', 'Polish goes where trust matters most: onboarding, payments, anything sensitive.', 'I keep checking that beauty never gets in the way of clarity.'],
    ai: 'AI makes polished-looking screens cheap, so looking good no longer proves a design works. That raises the bar on testing the flow itself, and on the human taste that makes something feel genuinely considered rather than generically nice.',
    origins: 'Researchers Masaaki Kurosu and Kaori Kashimura of Hitachi’s Design Center described it in 1995 after testing variations of ATM interfaces.',
    source: 'https://lawsofux.com/aesthetic-usability-effect/',
    faq: [{ q: 'Is good visual design just about looks?', a: 'No. It shapes trust and patience, which directly affects how usable a product feels.' }],
  }),
  principle({
    slug: 'peak-end-rule', name: 'Peak-End Rule', art: 'peak', category: 'Laws of UX', date: '2026-09-20',
    title: 'The Peak-End Rule: People Remember the Best Moment and the Last One',
    definition: 'People judge an experience mostly by how it felt at its most intense moment and at its end.',
    description: 'The peak-end rule in UX: design memorable peaks and good endings, and soften the worst moments, including errors in AI products.',
    keywords: ['peak-end rule', 'customer experience design', 'laws of UX', 'UX emotions', 'onboarding UX'],
    intro: ['Nobody remembers every screen. They remember the high point and how it ended. Design those two moments with care and the whole experience is remembered more warmly.'],
    takeaways: ['Find the moments that matter most and make them great.', 'End well: confirmations, completions and goodbyes count.', 'Soften the worst moments, because they become peaks too.'],
    practice: ['Success states get real attention: clear, warm and a little delightful.', 'Onboarding ends with a win, not a settings page.', 'Error messages are calm, helpful and human.', 'The last screen of a flow says what happens next.'],
    ai: 'AI features will sometimes get things wrong, and those moments easily become the peak people remember. I design graceful failure: honest messages, easy ways to correct, and a person or a fallback when it matters.',
    origins: 'Daniel Kahneman and colleagues described it in a 1993 study where people preferred a longer unpleasant experience that ended less badly.',
    source: 'https://lawsofux.com/peak-end-rule/',
    faq: [{ q: 'What counts as a “peak” in a product?', a: 'Any moment with strong emotion: a big win, a frustrating error, a surprising delight. Map them and design them on purpose.' }],
  }),
  principle({
    slug: 'teslers-law', name: 'Tesler’s Law', art: 'balance', category: 'Laws of UX', date: '2026-09-18',
    title: 'Tesler’s Law: Complexity Can Be Moved, Not Removed',
    definition: 'Every system has a certain amount of complexity that can’t be eliminated, only shifted between the product and the person using it.',
    description: 'Tesler’s Law (conservation of complexity) for designers: decide who carries complexity, use smart defaults, and how AI can absorb it.',
    keywords: ['Tesler’s Law', 'conservation of complexity', 'laws of UX', 'smart defaults', 'simplicity in design'],
    intro: ['Some complexity is part of the problem itself. Simplifying the interface doesn’t make it disappear; it just moves it. The question is who carries it: the product, or the person using it.'],
    takeaways: ['Some complexity is essential; decide where it lives.', 'Let the system carry it whenever it reasonably can.', 'Don’t “simplify” by pushing the hard parts onto users.'],
    practice: ['Smart defaults, autofill and sensible presets do the heavy lifting.', 'I ask engineers early what the system can absorb.', 'Experts keep access to the controls they need.', 'When something must stay complex, I explain it plainly.'],
    ai: 'AI is a powerful place to put complexity: it can fill, sort and suggest so people don’t have to. That only works if its choices are visible and easy to undo. Hidden decisions just move the complexity into confusion.',
    origins: 'Larry Tesler, the computer scientist known for his work at Xerox PARC and Apple, described the law of conservation of complexity in the mid-1980s.',
    source: 'https://lawsofux.com/teslers-law/',
    faq: [{ q: 'Is simpler always better?', a: 'Simpler for the user, yes, as long as the complexity is genuinely handled by the system rather than hidden or removed.' }],
  }),

  principle({
    slug: 'law-of-proximity', name: 'Law of Proximity', art: 'proximity', category: 'Gestalt', date: '2026-09-15',
    title: 'The Law of Proximity: Space Is the First Way We Group',
    definition: 'Things that sit close together are seen as belonging together.',
    description: 'The Gestalt law of proximity in UI design: use spacing to group content, labels and actions before reaching for lines and boxes.',
    keywords: ['law of proximity', 'Gestalt principles', 'spacing in UI design', 'visual grouping', 'layout design'],
    intro: ['Before anyone reads a word, they see groups. Space does that work: whatever sits close together feels related. It’s the cheapest, quietest way to organise a layout.'],
    takeaways: ['Use spacing to show what belongs together.', 'Keep more space between groups than within them.', 'Reach for space before lines and boxes.'],
    practice: ['Labels sit closer to their own field than to the next one.', 'Cards keep their content tight and their gaps generous.', 'A consistent spacing scale keeps the rhythm honest.', 'If a layout needs dividers everywhere, the spacing is usually the problem.'],
    ai: 'AI-generated layouts often use the same spacing everywhere, which flattens every group into one. Fixing that rhythm by hand is one of the quickest ways to make a generated screen feel designed.',
    origins: 'One of the Gestalt principles of perception developed by psychologists Max Wertheimer, Kurt Koffka and Wolfgang Köhler in the early twentieth century.',
    source: 'https://lawsofux.com/law-of-proximity/',
    faq: [{ q: 'Is proximity stronger than borders for grouping?', a: 'It’s often enough on its own and creates less visual noise. Use borders or backgrounds when space alone isn’t clear.' }],
  }),
  principle({
    slug: 'law-of-similarity', name: 'Law of Similarity', art: 'similarity', category: 'Gestalt', date: '2026-09-12',
    title: 'The Law of Similarity: Things That Look Alike Feel Alike',
    definition: 'Elements that share a look (colour, shape, size) are seen as related, even when they’re apart.',
    description: 'The Gestalt law of similarity for designers: consistent styles for consistent behaviour, and how design tokens keep AI-made UI coherent.',
    keywords: ['law of similarity', 'Gestalt principles', 'UI consistency', 'design tokens', 'visual hierarchy'],
    intro: ['If two things look the same, people assume they do the same thing. That makes similarity a promise: consistent styling tells users how the interface behaves.'],
    takeaways: ['Same function, same look.', 'Different function, visibly different look.', 'Never style something static like something clickable.'],
    practice: ['Every link looks like a link; every primary button looks primary.', 'Status colours mean the same thing everywhere.', 'Decorative elements never borrow the look of interactive ones.', 'A design system turns these decisions into reusable rules.'],
    ai: 'Generated screens drift: a slightly different button here, a new shade there. Design tokens and a small component set keep similarity intact, so AI output stays consistent with the rest of the product.',
    origins: 'Part of the Gestalt principles of perception from Wertheimer, Koffka and Köhler’s work in the early twentieth century.',
    source: 'https://lawsofux.com/law-of-similarity/',
    faq: [{ q: 'How does similarity relate to accessibility?', a: 'Don’t rely on colour alone to show similarity or difference. Pair it with shape, text or position.' }],
  }),
  principle({
    slug: 'law-of-common-region', name: 'Law of Common Region', art: 'region', category: 'Gestalt', date: '2026-09-09',
    title: 'The Law of Common Region: Boundaries Make Groups',
    definition: 'Elements inside a shared, clearly defined area are seen as a group.',
    description: 'The Gestalt law of common region in UI: cards, panels and backgrounds to group content, and when boxes add clutter instead of clarity.',
    keywords: ['law of common region', 'Gestalt principles', 'card design', 'UI grouping', 'layout clarity'],
    intro: ['Put things inside a shared container and they become a unit. Cards, panels and tinted backgrounds all use this, and they’re powerful when space alone isn’t enough.'],
    takeaways: ['Containers create strong, clear groups.', 'Use them when proximity alone is ambiguous.', 'Too many boxes turn into clutter.'],
    practice: ['Cards group everything about one item: image, title, price, action.', 'A subtle background separates a section without heavy lines.', 'I combine region with proximity rather than boxing everything.', 'Nested boxes are a sign the hierarchy needs rethinking.'],
    ai: 'Generated UI loves cards inside cards. I strip containers back to the ones that genuinely clarify a group, which usually makes the layout calmer and easier to scan.',
    origins: 'Psychologist Stephen Palmer described common region as a principle of perceptual grouping in 1992, extending the original Gestalt principles.',
    source: 'https://lawsofux.com/law-of-common-region/',
    faq: [{ q: 'When should I use a card instead of spacing?', a: 'When items need to be compared or acted on as separate units, or when the layout is dense enough that space alone isn’t clear.' }],
  }),
  principle({
    slug: 'law-of-pragnanz', name: 'Law of Prägnanz', art: 'pragnanz', category: 'Gestalt', date: '2026-09-06',
    title: 'The Law of Prägnanz: People See the Simplest Shape',
    definition: 'People read complex or ambiguous images in the simplest way they can, because it takes the least effort.',
    description: 'The Gestalt law of Prägnanz (simplicity) for designers: simple shapes, clear icons and less visual noise for faster understanding.',
    keywords: ['law of Prägnanz', 'Gestalt principles', 'simplicity in design', 'icon design', 'minimal UI'],
    intro: ['The eye wants the simplest answer. Given a cluttered shape, people see circles, squares and triangles. Designs that are already simple get understood faster, and remembered better.'],
    takeaways: ['Simple forms are read faster than complex ones.', 'Clear icons and shapes reduce effort.', 'Remove what doesn’t help the meaning.'],
    practice: ['Icons are built from simple, recognisable forms.', 'Logos and marks are tested small, where only simple shapes survive.', 'Each screen has one clear focal point.', 'I remove decoration that doesn’t add meaning.'],
    ai: 'AI output tends to add: extra gradients, badges and flourishes nobody asked for. Applying Prägnanz is mostly editing, taking things away until what’s left is clear.',
    origins: 'A core idea of Gestalt psychology from Max Wertheimer and Kurt Koffka. “Prägnanz” is German for conciseness or pithiness.',
    source: 'https://lawsofux.com/law-of-pr%C3%A4gnanz/',
    faq: [{ q: 'Does Prägnanz mean minimalism?', a: 'Not exactly. It means clarity. A rich design can still be easy to read if its forms are simple and its hierarchy is clear.' }],
  }),
  principle({
    slug: 'law-of-uniform-connectedness', name: 'Law of Uniform Connectedness', art: 'connected', category: 'Gestalt', date: '2026-09-03',
    title: 'The Law of Uniform Connectedness: Lines Tie Things Together',
    definition: 'Elements that are visually connected, by a line, a shared colour or a frame, are seen as more related than unconnected ones.',
    description: 'The Gestalt law of uniform connectedness in UI design: steppers, timelines and connecting lines that show relationships at a glance.',
    keywords: ['law of uniform connectedness', 'Gestalt principles', 'stepper UI', 'timeline design', 'visual relationships'],
    intro: ['A single line can say “these belong together” more strongly than spacing or colour. Connect two things visually and people read them as one system.'],
    takeaways: ['Connections are one of the strongest grouping cues.', 'Use lines and frames to show steps, flows and relationships.', 'Connect only what’s genuinely related.'],
    practice: ['Steppers link their steps with a line, so progress reads as one journey.', 'Timelines and flows use connectors to show sequence.', 'Labels connect to the data they describe.', 'The winding line on my About page is this law at work.'],
    ai: 'When AI lays out a multi-step flow, it often presents steps as separate cards. A simple connecting line turns them back into one journey, and people understand where they are much faster.',
    origins: 'Psychologists Stephen Palmer and Irvin Rock proposed uniform connectedness in 1994 as a fundamental principle of perceptual organisation.',
    source: 'https://lawsofux.com/law-of-uniform-connectedness/',
    faq: [{ q: 'Is uniform connectedness stronger than proximity?', a: 'Often, yes. A visible connection can group elements even when they’re far apart.' }],
  }),
];
articles.push(...principles);

export const articleHref = (slug: string) => `/insights/${slug}`;
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/** Laws of UX + Gestalt are "principles"; everything else is an "idea" (blog post). */
export const isPrinciple = (a: Article) => a.category === 'Laws of UX' || a.category === 'Gestalt';
export const collectionOf = (a: Article) => (isPrinciple(a) ? 'Principles' : 'Ideas');
export const ideas = () => articles.filter((a) => !isPrinciple(a));
export const lawsOfUx = () => articles.filter((a) => a.category === 'Laws of UX');
export const gestalt = () => articles.filter((a) => a.category === 'Gestalt');

/** Previous (newer) and next (older) entry in the same collection, for the links at the end of an article. */
export function getAdjacent(slug: string) {
  const a = getArticle(slug)!;
  const list = articles.filter((x) => isPrinciple(x) === isPrinciple(a)).sort((x, y) => y.date.localeCompare(x.date));
  const i = list.findIndex((x) => x.slug === slug);
  return { newer: list[i - 1], older: list[i + 1] };
}

/* ---------- Reading time + plain text (for word counts and structured data) ---------- */
const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*/g, '');
function blockText(b: Block): string {
  switch (b.type) {
    case 'list': return b.items.join(' ');
    case 'table': return [...b.head, ...b.rows.flat()].join(' ');
    case 'art': return b.caption ?? '';
    case 'callout': return `${b.title} ${b.text}`;
    default: return b.text;
  }
}
export function articleText(a: Article) {
  return plain([
    ...a.intro, ...a.takeaways,
    ...a.sections.flatMap((s) => [s.title, ...s.blocks.map(blockText)]),
    ...a.faq.flatMap((f) => [f.q, f.a]),
  ].join(' '));
}
export const wordCount = (a: Article) => articleText(a).split(/\s+/).filter(Boolean).length;
export const readMinutes = (a: Article) => Math.max(1, Math.round(wordCount(a) / 220));
export const plainText = plain;
