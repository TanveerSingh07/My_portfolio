# Tanveer Singh Dhanjal — Portfolio

A story-driven, editorial-style portfolio built with Next.js 14 (App Router), Tailwind CSS and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the intro plane animation plays once per browser session (it uses `sessionStorage`, and is skipped automatically if the visitor has "reduce motion" turned on).

## Deploy

This is a stock Next.js app — push it to GitHub and import it on [Vercel](https://vercel.com/new) (zero config needed), or run `npm run build && npm start` anywhere that runs Node.

## Things worth personalizing before you publish

1. **Project links** — `lib/data.js` has placeholder GitHub/demo URLs for PeerConnect and Makhaana (`#` for demo, guessed repo paths for GitHub). Update the `github` and `demo` fields on each project with your real URLs.
2. **Profile photo** — the hero and intro currently use a "TD" monogram instead of a photo (no image was provided). Drop a photo into `public/`, then swap the monogram block in `components/Hero.jsx` (search for `TD`) and `components/Intro.jsx` for an `<Image />`.
3. **Resume file** — `public/Tanveer_Singh_Dhanjal_Resume.pdf` is the file you gave me. Replace it any time; the download buttons in Hero and Contact both point at `profile.resumeFile` in `lib/data.js`, so you only need to update it in one place if you rename the file.
4. **Contact form — turn on real delivery.** The form currently falls back to opening the visitor's email client (works out of the box, no setup). To have messages land directly in your inbox instead:
   1. Go to [web3forms.com](https://web3forms.com), enter `tanveerdhanjal7@gmail.com`, and grab the free access key it emails you (no signup, no credit card, ~1 minute).
   2. Paste it into `lib/data.js` → `web3formsKey`.
   3. That's it — the form POSTs straight to Web3Forms, which emails you the message. Nothing else to host or configure.
   
   A WhatsApp quick-contact button is also wired up in `lib/data.js` → `whatsapp` (currently your number, `+91-7837124365`) if you'd rather people message you directly.
5. **GitHub dashboard** — pulls live from the public GitHub REST API (`api.github.com`) client-side, so it always reflects your real repos, stars and languages — nothing to configure. The contribution graph uses a free public image service (`ghchart.rshah.org`); if it ever goes down, swap the `src` in `components/GithubDashboard.jsx`.
6. **LeetCode stats** — fetched live from the community `leetcode-stats.tashif.codes` API and rendered as a custom ring + heatmap in your site's own colors (no embedded screenshot). If that API is ever unreachable, the card shows a graceful fallback linking to your LeetCode profile.
7. **Colors** — the full palette lives in `tailwind.config.js` (`paper`, `ink`, `accent`, etc.) if you want to nudge the theme.

## Structure

```
app/            — root layout, global CSS, the single page
components/     — one component per section (Hero, Journey, TechStack, Projects, ProjectModal, GithubDashboard, Services, Achievements, Contact, Nav, Footer, Intro)
lib/data.js     — every piece of real content (name, projects, stats, stack, achievements) — edit this file to update copy anywhere on the site
lib/motion.js   — shared Framer Motion variants for consistent scroll reveals
public/         — resume PDF
```

## Accessibility notes already built in

- Visible keyboard focus rings on every interactive element
- `prefers-reduced-motion` disables the intro animation and shortens transitions site-wide
- Semantic headings and alt text throughout
