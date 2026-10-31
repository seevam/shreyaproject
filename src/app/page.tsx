import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
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
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      <ImpactSection />
      <TestimonialsSection />
      <ClosingCta />
    </>
  );
}
