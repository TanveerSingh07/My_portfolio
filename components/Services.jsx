"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="how I work"
          title="From brief to shipped product"
          desc="A workflow I run on every build — freelance project or personal one."
        />

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-[38px] left-0 right-0 h-px bg-line" />
          <div className="grid md:grid-cols-6 gap-8 md:gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                custom={i}
                className="relative flex md:flex-col gap-4 md:gap-0 items-start md:items-center text-left md:text-center"
              >
                <div className="relative shrink-0 md:mb-5">
                  <div className="w-[76px] h-[76px] md:mx-auto rounded-2xl bg-white border border-line shadow-soft flex items-center justify-center font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <p className="eyebrow text-accent">{s.step}</p>
                  <h3 className="font-display text-lg mt-1.5 text-ink">{s.title}</h3>
                  <p className="text-ink-soft text-sm mt-2 leading-relaxed md:max-w-[180px] md:mx-auto">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
