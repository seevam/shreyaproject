import { createElement, type ReactNode } from "react";
import { TODO_CLOSE, TODO_OPEN, isTodo } from "@content/site";

/**
 * Renders a string from content/site.ts.
 *
 * If the string is still a todo() placeholder it is drawn as a visible amber
 * box naming what is needed, rather than silently printing «TODO: ...» into
 * the page. That way an unfinished section is obvious in review and cannot be
 * mistaken for finished copy.
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

/** The amber "still to write" box. */
export function Placeholder({ note }: { note: string }) {
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
  if (isTodo(text)) return null;
  return <>{children}</>;
}

export { isTodo };
