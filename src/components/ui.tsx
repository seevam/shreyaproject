import Link from "next/link";
import type { ReactNode } from "react";
import { cardsPage, isTodo } from "@content/site";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  tone = "paper",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "paper" | "soft" | "secondary" | "sun";
  className?: string;
}) {
  const tones = {
    paper: "bg-paper",
    soft: "bg-accent-soft",
    secondary: "bg-secondary-soft",
    sun: "bg-sun-soft",
  } as const;

  return (
    <section
      id={id}
      className={`${tones[tone]} scroll-mt-20 py-16 sm:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-prose">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent-strong">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl"
      >
        {children}
      </h2>
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-navy text-white hover:bg-accent-strong"
      : "border border-line-strong bg-surface text-ink hover:border-muted";

  return (
    <Link href={href} className={`${buttonBase} ${styles}`}>
      {children}
    </Link>
  );
}

/**
 * A stand-in for a photograph that has not been supplied yet. Keeps the page
 * proportions honest during review instead of collapsing the layout.
 */
export function ImageFrame({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3]",
  placeholderLabel = "Photograph to come",
}: {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: string;
  placeholderLabel?: string;
}) {
  return (
    <figure className="w-full">
      {src ? (
        // A plain <img>: these are hand-placed photographs, not a gallery
        // needing next/image's layout machinery.
        <img
          src={src}
          alt={alt}
          className={`${aspect} w-full rounded-card border border-line object-cover`}
        />
      ) : (
        <div
          className={`${aspect} flex w-full items-center justify-center rounded-card border border-dashed border-line bg-surface px-6 text-center`}
        >
          <span className="text-sm font-medium text-muted">{placeholderLabel}</span>
        </div>
      )}
      {caption ? (
        <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * ImageFrame for images whose alt text may still be a todo() placeholder.
 * An unwritten note must never reach the alt attribute, or a screen reader
 * reads the note aloud as if it described the picture; alt="" is the honest
 * fallback until it is written.
 */
export function ImageFrameAware({
  src,
  alt,
  aspect,
  placeholderLabel,
}: {
  src?: string;
  alt: string;
  aspect?: string;
  placeholderLabel?: string;
}) {
  return (
    <ImageFrame
      src={src || undefined}
      alt={isTodo(alt) ? "" : alt}
      aspect={aspect}
      placeholderLabel={placeholderLabel}
    />
  );
}


/**
 * The coloured dot in the corner of every card: purple for the grown-up
 * decks, yellow for the child's. Always rendered beside a text label — the
 * yellow is only 1.6:1 against the page, so colour alone never carries the
 * meaning, and the navy ring keeps the shape visible.
 */
export function Dot({
  kind,
  className = "",
}: {
  kind: "grownup" | "child";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-4 w-4 shrink-0 rounded-full border-2 border-navy ${
        kind === "grownup" ? "bg-grownup" : "bg-sun"
      } ${className}`}
    />
  );
}

/** The two card sets side by side: what each dot means. */
export function DotKey({ className = "" }: { className?: string }) {
  const sets = [
    { kind: "grownup", ...cardsPage.grownUp },
    { kind: "child", ...cardsPage.child },
  ] as const;

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {sets.map((set) => (
        <li
          key={set.kind}
          className="rounded-card border border-line bg-surface p-5"
        >
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            <Dot kind={set.kind} />
            {set.label} · {set.audience}
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{set.body}</p>
        </li>
      ))}
    </ul>
  );
}
