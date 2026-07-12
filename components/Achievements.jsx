"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Users,
  Award,
  GraduationCap,
  GitCommit,
  GitBranch,
} from "lucide-react";

import { achievements, education } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeUp, viewportOnce } from "@/lib/motion";

const ICONS = {
  "Academic Excellence": Trophy,
  Leadership: Users,
  "Leadership & Events": GitBranch,
  Hackathons: Trophy,
  Certifications: Award,
  Recognition: Trophy,
};

export default function Achievements() {
  const [active, setActive] = useState(0);

  return (
    <section id="achievements" className="relative py-28 md:py-36 bg-paper-dim">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="beyond the code"
          title="Achievements & Involvement"
          desc="Milestones that shaped my journey—from academics and leadership to hackathons and continuous learning."
        />

        <div className="mt-16 grid lg:grid-cols-[390px_1fr] gap-14 items-start">
          <GitTimeline active={active} setActive={setActive} />

          <div className="hidden lg:flex items-center justify-center h-full">
            <DetailPanel achievement={achievements[active]} />
          </div>
        </div>

        <EducationSection />
      </div>
    </section>
  );
}

function GitTimeline({ active, setActive }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative"
    >
      {/* vertical git line */}
      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-line" />

      {achievements.map((a, i) => {
        const Icon = ICONS[a.category] || Award;
        const isActive = active === i;

        return (
          <motion.button
            key={a.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            whileHover={{ x: 6 }}
            className="group relative w-full text-left flex gap-5 pb-9 last:pb-0"
          >
            {/* Git node */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={
                  isActive
                    ? {
                        scale: [1, 1.18, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-accent border-accent text-paper shadow-card"
                    : "bg-white border-line text-ink-soft"
                }`}
              >
                <GitCommit size={15} />
              </motion.div>

              {i !== achievements.length - 1 && (
                <div
                  className={`flex-1 w-px mt-2 transition-colors duration-300 ${
                    isActive ? "bg-accent" : "bg-line"
                  }`}
                />
              )}
            </div>

            {/* commit */}
            <div className="flex-1 pb-2">
              <p className="font-mono text-[11px] text-ink-faint">
                commit <span className="text-accent">{a.commit}</span>
              </p>
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0.72,
                }}
                className={`mt-2 rounded-xl border p-4 transition-all duration-300 ${
                  isActive
                    ? "bg-white border-accent shadow-card"
                    : "bg-paper border-line"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-accent text-paper"
                        : "bg-white text-accent border border-line"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                      {a.category}
                    </p>

                    <h3 className="font-display text-lg text-ink leading-tight">
                      {a.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function DetailPanel({ achievement }) {
  const Icon = ICONS[achievement.category] || Award;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={achievement.title}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35 }}
        className="bg-white border border-line rounded-3xl shadow-card overflow-hidden h-fit"
      >
        {/* Header */}

        <div className="border-b border-line px-7 py-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-accent">achievement.log</p>

            <h3 className="font-display text-3xl mt-2 text-ink">
              {achievement.title}
            </h3>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-accent-dim flex items-center justify-center text-accent">
            <Icon size={24} />
          </div>
        </div>

        {/* Body */}

        <div className="p-7 space-y-7">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-accent-dim text-accent text-xs font-mono">
              {achievement.category}
            </span>

            <span className="px-3 py-1 rounded-full bg-paper-dim text-ink-soft text-xs font-mono">
              {achievement.org}
            </span>
          </div>

          <p className="text-ink-soft leading-8">{achievement.detail}</p>

          {/* Metadata */}

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-line">
            {/* Commit */}
            <div>
              <p className="font-mono text-[11px] uppercase text-ink-faint">
                Commit
              </p>

              <p className="mt-2 font-mono text-accent">{achievement.commit}</p>
            </div>

            {/* Year */}
            <div>
              <p className="font-mono text-[11px] uppercase text-ink-faint">
                Timeline
              </p>

              <p className="mt-2 text-ink">{achievement.year}</p>
            </div>

            {/* Impact */}
            <div>
              <p className="font-mono text-[11px] uppercase text-ink-faint mb-3">
                Impact
              </p>

              <ul className="space-y-2.5">
                {achievement.impact.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <p className="font-mono text-[11px] uppercase text-ink-faint mb-3">
                Skills Used
              </p>

              <div className="flex flex-wrap gap-2">
                {achievement.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-dim border border-line text-xs font-mono text-ink-soft transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-7 pt-5 border-t border-line flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase text-ink-faint">
                Author
              </span>

              <span className="mt-1 text-sm text-ink">Tanveer Singh</span>
            </div>

            <div className="text-right">
              <span className="font-mono text-[11px] uppercase text-ink-faint">
                Command
              </span>

              <div className="mt-1 px-3 py-1 rounded-full bg-paper-dim font-mono text-xs text-accent">
                git show {achievement.commit}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function EducationSection() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-28"
    >
      <SectionHeading
        eyebrow="education"
        title="Academic Foundation"
        desc="The academic milestones that built the foundation for my software engineering journey."
      />

      <div className="mt-12 space-y-6">
        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-white shadow-soft hover:shadow-card transition-all duration-300"
          >
            {/* subtle accent glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(176,104,55,0.08),transparent_55%)]" />

            <div className="relative p-7 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Left Icon */}
                <div className="w-14 h-14 rounded-2xl border border-line bg-paper-dim flex items-center justify-center shrink-0">
                  <GraduationCap
                    size={22}
                    className="text-accent"
                  />
                </div>

                {/* Main Content */}
                <div className="flex-1">

                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                        Education
                      </span>

                      <h3 className="mt-2 font-display text-2xl text-ink leading-tight">
                        {e.degree}
                      </h3>

                      <p className="mt-1 text-ink-soft">
                        {e.school}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-xs text-accent">
                        {e.period}
                      </div>
                    </div>

                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-line" />

                  {/* Bottom Metadata */}
                  <div className="grid md:grid-cols-3 gap-6">

                    <div>
                      <p className="font-mono text-[11px] uppercase text-ink-faint">
                        Performance
                      </p>

                      <p className="mt-2 text-lg font-medium text-accent">
                        {e.detail}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] uppercase text-ink-faint">
                        Status
                      </p>

                      <p className="mt-2 text-ink">
                        {i === 0
                          ? "Final Year Student"
                          : "Completed"}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] uppercase text-ink-faint">
                        Focus
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {(i === 0
                          ? ["Full-Stack", "DSA", "AI"]
                          : ["Science", "Mathematics"]).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-paper-dim px-3 py-1 text-xs font-mono text-ink-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
