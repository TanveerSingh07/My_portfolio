import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-faint">
        <p className="font-mono">© {new Date().getFullYear()} {profile.name} — built line by line.</p>
        <p className="font-mono">designed & developed with Next.js + Framer Motion</p>
      </div>
    </footer>
  );
}
