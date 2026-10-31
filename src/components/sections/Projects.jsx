import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Database, MapPin, BookOpen } from "lucide-react";
import { gsap, useGSAP } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import { SectionHeader } from "../Section";

const { projects } = portfolioData;

// Every project gets at least one visible button: live site / demo, plus Code when a repo exists.
function getActions(project) {
  const primary = project.link;
  const isRepo = primary.includes("github.com");
  const label = isRepo ? "Code" : primary.includes("drive.google") ? "View Demo" : "Live Website";
  const actions = [{ href: primary, label, primary: !isRepo }];
  if (project.github && project.github !== primary) actions.push({ href: project.github, label: "Code", primary: false });
  return actions;
}

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
  const [open, setOpen] = useState(false);
  const images = project.images ?? [];
  const actions = getActions(project);

  return (
    <GlassCard
      as="article" large flat hover data-index={index}
      className={`project-card flex w-[82vw] max-w-[440px] shrink-0 flex-col overflow-hidden p-2.5 sm:w-[420px] lg:h-[min(600px,calc(100svh-17rem))] lg:p-3 ${featured ? "lg:w-[min(1020px,72vw)] lg:max-w-none lg:flex-row" : "lg:w-[min(440px,34vw)]"}`}
    >
      <div className={`card-img relative shrink-0 overflow-hidden rounded-[20px] ${featured ? "aspect-[16/9] lg:aspect-auto lg:w-[52%]" : "aspect-[16/9] lg:aspect-auto lg:min-h-[110px] lg:flex-1"}`}>
        {images.length ? (
          images.map((src, i) => (
            <img key={src} src={src} alt={i === 0 ? `${project.title} screenshot` : ""} width="1008" height="526"
                 loading="lazy" decoding="async"
                 className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
                 style={{ opacity: i === active ? 1 : 0 }} />
          ))
        ) : (
          <Visual id={project.id} />
        )}
        {featured && images.length > 1 && (
          <div className="absolute inset-x-3 bottom-2 z-10 hidden justify-center gap-1.5 lg:flex">
            {images.map((_, i) => (
              <button key={i} type="button" aria-label={`Show screenshot ${i + 1}`} onClick={() => setActive(i)}
                      className="h-1.5 rounded-full border-0 p-0 transition-all duration-300"
                      style={{ width: i === active ? 28 : 8, background: i === active ? "#fff" : "rgba(255,255,255,0.5)" }} />
            ))}
          </div>
        )}
      </div>

      <div className={`flex min-h-0 flex-1 flex-col p-3.5 md:p-5 ${featured ? "lg:w-[48%] lg:flex-none lg:p-8" : "lg:p-6"}`}>
        <div className="mb-2 flex shrink-0 items-center gap-2 text-xs dim">
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          {featured && <span className="chip !py-1 !text-[0.7rem]" style={{ color: "var(--cyan)" }}>Featured · Production</span>}
        </div>
        <h3 className={`display shrink-0 ${featured ? "text-[1.5rem] lg:text-[clamp(1.6rem,3vw,2.4rem)]" : "text-[1.3rem]"}`} style={{ lineHeight: 1.1 }}>{project.title}</h3>

        {/* Phones/tablets: 3-line summary with Read more. Desktop: full text, scrolls inside the card if it must. */}
        <div className="mt-2.5 min-h-0 lg:flex-1 lg:overflow-y-auto" data-lenis-prevent>
          <p className={`text-base leading-relaxed muted lg:text-[0.85rem] ${open ? "" : "line-clamp-3 lg:line-clamp-none"}`}>{project.description}</p>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
                  className="mt-1 min-h-11 border-0 bg-transparent p-0 text-sm font-semibold lg:hidden" style={{ color: "var(--cyan)" }}>
            {open ? "Show less" : "Read more"}
          </button>
          <ul className={`mt-2 flex flex-wrap gap-1.5 ${open ? "" : "max-lg:hidden"}`}>
            {project.technologies.map((t) => <li key={t} className="chip !px-2.5 !py-1 !text-[0.7rem]">{t}</li>)}
          </ul>
        </div>

        <div className="relative z-10 mt-3 flex shrink-0 flex-wrap gap-2.5 lg:mt-5">
          {actions.map((a) => (
            <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer"
               className={`btn ${a.primary ? "btn-primary" : "btn-glass"} !px-5 !py-2.5 !text-sm`}
               aria-label={`${a.label}: ${project.title} (opens in a new tab)`}>
              {a.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export default function Projects() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const count = useRef(null);
  const [current, setCurrent] = useState(0);

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
              bar.current.style.transform = `scaleX(${self.progress})`;
              const n = String(Math.min(projects.length, Math.floor(self.progress * projects.length) + 1)).padStart(2, "0");
              if (count.current.textContent !== n) count.current.textContent = n;
            },
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Below 1024px the track is a native swipeable carousel (scroll-snap). Track which card is centred.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth >= 1024) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      Array.from(el.children).forEach((card, i) => {
        const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
        card.classList.toggle("is-active", false);
      });
      el.children[best]?.classList.add("is-active");
      setCurrent(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const goTo = (i) => {
    const card = track.current?.children[i];
    if (card) track.current.scrollTo({ left: card.offsetLeft - (track.current.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="projects" ref={root} aria-label="Projects">
      <div className="projects-pin flex flex-col justify-center pb-8 pt-10 lg:h-[100svh] lg:overflow-hidden lg:py-0 lg:pt-20">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <SectionHeader eyebrow="Projects" title="Selected work." className="!mb-6 lg:!mb-6" />
            <div className="mb-8 hidden shrink-0 items-center gap-4 lg:mb-6 lg:flex" aria-hidden="true">
              <span className="text-sm tabular-nums dim"><span ref={count}>01</span> / {String(projects.length).padStart(2, "0")}</span>
              <span className="block h-[3px] w-40 overflow-hidden rounded-full" style={{ background: "var(--glass-border-lo)" }}>
                <span ref={bar} className="block h-full origin-left rounded-full" style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, var(--cyan), var(--violet))" }} />
              </span>
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="projects-track project-track flex gap-4 px-[9vw] max-lg:items-start max-lg:overflow-x-auto max-lg:pb-3 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:pl-[max(2rem,calc((100vw-1240px)/2))] lg:pr-16"
          role="group" aria-label="Projects carousel" tabIndex={-1}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} featured={p.id === "ap-forest"} />
          ))}
        </div>

        <div className="mt-2 flex justify-center lg:hidden" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => (
            <button key={p.id} type="button" role="tab" aria-selected={current === i} aria-label={`Project ${i + 1}: ${p.title}`}
                    onClick={() => goTo(i)} className="grid h-11 w-8 place-items-center border-0 bg-transparent p-0">
              <span className="block h-2 rounded-full transition-all duration-300"
                    style={{ width: current === i ? 22 : 8, background: current === i ? "var(--cyan)" : "var(--fg-dim)" }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
