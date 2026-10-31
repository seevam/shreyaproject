"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user": every motion animation on the site is skipped for
 * people who have "reduce motion" turned on in their system settings.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
