import { Suspense, lazy } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Aurora from "./components/Aurora";
import LiquidFilters from "./components/LiquidFilters";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SectionDots from "./components/SectionDots";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";

// Below-the-fold sections are code-split. Their chunks are requested immediately and the
// preloader waits for them, so ScrollTrigger measures the final layout.
const loaders = {
  Skills: () => import("./components/sections/Skills"),
  Projects: () => import("./components/sections/Projects"),
  Experience: () => import("./components/sections/Experience"),
  Education: () => import("./components/sections/Education"),
  Certifications: () => import("./components/sections/Certifications"),
  Contact: () => import("./components/sections/Contact"),
};
const Skills = lazy(loaders.Skills);
const Projects = lazy(loaders.Projects);
const Experience = lazy(loaders.Experience);
const Education = lazy(loaders.Education);
const Certifications = lazy(loaders.Certifications);
const Contact = lazy(loaders.Contact);

const heroImage = new Promise((resolve) => {
  const img = new Image();
  img.onload = img.onerror = resolve;
  img.src = "/VenkateshKurumalla.jpg";
});
const nextFrames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

const boot = Promise.all([
  document.fonts?.ready,
  heroImage,
  ...Object.values(loaders).map((load) => load()),
  new Promise((r) => setTimeout(r, 1900)), // minimum time so the name animation can play
])
  .then(nextFrames)
  .catch(() => {});

export default function App() {
  return (
    <SmoothScroll>
      <LiquidFilters />
      <Aurora />
      <Preloader boot={boot} />
      <CustomCursor />
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
    </SmoothScroll>
  );
}
