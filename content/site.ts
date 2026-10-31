/**
 * ===========================================================================
 * ALL SITE COPY LIVES HERE.
 * ===========================================================================
 * Every word on the site outside of blog posts is in this one file. Edit it
 * here and the pages follow. Blog posts are separate Markdown files in
 * content/blog/.
 *
 * Anything wrapped in todo("...") is a PRD placeholder that still needs
 * Shreya's input. It renders on the page as a highlighted amber box so it is
 * impossible to publish by accident. Run `npm run content:todo` for the list.
 *
 * SOURCE OF THE FILLED-IN COPY. Where the text below is real rather than a
 * todo(), it comes from the Signal Cards Canva deck ("The Signal Cards", 38
 * pages), in Shreya's own wording wherever the deck already says it. Places
 * where it is adapted rather than lifted are marked "Adapted:" so she can
 * check them. Nothing is invented about the nonprofit, the competition, the
 * paper, or how often the problem occurs — the deck does not cover those.
 */

import { counts } from "./cards";

export const TODO_OPEN = "«TODO:";
export const TODO_CLOSE = "»";

/** Marks copy that is not written yet. Renders as a visible placeholder box. */
export const todo = (note: string) => `${TODO_OPEN} ${note}${TODO_CLOSE}`;

export const isTodo = (value: string) => value.trimStart().startsWith(TODO_OPEN);

// ---------------------------------------------------------------------------
// Site identity
// ---------------------------------------------------------------------------

export const site = {
  /**
   * PRODUCT / SITE NAME. PRD §7 left this open ("the site name will match the
   * product name"). The Canva deck is titled "The Signal Cards" and the cards
   * refer to themselves by that name, so it is used here. BUT the Project
   * Diary export calls the same cards "Communicate & Connect". The artwork is
   * identical, so these look like two names for one product; which is current
   * is for Shreya to say. Change `name` and `shortName` to switch.
   */
  name: "The Signal Cards",
  shortName: "Signal Cards",

  /** Used for meta descriptions and the social preview card. */
  description:
    "The Signal Cards are a visual cue deck for children who experience the world a little differently, and the adults who want to understand them better. Designed by Shreya Kochar.",

  /** Set this to the final domain before launch. Used for canonical + OG URLs. */
  url: "https://signalcards.example.com",

  contactEmail: todo("contact email for the footer"),

  founder: {
    name: "Shreya Kochar",
    role: "Founder",
  },

  /** Credit line printed on the last instruction card in the deck. */
  credits: {
    words: "Shreya Kochar",
    design: "Anisha Kochar",
  },

  /**
   * Where the feedback form posts. Any form endpoint that accepts a POST of
   * form-encoded fields works (Formspree, Basin, Formcarry, a Google Form
   * endpoint). Leave empty and the feedback page falls back to an email link,
   * so the page is never broken.
   */
  feedbackEndpoint: process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT ?? "",
} as const;

export const nav = [
  { href: "/about/", label: "About" },
  { href: "/cards/", label: "The cards" },
  { href: "/blog/", label: "Blog" },
  { href: "/#testimonials", label: "Testimonials" },
] as const;

// ---------------------------------------------------------------------------
// Landing page — Hero (PRD §5.1)
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "An independent initiative by Shreya Kochar",
  /**
   * PRD: title of 5 to 7 words. Adapted from the Welcome card: "their brain
   * is just working in its own unique way."
   */
  title: "Every brain works in its own way",
  /** Lifted from the Welcome card. */
  description:
    "The Signal Cards are a visual cue deck for children who experience the world a little differently, and the adults who want to understand them better.",
  /** The PRD's own example label. */
  ctaLabel: "See how the cards work",
  ctaHref: "/cards/#how-to-use",
  secondaryCtaLabel: "Read the blog",
  secondaryCtaHref: "/blog/",
  /**
   * The hero graphic is a fan of three real card fronts from content/cards.ts
   * (PRD §5.1: "hero graphic showing the physical cards"). They are renders
   * from the Canva deck, not photographs of the printed set — swap in a photo
   * by setting `photo` below once one exists.
   */
  fan: ["confused", "happy", "angry"],
  photo: { src: "", alt: "" },
} as const;

// ---------------------------------------------------------------------------
// Landing page — Problem (PRD §2, §5.1)
// ---------------------------------------------------------------------------

