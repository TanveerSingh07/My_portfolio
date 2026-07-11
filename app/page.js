"use client";

import { useState } from "react";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import GithubDashboard from "@/components/GithubDashboard";
import Services from "@/components/Services";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Intro onDone={() => setIntroDone(true)} />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Journey />
        <TechStack />
        <Projects />
        <GithubDashboard />
        <Services />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
