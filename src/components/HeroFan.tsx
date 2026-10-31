"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { Card } from "@content/cards";
import { cardImage } from "@content/cards";

/**
 * Three real card fronts fanned out (PRD §5.1: "hero graphic showing the
 * physical cards").
 *
 * - On load the cards are "dealt" in from below, one after another.
 * - The whole fan tilts gently toward the pointer, in 3D.
 * - Hovering a card lifts it to the front.
 * All of it is skipped for people with "reduce motion" on (see Providers).
 */
export function HeroFan({ cards }: { cards: [Card, Card, Card] }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });

  const [left, centre, right] = cards;
  const layout = [
    { card: left, x: "0%", top: "24%", rotate: -9, z: 10, delay: 0.15 },
    { card: right, x: "62%", top: "24%", rotate: 8, z: 10, delay: 0.3 },
    { card: centre, x: "31%", top: "0%", rotate: -1, z: 20, delay: 0.45 },
  ];

  return (
    <motion.div
      className="relative mx-auto aspect-[6/4.9] w-full max-w-[540px] [perspective:1000px]"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        {layout.map(({ card, x, top, rotate, z, delay }) => (
          <motion.img
            key={card.slug}
            src={cardImage(card.slug)}
            alt={card.alt}
            width={212}
            height={310}
            className="absolute h-auto w-[38%] cursor-grab drop-shadow-[0_14px_18px_rgba(23,35,63,0.3)]"
            style={{ left: x, top, zIndex: z }}
            initial={{ opacity: 0, y: 140, rotate: rotate * 3 }}
            animate={{ opacity: 1, y: 0, rotate }}
            transition={{ type: "spring", stiffness: 90, damping: 13, delay }}
            whileHover={{ y: -18, rotate: 0, scale: 1.06, zIndex: 30 }}
            draggable={false}
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 40, cursor: "grabbing" }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
