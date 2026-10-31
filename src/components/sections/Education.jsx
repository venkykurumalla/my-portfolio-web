import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { gsap, useGSAP } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import Section from "../Section";

export default function Education() {
  const grid = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".edu-card", {
          opacity: 0, y: 40, duration: 1, stagger: 0.14, ease: "expo.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: grid },
  );

  return (
    <Section id="education" eyebrow="Education" title="Where I learn." reveal={false}>
      <div ref={grid} className="grid gap-5 md:grid-cols-2">
        {portfolioData.education.map((e, i) => (
          <GlassCard key={e.degree} flat large data-reveal style={{ "--i": i }} className="edu-card flex flex-col p-6 md:p-9">
            <GraduationCap className="mb-6 h-7 w-7" style={{ color: "var(--cyan)" }} aria-hidden="true" />
            <p className="display text-gradient text-[clamp(2rem,4vw,2.8rem)]">{e.duration}</p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{e.degree}</h3>
            <p className="mt-1.5 muted">{e.institution}</p>
            {e.description && <p className="chip mt-6 self-start" style={{ color: "var(--cyan)" }}>{e.description}</p>}
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
