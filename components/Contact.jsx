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

const KEY_NOT_SET = !profile.web3formsKey || profile.web3formsKey === "YOUR_WEB3FORMS_ACCESS_KEY";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No key configured yet — fall back to opening the visitor's email client
    // pre-filled, so the form still works out of the box.
    if (KEY_NOT_SET) {
      const subject = encodeURIComponent(`Project inquiry from ${form.name || "your site"}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setSendState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `Portfolio inquiry from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSendState("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSendState("error");
      }
    } catch {
      setSendState("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op, mailto link still works
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="eyebrow text-accent mb-4">let's build something</p>
          <h2 className="font-display text-4xl md:text-6xl text-ink text-balance">
            Have a product in mind? <span className="italic text-accent">Let's ship it.</span>
          </h2>
          <p className="text-ink-soft mt-5 text-base md:text-lg">
            Open to freelance projects, internships, and full-stack collaborations. I usually reply within a day.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
          {/* left: quick actions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={1}
            className="flex flex-col gap-4"
          >
            <button
              onClick={copyEmail}
              className="bg-ink text-paper rounded-2xl p-6 text-left hover:bg-accent transition-colors group"
            >
              <div className="flex items-center justify-between">
                <Mail size={20} />
                {copied ? <Check size={16} /> : <Copy size={16} className="opacity-60 group-hover:opacity-100" />}
              </div>
              <p className="mt-4 text-sm text-paper/60">Email</p>
              <p className="font-display text-lg mt-0.5">{copied ? "Copied!" : profile.email}</p>
            </button>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 hover:bg-[#25D366]/15 transition-colors group"
            >
              <div className="flex items-center justify-between text-[#128C4A]">
                <MessageCircle size={20} />
                <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-4 text-sm text-[#128C4A]/70">WhatsApp</p>
              <p className="font-display text-lg mt-0.5 text-[#128C4A]">Message me directly</p>
            </a>

            <a
              href={profile.resumeFile}
              download
              className="bg-white border border-line rounded-2xl p-6 hover:border-accent hover:shadow-card transition-all group"
            >
              <div className="flex items-center justify-between text-ink">
                <Download size={20} />
                <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all" />
              </div>
              <p className="mt-4 text-sm text-ink-soft">Download</p>
              <p className="font-display text-lg mt-0.5 text-ink">Full resume (PDF)</p>
            </a>

            <div className="grid grid-cols-3 gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-line rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-accent hover:text-accent hover:shadow-card transition-all text-ink-soft"
                >
                  <s.icon size={18} />
                  <span className="text-[11px] font-medium">{s.label}</span>
                </a>
              ))}
            </div>

            <p className="text-xs text-ink-faint mt-1">{profile.location}</p>
          </motion.div>

          {/* right: form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            custom={2}
            onSubmit={handleSubmit}
            className="bg-white border border-line rounded-3xl shadow-soft p-8 md:p-10 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full bg-paper-dim rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
                />
              </Field>
              <Field label="Your email">
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="w-full bg-paper-dim rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
                />
              </Field>
            </div>
            <Field label="Project details">
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me a bit about what you're building..."
                className="w-full bg-paper-dim rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition-shadow resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={sendState === "sending"}
              className="self-start inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60"
            >
              {sendState === "sending" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message <ArrowUpRight size={15} />
                </>
              )}
            </button>

            {sendState === "sent" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-sm text-accent-deep -mt-1"
              >
                <Check size={14} /> Message sent — I'll get back to you soon.
              </motion.p>
            )}
            {sendState === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-sm text-clay -mt-1"
              >
                <AlertCircle size={14} /> Something went wrong — email me directly at {profile.email}.
              </motion.p>
            )}
            {sendState === "idle" && (
              <p className="text-xs text-ink-faint -mt-1">
                {KEY_NOT_SET
                  ? "Opens your email client with this pre-filled until a Web3Forms key is added."
                  : "Delivered straight to my inbox — no third party ever sees it but Web3Forms."}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-soft mb-2 block">{label}</span>
      {children}
    </label>
  );
}
