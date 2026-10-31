/**
 * Lists every piece of copy still waiting to be written.
 *
 *   npm run content:todo
 *
 * Reads content/site.ts as text rather than importing it, so it runs on a
 * plain `node` with no build step and no dependencies.
 */
import fs from "node:fs";
import path from "node:path";

const SITE = path.join(process.cwd(), "content", "site.ts");
const BLOG = path.join(process.cwd(), "content", "blog");

const source = fs.readFileSync(SITE, "utf8");
const lines = source.split("\n");

/**
 * Blanks out comment bodies while keeping every newline, so line numbers still
 * line up. Without this the file's own documentation — which mentions
 * todo("...") — is reported as an unwritten placeholder.
 */
const blankComments = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/\/\/[^\n]*/g, (m) => " ".repeat(m.length));

const code = blankComments(source);

// Matches todo("...") and todo(\n  "...",\n) across line breaks.
const todos = [];
const pattern = /todo\(\s*(["'`])([\s\S]*?)\1\s*,?\s*\)/g;
for (const match of code.matchAll(pattern)) {
  const line = code.slice(0, match.index).split("\n").length;
  todos.push({ line, note: match[2].replace(/\s+/g, " ").trim() });
}

// Section headers in the file, so each todo can be reported under one.
const headings = [];
lines.forEach((text, i) => {
  const m = text.match(/^\/\/ (?!-)(.+)$/);
  if (m && !m[1].startsWith("--")) headings.push({ line: i + 1, title: m[1].trim() });
});
const sectionFor = (line) =>
  [...headings].reverse().find((h) => h.line < line)?.title ?? "Site";

console.log(`\n${todos.length} piece${todos.length === 1 ? "" : "s"} of copy still to write\n`);

let current = null;
for (const todo of todos) {
  const section = sectionFor(todo.line);
  if (section !== current) {
    current = section;
    console.log(`  ${section}`);
  }
  console.log(`    content/site.ts:${String(todo.line).padStart(4)}  ${todo.note}`);
}

// Empty collections that the site needs filled before launch.
const empties = [
  [/export const testimonials:[^=]*=\s*\[\s*\]/, "testimonials — none published yet (at least 3 needed)"],
];
const found = empties.filter(([re]) => re.test(code)).map(([, label]) => label);

const drafts = fs.existsSync(BLOG)
  ? fs
      .readdirSync(BLOG)
      .filter((f) => /\.mdx?$/.test(f) && f.toLowerCase() !== "readme.md")
      .filter((f) => /^draft:\s*true/m.test(fs.readFileSync(path.join(BLOG, f), "utf8")))
  : [];

if (found.length || drafts.length) {
  console.log("\n  Also outstanding");
  for (const label of found) console.log(`    ${label}`);
  for (const file of drafts) console.log(`    content/blog/${file} — still a draft`);
}

console.log("");
