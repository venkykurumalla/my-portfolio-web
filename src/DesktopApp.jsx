import { Suspense, lazy, useEffect } from "react";
import Aurora from "./components/Aurora";
import ScrollProgress from "./components/ScrollProgress";
import SectionDots from "./components/SectionDots";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import { ScrollTrigger } from "./lib/motion";
import { initReveals } from "./lib/reveal";

// Below-the-fold sections are code-split. Once their chunks land, ScrollTrigger re-measures.
const loaders = [
  () => import("./components/sections/Skills"),
  () => import("./components/sections/Projects"),
  () => import("./components/sections/Experience"),
  () => import("./components/sections/Education"),
  () => import("./components/sections/Certifications"),
  () => import("./components/sections/Contact"),
];
const [Skills, Projects, Experience, Education, Certifications, Contact] = loaders.map((load) => lazy(load));

export default function DesktopApp() {
  useEffect(() => initReveals(), []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    Promise.all(loaders.map((load) => load()))
      .then(() => requestAnimationFrame(() => requestAnimationFrame(refresh)))
      .catch(() => {});
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Aurora />
      <ScrollProgress />
      <SectionDots />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Suspense fallback={<div style={{ minHeight: "300vh" }} aria-hidden="true" />}>
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
