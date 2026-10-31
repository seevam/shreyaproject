import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { feedback, isTodo, site } from "@content/site";
import { Container, buttonClasses } from "@/components/ui";
import { FeedbackForm } from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Share feedback",
  description:
    "Share feedback on the Communicate & Connect cards. Quotes on the site are always anonymous.",
};

export default function FeedbackPage() {
  const hasEndpoint = site.feedbackEndpoint !== "";
  const hasEmail = !isTodo(site.contactEmail);
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
    feedback.emailSubject,
  )}&body=${encodeURIComponent(feedback.emailTemplate)}`;

  return (
    <article className="bg-dots relative overflow-hidden pb-24 pt-14 sm:pt-20">
      <Container>
        <div className="max-w-prose">
          <h1 className="font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">
            {feedback.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            {hasEndpoint ? feedback.lead : feedback.leadEmail}
          </p>
          <p className="mt-6 rotate-[-0.75deg] rounded-card border-2 border-navy bg-sun-soft p-5 text-base leading-relaxed text-ink shadow-pop">
            {feedback.privacyNote}
          </p>

          <div className="mt-10">
            {hasEndpoint ? (
              <FeedbackForm />
            ) : hasEmail ? (
              <div className="rounded-card border-2 border-navy bg-surface p-6 shadow-pop sm:p-8">
                <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-navy">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-navy bg-sun"
                  >
                    <Mail className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  {feedback.emailHeading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink">{feedback.emailBody}</p>
                <p className="mt-6">
                  <a href={mailto} className={buttonClasses("primary")}>
                    {feedback.emailButton}
                  </a>
                </p>
                <p className="mt-4 text-sm text-muted">
                  Or write to{" "}
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="font-bold text-accent-strong underline underline-offset-2"
                  >
                    {site.contactEmail}
                  </a>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </article>
  );
}
