import { createElement, type ReactNode } from "react";
import { TODO_CLOSE, TODO_OPEN, isTodo } from "@content/site";

/**
 * Unwritten todo() copy is HIDDEN by default, so the live site shows only
 * finished content. Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=1 (in .env.local, or in
 * the hosting environment for a preview) to draw each one as an amber
 * "To write" box instead — useful while writing. `npm run content:todo` lists
 * them either way.
 */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";

/**
 * Renders a string from content/site.ts. A todo() placeholder renders as
 * nothing, or as an amber box when placeholders are switched on.
 */
export function Copy({
  text,
  as = "p",
  className,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  if (isTodo(text)) return <Placeholder note={stripMarkers(text)} />;
  return createElement(as, { className }, text);
}

function stripMarkers(text: string): string {
  return text.trim().slice(TODO_OPEN.length, -TODO_CLOSE.length).trim();
}

/** The amber "still to write" box. Renders nothing unless placeholders are on. */
export function Placeholder({ note }: { note: string }) {
  if (!showPlaceholders) return null;
  return (
    <div
      role="note"
      className="my-3 rounded-lg border border-dashed border-amber-500/70 bg-amber-50 px-4 py-3 text-[0.9375rem] leading-relaxed text-amber-950"
    >
      <span className="mr-2 font-semibold uppercase tracking-wide text-amber-800">
        To write
      </span>
      {note}
    </div>
  );
}

/**
 * Shows children only when the copy is real. Used to drop a whole block —
 * a heading and its body together — while its copy is unwritten.
 */
export function IfWritten({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  if (isTodo(text) && !showPlaceholders) return null;
  return <>{children}</>;
}

export { isTodo };
