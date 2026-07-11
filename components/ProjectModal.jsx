"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-start md:items-center justify-center p-0 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/*
          IMPORTANT: the scale/y entrance animation lives on this OUTER wrapper,
          not on the scrollable element itself. A `transform` on an ancestor of a
          `position: sticky` element creates a new containing block and silently
          breaks the sticky behaviour — that was the cause of the header/body
          overlap. The inner div below is untransformed, so its sticky header
          stays correctly pinned while only the body scrolls beneath it.
        */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-paper w-full md:max-w-3xl h-full md:h-auto md:max-h-[86vh] md:rounded-3xl shadow-lift overflow-hidden"
        >
          <div className="h-full md:max-h-[86vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-paper px-7 md:px-10 pt-8 pb-6 border-b border-line">
              <div
                className="absolute inset-0 -z-10"
                style={{ background: `linear-gradient(180deg, ${project.color}12, #F7F4ED)` }}
              />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-line flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                aria-label="Close case study"
              >
                <X size={16} />
              </button>
              <span className="eyebrow text-accent">{project.year}</span>
              <h2 className="font-display text-3xl md:text-4xl mt-2 text-ink">{project.name}</h2>
              <p className="text-ink-soft mt-3 max-w-xl">{project.tagline}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.stack.map((s) => (
                  <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-full bg-white border border-line text-ink-soft">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-ink text-paper text-sm px-4 py-2.5 rounded-full hover:bg-accent transition-colors"
                >
                  <Github size={14} /> Repository
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white border border-line text-sm px-4 py-2.5 rounded-full hover:border-accent hover:text-accent transition-colors"
                  >
                    <ExternalLink size={14} /> Live demo
                  </a>
                )}
              </div>
            </div>

            {project.image && (
              <div className="px-7 md:px-10 pt-8">
                <div className="rounded-2xl overflow-hidden border border-line shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={`${project.name} product screenshot`} className="w-full h-auto block" />
                </div>
              </div>
            )}

            <div className="px-7 md:px-10 py-8 grid md:grid-cols-2 gap-8">
              <Block title="The problem" text={project.problem} />
              <Block title="The solution" text={project.solution} />

              <div className="md:col-span-2">
                <h3 className="font-display text-xl text-ink mb-4">Key features</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft bg-white border border-line rounded-xl p-3.5">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Block title="Architecture" text={project.architecture} full />
              <Block title="Challenges & how I solved them" text={project.challenges} full />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Block({ title, text, full }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <h3 className="font-display text-xl text-ink mb-3">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed">{text}</p>
    </div>
  );
}
