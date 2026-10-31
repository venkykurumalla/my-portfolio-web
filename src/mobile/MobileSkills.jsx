import { useRef } from "react";
import { gsap, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";
import Marquee from "../components/Marquee";
import { rows } from "../components/skillData";
import Pill from "../components/TechPill";
import SectionHead from "./SectionHead";
import { useSectionIntro } from "./useSectionIntro";

export default function MobileSkills() {
  const root = useRef(null);
  useSectionIntro(root);

  useMotionSafe(
    () => {
      gsap.utils.toArray(".m-skill-card").forEach((card) => {
        const chips = card.querySelectorAll(".m-chip");
        gsap.from(card, { y: 36, opacity: 0, duration: 0.7, ease: "expo.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: card, start: "top 90%", once: true } });
        // Chips fall in and settle like bubbles
        gsap.from(chips, {
          y: -120, opacity: 0, rotate: () => gsap.utils.random(-14, 14), duration: 0.95, ease: "bounce.out", stagger: 0.07, delay: 0.15,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Tap a chip: it pops and glows
  const pop = (e) => {
    const el = e.currentTarget;
    el.classList.add("is-glow");
    gsap.timeline()
      .to(el, { scale: 1.28, duration: 0.12, ease: "power2.out" })
      .to(el, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.4)", clearProps: "transform" });
    window.setTimeout(() => el.classList.remove("is-glow"), 700);
  };

  return (
    <section id="skills" ref={root} className="m-section" aria-label="Skills">
      <div className="m-wrap">
        <SectionHead label="Skills" title="Tools I think in." />
        <div className="m-wipe">
          <div className="m-skill-grid">
            {portfolioData.skills.map((c) => (
              <div key={c.category} className="m-skill-card">
                <h3 className="eyebrow">{c.category}</h3>
                <ul>
                  {c.items.map((item) => (
                    <li key={item}><button type="button" className="m-chip chip" onClick={pop}>{item}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="m-marquees">
            <Marquee direction={1} speed={55}>{rows[0].map((n) => <Pill key={n} name={n} />)}</Marquee>
            <Marquee direction={-1} speed={48}>{rows[1].map((n) => <Pill key={n} name={n} />)}</Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
