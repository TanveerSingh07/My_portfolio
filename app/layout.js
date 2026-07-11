import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Tanveer Singh Dhanjal — Full-Stack Web Developer",
  description:
    "Full-stack web developer building real products — ScamSense, PeerConnect and Makhaana E-Commerce. B.Tech IT student, open to freelance and internship work.",
  metadataBase: new URL("https://tanveersinghdhanjal.dev"),
  openGraph: {
    title: "Tanveer Singh Dhanjal — Full-Stack Web Developer",
    description:
      "Full-stack web developer building real products. B.Tech IT student, open to freelance and internship work.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jbmono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased selection:bg-accent/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
