import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import CinematicSection from "./components/CinematicSection";

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#e4e4e7] selection:bg-accent selection:text-zinc-950">
      <Navbar />

      <main>
        {/* We use a shorter track (1.5) generally, but slightly longer for Projects */}
        <CinematicSection id="home" label="HOME" scrollMultiplier={1.4}>
          <Hero />
        </CinematicSection>

        <CinematicSection id="about" label="ABOUT" scrollMultiplier={1.6}>
          <About />
        </CinematicSection>

        <CinematicSection id="skills" label="SKILLS" scrollMultiplier={1.8}>
          <Skills />
        </CinematicSection>

        <CinematicSection id="projects" label="PROJECTS" scrollMultiplier={2.2}>
          <Projects />
        </CinematicSection>

        <CinematicSection id="experience" label="EXPERIENCE" scrollMultiplier={1.6}>
          <Experience />
        </CinematicSection>

        <CinematicSection id="education" label="EDUCATION" scrollMultiplier={1.5}>
          <Education />
        </CinematicSection>

        <CinematicSection id="certifications" label="CERTIFICATIONS" scrollMultiplier={1.5}>
          <Certifications />
        </CinematicSection>

        {/* Contact doesn't need to exit, so we set isLast={true} */}
        <CinematicSection id="contact" label="CONTACT" scrollMultiplier={1.4} isLast={true}>
          <Contact />
        </CinematicSection>
      </main>

      <Footer />
    </div>
  );
}
