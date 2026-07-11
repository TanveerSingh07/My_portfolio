"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStack } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeIn, viewportOnce } from "@/lib/motion";

const CATEGORY_COLOR = {
  Frontend: "#4A6CF7",
  Backend: "#3552C6",
  Database: "#8AA0F2",
  Language: "#D97757",
  Tooling: "#6E6B60",
};

const WEIGHT_SIZE = {
  lg: "w-20 h-20 md:w-24 md:h-24 text-sm md:text-base",
  md: "w-16 h-16 md:w-20 md:h-20 text-xs md:text-sm",
  sm: "w-14 h-14 md:w-16 md:h-16 text-[11px] md:text-xs",
};

// Positions each tool around a central "Full-Stack" hub in an organic,
// non-uniform orbit rather than a grid — angle spaced evenly, radius alternated
// across four bands so nodes don't line up into a boring perfect circle.
function useOrbitPositions(items) {
  return useMemo(() => {
    const bands = [26, 40, 32, 44];
    const angleStep = 360 / items.length;
    return items.map((item, i) => {
      const angle = ((angleStep * i - 90) * Math.PI) / 180;
      const radius = bands[i % bands.length];
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle) * 0.78;
      return { ...item, x, y };
    });
  }, [items]);
}

export default function TechStack() {
  const nodes = useOrbitPositions(techStack);
  const [active, setActive] = useState(nodes[0]);

  return (
    <section id="stack" className="relative py-28 md:py-36 bg-paper-dim overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="the workspace"
          title="Tools I actually reach for"
          desc="Not a skill bar in sight. Every tool orbits the stack it belongs to — hover or tap one to see where it's actually been used."
        />

        <div className="mt-16 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
          {/* the constellation */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative h-[440px] sm:h-[500px] md:h-[560px] w-full"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {nodes.map((n) => (
                <line
                  key={`line-${n.name}`}
                  x1="50"
                  y1="50"
                  x2={n.x}
                  y2={n.y}
                  stroke={CATEGORY_COLOR[n.category]}
                  strokeOpacity={active.name === n.name ? 0.55 : 0.16}
                  strokeWidth={active.name === n.name ? 0.5 : 0.3}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* hub */}
            <div
              className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-ink text-paper flex flex-col items-center justify-center text-center shadow-lift z-10"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <span className="font-display italic text-[11px] md:text-sm leading-tight">Full<br />Stack</span>
            </div>

            {nodes.map((n, i) => (
              <motion.button
                key={n.name}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(n)}
                onFocus={() => setActive(n)}
                onClick={() => setActive(n)}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                  className={`flex items-center justify-center rounded-full font-medium text-center px-1.5 leading-tight border-2 transition-all duration-300 ${
                    WEIGHT_SIZE[n.weight]
                  } ${
                    active.name === n.name
                      ? "bg-white shadow-lift scale-110 text-ink"
                      : "bg-white/90 shadow-soft text-ink-soft hover:text-ink hover:shadow-card"
                  }`}
                  style={{ borderColor: active.name === n.name ? CATEGORY_COLOR[n.category] : "transparent" }}
                >
                  {n.name}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>

          {/* usage detail panel */}
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white border border-line rounded-2xl shadow-card p-7 min-h-[220px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="eyebrow px-2.5 py-1 rounded-full"
                      style={{
                        color: CATEGORY_COLOR[active.category],
                        backgroundColor: `${CATEGORY_COLOR[active.category]}14`,
                      }}
                    >
                      {active.category}
                    </span>
                    <span className="font-mono text-[11px] text-ink-faint">$ used_in --project</span>
                  </div>
                  <h3 className="font-display text-3xl mt-4 text-ink">{active.name}</h3>
                  <p className="text-ink-soft text-sm mt-3 leading-relaxed">{active.usage}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
