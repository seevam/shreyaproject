import type { Metadata } from "next";
import { feedback, isTodo, site } from "@content/site";
import { Container } from "@/components/ui";
import { FeedbackForm } from "@/components/FeedbackForm";
import { Placeholder } from "@/components/Copy";

export const metadata: Metadata = {
  title: "Share feedback",
  description:
    "Anonymous feedback from people who have used the cue cards. No name, no email, no photograph.",
};

export default function FeedbackPage() {
  const hasEndpoint = site.feedbackEndpoint !== "";
  const hasEmail = !isTodo(site.contactEmail);

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <div className="max-w-prose">
          <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            {feedback.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            {feedback.lead}
          </p>
          <p className="mt-4 rounded-card border border-line bg-surface p-5 text-base leading-relaxed text-muted">
            {feedback.privacyNote}
          </p>

          <div className="mt-10">
            {hasEndpoint ? (
              <FeedbackForm />
            ) : (
              <div className="rounded-card border border-dashed border-line bg-surface p-6">
                <h2 className="text-lg font-semibold text-ink">
                  The form is not connected yet
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Set <code>NEXT_PUBLIC_FEEDBACK_ENDPOINT</code> in the hosting
                  environment to any form service that accepts a POST (Formspree,
                  Basin, Formcarry) and this page turns into a working anonymous
                  form. See <code>README.md</code> for the two-minute version.
                </p>
                {hasEmail ? (
                  <p className="mt-4 text-base text-ink">
                    In the meantime, feedback can be emailed to{" "}
                    <a
                      href={`mailto:${site.contactEmail}`}
                      className="text-accent-strong underline underline-offset-2"
                    >
                      {site.contactEmail}
                    </a>
                    .
                  </p>
                ) : (
                  <div className="mt-4">
                    <Placeholder note="contact email, so there is a way to reach Shreya until the form is connected" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
