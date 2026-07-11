"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

const PATH = "M -40 380 C 180 60, 420 520, 680 160 S 1180 40, 1460 300";
const VIEW_W = 1400;
const VIEW_H = 600;
const FLIGHT_MS = 2400;

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState("fly"); // fly -> unfold -> done
  const [skip, setSkip] = useState(false);
  const [points, setPoints] = useState([]);
  const [loadPct, setLoadPct] = useState(0);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  // Sample the curved path into discrete points so the plane's flight works
  // identically across every browser (CSS offset-path isn't supported in Firefox).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("intro-seen");
    if (reduced || seen) {
      setSkip(true);
      onDone();
      return;
    }
    sessionStorage.setItem("intro-seen", "1");

    const el = pathRef.current;
    if (!el) return;
    const total = el.getTotalLength();
    const N = 60;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const p = el.getPointAtLength((i / N) * total);
      pts.push({ x: p.x, y: p.y });
    }
    setPoints(pts);

    const loader = animate(0, 100, {
      duration: (FLIGHT_MS + 900) / 1000,
      ease: "easeInOut",
      onUpdate: (v) => setLoadPct(Math.round(v)),
    });

    const seq = async () => {
      await new Promise((r) => setTimeout(r, 2200));
      setPhase("unfold");
      await new Promise((r) => setTimeout(r, 1500));
      setPhase("done");
      await new Promise((r) => setTimeout(r, 600));
      onDone();
    };
    seq();
    return () => loader.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!points.length || !planeRef.current) return;
    const xs = points.map((p) => `${(p.x / VIEW_W) * 100}%`);
    const ys = points.map((p) => `${(p.y / VIEW_H) * 100}%`);
    const rotations = points.map((p, i) => {
      const next = points[Math.min(i + 1, points.length - 1)];
      const dx = next.x - p.x;
      const dy = next.y - p.y;
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    });

    const controls = animate(planeRef.current, {
      left: xs,
      top: ys,
      rotate: rotations,
      opacity: [0, 1, 1, 1, 0.6],
      scale: [0.6, 1, 1, 1, 0.8],
    }, {
      duration: FLIGHT_MS / 1000,
      ease: [0.45, 0.05, 0.55, 0.95],
    });
    return () => controls.stop();
  }, [points]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-paper flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
        >
          {/* faint radial glow following the destination point */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(74,108,247,0.08),transparent_55%)]" />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            {/* guide path, always present so we can measure it */}
            <path ref={pathRef} d={PATH} stroke="none" fill="none" />
            {/* drawn trail, revealed in sync with the flight */}
            {phase === "fly" && (
              <motion.path
                d={PATH}
                stroke="#4A6CF7"
                strokeOpacity="0.35"
                strokeWidth="1.8"
                strokeDasharray="2 9"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: FLIGHT_MS / 1000, ease: [0.45, 0.05, 0.55, 0.95] }}
              />
            )}
          </svg>

          {/* the plane itself, moved imperatively along sampled points */}
          {phase === "fly" && (
            <div
              ref={planeRef}
              className="absolute w-11 h-11 -translate-x-1/2 -translate-y-1/2"
              style={{ left: "-4%", top: "63%" }}
            >
              <PaperPlane />
            </div>
          )}

          {/* unfold moment: plane folds open into the profile mark */}
          <AnimatePresence>
            {phase === "unfold" && (
              <motion.div
                className="absolute flex flex-col items-center gap-5"
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 800 }}
              >
                <div className="relative w-24 h-24 rounded-full bg-white shadow-lift flex items-center justify-center">
                  <span className="font-display italic text-3xl text-accent">TD</span>
                  {[0, 1].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute inset-0 rounded-full border border-accent/30"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2 + ring * 0.6, opacity: 0 }}
                      transition={{ duration: 1.2, delay: ring * 0.25, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="eyebrow text-ink-soft"
                >
                  Tanveer Singh Dhanjal
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* terminal-style loading readout, bottom of screen */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 flex flex-col items-center gap-2">
            <div className="w-full h-[3px] bg-line rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${loadPct}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <p className="font-mono text-[11px] text-ink-faint">
              {loadPct < 100 ? `compiling portfolio… ${loadPct}%` : "ready."}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaperPlane() {
  return (
    <svg width="44" height="44" viewBox="0 0 46 46" fill="none">
      <path
        d="M4 24 L41 6 L28 41 L21 27 L4 24Z"
        fill="#F7F4ED"
        stroke="#232320"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M21 27 L41 6 L28 41 Z" fill="#4A6CF7" fillOpacity="0.22" stroke="#4A6CF7" strokeWidth="1" />
    </svg>
  );
}
