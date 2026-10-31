# Communicate & Connect

The website for Shreya Kochar's cue cards initiative: the cards, the story
behind them, and evidence of them being used in the real world.

Built from the PRD dated 9 September 2026. The PRD specified Wix; this is a
Next.js build instead, so the blog can be Markdown files in the repository and
the whole site stays version-controlled and free to host.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Production build. Fails loudly if any blog post is malformed |
| `npm start` | Serves the production build |
| `npm run typecheck` | TypeScript check, no build |
| `npm run content:todo` | **Lists every piece of copy still to write** |

`npm run content:todo` is the one to run most often. It reads the content files
and prints exactly what is outstanding, with file and line numbers.

---

## Where the words live

Two places, and nothing else:

- **`content/site.ts`** — every word on the site apart from blog posts. Hero,
  problem, solution, impact, testimonials, About, the cards page, the feedback
  form, the footer. Edit it here and the pages follow.
- **`content/blog/*.md`** — one Markdown file per blog post. See
  [`content/blog/README.md`](content/blog/README.md) for how to add one from
  the GitHub website with no tooling installed.

### Unwritten copy is hidden until it is written

Copy that has not been written yet is wrapped in `todo("...")`:

```ts
bio: todo("short bio — a few sentences, first person"),
```

On the site, a `todo()` renders as **nothing**, so visitors only ever see
finished content. While writing, run with placeholders switched on to see
every gap as an amber **TO WRITE** box in place:

```bash
NEXT_PUBLIC_SHOW_PLACEHOLDERS=1 npm run dev
```

`npm run content:todo` lists them all either way. To fill one in, replace the
whole `todo(...)` call with the real text:

```ts
bio: "I'm a high-school student in Chandigarh who …",
```

### Sections that appear on their own

Some parts of the site stay hidden until there is real content behind them,
then switch themselves on (`src/lib/visibility.ts`):

- **Blog.** While every post is a draft, the Blog links, the "Read the blog"
  buttons and the sitemap entry are hidden. Publish one post
  (`draft: false`) and they all come back.
- **Testimonials.** Hidden, with its nav link, until the `testimonials` array
  in `content/site.ts` has at least one approved quote.

---

## Blog posts

Posts are Markdown files with a front-matter block. `draft: true` keeps a post
in the repository but off the live site — the five planned posts from the PRD
are already there as drafts, each with a brief describing what it needs to
cover. Change `draft: false` to publish.

Categories and the year-by-year archive are generated from the posts
themselves; there is nothing separate to maintain.

The full author-facing guide is [`content/blog/README.md`](content/blog/README.md).

---

## The feedback form

The form collects anonymous feedback (PRD §6.3). There is deliberately no name
or email field, so it cannot collect an identity even by accident.

It posts to whatever URL is in `NEXT_PUBLIC_FEEDBACK_ENDPOINT`. Any form
service that accepts a `POST` works — Formspree, Basin, Formcarry:

1. Create a form on the service and copy its endpoint URL
2. Add `NEXT_PUBLIC_FEEDBACK_ENDPOINT=https://...` to the hosting
   environment's variables (and to `.env.local` for local development)
3. Redeploy

