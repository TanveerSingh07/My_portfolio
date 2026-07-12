"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { workflow, serviceBlocks } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { ArrowRight } from "lucide-react";

function WorkflowSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const arrowX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <SectionHeading
        eyebrow="how I build"
        title="From brief to shipped product"
        desc="Every project follows the same deliberate process—from understanding the problem to supporting it after launch."
      />

      <div ref={sectionRef} className="relative mt-20">

        {/* Timeline */}
        <div className="hidden md:block absolute left-0 right-0 top-[38px] h-6">

          {/* Base Line */}
          <div className="absolute left-[7%] right-[7%] top-1/2 -translate-y-1/2 h-px bg-line" />

          {/* Active Line */}
          <motion.div
            style={{
              width: progress,
            }}
            className="absolute left-[7%] top-1/2 -translate-y-1/2 h-[2px] bg-accent"
          />

          {/* Moving Arrow */}
          <motion.div
            style={{
              left: arrowX,
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <ArrowRight
              size={16}
              className="text-accent"
              strokeWidth={2.2}
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-6 gap-8 md:gap-4 relative">

          {workflow.map((s, i) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              custom={i}
              className="group flex flex-col items-center text-center relative"
            >
              {/* Node */}

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                className="relative z-20 mb-6"
              >
                <div className="relative w-[76px] h-[76px] rounded-2xl bg-white border border-line shadow-soft flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:shadow-card">

                  <span className="font-mono text-accent text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Center Dot */}

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-15" />

                  {/* Bottom Connector */}

                  <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-px h-3 bg-line" />
                </div>
              </motion.div>

              {/* Content */}

              <div>
                <p className="eyebrow text-accent">
                  {s.step}
                </p>

                <h3 className="font-display text-lg mt-2 text-ink">
                  {s.title}
                </h3>

                <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-[180px] mx-auto group-hover:text-ink transition-colors">
                  {s.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

function ServicesGrid() {
  return (
    <div className="mt-32">
      <SectionHeading
        eyebrow="what i build"
        title="Services"
        desc="Whether it's a personal project, startup MVP, or production-ready application, these are the areas I specialize in."
      />

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceBlocks.map((service, i) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={i}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl border border-line bg-white shadow-soft hover:shadow-lift transition-all duration-300 overflow-hidden"
          >
            {/* subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,108,247,0.06),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
                  {service.tag}
                </span>

                <span className="font-mono text-xs text-ink-faint">
                  0{i + 1}
                </span>
              </div>

              <h3 className="font-display text-2xl mt-5 text-ink">
                {service.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-ink-soft group-hover:text-ink transition-colors">
                {service.desc}
              </p>

              <motion.div
                className="mt-6 h-px bg-accent/30"
                initial={{ width: 36 }}
                whileHover={{ width: 90 }}
                transition={{ duration: 0.35 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <WorkflowSection />
        <ServicesGrid />
      </div>
    </section>
  );
}
