"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Users, BookMarked, Github as GithubIcon, ExternalLink } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading } from "./Journey";
import { fadeUp, viewportOnce } from "@/lib/motion";
import CountUp from "./CountUp";

const DIFF_COLOR = { Easy: "#A15C38", Medium: "#C98B5E", Hard: "#232320" };

export default function GithubDashboard() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubUser}`),
          fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        if (cancelled) return;
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
        setStatus("ready");
      } catch (e) {
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const languageCounts = repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const topRepos = [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 4);

  return (
    <section id="github" className="relative py-28 md:py-36 bg-paper-dim">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="live from github"
          title="What I've been building lately"
          desc="Pulled live from the GitHub API — not a screenshot, the real thing."
        />

        {status === "error" && (
          <div className="mt-14 bg-white border border-line rounded-2xl p-8 text-center text-ink-soft">
            Couldn't reach the GitHub API right now — check out the profile directly:{" "}
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-accent underline">
              {profile.github.replace("https://", "")}
            </a>
          </div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid lg:grid-cols-3 gap-6"
        >
          {/* profile card */}
          <div className="bg-white border border-line rounded-2xl shadow-soft p-7 flex flex-col">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent-dim overflow-hidden shrink-0 border border-line">
                {user?.avatar_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar_url} alt={`${profile.name} GitHub avatar`} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <p className="font-display text-lg text-ink">{profile.name}</p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-ink-soft hover:text-accent inline-flex items-center gap-1"
                >
                  <GithubIcon size={12} /> @{profile.githubUser}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Metric icon={<BookMarked size={14} />} label="Repositories" value={status === "ready" ? user?.public_repos ?? repos.length : "—"} />
              <Metric icon={<Users size={14} />} label="Followers" value={status === "ready" ? user?.followers ?? "—" : "—"} />
              <Metric icon={<Star size={14} />} label="Stars earned" value={status === "ready" ? repos.reduce((a, r) => a + r.stargazers_count, 0) : "—"} />
              <Metric icon={<GitFork size={14} />} label="Forks" value={status === "ready" ? repos.reduce((a, r) => a + r.forks_count, 0) : "—"} />
            </div>

            {topLanguages.length > 0 && (
              <div className="mt-6">
                <p className="text-xs text-ink-faint mb-2.5">Top languages across repos</p>
                <div className="flex flex-wrap gap-2">
                  {topLanguages.map(([lang]) => (
                    <span key={lang} className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-dim text-accent-deep">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* contribution graph + recent repos */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-line rounded-2xl shadow-soft p-6 overflow-x-auto">
              <p className="text-xs text-ink-faint mb-3">Contribution activity</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/A15C38/${profile.githubUser}`}
                alt={`${profile.name} GitHub contribution graph`}
                className="w-full min-w-[600px]"
                loading="lazy"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {status === "loading" &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white border border-line rounded-2xl p-5 h-28 animate-pulse" />
                ))}
              {topRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-line rounded-2xl p-5 hover:border-accent hover:shadow-card transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ink group-hover:text-accent transition-colors truncate">{repo.name}</p>
                    <span className="text-xs font-mono text-ink-faint flex items-center gap-1 shrink-0">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft mt-2 line-clamp-2 min-h-[2.2em]">
                    {repo.description || "No description provided."}
                  </p>
                  {repo.language && (
                    <span className="inline-block mt-3 text-[11px] font-mono text-ink-faint">{repo.language}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <LeetcodeCard />
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="bg-paper-dim rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-ink-faint text-[11px]">
        {icon} {label}
      </div>
      <p className="font-display text-xl text-ink mt-1">{value}</p>
    </div>
  );
}

function LeetcodeCard() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`https://leetcode-stats.tashif.codes/${profile.leetcodeUser}`)
      .then((res) => {
        if (!res.ok) throw new Error("LeetCode stats request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  const total = data ? data.easySolved + data.mediumSolved + data.hardSolved : 0;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={1}
      className="mt-6 bg-white border border-line rounded-2xl shadow-soft p-7 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-ink-faint">LeetCode activity</p>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-ink-soft hover:text-accent transition-colors"
        >
          @{profile.leetcodeUser} <ExternalLink size={11} />
        </a>
      </div>

      {status === "error" && (
        <p className="text-sm text-ink-soft">
          Couldn't reach LeetCode's stats right now — see the profile directly above.
        </p>
      )}

      {status !== "error" && (
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          {/* left: real stats, ring + breakdown */}
          <div className="flex items-center gap-6">
            <RingStat
              easy={data?.easySolved ?? 0}
              medium={data?.mediumSolved ?? 0}
              hard={data?.hardSolved ?? 0}
              total={total}
              loading={status === "loading"}
            />
            <div className="flex flex-col gap-3 flex-1">
              <DiffRow label="Easy" solved={data?.easySolved} total={data?.totalEasy} color={DIFF_COLOR.Easy} loading={status === "loading"} />
              <DiffRow label="Medium" solved={data?.mediumSolved} total={data?.totalMedium} color={DIFF_COLOR.Medium} loading={status === "loading"} />
              <DiffRow label="Hard" solved={data?.hardSolved} total={data?.totalHard} color={DIFF_COLOR.Hard} loading={status === "loading"} />
              {status === "ready" && data?.ranking && (
                <p className="text-xs text-ink-faint mt-1">
                  Global ranking <span className="text-ink font-medium">#{data.ranking.toLocaleString()}</span>
                </p>
              )}
            </div>
          </div>

          {/* right: contained custom heatmap */}
          <div className="bg-paper-dim rounded-2xl p-5 border border-line">
            <p className="text-[11px] text-ink-faint mb-3">Last 18 weeks</p>
            <Heatmap calendar={data?.submissionCalendar} loading={status === "loading"} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function DiffRow({ label, solved, total, color, loading }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-1.5 text-ink-soft">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </span>
        <span className="font-mono text-ink-faint">
          {loading ? "—" : `${solved ?? 0} / ${total ?? "—"}`}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-paper-dim overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: loading || !total ? "0%" : `${Math.min((solved / total) * 100 * 6, 100)}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function RingStat({ easy, medium, hard, total, loading }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const segments = [
    { value: easy, color: DIFF_COLOR.Easy },
    { value: medium, color: DIFF_COLOR.Medium },
    { value: hard, color: DIFF_COLOR.Hard },
  ];
  let cumulative = 0;

  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E7E1D2" strokeOpacity="0.6" strokeWidth="9" />
        {!loading &&
          total > 0 &&
          segments.map((seg, i) => {
            const dash = (seg.value / total) * circumference;
            const offset = (cumulative / total) * circumference;
            cumulative += seg.value;
            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            );
          })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl text-ink">
          {loading ? "—" : <CountUp value={total} duration={1.2} />}
        </span>
        <span className="text-[10px] text-ink-faint">solved</span>
      </div>
    </div>
  );
}

// Builds a lightweight, on-brand heatmap from LeetCode's submissionCalendar
// (unix-second timestamps -> submission count) instead of embedding an
// external stats image sized for someone else's layout.
function Heatmap({ calendar, loading }) {
  const weeks = 18;
  const cells = useMemo(() => {
    if (!calendar) return [];
    const byDate = {};
    Object.entries(calendar).forEach(([ts, count]) => {
      const key = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
      byDate[key] = (byDate[key] || 0) + Number(count);
    });

    const days = weeks * 7;
    const today = new Date();
    const out = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
      const key = d.toISOString().slice(0, 10);
      out.push({ date: key, count: byDate[key] || 0 });
    }
    return out;
  }, [calendar]);

  const columns = [];
  for (let i = 0; i < cells.length; i += 7) columns.push(cells.slice(i, i + 7));

  const shade = (count) => {
    if (!count) return "bg-line/60";
    if (count <= 1) return "bg-accent/25";
    if (count <= 3) return "bg-accent/50";
    if (count <= 6) return "bg-accent/75";
    return "bg-accent";
  };

  if (loading || !cells.length) {
    return (
      <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: "repeat(7, 1fr)" }}>
        {Array.from({ length: weeks * 7 }).map((_, i) => (
          <div key={i} className="w-[9px] h-[9px] rounded-[2px] bg-line/60 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-[3px] overflow-x-auto">
      {columns.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-[3px]">
          {col.map((cell, ri) => (
            <div
              key={ri}
              title={`${cell.date}: ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
              className={`w-[9px] h-[9px] rounded-[2px] ${shade(cell.count)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
