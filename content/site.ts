/**
 * ===========================================================================
 * ALL SITE COPY LIVES HERE.
 * ===========================================================================
 * Every word on the site outside of blog posts is in this one file. Edit it
 * here and the pages follow. Blog posts are separate Markdown files in
 * content/blog/.
 *
 * Anything wrapped in todo("...") is a PRD placeholder that still needs
 * Shreya's input. It renders on the page as a highlighted yellow box so it is
 * impossible to publish by accident. Run `npm run content:todo` for the list.
 */

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
   * WORKING TITLE. PRD §7 places the product name and site name as a
   * placeholder — Shreya indicated the site name will match the product name.
   * This is deliberately a real string rather than a todo() marker, because it
   * appears in the browser tab, the nav wordmark and every page title, and a
   * placeholder box there would make the site unreviewable. Replace both
   * fields below once the product name is decided.
   */
  name: "The Cue Cards Initiative",
  shortName: "Cue Cards",

  /** Used for meta descriptions and the social preview card. */
  description:
    "A set of cue cards designed by Shreya Kochar, now in use with a nonprofit in India — the cards, the story behind them, and what happened when real people used them.",

  /** Set this to the final domain before launch. Used for canonical + OG URLs. */
  url: "https://cuecards.example.com",

  contactEmail: todo("contact email for the footer"),

  founder: {
    name: "Shreya Kochar",
    role: "Founder",
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
  /** PRD: title of 5 to 7 words. */
  title: todo("hero title, 5 to 7 words"),
  /** PRD: one or two line description. */
  description: todo("hero description, one or two sentences"),
  ctaLabel: todo('hero CTA label, e.g. "See how the cards work"'),
  ctaHref: "/cards/",
  secondaryCtaLabel: "Read the blog",
  secondaryCtaHref: "/blog/",
  /**
   * PRD §5.1: hero graphic showing the physical cards. Drop a photograph into
   * public/images/ and set src below. Until then a placeholder frame renders.
   */
  image: {
    src: "",
    alt: todo("alt text describing the hero photograph of the printed cards"),
  },
} as const;

// ---------------------------------------------------------------------------
// Landing page — Problem (PRD §2, §5.1)
// ---------------------------------------------------------------------------

export const problem = {
  heading: "The problem",
  /**
   * PRD §2 calls this "the single most load-bearing piece of content on the
   * site". Plain language, non-expert reader, under 120 words.
   */
  lead: todo(
    "the problem the cue cards solve — who experiences it, how often, and why existing options fall short. Plain language, under 120 words. PRD §2",
  ),
  /** PRD: 2 to 3 supporting points. */
  points: [
    {
      title: todo("supporting point 1 — short heading"),
      body: todo("supporting point 1 — one or two sentences"),
    },
    {
      title: todo("supporting point 2 — short heading"),
      body: todo("supporting point 2 — one or two sentences"),
    },
    {
      title: todo("supporting point 3 — short heading (optional, delete if unused)"),
      body: todo("supporting point 3 — one or two sentences"),
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Landing page — Solution (PRD §5.1)
// ---------------------------------------------------------------------------

export const solution = {
  heading: "The cards",
  /** PRD §1: what is printed on a card, how many in a set, what a person does with them. */
  lead: todo(
    "one paragraph describing what the cue cards actually are — what is printed on a card, how many cards are in a set, and what a person does with them. PRD §1",
  ),
  /** PRD: 3 to 4 key features. */
  features: [
    {
      title: todo("key feature 1 — short heading"),
      body: todo("key feature 1 — one or two sentences"),
    },
    {
      title: todo("key feature 2 — short heading"),
      body: todo("key feature 2 — one or two sentences"),
    },
    {
      title: todo("key feature 3 — short heading"),
      body: todo("key feature 3 — one or two sentences"),
    },
    {
      title: todo("key feature 4 — short heading (optional, delete if unused)"),
      body: todo("key feature 4 — one or two sentences"),
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
  lead: todo(
    "origin story — what prompted Shreya to build the cards. First person. PRD §5.2",
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
} as const;

// ---------------------------------------------------------------------------
// The cards page (PRD §5.4)
// ---------------------------------------------------------------------------

export const cardsPage = {
  title: "The cards",
  lead: todo("one or two sentences introducing the card set to someone seeing it for the first time"),
  /**
   * PRD §5.4: images only, no downloadable card files, given the copyright
   * caution flagged in the 19 June session. Still open: whether a sample card
   * can be shown in full or only partially. Until that is confirmed, add only
   * images that are cleared to show.
   */
  note: todo(
    "confirm whether a sample card can be shown in full or only partially, then add cleared images below",
  ),
  gallery: [] as { src: string; alt: string; caption?: string }[],
  galleryEmptyState:
    "Photographs of the printed set are being added here.",
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
