import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { gsap, ScrollTrigger, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";
import SectionHead from "./SectionHead";
import { useSectionIntro } from "./useSectionIntro";

export default function MobileExperience() {
  const root = useRef(null);
  useSectionIntro(root);

  useMotionSafe(
    () => {
      // The glowing line draws down as you scroll (decorative; cards don't depend on it)
      gsap.fromTo(".m-tl-fill", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".m-tl", start: "top 70%", end: "bottom 70%", scrub: true },
      });

      gsap.utils.toArray(".m-job").forEach((job, i) => {
        const fromRight = i % 2 === 1;
        const dot = job.querySelector(".m-tl-dot");
        const tl = gsap.timeline({ scrollTrigger: { trigger: job, start: "top 88%", once: true } });
        // Flips in from the side with 3D perspective, then a light streak crosses the card
        tl.from(job.querySelector(".m-job-card"), {
          rotateY: fromRight ? 62 : -62, x: fromRight ? 46 : -46, opacity: 0, transformPerspective: 900,
          transformOrigin: fromRight ? "100% 50%" : "0% 50%", duration: 1, ease: "expo.out", clearProps: "transform,opacity",
        }).fromTo(job.querySelector(".m-streak"), { xPercent: -140, skewX: -18, opacity: 0.9 }, { xPercent: 280, skewX: -18, duration: 1, ease: "power2.inOut" }, 0.3);
        ScrollTrigger.create({
          trigger: job, start: "top 70%",
          onEnter: () => dot.classList.add("is-lit"), onLeaveBack: () => dot.classList.remove("is-lit"),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="m-section" aria-label="Experience">
      <div className="m-wrap">
        <SectionHead label="Experience" title="Where I've shipped." />
        <ol className="m-tl">
          <span className="m-tl-rail" aria-hidden="true" />
          <span className="m-tl-fill" aria-hidden="true" />
          {portfolioData.experience.map((job) => (
            <li key={job.company} className="m-job">
              <span className="m-tl-dot" aria-hidden="true" />
              <div className="m-job-card m-card m-press">
                <span className="m-streak" aria-hidden="true" />
                <p className="chip m-job-date">{job.duration}</p>
                <h3 className="display">{job.role}</h3>
                <p className="m-job-co"><Briefcase className="h-4 w-4" aria-hidden="true" /> {job.company}{job.type && <span className="dim"> · {job.type}</span>}</p>
                <p className="m-job-desc">{job.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
