import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { gsap, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";
import SectionHead from "./SectionHead";
import { useSectionIntro } from "./useSectionIntro";

export default function MobileEducation() {
  const root = useRef(null);
  useSectionIntro(root);

  useMotionSafe(
    () => {
      gsap.utils.toArray(".m-edu").forEach((card, i) => {
        // Alternating slide-in
        gsap.from(card, {
          x: i % 2 === 0 ? -70 : 70, opacity: 0, duration: 1, ease: "expo.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
        // Depth: the big year drifts against the scroll
        gsap.fromTo(card.querySelector(".m-edu-year"), { yPercent: -14 }, {
          yPercent: 14, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
        // CGPA count-up
        const num = card.querySelector(".m-cgpa");
        if (num) {
          const to = Number(num.dataset.to);
          const o = { v: 0 };
          num.textContent = "0.00";
          gsap.to(o, {
            v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { num.textContent = o.v.toFixed(2); },
            onComplete: () => { num.textContent = to.toFixed(2); },
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section id="education" ref={root} className="m-section" aria-label="Education">
      <div className="m-wrap">
        <SectionHead label="Education" title="Where I learn." />
        <div className="m-wipe m-edu-list">
          {portfolioData.education.map((e) => {
            const cgpa = parseFloat(e.description);
            return (
              <article key={e.degree} className="m-edu m-card m-press">
                <GraduationCap className="m-edu-icon" aria-hidden="true" />
                <p className="m-edu-year display text-gradient">{e.duration}</p>
                <h3>{e.degree}</h3>
                <p className="m-edu-inst">{e.institution}</p>
                {e.description && (
                  <p className="chip m-edu-badge">
                    {Number.isFinite(cgpa)
                      ? <><span className="m-cgpa tabular-nums" data-to={cgpa}>{cgpa.toFixed(2)}</span>&nbsp;CGPA</>
                      : e.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
