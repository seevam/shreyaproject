# How to publish a blog post

You do not need to install anything. Everything happens in the browser.

## Adding a post

1. Go to this folder on GitHub: `content/blog/`
2. Click **Add file → Create new file**
3. Name the file after the post, lowercase, with hyphens instead of spaces, ending in `.md` — for example `taking-the-cards-to-delhi.md`
4. Paste the template below and write underneath it
5. Scroll down, write a short note in the commit box, click **Commit changes**

The site rebuilds itself within a minute or two. That is the whole process.

## The template

```markdown
---
title: Taking the cards to Delhi
date: 2026-07-14
author: Shreya Kochar
category: In the field
summary: One sentence that appears under the title on the blog list page.
draft: false
---

Write the post here, in normal sentences.

Leave a blank line between paragraphs.

## A subheading looks like this

- A bullet list
- looks like this

**Bold text** goes in double asterisks and *italic text* in single ones.
```

## What each front-matter field does

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Appears as the page heading and in the browser tab |
| `date` | yes | Always `YYYY-MM-DD`. Controls the ordering — newest first |
| `author` | yes | Use the real author. Guest posts get the guest's name |
| `category` | yes | Groups posts. Reuse an existing one where it fits, rather than inventing a near-duplicate |
| `summary` | yes | One sentence, shown on the blog list. Write it last |
| `draft` | yes | `true` keeps the post in the repository but off the live site. Change to `false` to publish |

Categories in use so far: **Origin**, **Design**, **In the field**, **For parents**.
Adding a new category is fine — a page for it is created automatically.

## If something breaks

The build fails loudly and tells you which file and which field is wrong,
rather than publishing a broken page. The most common causes:

- A missing `---` line above or below the front matter
- A date written as `14 July 2026` instead of `2026-07-14`
- A `title` or `summary` containing a colon — wrap the whole value in
  double quotes if it does: `title: "Cue cards: a beginning"`
