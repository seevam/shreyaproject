import { Hero } from "@/components/Hero";
import {
  ClosingCta,
  ImpactSection,
  ProblemSection,
  SolutionSection,
  TestimonialsSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ImpactSection />
      <TestimonialsSection />
      <ClosingCta />
    </>
  );
}