export const problem = {
  heading: "The problem",
  /**
   * Adapted: built from the Welcome card ("Some children are often
   * misunderstood. Their behaviour is frequently mistaken for defiance,
   * laziness, or attitude. In reality, their brain is just working in its own
   * unique way.") and its "what they do" line. About 60 words, plain language
   * (PRD §2 caps it at 120).
   *
   * STILL MISSING for PRD §2: how often this happens, and why existing
   * options fall short. The deck does not say; add a sentence here if wanted.
   */
  lead: "Some children are often misunderstood. Their behaviour is frequently mistaken for defiance, laziness, or attitude, when in reality their brain is just working in its own unique way. The adults around them end up correcting when they needed to understand, and the child is left with no way to say what is going on inside.",
  /** PRD: 2 to 3 supporting points. Adapted from the deck's card guidance. */
  points: [
    {
      title: "Mistaken for defiance",
      body: "Forgetting, daydreaming, talking a lot, a slow start. Behaviour like this is read as laziness or attitude, when the cards' own guidance is clear that it is not intentional.",
    },
    {
      title: "Correction instead of understanding",
      body: "Without a way to read what is happening, the instinct is to correct. The cards give the adult something calm and specific to say or do instead.",
    },
    {
      title: "Hard to name from the inside",
      body: "Many children find it hard to recognise and put into words what they are feeling. The cards give them a face, a name for it, and a simple way to respond.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Landing page — Solution (PRD §5.1)
// ---------------------------------------------------------------------------

export const solution = {
  heading: "The cards",
  /**
   * PRD §1: what is printed on a card, how many in a set, what a person does
   * with them. Adapted from the Welcome and "What's in the packet" cards.
   * Counts come from content/cards.ts.
   */
  lead: `The Signal Cards are a visual cue deck for children who experience the world a little differently, and the adults who want to understand them better. Each card shows a face and two words for what you are seeing, like Frustrated / Upset or Noise hurts / Overwhelmed. The set is ${counts.total} cards in two colours of dot, with six instruction cards at the front to show how to begin.`,
  /** PRD: how a set works. Lifted from "Getting started". */
  stepsHeading: "How a set works",
  steps: [
    {
      title: "Grown-up first",
      body: "Sit with the purple cards alone and read each one, so the system feels familiar before the child sees anything.",
    },
    {
      title: "Then the child",
      body: "In a calm moment, go through the yellow cards together and talk about which ones seem most familiar.",
    },
    {
      title: "Pick a few",
      body: "Choose 3 to 5 yellow cards that fit right now and put them where the child sees them every day.",
    },
  ],
  /** PRD: 3 to 4 key features. Adapted from the deck's guidance cards. */
  features: [
    {
      title: "Two decks, one system",
      body: "Purple-dot cards are for the grown-up: they describe a behaviour and what to say or do. Yellow-dot cards are for the child: they explain what might be happening and how to respond.",
    },
    {
      title: "For calm moments and hard ones",
      body: "Grown-ups use the purple cards in the moment, calmly, without handing the card over. The yellow cards are only for calm times, to build self-awareness and confidence.",
    },
    {
      title: "Familiarity, not rules",
      body: "The chosen yellow cards sit where the child sees them every day, on a desk, a bedside table or the fridge. They do not need to be read; seeing them is enough.",
    },
    {
      title: "Start with three to five",
      body: "No one needs the whole set at once. Pick the few that fit right now, set the rest aside, and revisit them every few weeks.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Landing page — Impact (PRD §5.1)
// ---------------------------------------------------------------------------

export const impact = {
  heading: "Where the cards are now",
  lead: "The cards are moving in three directions at once: into people's hands, into a competition, and into a research paper.",
  items: [
    {
      label: "In the field",
      title: "Printed and in use with a nonprofit in India",
      body: todo(
        "which nonprofit, where, how many cards were printed, roughly how many people used them, and over what period",
      ),
      status: "Ongoing",
      /** Photos from the deployment. Add files to public/images/ then list them here. */
      photos: [] as { src: string; alt: string }[],
    },
    {
      label: "Competition",
      title: "Submitted to an idea competition in Bangkok",
      body: todo(
        "name of the competition, what was submitted, when, and the current status",
      ),
      status: "Submitted",
      photos: [] as { src: string; alt: string }[],
    },
    {
      label: "Research",
      title: "A research paper on the underlying topic",
      body: todo(
        "what the ~3,000 word paper argues and where it is being submitted",
      ),
      status: "In progress",
      /** Set once the paper is published (PRD §6.2). */
      link: { href: "", label: "Read the paper" },
      photos: [] as { src: string; alt: string }[],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Landing page — Testimonials (PRD §5.1, §6.3)
// ---------------------------------------------------------------------------

/**
 * Feedback is collected anonymously — no names, no photographs (PRD §6.3).
 * Nothing publishes automatically: Shreya reviews every submission, then adds
 * the approved ones here by hand.
 *
 * Add entries in this shape:
 *
 *   { quote: "The cards gave us something to actually do together.",
 *     attribution: "Parent of a 6 year old" }
 *
 * PRD §6.3 leaves the attribution format open — pick one convention
 * ("Parent of a 6 year old", "Volunteer, Chandigarh") and keep to it.
 *
 * Deliberately empty: the site shows an honest "collecting feedback" state
 * rather than invented quotes. Success criterion 2 needs at least three real
 * ones live before applications.
 */
export const testimonials: { quote: string; attribution: string }[] = [];

export const testimonialsSection = {
  heading: "What people said",
  lead: "Feedback is collected anonymously from people who have actually used the cards. Every quote below was submitted by a real user and reviewed before it went up.",
  emptyState:
    "Feedback is being collected from the first group using the cards. Quotes will appear here once they have come in and been reviewed.",
} as const;

// ---------------------------------------------------------------------------
// Landing page — Closing CTA (PRD §5.1)
// ---------------------------------------------------------------------------

export const closingCta = {
  heading: "Used the cards?",
  body: "Feedback is anonymous and takes about a minute. It is the main way the next version of the cards gets better.",
  primary: { label: "Share feedback", href: "/feedback/" },
  secondary: { label: "Read the blog", href: "/blog/" },
} as const;

// ---------------------------------------------------------------------------
// About page (PRD §5.2)
// ---------------------------------------------------------------------------

export const about = {
  title: "About",
  /**
   * Adapted: first person, from Phase 1 of the "Communicate & Connect"
   * Project Diary (HTML export). CONFIRM it is Shreya's own writing before
   * publishing. The diary gives her METHOD (starting from memory) but not the
   * TRIGGER, which is what PRD §5.2 asks for, so that stays a to-do below.
   */
  lead: "I did not start with psychology textbooks or research studies. I started with memory. I asked myself which emotions I struggled with most as a child, and when I felt confused, overwhelmed, stuck, or lost. Those answers became the first cards.",
  /** Adapted: the diary's Phase 1 "breakthrough". Matches the cards' own "that feeling is real and valid". */
  principle:
    "Emotions are not good or bad, right or wrong. They are information: valid, important information that children need to understand and process.",
  originGap: todo(
    "the specific moment, person or observation that made you decide to turn this into a set of cards. The Project Diary describes how you worked but not what started it. PRD §5.2",
  ),
  /** PRD §5.2: includes one photograph and a short bio. */
  photo: {
    src: "",
    alt: todo("alt text for the photograph of Shreya"),
  },
  bio: todo("short bio — a few sentences, first person"),
  whereItsHeaded: {
    heading: "Where this is headed",
    body: todo("where the initiative is going next"),
  },
  creditsHeading: "Credits",
} as const;

// ---------------------------------------------------------------------------
// The cards page (PRD §5.4)
// ---------------------------------------------------------------------------

export const cardsPage = {
  title: "The cards",
  /** Adapted from the Welcome and "What's in the packet" cards. */
  lead: `${counts.total} cards, each with a face and two words for what you are seeing: ${counts.grownUp} for the grown-up, ${counts.child} for the child, and a few instruction cards to show how it all works.`,

  /**
   * PRD §5.4 — images only, no downloadable card files, given the copyright
   * caution flagged in the 19 June session. STILL OPEN: whether a sample card
   * can be shown in full. Until Shreya confirms, only the FRONT of each card
   * is used (artwork and its two words); the backs, which carry the guidance
   * text, are not shown. Delete this note once she has confirmed.
   */
  note: todo(
    "confirm with Shreya that the card fronts shown below may be public (PRD §5.4 copyright question — only fronts are shown, never the backs), then delete this note",
  ),

  /** Lifted from "What's in the packet". */
  packetHeading: "What is in the packet",
  packetIntro: "Two sets of cards, told apart by the dot in the top corner.",
  grownUp: {
    label: "Purple dot",
    audience: "For grown-ups",
    body: `${counts.grownUp} cards for parents, teachers, tutors, or any adult supporting the child. Each card describes a behaviour and helps you with what to say or do.`,
  },
  child: {
    label: "Yellow dot",
    audience: "For the child",
    body: `${counts.child} cards for the child. Each card explains what might be happening and gives them a simple way to understand and respond.`,
  },

  galleryHeading: "The card fronts",
  galleryIntro: `The ${counts.grownUp} grown-up cards. The ${counts.child} marked with a yellow dot also come as a child's version with the same picture.`,

  /**
   * PRD goal 2.1: "a working reference for anyone actually using the cue
   * cards, including the nonprofit cohort." Lifted from the deck's six
   * instruction cards, lightly trimmed; wording is Shreya's.
   */
  howToHeading: "How to use them",
  howToIntro:
    "A short guide for anyone using the cards. There is no wrong way to use them.",
  howTo: [
    {
      id: "getting-started",
      heading: "Getting started",
      items: [
        {
          label: "Step 1: grown-up first",
          text: "Before showing anything to your child, sit with the purple cards alone. Read through each one so you understand the system and feel comfortable with it.",
        },
        {
          label: "Step 2: then the child",
          text: "Introduce the yellow cards in a calm, relaxed moment, not during a difficult situation. Sit together and go through them one by one. Read them out loud and talk about which ones seem most familiar to your child.",
        },
        {
          label: "Choose a starting set",
          text: "You do not need to use all the cards at once. Together with your child, pick 3 to 5 or more yellow cards that seem most relevant right now. Set the rest aside for later.",
        },
      ],
    },
    {
      id: "every-day",
      heading: "Using them every day",
      items: [
        {
          label: "For the child",
          text: "Place the chosen yellow cards somewhere your child can see them every day, such as their desk, bedside table or the fridge. They do not need to read them actively. Seeing them regularly is enough.",
        },
        {
          label: "For the grown-up",
          text: "Keep your purple cards somewhere easy to access. When you notice a behaviour, find the matching card and follow its guidance.",
        },
        {
          label: "Remember",
          text: "These cards work through familiarity and not rules. The more your child sees them, the more natural they become.",
        },
      ],
    },
    {
      id: "difficult-moment",
      heading: "In a difficult moment",
      items: [
        {
          label: "When something is happening",
          text: "Find the purple card that matches what you are seeing. Read the “What to say / do” section and follow it calmly. You do not need to express anything else.",
        },
        {
          label: "What not to do",
          text: "Do not hand the card to the child while they are upset. Do not explain the card to them in the moment. Simply follow its guidance and remain calm.",
        },
        {
          label: "After the moment",
          text: "Once things are calm, you can talk about what happened together if the child is ready. There is no rush and no pressure.",
        },
        {
          label: "The yellow cards",
          text: "The yellow cards are not for difficult moments. They are for calm times only, and are for building self-awareness and gradual confidence.",
        },
      ],
    },
    {
      id: "things-to-remember",
      heading: "Things to remember",
      items: [
        {
          label: "Familiarity and repetition",
          text: "These cards work through familiarity and repetition. There is no wrong way to use them.",
        },
        {
          label: "Some cards matter more than others",
          text: "Some cards will seem more useful than others, and that is completely normal. Set the others aside and revisit them every few weeks to see if any new ones become relevant.",
        },
        {
          label: "Be patient",
          text: "Progress looks different for every child. Be patient with the process and celebrate the small moments of understanding.",
        },
      ],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Feedback page (PRD §6.1, §6.3)
// ---------------------------------------------------------------------------

export const feedback = {
  title: "Share feedback",
  lead: "If you have used the cards, this is the most useful thing you can do. Responses are anonymous — no name, no email, no photograph is collected or published.",
  privacyNote:
    "Nothing is published automatically. Shreya reads every response, and only puts a quote on the site if it is useful and anonymous.",
  fields: {
    role: {
      label: "How did you use the cards?",
      help: "For example: a parent, a teacher, a volunteer. This is the only thing that might appear next to a quote.",
    },
    experience: {
      label: "What happened when you used them?",
      help: "What worked, what did not, anything that surprised you.",
    },
    improve: {
      label: "What would you change?",
      help: "Optional.",
    },
    consent: {
      label:
        "You may publish an anonymous quote from this response on the website.",
    },
  },
  submitLabel: "Send feedback",
  successMessage:
    "Thank you — this has been received. It genuinely helps.",
  errorMessage:
    "Something went wrong sending that. Please try again, or email it instead.",
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  blurb:
    "An independent initiative by Shreya Kochar. The cards are not sold here.",
  links: [
    { href: "/about/", label: "About" },
    { href: "/cards/", label: "The cards" },
    { href: "/blog/", label: "Blog" },
    { href: "/feedback/", label: "Share feedback" },
  ],
} as const;
