import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import Marquee from "../Marquee";
import Section from "../Section";

const dev = (slug) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${slug}/${slug}-original.svg`;

// Devicon slugs for skills that have a logo; the rest render as text pills.
const logos = {
  Java: { slug: "java" }, JavaScript: { slug: "javascript" }, HTML: { slug: "html5" }, CSS: { slug: "css3" },
  "React.js": { slug: "react" }, "Node.js": { slug: "nodejs" }, "Express.js": { slug: "express", mono: true },
  "Spring Boot": { slug: "spring" }, MongoDB: { slug: "mongodb" }, SQL: { slug: "mysql" },
  Git: { slug: "git" }, GitHub: { slug: "github", mono: true }, Postman: { slug: "postman" }, Flutter: { slug: "flutter" },
};

const all = portfolioData.skills.flatMap((c) => c.items);
const half = Math.ceil(all.length / 2);
const rows = [all.slice(0, half), all.slice(half)];

function Pill({ name }) {
  const logo = logos[name];
  return (
    <span className="chip !px-4 !py-2.5 !text-[0.9rem]">
      {logo && (
        <img src={dev(logo.slug)} alt="" width="20" height="20" loading="lazy" decoding="async"
             className={logo.mono ? "logo-mono h-5 w-5" : "h-5 w-5"} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      )}
      {name}
    </span>
  );
}

export default function Skills() {
  const grid = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".skill-card", {
        opacity: 0, y: 40, duration: 0.9, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
      });
      gsap.from(".skill-chip", {
        opacity: 0, y: 14, scale: 0.9, duration: 0.6, stagger: 0.03, delay: 0.2, ease: "back.out(1.6)", clearProps: "transform,opacity",
        scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
      });
    },
    { scope: grid },
  );

  return (
    <Section id="skills" eyebrow="Skills" title="Tools I think in." reveal={false}>
      <div ref={grid} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioData.skills.map((c) => (
          <GlassCard key={c.category} flat className="skill-card p-6">
            <h3 className="eyebrow mb-4">{c.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {c.items.map((item) => (
                <li key={item} className="skill-chip chip">{item}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-4 md:mt-20" style={{ marginInline: "calc(50% - 50vw)" }}>
        <Marquee direction={1} speed={55}>{rows[0].map((n) => <Pill key={n} name={n} />)}</Marquee>
        <Marquee direction={-1} speed={48}>{rows[1].map((n) => <Pill key={n} name={n} />)}</Marquee>
      </div>
    </Section>
  );
}
