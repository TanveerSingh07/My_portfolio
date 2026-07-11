"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const LINKS = [
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "Activity" },
  { id: "services", label: "Services" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-500 px-4 md:px-5 ${
            scrolled
              ? "bg-white/80 backdrop-blur-md border-line shadow-soft py-2"
              : "bg-transparent border-transparent py-2"
          }`}
        >
          <a href="#top" className="font-display italic text-lg text-ink flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            {profile.firstName}
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative px-3 py-1.5 text-sm rounded-full transition-colors ${
                  active === l.id ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent-dim rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 text-sm bg-ink text-paper px-4 py-2 rounded-full hover:bg-accent transition-colors"
          >
            Let's talk
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-line"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="flex flex-col gap-1">
              <span className={`block w-4 h-px bg-ink transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-4 h-px bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-px bg-ink transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 bg-white border border-line rounded-2xl shadow-soft p-3 flex flex-col"
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-ink-soft hover:text-ink rounded-lg"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
