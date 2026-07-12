"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Code2,
  Mail,
  Download,
  ArrowUpRight,
  Check,
  Copy,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { profile } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Code2, label: "LeetCode", href: profile.leetcode },
];

const KEY_NOT_SET =
  !profile.web3formsKey || profile.web3formsKey === "YOUR_WEB3FORMS_ACCESS_KEY";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState("idle");

  const handleChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (KEY_NOT_SET) {
      const subject = encodeURIComponent(
        `Project inquiry from ${form.name || "Portfolio"}`,
      );

      const body = encodeURIComponent(
        `${form.message}

— ${form.name}
${form.email}`,
      );

      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      return;
    }

    setSendState("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `Portfolio Inquiry`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setSendState("sent");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSendState("error");
      }
    } catch {
      setSendState("error");
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="eyebrow text-accent mb-4">let's build something</p>

          <h2 className="font-display text-5xl md:text-7xl text-balance text-ink">
            Have a product in mind?
            <br />
            <span className="italic text-accent">Let's ship it.</span>
          </h2>

          <p className="mt-6 text-lg text-ink-soft">
            Open to internships, freelance work and full-stack collaborations.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="rounded-full bg-paper-dim border border-line px-5 py-2 font-mono text-xs text-ink-soft">
              git commit -m "Looking forward to building something together."
            </div>
          </div>

        </motion.div>
        <div className="mt-16 grid lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* LEFT DASHBOARD */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-4 lg:sticky lg:top-28 h-fit"
          >
            {/* CONTACT EMAIL */}

            <button
              onClick={copyEmail}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-soft hover:shadow-card transition-all duration-300 text-left"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(176,104,55,0.08),transparent_60%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-paper-dim flex items-center justify-center text-accent">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint">
                      CONTACT.EMAIL
                    </p>

                    <p className="mt-1 font-medium text-ink">
                      {copied ? "Copied!" : profile.email}
                    </p>
                  </div>
                </div>

                {copied ? (
                  <Check size={18} className="text-accent" />
                ) : (
                  <Copy size={18} className="text-ink-faint" />
                )}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-mono">
                <span className="text-ink-faint">
                  status:
                  <span className="text-accent ml-2">active</span>
                </span>

                <span className="text-ink-faint">
                  response
                  <span className="text-accent ml-2">{"<24h"}</span>
                </span>
              </div>
            </button>

            {/* CHAT */}

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(37,211,102,0.08),transparent_60%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint">
                      CONTACT.CHAT
                    </p>

                    <p className="mt-1 font-medium text-ink">WhatsApp</p>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-ink-faint group-hover:text-accent transition-colors"
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-mono">
                <span className="text-ink-faint">availability</span>

                <span className="text-[#25D366]">online ●</span>
              </div>
            </a>

            {/* FILE */}

            <a
              href={profile.resumeFile}
              download
              className="group relative block overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(176,104,55,0.08),transparent_60%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-paper-dim flex items-center justify-center text-accent">
                    <Download size={20} />
                  </div>

                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint">
                      FILES
                    </p>

                    <p className="mt-1 font-medium text-ink">resume.pdf</p>
                  </div>
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-ink-faint group-hover:text-accent transition-colors"
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-mono">
                <span className="text-ink-faint">updated</span>

                <span className="text-accent">July 2026</span>
              </div>
            </a>

            {/* SOCIALS */}

            <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between mb-5">
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint">
                  SOCIALS
                </p>

                <span className="text-xs text-ink-faint">connect</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-line bg-paper p-4 hover:border-accent hover:-translate-y-1 transition-all"
                  >
                    <div className="flex flex-col items-center">
                      <s.icon
                        size={20}
                        className="text-ink-soft group-hover:text-accent transition-colors"
                      />

                      <span className="mt-3 text-[11px] font-medium text-ink-soft group-hover:text-ink transition-colors">
                        {s.label}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-line">
                <p className="font-mono text-[11px] text-ink-faint">LOCATION</p>

                <p className="mt-2 text-sm text-ink">{profile.location}</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT : MESSAGE EDITOR */}

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={2}
            onSubmit={handleSubmit}
            className="group relative min-h-[520px] overflow-hidden rounded-3xl border border-line bg-white shadow-soft hover:shadow-card transition-all duration-300"
          >
            {/* Hover Glow */}

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(176,104,55,0.08),transparent_60%)]" />

            {/* Editor Header */}

            <div className="relative flex items-center justify-between px-6 py-4 border-b border-line bg-paper-dim">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E86A5B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8C05B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#62C462]" />

                <span className="ml-3 font-mono text-xs text-ink-faint">
                  contact.tsx
                </span>
              </div>

              <span className="font-mono text-xs text-accent">
                compose.message()
              </span>
            </div>

            {/* Body */}

            <div className="relative p-7 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="const name">
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-paper-dim px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </Field>

                <Field label="const email">
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    className="w-full rounded-xl bg-paper-dim px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </Field>
              </div>

              <Field label="project.md">
                <textarea
                  required
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  className="w-full resize-none rounded-xl bg-paper-dim px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/40"
                />
              </Field>

              {/* Footer */}

              <div className="flex flex-wrap items-center justify-between gap-5 pt-3">
                <div>
                  <p className="font-mono text-[11px] uppercase text-ink-faint">
                    Status
                  </p>

                  <p className="mt-2 text-sm text-ink">Ready to collaborate</p>
                </div>

                <button
                  type="submit"
                  disabled={sendState === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper hover:bg-accent transition-colors disabled:opacity-60"
                >
                  {sendState === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Shipping...
                    </>
                  ) : (
                    <>
                      Ship Message
                      <ArrowUpRight size={15} />
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}

              {sendState === "sent" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-accent/20 bg-accent/5 p-4"
                >
                  <p className="flex items-center gap-2 text-sm text-accent">
                    <Check size={16} />
                    Message shipped successfully. I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {sendState === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-red-200 bg-red-50 p-4"
                >
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={16} />
                    Something went wrong. Please email me directly.
                  </p>
                </motion.div>
              )}

              {sendState === "idle" && (
                <div className="rounded-xl bg-paper-dim px-4 py-3">
                  <p className="font-mono text-xs text-ink-faint">
                    {KEY_NOT_SET
                      ? "No backend configured • Opens your default mail client."
                      : "Messages are delivered securely using Web3Forms."}
                  </p>
                </div>
              )}
            </div>
          </motion.form>
        </div>{" "}
        {/* grid */}
      </div>{" "}
      {/* container */}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <p className="mb-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-faint">
        {label}
      </p>

      {children}
    </label>
  );
}

export { Field };
