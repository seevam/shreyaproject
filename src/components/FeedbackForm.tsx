"use client";

import { useState } from "react";
import { feedback, site } from "@content/site";

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
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p
        role="status"
        className="rounded-card border border-line bg-secondary-soft p-6 text-lg text-ink"
      >
        {feedback.successMessage}
      </p>
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
        className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
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
    "mt-2 w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-base text-ink placeholder:text-muted";

  return (
    <div>
      <label htmlFor={name} className="block text-base font-semibold text-ink">
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
