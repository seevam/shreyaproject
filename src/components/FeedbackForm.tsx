"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { PartyPopper, Send } from "lucide-react";
import { feedback, site } from "@content/site";
import { buttonClasses } from "@/components/ui";

/** A short burst in the cards' colours. Skipped for "reduce motion". */
function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  confetti({
    particleCount: 140,
    spread: 80,
    origin: { y: 0.65 },
    colors: ["#a666f5", "#febc0d", "#f252b4", "#11468f", "#90c50f"],
    disableForReducedMotion: true,
  });
}

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Anonymous feedback form (PRD §6.1, §6.3). No name or email field exists, by
 * design — the form cannot collect an identity even if someone wanted to.
 *
 * Posts to site.feedbackEndpoint (set NEXT_PUBLIC_FEEDBACK_ENDPOINT to any
 * form service that accepts a POST). With no endpoint configured the form is
 * hidden and the page falls back to an email link, so it is never a dead end.
 */
export function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(site.feedbackEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      celebrate();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rotate-[-1deg] rounded-card border-2 border-navy bg-sun-soft p-7 shadow-pop-lg"
      >
        <PartyPopper aria-hidden="true" className="mb-3 h-9 w-9 text-accent-strong" strokeWidth={2.25} />
        <p className="font-display text-2xl font-semibold text-navy">{feedback.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Field
        name="role"
        label={feedback.fields.role.label}
        help={feedback.fields.role.help}
        required
      />
      <Field
        name="experience"
        label={feedback.fields.experience.label}
        help={feedback.fields.experience.help}
        multiline
        required
      />
      <Field
        name="improve"
        label={feedback.fields.improve.label}
        help={feedback.fields.improve.help}
        multiline
      />

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          value="yes"
          className="mt-1.5 h-5 w-5 shrink-0 rounded border-line-strong accent-[var(--color-accent-strong)]"
        />
        <label htmlFor="consent" className="text-base leading-relaxed text-ink">
          {feedback.fields.consent.label}
        </label>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-base font-medium text-accent-strong">
          {feedback.errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`${buttonClasses("primary")} disabled:opacity-60`}
      >
        <Send aria-hidden="true" className="h-4 w-4" />
        {status === "sending" ? "Sending…" : feedback.submitLabel}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  help,
  multiline = false,
  required = false,
}: {
  name: string;
  label: string;
  help: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const helpId = `${name}-help`;
  const classes =
    "mt-2 w-full rounded-2xl border-2 border-navy bg-surface px-4 py-3 text-base text-ink shadow-pop-sm transition-shadow placeholder:text-muted focus:shadow-pop";

  return (
    <div>
      <label htmlFor={name} className="block font-display text-lg font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-1 text-accent-strong" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <p id={helpId} className="mt-1 text-sm text-muted">
        {help}
      </p>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          required={required}
          aria-describedby={helpId}
          className={classes}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          required={required}
          aria-describedby={helpId}
          className={classes}
        />
      )}
    </div>
  );
}
