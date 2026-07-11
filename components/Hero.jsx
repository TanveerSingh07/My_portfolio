"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import Image from "next/image";

function MagneticButton({ children, className, href, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.28, y: y * 0.32 });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function TerminalLine() {
  const [text, setText] = useState("");
  const full = `whoami && echo "shipping products"`;
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setText(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-[12px] text-ink-soft flex items-center gap-1.5">
      <span className="text-accent">➜</span>
      <span>{text}</span>
      <span
        className={`w-1.5 h-3.5 bg-ink-soft inline-block ${showCursor ? "animate-blink" : "opacity-0"}`}
      />
    </div>
  );
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % profile.titles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* ambient floating code snippet, decorative */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="hidden lg:block absolute right-8 top-40 w-64 rounded-2xl bg-white border border-line shadow-card p-4 font-mono text-[11px] leading-relaxed text-ink-soft animate-floaty"
      >
        <div className="flex gap-1.5 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7A28C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7D28C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#9CD98C]" />
        </div>
        <p>
          <span className="text-accent">const</span> dev = {"{"}
        </p>
        <p className="pl-3">
          stack: <span className="text-clay">'MERN'</span>,
        </p>
        <p className="pl-3">
          status: <span className="text-clay">'shipping'</span>,
        </p>
        <p className="pl-3">
          open_to: <span className="text-clay">'freelance'</span>
        </p>
        <p>{"}"}</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 w-full grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-accent mb-5"
          >
            git commit -m "hello, I'm {profile.firstName}"
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-[13vw] leading-[0.98] md:text-6xl lg:text-7xl text-ink text-balance"
          >
            {profile.name}
          </motion.h1>

          <div className="h-10 mt-5 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-lg md:text-xl text-ink-soft font-medium"
              >
                {profile.titles[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-ink-soft text-base md:text-lg max-w-lg leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
            >
              View Projects <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 bg-white border border-line text-ink px-6 py-3.5 rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              <Download size={15} /> Resume
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 text-ink-soft px-2 py-3.5 rounded-full text-sm font-medium hover:text-accent transition-colors"
            >
              <Mail size={15} /> Contact
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10"
          >
            <TerminalLine />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-56 h-56 md:w-72 md:h-72"
        >
          <div className="absolute -inset-3 rounded-[2.5rem] border border-accent/25" />
          <div className="w-full h-full rounded-[2.25rem] bg-white shadow-lift overflow-hidden flex items-center justify-center border border-line">
            <Image
              src="/images/My_pic.jpeg"
              alt="Tanveer Singh Dhanjal"
              fill
              priority
              className="object-cover object-[center_20%]"
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-6 bg-white border border-line rounded-xl px-3 py-2 shadow-card text-xs font-mono text-ink-soft"
          >
            status: <span className="text-accent">online</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
