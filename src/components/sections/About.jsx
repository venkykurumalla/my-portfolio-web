import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import { SectionHeader } from "../Section";

const { about, projects, experience, certifications } = portfolioData;

const stats = [
  { value: projects.length, label: "Projects built" },
  { value: experience.length, label: "Internships & roles" },
  { value: certifications.length, label: "Certifications" },
];

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const build = (pinned) => {
        const split = SplitText.create(".about-text", { type: "words" });
        gsap.set(split.words, { opacity: 0.14 });
        const counters = gsap.utils.toArray(".stat-num");
        const objs = counters.map((el) => ({ el, to: Number(el.dataset.to), v: 0 }));
        const paint = () => objs.forEach((o) => { o.el.textContent = Math.round(o.v); });

        const tl = gsap.timeline({
          scrollTrigger: pinned
            ? { trigger: ".about-pin", start: "top top", end: "+=170%", pin: true, scrub: 0.7 }
            : { trigger: ".about-text", start: "top 80%", end: "bottom 45%", scrub: 0.7 },
        });
        tl.to(split.words, { opacity: 1, stagger: 0.12, ease: "none", duration: 1 });

        if (pinned) {
          tl.from(".about-stat", { opacity: 0, y: 40, scale: 0.95, stagger: 0.12, duration: 0.5, ease: "power3.out" }, ">-0.1")
            .to(objs, { v: (i) => objs[i].to, duration: 0.8, ease: "none", onUpdate: paint }, "<")
            .from(".about-chip", { opacity: 0, y: 20, stagger: 0.08, duration: 0.4 }, ">-0.2");
        } else {
          gsap.from(".about-stat, .about-chip", { opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ".about-stats", start: "top 88%", once: true } });
          gsap.to(objs, { v: (i) => objs[i].to, duration: 1.6, ease: "power2.out", onUpdate: paint, scrollTrigger: { trigger: ".about-stats", start: "top 88%", once: true } });
        }
        return () => split.revert();
      };

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => build(true));
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => build(false));
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(".stat-num").forEach((el) => { el.textContent = el.dataset.to; });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  return (
    <section id="about" ref={root} aria-label="About">
      <div className="about-pin flex flex-col justify-center py-24 md:min-h-[100svh] md:py-16">
        <div className="container-x">
          <SectionHeader eyebrow="About" title="Building for the web, powered by AI." className="!mb-8 md:!mb-10" />

          <p className="about-text max-w-4xl text-[clamp(1.15rem,2.6vw,2rem)] font-medium leading-[1.35] tracking-tight" style={{ color: "var(--fg)" }}>
            {about.description.join(" ")}
          </p>

          <div className="about-stats mt-8 grid grid-cols-3 gap-3 md:mt-12 md:gap-5">
            {stats.map((s) => (
              <GlassCard key={s.label} className="about-stat p-4 text-center md:p-7" tint>
                <div className="display text-[clamp(1.8rem,5vw,3.6rem)] text-gradient">
                  <span className="stat-num" data-to={s.value}>{reduced ? s.value : 0}</span>
                  <span>+</span>
                </div>
                <p className="mt-1 text-[0.7rem] font-medium muted md:text-sm">{s.label}</p>
              </GlassCard>
            ))}
          </div>

          <ul className="mt-6 hidden flex-wrap gap-2.5 md:flex">
            {about.highlights.map((h) => (
              <li key={h} className="about-chip chip">{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
