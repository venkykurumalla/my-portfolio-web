import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import Section from "../Section";

export default function Education() {
  const grid = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".edu-card", {
        clipPath: "inset(100% 0% 0% 0% round 32px)", opacity: 0, y: 40, duration: 1.3, stagger: 0.16, ease: "expo.out",
        clearProps: "clipPath",
        scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
      });
    },
    { scope: grid },
  );

  return (
    <Section id="education" eyebrow="Education" title="Where I learn." reveal={false}>
      <div ref={grid} className="grid gap-5 md:grid-cols-2">
        {portfolioData.education.map((e) => (
          <GlassCard key={e.degree} tint large className="edu-card flex flex-col p-7 md:p-9">
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
