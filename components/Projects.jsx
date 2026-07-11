"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeUp, viewportOnce } from "@/lib/motion";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="selected work"
          title="Products, not prototypes"
          desc="Three full-stack builds, each solving a genuinely different problem end to end."
        />

        <div className="mt-16 flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.id} project={project} index={i} onOpen={() => setOpenProject(project)} />
          ))}
        </div>
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}

function ProjectShowcase({ project, index, onOpen }) {
  const reversed = index % 2 === 1;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={index}
      className="group relative bg-white border border-line rounded-3xl shadow-soft hover:shadow-lift transition-shadow duration-500 overflow-hidden"
    >
      <div className={`grid md:grid-cols-2 ${reversed ? "md:[direction:rtl]" : ""}`}>
        <div
          className="relative h-64 md:h-full min-h-[280px] overflow-hidden [direction:ltr]"
          style={{
            background: `linear-gradient(135deg, ${project.color}12, transparent 60%)`,
          }}
        >
          <div className="absolute top-6 left-6 z-10 font-mono text-[11px] text-ink-faint bg-white/70 backdrop-blur-sm px-2 py-1 rounded-md">
            {project.year}
          </div>
          <button
            onClick={onOpen}
            className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer"
            aria-label={`Open ${project.name} case study`}
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: reversed ? 0.6 : -0.6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative w-full max-w-sm rounded-xl bg-white border border-line shadow-card overflow-hidden"
            >
              <div className="h-7 bg-paper-dim flex items-center gap-1.5 px-3 border-b border-line">
                <span className="w-2 h-2 rounded-full bg-[#E7A28C]" />
                <span className="w-2 h-2 rounded-full bg-[#E7D28C]" />
                <span className="w-2 h-2 rounded-full bg-[#9CD98C]" />
                <span className="ml-2 text-[9px] font-mono text-ink-faint truncate">
                  {project.name.toLowerCase().replace(/\s/g, "")}.app
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full h-44 object-cover object-top"
                loading="lazy"
              />
            </motion.div>
          </button>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center [direction:ltr]">
          <span className="eyebrow text-ink-faint">{String(index + 1).padStart(2, "0")} / project</span>
          <h3 className="font-display text-3xl md:text-4xl mt-3 text-ink">{project.name}</h3>
          <p className="text-ink-soft mt-4 leading-relaxed">{project.tagline}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-dim text-accent-deep"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-paper-dim text-ink-faint">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
            >
              View case study <ArrowUpRight size={14} />
            </button>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-accent transition-colors"
            >
              <Github size={15} /> Source
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
