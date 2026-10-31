import { useRef } from "react";
import { Award, ArrowUpRight, ShieldCheck } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import Section from "../Section";

const icons = [ShieldCheck, Award];

export default function Certifications() {
  const grid = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".cert-card", {
        opacity: 0, y: 50, duration: 1, stagger: 0.14, ease: "expo.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
      });
    },
    { scope: grid },
  );

  return (
    <Section id="certifications" eyebrow="Certifications" title="Proof of practice." reveal={false}>
      <div ref={grid} className="grid gap-5 md:grid-cols-2">
        {portfolioData.certifications.map((c, i) => {
          const Icon = icons[i % icons.length];
          const hasLink = c.link && c.link !== "#";
          return (
            <GlassCard key={c.name} flat large className="cert-card flex flex-col p-7 md:p-9">
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg, var(--blue), var(--violet))" }}>
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="eyebrow mb-3">{c.issuer}</p>
              <h3 className="text-xl font-semibold leading-snug tracking-tight">{c.name}</h3>
              {hasLink && (
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="btn btn-glass mt-8 self-start !px-4 !py-2.5 !text-sm">
                  View certificate <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