With no endpoint set, the page offers a pre-filled email to
connectwithshreyakochar@gmail.com instead. Email is not anonymous (Shreya
sees the sender's address), so in that mode the page says so rather than
promising anonymity; quotes on the site are still always anonymous.

Approved quotes are then copied by hand into the `testimonials` array in
`content/site.ts`. Nothing publishes automatically — that is the PRD
requirement, and it is enforced by there being no automatic path at all.

---

## Design

**Colours** are CSS variables at the top of `src/app/globals.css`, sampled from
the cards' Canva deck: the cards' navy for headings, hot pink for
labels, the purple "grown-up" dot, the yellow "child" dot. No colour is
hard-coded in a component, so a change there re-skins the whole site.

Each brand colour comes in two roles. The raw pink (3.1:1) and yellow (1.6:1)
fail WCAG as text on a light page, so they are used for fills and graphics
only, and a darkened pink is used for text and links. The dots always sit
beside a text label, never carrying meaning by colour alone. Keep any
replacement at 4.5:1 or better for text, 3:1 for borders and controls.

**Typefaces** are Fredoka (rounded) for headings and Nunito for body — two,
per the PRD. They are set in `src/app/layout.tsx` and self-hosted at build
time, so the browser never calls Google.

**Look and motion.** The style is deliberately playful, to match the cards:
chunky navy outlines with hard "sticker" shadows (`shadow-pop`), tilted cards
that straighten on hover, soft colour blobs, wavy section edges, and a
marker-pen highlight (`.marker`) on key words. Animation uses the `motion`
library: the hero cards are dealt in and tilt toward the pointer (and can be
dragged), sections rise in as they scroll into view (`Reveal`, `Stagger` in
`src/components/motion.tsx`), and the card gallery filters and shuffles with
animated reflow (`CardDeck.tsx`). Icons are from `lucide-react`; the feedback
form fires `canvas-confetti` on success.

All of it respects "reduce motion": JS animation via
`<MotionConfig reducedMotion="user">` in `Providers.tsx`, CSS animation via a
media query in `globals.css`, and the confetti checks the setting itself.

**Images.** The 20 card fronts in `public/images/cards/` and the instruction
card in `public/images/brand/` come from two sources. Seven fronts (happy,
neutral, angry, confused, uncomfortable, sad, frustrated), which include all
three in the hero, are 424 x 620 from the full-size images in the Project Diary
export: crisp on high-density screens. The other thirteen, and the instruction
card, were cropped from the 536px Canva page thumbnails and are about 212 x
310: fine at the sizes used here, slightly soft on high-density screens. To
sharpen them, export those cards at full size, crop the card front to the same
212:310 proportions, and overwrite the files **keeping the same filenames** — no
code change needed. Only card *fronts* are used, never the backs that carry the guidance
text, and there are no downloadable card files anywhere (PRD §5.4).

The card list, names and alt text live in `content/cards.ts`; the gallery, the
hero and every "20 cards / 10 cards" figure are derived from it.

**Field photos.** Five photographs from a classroom visit on 31 July 2026 (the
date is in their metadata) appear under "From the field" on the landing page.
They are listed in `impact.fieldGallery` in `content/site.ts`; delete an entry
to remove a photo. The web copies in `public/images/field/` are resized and
have their metadata stripped. The untouched originals, including the ones not
used, are in `source-photos/`, which the site does not serve. Left out on
purpose: close-ups of individual students, photos where the organisation's
name is legible on signage, a student's notebook, and near-duplicates.

**These photos need consent before launch.** They show identifiable people,
including students at the partner organisation. Confirm the organisation and
the students' guardians are happy for each one to be public. Note that this
GitHub repository is public, so the originals are already downloadable from it
until it is made private or the photos are removed from history.

`about.photo` is Shreya, cropped from the same field photo
(`public/images/brand/shreya.webp`). Still empty: `hero.photo` (optional,
replaces the card fan). They hold their shape with a labelled placeholder
frame until a photograph is added.

---

## Deploying

The site is fully prerendered at build time — there is no database and no
server-side data. It deploys to Vercel, Netlify or Cloudflare Pages by
connecting the repository; the build command is `npm run build`.

Adding `output: "export"` to `next.config.ts` would emit a plain folder of HTML
for hosts like GitHub Pages. It is switched off deliberately: static export
requires at least one published blog post, and the blog is all drafts. Once the
first post is live that line can be turned on safely.

Before launch, set `site.url` in `content/site.ts` to the real domain — the
canonical URLs, the sitemap and the social preview card all read from it.

---

## Where the copy came from

Most of the landing page and the whole cards page were filled in from the
cards' Canva deck, in Shreya's own wording where the deck already says
it. The About page's origin paragraph is adapted from the Communicate &
Connect Project Diary. Both sources: the product name, what the cards are, the problem, the how-a-set-works
steps, the features, and the full "how to use them" guide. Places where the
deck was adapted rather than copied are marked `Adapted:` in
`content/site.ts` so she can check them.

The deck says nothing about the nonprofit, the Bangkok competition, the
research paper, or her own story, so none of that is invented — those stay as
visible "To write" boxes.

## Decisions still needed

`npm run content:todo` lists the copy. These are the ones that are not just
copy:

- **The Project Diary's claims need checking before they go public.** It says
  the cards were tested with children, parents, teachers and therapists, and
  that a parent reported an anxious child could now name a feeling and ask for
  help. It also says "six emotions, 12 cards", which disagrees with its own
  images (seven topics) and with the 30-card deck. None of those claims is on a
  public page; they are in the draft blog post briefs, flagged, for Shreya to
  confirm or cut.
- **Whether the card fronts may be public.** PRD §5.4 flags a copyright
  caution from the 19 June session. Only fronts are shown, but an amber note on
  the cards page stays until Shreya confirms; delete `cardsPage.note` then.
- **Why existing options fall short, and how often the problem occurs.** PRD
  §2 asks for both; the deck covers neither.
- **Who Anisha Kochar is, if a line about her is wanted.** She is credited for
  design, exactly as on the last instruction card.
- **The guest author's name** for the "A note for new parents" post, which
  currently credits "Guest post".
- **The launch date**, which the PRD notes must precede application submission.
- **The domain.** `site.url` is a placeholder.
