/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4ED",
        "paper-dim": "#F1EDE2",
        ink: "#232320",
        "ink-soft": "#6E6B60",
        "ink-faint": "#9A9689",
        card: "#FFFFFF",
        line: "#E7E1D2",
        accent: "#A15C38",
        "accent-dim": "#F2E6DA",
        "accent-deep": "#7C4428",
        clay: "#D97757",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 24px -8px rgba(35,35,32,0.08)",
        card: "0 4px 30px -10px rgba(35,35,32,0.10)",
        lift: "0 20px 60px -15px rgba(35,35,32,0.22)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        floaty: "floaty 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
