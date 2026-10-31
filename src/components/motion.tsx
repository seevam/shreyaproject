"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

/** Fades and springs its content up the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={rise}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** A list whose items rise in one after another. Pair with <StaggerItem>. */
export function Stagger({
  children,
  className,
  as = "ul",
}: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "li",
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
  /** Resting rotation in degrees, for a hand-placed sticker look. */
  tilt?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={rise}
      style={{ rotate: tilt }}
      whileHover={{ rotate: 0, y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
    >
      {children}
    </Tag>
  );
}
