"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Globe,
  GraduationCap,
  GitBranch,
  Users,
  Rocket,
  Trophy,
  Sparkles,
  Send,
} from "lucide-react";
import { journey, stats } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";
import CountUp from "./CountUp";

const ICONS = {
  code: Code2,
  globe: Globe,
  graduation: GraduationCap,
  branch: GitBranch,
  users: Users,
  rocket: Rocket,
  trophy: Trophy,
  sparkles: Sparkles,
};

export default function Journey() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const markerTop = useTransform(scrollYProgress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);
  const markerRotate = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 20, -20, 0]);

  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="the road so far"
          title="My Journey"
          desc="Not a resume bullet list — the actual path from curiosity to shipped products."
        />

        <div ref={trackRef} className="relative mt-20">
          {/* connecting line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-px bg-line" />

          {/* scroll-linked flight marker travelling the line */}
          <motion.div
            style={{ top: markerTop }}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-accent shadow-lift items-center justify-center pointer-events-none"
          >
            <motion.div style={{ rotate: markerRotate }}>
              <Send size={14} className="text-paper" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>

          <div className="flex flex-col gap-14 md:gap-0">
            {journey.map((item, i) => (
              <MilestoneRow key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        <StatsGrid />
      </div>
    </section>
  );
}

function MilestoneRow({ item, index }) {
  const leftSide = index % 2 === 0;
  const Icon = ICONS[item.icon] || Sparkles;

  return (
    <div className="md:grid md:grid-cols-2 md:gap-16 md:py-14 relative">
      <div className={`hidden md:flex ${leftSide ? "justify-end" : "col-start-2 justify-start"}`}>
        {leftSide ? (
          <MilestoneCard item={item} align="right" index={index} />
        ) : (
          <DecorativeSide item={item} Icon={Icon} index={index} align="left" />
        )}
      </div>
      <div className={`hidden md:flex ${leftSide ? "col-start-2 justify-start" : "justify-end"}`}>
        {!leftSide ? (
          <MilestoneCard item={item} align="left" index={index} />
        ) : (
          <DecorativeSide item={item} Icon={Icon} index={index} align="right" />
        )}
      </div>

      {/* node */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        custom={index}
        className="absolute left-[15px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-[13px] h-[13px] rounded-full bg-accent ring-4 ring-accent-dim z-10"
      />

      {/* mobile card */}
      <div className="md:hidden pl-10">
        <MilestoneCard item={item} align="left" index={index} />
      </div>
    </div>
  );
}

function MilestoneCard({ item, align, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={index}
      className={`bg-white border border-line rounded-2xl p-6 shadow-soft max-w-md hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 ${
        align === "right" ? "md:text-right" : ""
      }`}
    >
      <span className="eyebrow text-accent">{item.year}</span>
      <h3 className="font-display text-xl mt-2 text-ink">{item.title}</h3>
      <p className="text-ink-soft text-sm mt-2 leading-relaxed">{item.detail}</p>
    </motion.div>
  );
}

// Fills the side of the row that has no card: a large ghost numeral for the
// year plus a floating icon badge, tied back to the node with a short dashed lead-in.
function DecorativeSide({ item, Icon, index, align }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={index}
      className={`relative w-full max-w-md h-full min-h-[120px] flex items-center ${
        align === "right" ? "justify-end pr-2" : "justify-start pl-2"
      }`}
    >
      <div className={`relative flex items-center gap-5 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
          className="relative shrink-0 w-16 h-16 rounded-2xl bg-white border border-line shadow-soft flex items-center justify-center text-accent"
        >
          <Icon size={24} strokeWidth={1.75} />
          <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent-dim border border-line" />
        </motion.div>
        <span
          className="font-display italic text-7xl md:text-8xl leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #E7E1D2",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

function StatsGrid() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-24 bg-white border border-line rounded-3xl shadow-soft p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
    >
      {stats.map((s) => (
        <div key={s.label} className="text-center md:text-left">
          <p className="font-display text-3xl md:text-4xl text-ink">
            <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
          </p>
          <p className="text-ink-soft text-xs md:text-sm mt-1.5">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, desc, light }) {
  return (
    <div className="max-w-2xl">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="eyebrow text-accent mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        custom={1}
        className={`font-display text-4xl md:text-5xl text-balance ${light ? "text-paper" : "text-ink"}`}
      >
        {title}
      </motion.h2>
      {desc && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          custom={2}
          className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-paper/70" : "text-ink-soft"}`}
        >
          {desc}
        </motion.p>
      )}
    </div>
  );
}
