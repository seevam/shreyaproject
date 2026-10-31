import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cardsPage, isTodo } from "@content/site";
import { Reveal } from "@/components/motion";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export type Tone = "paper" | "soft" | "secondary" | "sun" | "navy";

const toneBg: Record<Tone, string> = {
  paper: "bg-paper",
  soft: "bg-accent-soft",
  secondary: "bg-secondary-soft",
  sun: "bg-sun-soft",
  navy: "bg-navy",
};

/** The CSS colour of each tone, for SVG fills that must match a section. */
export const toneFill: Record<Tone, string> = {
  paper: "var(--color-paper)",
  soft: "var(--color-accent-soft)",
  secondary: "var(--color-secondary-soft)",
  sun: "var(--color-sun-soft)",
  navy: "var(--color-navy)",
};

/**
 * A wavy top edge drawn in the section's own colour, so it bites into the
 * section above like torn paper. Purely decorative.
 */
export function Wave({ tone, flip = false }: { tone: Tone; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className={clsx(
        "pointer-events-none absolute inset-x-0 -top-[39px] h-10 w-full sm:-top-[63px] sm:h-16",
        flip && "-scale-x-100",
      )}
    >
      <path
        d="M0 40 C 180 0, 360 64, 540 36 S 900 4, 1080 30 S 1340 60, 1440 22 L1440 64 L0 64 Z"
        fill={toneFill[tone]}
      />
    </svg>
  );
}

/** Soft colour blobs behind a section. Decorative, never over text. */
export function Blobs({
  variant = "a",
}: {
  variant?: "a" | "b";
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === "a" ? (
        <>
          <div className="absolute -right-24 -top-16 h-72 w-72 rounded-blob bg-sun opacity-25 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-blob bg-accent opacity-15 blur-2xl" />
        </>
      ) : (
        <>
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-blob bg-grownup opacity-15 blur-2xl" />
          <div className="absolute -bottom-16 right-0 h-60 w-60 rounded-blob bg-sun opacity-25 blur-2xl" />
        </>
      )}
    </div>
  );
}

export function Section({
  children,
  id,
  tone = "paper",
  wave = true,
  blobs,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  /** Draw the wavy top edge. Off for the first section after a hero. */
  wave?: boolean;
  blobs?: "a" | "b";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "relative scroll-mt-20 py-20 sm:py-28",
        toneBg[tone],
        className,
      )}
    >
      {wave ? <Wave tone={tone} flip={tone === "secondary" || tone === "soft"} /> : null}
      {blobs ? <Blobs variant={blobs} /> : null}
      <Container className="relative">{children}</Container>
    </section>
  );
}

/** A small rotated label, like a sticker slapped on a notebook. */
export function Sticker({
  children,
  color = "sun",
  tilt = -3,
  className,
}: {
  children: ReactNode;
  color?: "sun" | "pink" | "purple" | "white";
  tilt?: number;
  className?: string;
}) {
  const colors = {
    // Text on each fill checked for 4.5:1.
    sun: "bg-sun text-navy",
    pink: "bg-accent-strong text-white",
    purple: "bg-secondary text-white",
    white: "bg-surface text-navy",
  } as const;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-navy px-3.5 py-1 text-sm font-bold uppercase tracking-[0.08em] shadow-pop-sm",
        colors[color],
        className,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  id,
  sticker = "pink",
  light = false,
}: {
  eyebrow?: string;
  children: ReactNode;
  id?: string;
  sticker?: "sun" | "pink" | "purple" | "white";
  /** For headings on the dark navy band. */
  light?: boolean;
}) {
  return (
    <Reveal className="max-w-prose">
      {eyebrow ? (
        <Sticker color={sticker} className="mb-4">
          {eyebrow}
        </Sticker>
      ) : null}
      <h2
        id={id}
        className={clsx(
          "font-display text-4xl font-semibold leading-[1.1] sm:text-5xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {children}
      </h2>
    </Reveal>
  );
}

/**
 * Chunky button with a hard navy shadow that "presses in" on click.
 * Shared by links and the feedback form's submit button.
 */
export const buttonClasses = (variant: "primary" | "secondary" | "sun" = "primary") =>
  clsx(
    "group inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy px-6 py-3 text-base font-bold shadow-pop transition-all duration-150",
    "hover:-translate-y-0.5 hover:shadow-pop-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
    variant === "primary" && "bg-navy text-white",
    variant === "secondary" && "bg-surface text-navy",
    variant === "sun" && "bg-sun text-navy",
  );

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "sun";
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={buttonClasses(variant)}>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      ) : null}
    </Link>
  );
}

/**
 * A photograph, or a labelled stand-in while one has not been supplied, so
 * the page keeps its proportions during review.
 */
export function ImageFrame({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3]",
  placeholderLabel = "Photograph to come",
  className,
}: {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: string;
  placeholderLabel?: string;
  className?: string;
}) {
  return (
    <figure className={clsx("w-full", className)}>
      {src ? (
        // A plain <img>: hand-placed photographs, not a gallery needing
        // next/image's layout machinery.
        <img
          src={src}
          alt={alt}
          className={clsx(aspect, "w-full rounded-card border-2 border-navy object-cover shadow-pop")}
        />
      ) : (
        <div
          className={clsx(
            aspect,
            "flex w-full items-center justify-center rounded-card border-2 border-dashed border-line-strong bg-surface px-6 text-center",
          )}
        >
          <span className="text-sm font-semibold text-muted">{placeholderLabel}</span>
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
  className,
}: {
  src?: string;
  alt: string;
  aspect?: string;
  placeholderLabel?: string;
  className?: string;
}) {
  return (
    <ImageFrame
      src={src || undefined}
      alt={isTodo(alt) ? "" : alt}
      aspect={aspect}
      placeholderLabel={placeholderLabel}
      className={className}
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
      className={clsx(
        "inline-block h-4 w-4 shrink-0 rounded-full border-2 border-navy",
        kind === "grownup" ? "bg-grownup" : "bg-sun",
        className,
      )}
    />
  );
}

/** The two card sets side by side: what each dot means. */
export function DotKey({ className = "" }: { className?: string }) {
  const sets = [
    { kind: "grownup", tilt: -1.5, bg: "bg-secondary-soft", ...cardsPage.grownUp },
    { kind: "child", tilt: 1.5, bg: "bg-sun-soft", ...cardsPage.child },
  ] as const;

  return (
    <ul className={clsx("grid gap-5 sm:grid-cols-2", className)}>
      {sets.map((set) => (
        <li
          key={set.kind}
          style={{ rotate: `${set.tilt}deg` }}
          className={clsx(
            "rounded-card border-2 border-navy p-5 shadow-pop transition-transform duration-200 hover:rotate-0",
            set.bg,
          )}
        >
          <p className="flex items-center gap-2.5 font-display text-xl font-semibold text-navy">
            <Dot kind={set.kind} className="h-6 w-6" />
            {set.label}
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.08em] text-muted">
            {set.audience}
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{set.body}</p>
        </li>
      ))}
    </ul>
  );
}
