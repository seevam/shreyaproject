# The Cue Cards Initiative

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

### Unwritten copy is visible, not invisible

Copy that has not been written yet is wrapped in `todo("...")`:

```ts
title: todo("hero title, 5 to 7 words"),
```

It renders on the page as an amber **TO WRITE** box naming what is needed, so
an unfinished section is obvious on the page and cannot be published by
accident. Replace the whole `todo(...)` call with the real text:

```ts
title: "The five minutes before bedtime",
```

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

With no endpoint set, the page explains that the form is not connected and
falls back to the contact email, so it is never a dead end.

Approved quotes are then copied by hand into the `testimonials` array in
`content/site.ts`. Nothing publishes automatically — that is the PRD
requirement, and it is enforced by there being no automatic path at all.

---

## Design

**Colours** are six hex values at the top of `src/app/globals.css`. They are
placeholders until the printed cards are in hand; replacing them re-skins the
entire site, because no colour is hard-coded in a component.

Every pair has been checked for contrast. Keep any replacement at 4.5:1 or
better against its background for text, and 3:1 for borders and controls.

**Typefaces** are Fraunces for headings and Inter for body — two, per the PRD.
They are set in `src/app/layout.tsx` and self-hosted at build time, so the
browser never calls Google.

**Images.** There are none yet. Photographs go in `public/images/`, and are
referenced from `content/site.ts` (`hero.image`, `about.photo`,
`cardsPage.gallery`, `impact.items[].photos`). Anywhere a photograph is
missing, a labelled placeholder frame holds its shape.

Per PRD §5.4 there are no downloadable card files anywhere on the site, only
images.

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

## Decisions still needed

`npm run content:todo` lists the copy. These are the ones that are not just
copy:

- **The product name.** PRD §7 leaves it open, and the site name follows it.
  `site.name` currently reads "The Cue Cards Initiative" as a working title —
  it is a real string rather than a placeholder only because it appears in the
  browser tab and the nav, where an amber box would make the site unreviewable.
  Change `name` and `shortName` in `content/site.ts` once it is decided.
- **Whether a sample card can be shown in full**, given the copyright caution
  from the 19 June session. Until that is settled, the cards page has no
  images.
- **The contact email** for the footer.
- **The guest author's name** for the "A note for new parents" post, which
  currently credits "Guest post".
- **The launch date**, which the PRD notes must precede application submission.
