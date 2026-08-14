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

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#e4e4e7] flex flex-col justify-between selection:bg-accent selection:text-zinc-950">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Scrolling Sections */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
