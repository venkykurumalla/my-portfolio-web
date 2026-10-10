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
import SmoothScroll from "./components/SmoothScroll";
import CinematicSection from "./components/CinematicSection";

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#09090b] text-[#e4e4e7] selection:bg-accent selection:text-zinc-950">
        <Navbar />

        <main>
          <CinematicSection id="home" label="HOME">
            <Hero />
          </CinematicSection>

          <CinematicSection id="about" label="ABOUT">
            <About />
          </CinematicSection>

          <CinematicSection id="skills" label="SKILLS">
            <Skills />
          </CinematicSection>

          <CinematicSection id="projects" label="PROJECTS">
            <Projects />
          </CinematicSection>

          <CinematicSection id="experience" label="EXPERIENCE">
            <Experience />
          </CinematicSection>

          <CinematicSection id="education" label="EDUCATION">
            <Education />
          </CinematicSection>

          <CinematicSection id="certifications" label="CERTIFICATIONS">
            <Certifications />
          </CinematicSection>

          <CinematicSection id="contact" label="CONTACT" isLast={true}>
            <Contact />
          </CinematicSection>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
