/**
 * The card set, as it appears in the Signal Cards Canva deck.
 *
 * One entry per grown-up (purple dot) card. Ten of them also exist as a
 * child's (yellow dot) card with the same artwork, marked `childVersion`.
 * The gallery, the hero and every "20 cards / 10 cards" figure on the site are
 * derived from this list, so the numbers cannot drift from the pictures.
 *
 * Images are the FRONT of each card only (the artwork and its two words). The
 * backs, which carry the full guidance text, are deliberately not shown — see
 * PRD §5.4 and the copyright caution from the 19 June session.
 *
 * Sources, in two resolutions:
 *  - happy, neutral, angry, confused, uncomfortable, sad, frustrated: 424x620
 *    (2x the display size), from the full-size card images in the Project
 *    Diary HTML export.
 *  - the other 13: 212x310 (1x), cropped from the 536px Canva page thumbnails.
 * Replace any file in public/images/cards/ with a larger export (keep the
 * filename and the 212:310 proportions) and the site sharpens with no code
 * change.
 */

export type Card = {
  /** File name in public/images/cards/, without extension. */
  slug: string;
  /** The coloured top label on the card. */
  headline: string;
  /** The white bottom label on the card. */
  subline: string;
  /** True if a yellow-dot child version of this card also exists. */
  childVersion: boolean;
  /** Describes the artwork for screen readers. */
  alt: string;
};

export const cards: Card[] = [
  {
    slug: "happy",
    headline: "Happy",
    subline: "Engaged",
    childVersion: true,
    alt: "Card: Happy, Engaged. A smiling boy on a warm yellow and orange background.",
  },
  {
    slug: "neutral",
    headline: "Neutral",
    subline: "Not interested",
    childVersion: false,
    alt: "Card: Neutral, Not interested. A girl with dark curly hair and a calm, flat expression on a teal background.",
  },
  {
    slug: "angry",
    headline: "Angry",
    subline: "Annoyed",
    childVersion: true,
    alt: "Card: Angry, Annoyed. A girl with pigtails frowning with her arms crossed on a red background.",
  },
  {
    slug: "confused",
    headline: "Confused",
    subline: "Unsure",
    childVersion: false,
    alt: "Card: Confused, Unsure. A girl with her hand on her chin and a puzzled look on a green and teal background.",
  },
  {
    slug: "uncomfortable",
    headline: "Uncomfortable",
    subline: "Needs space",
    childVersion: true,
    alt: "Card: Uncomfortable, Needs space. A boy wincing with clenched teeth on a blue background.",
  },
  {
    slug: "sad",
    headline: "Sad",
    subline: "Down",
    childVersion: true,
    alt: "Card: Sad, Down. A girl with long brown hair and a downcast face on a purple background.",
  },
  {
    slug: "frustrated",
    headline: "Frustrated",
    subline: "Upset",
    childVersion: true,
    alt: "Card: Frustrated, Upset. A girl with curly hair gritting her teeth on a deep red background.",
  },
  {
    slug: "forgetting",
    headline: "Forgetting",
    subline: "Full brain",
    childVersion: true,
    alt: "Card: Forgetting, Full brain. A boy with curly hair looking worried on a pink background.",
  },
  {
    slug: "daydreaming",
    headline: "Daydreaming",
    subline: "Distracted",
    childVersion: false,
    alt: "Card: Daydreaming, Distracted. A girl with a black bob gazing sideways under a thought bubble on a peach background.",
  },
  {
    slug: "outbursts",
    headline: "Outbursts",
    subline: "Meltdowns",
    childVersion: false,
    alt: "Card: Outbursts, Meltdowns. A boy with his arms crossed, shouting, on a green background.",
  },
  {
    slug: "repeating-questions",
    headline: "Repeating questions",
    subline: "Processing",
    childVersion: false,
    alt: "Card: Repeating questions, Processing. A girl with curly hair, finger to her temple, thinking, on a lavender background.",
  },
  {
    slug: "talking-a-lot",
    headline: "Talking a lot",
    subline: "Chatty",
    childVersion: false,
    alt: "Card: Talking a lot, Chatty. A girl with pigtails mid-sentence under a speech bubble on a coral background.",
  },
  {
    slug: "forgetful-daily",
    headline: "Forgetful daily",
    subline: "Memory gap",
    childVersion: true,
    alt: "Card: Forgetful daily, Memory gap. A boy with brown curls looking unsure on a pastel pink and blue background.",
  },
  {
    slug: "messy-space",
    headline: "Messy space",
    subline: "Untidy",
    childVersion: false,
    alt: "Card: Messy space, Untidy. A boy with his hands raised and an uncertain look on an orange and pink background.",
  },
  {
    slug: "lagging",
    headline: "Lagging",
    subline: "Slow start",
    childVersion: false,
    alt: "Card: Lagging, Slow start. A girl with hair buns and her arms crossed, looking tired, on a mint green background.",
  },
  {
    slug: "missing-cues",
    headline: "Missing cues",
    subline: "Unaware",
    childVersion: false,
    alt: "Card: Missing cues, Unaware. A girl with long blonde hair and a blank look on a grey and lavender background.",
  },
  {
    slug: "noise-hurts",
    headline: "Noise hurts",
    subline: "Overwhelmed",
    childVersion: false,
    alt: "Card: Noise hurts, Overwhelmed. A boy covering his ears and wincing on a dark blue-purple background.",
  },
  {
    slug: "time-struggles",
    headline: "Time struggles",
    subline: "Overtasked",
    childVersion: true,
    alt: "Card: Time struggles, Overtasked. A boy in a cream hoodie beside a wall clock on a teal background.",
  },
  {
    slug: "many-steps",
    headline: "Many steps",
    subline: "Overload",
    childVersion: true,
    alt: "Card: Many steps, Overload. A worried girl holding a fan of numbered step cards on a pink background.",
  },
  {
    slug: "fast-thinking",
    headline: "Fast thinking",
    subline: "Jumping topics",
    childVersion: true,
    alt: "Card: Fast thinking, Jumping topics. A girl with a black bob surrounded by swirling question marks on a yellow background.",
  },
];

export const counts = {
  grownUp: cards.length,
  child: cards.filter((c) => c.childVersion).length,
  total: cards.length + cards.filter((c) => c.childVersion).length,
} as const;

/** Looks a card up by slug. Throws, so a typo fails the build rather than the page. */
export function card(slug: string): Card {
  const found = cards.find((c) => c.slug === slug);
  if (!found) throw new Error(`content/cards.ts: no card with slug "${slug}"`);
  return found;
}

export const cardImage = (slug: string) => `/images/cards/${slug}.webp`;

/** The instruction card with the brain mascot ("Instead of… / Try this!"). */
export const instructionCard = {
  src: "/images/brand/instruction-card.webp",
  alt: "An instruction card. A cartoon brain with arms and legs stands between two speech bubbles: a red one reading 'Instead of…' and a green one reading 'Try this!'.",
} as const;
