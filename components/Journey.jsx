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
  const markerTop = useTransform(
    scrollYProgress,
    (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`,
  );
  const markerRotate = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 20, -20, 0],
  );

  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="the road so far"
          title="My Journey"
          desc="Every milestone taught me something new, taking me from curiosity to creating products that people can actually use."
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

          <div className="flex flex-col gap-14 md:gap-2">
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
    <div className="relative md:grid md:grid-cols-2 md:gap-20 md:py-20 items-center">
      {/* LEFT SIDE */}
      <div className="hidden md:flex justify-end pr-10">
        {leftSide ? (
          <MilestoneCard item={item} align="right" index={index} />
        ) : (
          <DecorativeSide
            item={item}
            Icon={Icon}
            index={index}
            align="left"
          />
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex justify-start pl-10">
        {leftSide ? (
          <DecorativeSide
            item={item}
            Icon={Icon}
            index={index}
            align="right"
          />
        ) : (
          <MilestoneCard item={item} align="left" index={index} />
        )}
      </div>

      {/* Timeline node */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        custom={index}
        className="absolute left-[15px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-[13px] h-[13px] rounded-full bg-accent ring-4 ring-accent-dim z-10"
      />

      {/* Mobile */}
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
      <p className="text-ink-soft text-sm mt-2 leading-relaxed">
        {item.detail}
      </p>
    </motion.div>
  );
}

// Fills the side of the row that has no card: a large ghost numeral for the
// year plus a floating icon badge, tied back to the node with a short dashed lead-in.
function DecorativeSide({ item, Icon, index, align }) {
  const right = align === "right";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={index}
      className={`relative w-full max-w-md min-h-[140px] flex items-center ${
        right ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex items-center gap-8 ${
          right ? "" : "flex-row-reverse"
        }`}
      >
        {/* Number (always near the timeline) */}
        <span
          className="font-display italic text-7xl md:text-8xl leading-none select-none"
          style={{
            color: "#6E6B60",
            WebkitTextStroke: "1px #E7E1D2",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon (always outer side) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative shrink-0 w-16 h-16 rounded-2xl bg-white border border-line shadow-soft flex items-center justify-center text-accent"
        >
          <Icon size={24} strokeWidth={1.75} />

          <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent-dim border border-line" />
        </motion.div>
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
      className="relative mt-24 overflow-hidden rounded-3xl border border-line bg-white shadow-soft"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,108,247,0.05),transparent_45%)] pointer-events-none" />

      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 p-8 md:p-10">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="group"
          >
            {/* terminal label */}
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              $ {s.label.toLowerCase().replace(/\s+/g, "_")}
            </p>

            {/* number */}
            <p className="mt-3 font-display text-3xl md:text-4xl text-ink transition-colors duration-300 group-hover:text-accent">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals || 0}
              />
            </p>

            {/* divider */}
            <div className="mt-3 h-px w-12 bg-accent/30 transition-all duration-300 group-hover:w-20 group-hover:bg-accent" />

            {/* description */}
            <p className="mt-3 text-sm text-ink-soft transition-colors duration-300 group-hover:text-ink">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
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
