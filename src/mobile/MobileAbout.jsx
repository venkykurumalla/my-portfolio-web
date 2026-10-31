import { useRef } from "react";
import { gsap, SplitText, ScrollTrigger, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";
import SectionHead from "./SectionHead";
import { useSectionIntro } from "./useSectionIntro";

const { about, projects, experience, certifications } = portfolioData;
const stats = [
  { value: projects.length, label: "Projects" },
  { value: experience.length, label: "Internships" },
  { value: certifications.length, label: "Certificates" },
];

export default function MobileAbout() {
  const root = useRef(null);
  useSectionIntro(root, { wipe: false });

  useMotionSafe(
    () => {
      const counters = gsap.utils.toArray(".m-stat-num").map((el) => ({ el, to: Number(el.dataset.to), v: 0 }));
      const paint = () => counters.forEach((c) => { c.el.textContent = Math.round(c.v); });
      paint();
      gsap.set(".m-stat", { opacity: 0, scale: 0, y: 30 });

      // Time-based, so it always finishes: lines light up one by one, then the stat bubbles burst in.
      // autoSplit re-splits the lines after the web font loads / the width changes (so lines stay accurate).
      let played = false;
      let tl;
      const split = SplitText.create(".m-about-text", {
        type: "lines",
        aria: "none",
        autoSplit: true,
        onSplit(self) {
          tl?.kill();
          gsap.set(self.lines, { opacity: 0.16 });
          tl = gsap.timeline({ paused: true });
          tl.to(self.lines, { opacity: 1, duration: 0.4, stagger: 0.2, ease: "none" })
            .to(".m-stat", { opacity: 1, scale: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "elastic.out(1, 0.55)" }, ">-0.1")
            .to(counters, { v: (i) => counters[i].to, duration: 1.2, stagger: 0.12, ease: "power2.out", onUpdate: paint }, "<");
          if (played) tl.progress(1); // re-split after it already played: show the finished state
        },
      });
      const play = () => { if (!played) { played = true; tl.play(); } };

      // Short pin keeps the section in view while it plays; the animation doesn't depend on scroll.
      ScrollTrigger.create({ trigger: ".m-about-pin", start: "top 72px", end: "+=55%", pin: true, anticipatePin: 1, onEnter: play });
      // Failsafe for deep links / fast flicks past the pin: play as soon as the text is visible.
      ScrollTrigger.create({ trigger: ".m-about-text", start: "top 85%", once: true, onEnter: play });

      return () => { split.revert(); tl?.kill(); };
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="m-about" aria-label="About">
      <div className="m-about-pin">
        <SectionHead label="About" title="Building for the web, powered by AI." />
        <p className="m-about-text">{about.description.join(" ")}</p>
        <ul className="m-stats">
          {stats.map((s) => (
            <li key={s.label} className="m-stat m-press">
              <span className="m-stat-num display" data-to={s.value}>{s.value}</span>
              <span className="m-stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
