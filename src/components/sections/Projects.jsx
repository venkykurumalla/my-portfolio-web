import { useRef, useState } from "react";
import { ArrowUpRight, Database, MapPin, BookOpen } from "lucide-react";
import { gsap, useGSAP } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import { SectionHeader } from "../Section";

const { projects } = portfolioData;

const linkLabel = (url) =>
  url.includes("github.com") ? "View Code" : url.includes("drive.google") ? "View Demo" : "Live Site";

// Projects without screenshots get a glass illustration instead.
function Visual({ id }) {
  const Icon = id === "smart-ambulance" ? MapPin : id === "student-api" ? Database : BookOpen;
  const tone = id === "smart-ambulance" ? "var(--pink)" : id === "student-api" ? "var(--cyan)" : "var(--violet)";
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${tone} 45%, transparent), transparent 70%), linear-gradient(160deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))` }}>
      <Icon className="h-14 w-14 text-white/90" strokeWidth={1.4} aria-hidden="true" />
    </div>
  );
}

function ProjectCard({ project, featured, index }) {
  const [active, setActive] = useState(0);
  const images = project.images ?? [];

  return (
    <GlassCard
      as="article" tilt large tint
      className={`project-card flex shrink-0 overflow-hidden p-3 ${featured ? "flex-col lg:flex-row lg:w-[min(1020px,72vw)]" : "flex-col lg:w-[min(440px,34vw)]"} lg:h-[min(580px,calc(100svh-14rem))]`}
    >
      <div className={`card-img relative overflow-hidden rounded-[22px] ${featured ? "min-h-[220px] lg:w-[52%]" : "min-h-[160px] flex-1 lg:min-h-[110px]"}`} style={{ aspectRatio: featured ? undefined : undefined }}>
        {images.length ? (
          images.map((src, i) => (
            <img key={src} src={src} alt={`${project.title} screenshot ${i + 1}`} width="1024" height="665"
                 loading="lazy" decoding="async"
                 className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
                 style={{ opacity: i === active ? 1 : 0 }} />
          ))
        ) : (
          <Visual id={project.id} />
        )}
        {featured && images.length > 1 && (
          <div className="absolute inset-x-3 bottom-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} type="button" aria-label={`Show screenshot ${i + 1}`} onClick={() => setActive(i)}
                      className="h-1.5 rounded-full border-0 p-0 transition-all duration-300"
                      style={{ width: i === active ? 28 : 8, background: i === active ? "#fff" : "rgba(255,255,255,0.5)" }} />
            ))}
          </div>
        )}
      </div>

      <div className={`flex min-h-0 flex-col p-4 md:p-6 ${featured ? "lg:w-[48%] lg:p-8" : ""}`}>
        <div className="mb-3 flex items-center gap-2 text-xs dim">
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          {featured && <span className="chip !py-1 !text-[0.7rem]" style={{ color: "var(--cyan)" }}>Featured · Production</span>}
        </div>
        <h3 className={`display ${featured ? "text-[clamp(1.6rem,3vw,2.4rem)]" : "text-[1.3rem]"}`} style={{ lineHeight: 1.08 }}>{project.title}</h3>
        <p className={`mt-3 leading-relaxed muted ${featured ? "text-[0.875rem]" : "text-[0.82rem]"}`}>{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => <li key={t} className="chip !px-2.5 !py-1 !text-[0.7rem]">{t}</li>)}
        </ul>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
           className="btn btn-glass mt-auto self-start !px-4 !py-2.5 !text-sm" style={{ marginTop: "1.25rem" }}>
          {linkLabel(project.link)} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </GlassCard>
  );
}

export default function Projects() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const count = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned section scrolls the card track horizontally.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 64);
        gsap.to(track.current, {
          x: () => -distance(), ease: "none",
          scrollTrigger: {
            trigger: ".projects-pin", start: "top top", end: () => `+=${distance()}`,
            pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set(bar.current, { scaleX: self.progress });
              count.current.textContent = String(Math.min(projects.length, Math.floor(self.progress * projects.length) + 1)).padStart(2, "0");
            },
          },
        });
      });

      // Mobile / tablet / reduced motion: vertical stack with simple reveals.
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(".project-card").forEach((card) => {
          gsap.from(card, { opacity: 0, y: 50, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 90%", once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="projects" ref={root} aria-label="Projects">
      <div className="projects-pin flex flex-col justify-center py-24 lg:h-[100svh] lg:overflow-hidden lg:py-0 lg:pt-24">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <SectionHeader eyebrow="Projects" title="Selected work." className="!mb-8 lg:!mb-6" />
            <div className="mb-8 hidden shrink-0 items-center gap-4 lg:mb-6 lg:flex" aria-hidden="true">
              <span className="text-sm tabular-nums dim"><span ref={count}>01</span> / {String(projects.length).padStart(2, "0")}</span>
              <span className="block h-[3px] w-40 overflow-hidden rounded-full" style={{ background: "var(--glass-border-lo)" }}>
                <span ref={bar} className="block h-full origin-left rounded-full" style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, var(--cyan), var(--violet))" }} />
              </span>
            </div>
          </div>
        </div>

        <div ref={track} className="flex flex-col gap-6 px-[max(1.25rem,4vw)] lg:flex-row lg:items-center lg:gap-8 lg:pl-[max(2rem,calc((100vw-1240px)/2))] lg:pr-16" style={{ willChange: "auto" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} featured={p.id === "ap-forest"} />
          ))}
        </div>
      </div>
    </section>
  );
}
