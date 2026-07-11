"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Award, GraduationCap } from "lucide-react";
import { achievements, education } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeUp, viewportOnce, staggerParent } from "@/lib/motion";

const ICONS = {
  Leadership: Users,
  Hackathon: Trophy,
  Certification: Award,
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-36 bg-paper-dim">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="beyond the code"
          title="Achievements & involvement"
          desc="Leadership, hackathons and certifications that shaped how I build."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {achievements.map((a, i) => {
            const Icon = ICONS[a.category] || Award;
            return (
              <motion.div
                key={a.title}
                variants={fadeUp}
                custom={i}
                className="bg-white border border-line rounded-2xl p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center text-accent">
                  <Icon size={18} />
                </div>
                <p className="eyebrow text-ink-faint mt-4">{a.category}</p>
                <h3 className="font-display text-lg mt-1.5 text-ink leading-snug">{a.title}</h3>
                <p className="text-xs text-ink-faint mt-1">{a.org}</p>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed">{a.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Education */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 bg-ink rounded-2xl p-7 md:p-9 grid sm:grid-cols-2 gap-6"
        >
          {education.map((e) => (
            <div key={e.degree} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-paper shrink-0">
                <GraduationCap size={18} />
              </div>
              <div>
                <h4 className="font-display text-base text-paper leading-snug">{e.degree}</h4>
                <p className="text-xs text-paper/60 mt-1">{e.school}</p>
                <p className="text-xs text-paper/60">{e.period}</p>
                <p className="text-sm text-accent mt-1.5 font-medium">{e.detail}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
