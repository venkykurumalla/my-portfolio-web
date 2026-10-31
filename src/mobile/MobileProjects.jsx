import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ArrowUpRight, BookOpen, Database, MapPin, X } from "lucide-react";
import { gsap, ScrollTrigger, useMotionSafe } from "../lib/motion";
import { haptic } from "../lib/haptics";
import { portfolioData } from "../data/portfolioData";
import SectionHead from "./SectionHead";
import { useSectionIntro } from "./useSectionIntro";

const { projects } = portfolioData;

// Every project keeps a visible button: live site / demo, plus Code when a repo exists.
function getActions(project) {
  const primary = project.link;
  const isRepo = primary.includes("github.com");
  const label = isRepo ? "Code" : primary.includes("drive.google") ? "View Demo" : "Live Website";
  const actions = [{ href: primary, label, primary: !isRepo }];
  if (project.github && project.github !== primary) actions.push({ href: project.github, label: "Code", primary: false });
  return actions;
}

const hostOf = (url) => { try { return new URL(url).hostname.replace("www.", ""); } catch { return ""; } };

function Visual({ id }) {
  const Icon = id === "smart-ambulance" ? MapPin : id === "student-api" ? Database : BookOpen;
  const tone = id === "smart-ambulance" ? "var(--pink)" : id === "student-api" ? "var(--cyan)" : "var(--violet)";
  return (
    <div className="m-visual" style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${tone} 45%, transparent), transparent 70%), linear-gradient(160deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))` }}>
      <Icon className="h-12 w-12 text-white/90" strokeWidth={1.4} aria-hidden="true" />
    </div>
  );
}

// Browser-style mockup around the (cropped) screenshot
function Mockup({ project, parallax = false }) {
  const img = project.images?.[0];
  return (
    <div className="m-mock">
      <div className="m-mock-bar" aria-hidden="true"><i /><i /><i /><span>{hostOf(project.link)}</span></div>
      <div className="m-mock-screen">
        {img ? (
          <img src={img} alt={`${project.title} screenshot`} width="1008" height="526" loading="lazy" decoding="async" className={parallax ? "m-px" : ""} draggable="false" />
        ) : (
          <Visual id={project.id} />
        )}
      </div>
    </div>
  );
}

function Actions({ project, onDetails }) {
  return (
    <div className="m-card-actions">
      {getActions(project).map((a) => (
        <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer"
           className={`btn ${a.primary ? "btn-primary" : "btn-glass"}`} aria-label={`${a.label}: ${project.title} (opens in a new tab)`}>
          {a.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      <button type="button" className="btn btn-glass" onClick={onDetails} aria-label={`Details: ${project.title}`}>Details</button>
    </div>
  );
}

function CardBody({ project, index, onDetails }) {
  return (
    <>
      <Mockup project={project} parallax />
      <div className="m-card-body">
        <div className="m-card-meta">
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          {project.id === "ap-forest" && <span className="chip m-featured">Featured · Production</span>}
        </div>
        <h3 className="m-card-title display">{project.title}</h3>
        <p className="m-card-sum">{project.description}</p>
        <ul className="m-card-tags">
          {project.technologies.slice(0, 4).map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <Actions project={project} onDetails={onDetails} />
      </div>
    </>
  );
}

// Long-press on a card shows a quick preview while the finger stays down (iOS "peek")
function useLongPress(onLongPress, onRelease, delay = 420) {
  const timer = useRef(0);
  const start = useRef(null);
  const fired = useRef(false);
  const end = () => { window.clearTimeout(timer.current); start.current = null; if (fired.current) { fired.current = false; onRelease(); } };
  return {
    onPointerDown: (e) => {
      if (e.target.closest("a, button")) return;
      start.current = { x: e.clientX, y: e.clientY };
      timer.current = window.setTimeout(() => { fired.current = true; haptic(15); onLongPress(); }, delay);
    },
    onPointerMove: (e) => {
      if (!start.current || fired.current) return;
      if (Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 10) { window.clearTimeout(timer.current); start.current = null; }
    },
    onPointerUp: end, onPointerCancel: end, onPointerLeave: end,
    onContextMenu: (e) => e.preventDefault(),
  };
}

function Peek({ project }) {
  return (
    <motion.div className="m-peek" role="presentation" style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
      initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}>
      <Mockup project={project} />
      <h3 className="display">{project.title}</h3>
      <p>{project.description.slice(0, 150).trim()}…</p>
    </motion.div>
  );
}

function ProjectSheet({ project, onClose }) {
  const controls = useDragControls();
  const closeRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("menu-open");
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.documentElement.classList.remove("menu-open"); document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <>
      <motion.div className="m-sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        className="m-sheet" role="dialog" aria-modal="true" aria-label={project.title}
        drag="y" dragControls={controls} dragListener={false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => { if (info.offset.y > 120 || info.velocity.y > 600) onClose(); }}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
      >
        <div className="m-sheet-head" onPointerDown={(e) => controls.start(e)} style={{ touchAction: "none" }}>
          <span className="m-sheet-handle" aria-hidden="true" />
          <button ref={closeRef} type="button" className="m-sheet-close" onClick={onClose} aria-label="Close details"><X className="h-5 w-5" aria-hidden="true" /></button>
        </div>
        <div className="m-sheet-scroll" data-lenis-prevent>
          <Mockup project={project} />
          <h3 className="display m-sheet-title">{project.title}</h3>
          <p className="m-sheet-text">{project.description}</p>
          <ul className="m-card-tags">{project.technologies.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
          <div className="m-card-actions">
            {getActions(project).map((a) => (
              <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className={`btn ${a.primary ? "btn-primary" : "btn-glass"}`}>
                {a.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function MobileProjects() {
  const root = useRef(null);
  const track = useRef(null);
  const [view, setView] = useState("stack"); // "stack" | "swipe"
  const [sheet, setSheet] = useState(null);
  const [peek, setPeek] = useState(null);
  const [current, setCurrent] = useState(0);
  useSectionIntro(root, { wipe: false });

  // Stacked cards: each card sticks, the next slides over it while it shrinks and dims.
  useMotionSafe(
    () => {
      if (view !== "stack") return;
      const cards = gsap.utils.toArray(".m-stack-card");
      cards.forEach((card, i) => {
        gsap.from(card, { y: 40, opacity: 0, duration: 0.8, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: card, start: "top 92%", once: true } });
        const next = cards[i + 1];
        if (!next) return;
        const trigger = { trigger: next, start: "top 78%", end: "top 22%", scrub: true };
        gsap.to(card.querySelector(".m-card-inner"), { scale: 0.92, ease: "none", transformOrigin: "50% 0%", scrollTrigger: trigger });
        gsap.to(card.querySelector(".m-card-dim"), { opacity: 0.55, ease: "none", scrollTrigger: trigger });
      });
    },
    { scope: root, dependencies: [view], revertOnUpdate: true },
  );

  // Swipe view: snap carousel with parallax inside each card
  useEffect(() => {
    if (view !== "swipe") return;
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      Array.from(el.children).forEach((card, i) => {
        const d = (card.offsetLeft + card.offsetWidth / 2 - mid) / card.offsetWidth;
        card.style.setProperty("--d", d.toFixed(3));
        if (Math.abs(d) < bestDist) { bestDist = Math.abs(d); best = i; }
        card.classList.remove("is-active");
      });
      el.children[best]?.classList.add("is-active");
      setCurrent(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [view]);

  // Layout height changes with the view, so re-measure all triggers.
  useEffect(() => { const id = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(id); }, [view]);

  const goTo = (i) => {
    const card = track.current?.children[i];
    if (card) track.current.scrollTo({ left: card.offsetLeft - (track.current.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="projects" ref={root} className="m-section" aria-label="Projects">
      <div className="m-wrap">
        <SectionHead label="Projects" title="Selected work." />
        <div className="m-seg" role="group" aria-label="Project layout">
          <button type="button" aria-pressed={view === "stack"} onClick={() => setView("stack")}>Stack</button>
          <button type="button" aria-pressed={view === "swipe"} onClick={() => setView("swipe")}>Swipe</button>
        </div>
      </div>

      {view === "stack" ? (
        <div className="m-stack">
          {projects.map((p, i) => (
            <LongPressCard key={p.id} project={p} index={i} onPeek={setPeek} onDetails={() => setSheet(p)} />
          ))}
        </div>
      ) : (
        <>
          <div ref={track} className="m-swipe" role="group" aria-label="Projects carousel">
            {projects.map((p, i) => (
              <article key={p.id} className="m-swipe-card m-card">
                <CardBody project={p} index={i} onDetails={() => setSheet(p)} />
              </article>
            ))}
          </div>
          <div className="m-dots" role="tablist" aria-label="Choose project">
            {projects.map((p, i) => (
              <button key={p.id} type="button" role="tab" aria-selected={current === i} aria-label={`Project ${i + 1}: ${p.title}`} onClick={() => goTo(i)}>
                <span style={{ width: current === i ? 22 : 8, background: current === i ? "var(--cyan)" : "var(--fg-dim)" }} />
              </button>
            ))}
          </div>
        </>
      )}

      <AnimatePresence>{peek && <Peek key="peek" project={peek} />}</AnimatePresence>
      <AnimatePresence>{sheet && <ProjectSheet key="sheet" project={sheet} onClose={() => setSheet(null)} />}</AnimatePresence>
    </section>
  );
}

function LongPressCard({ project, index, onPeek, onDetails }) {
  const handlers = useLongPress(() => onPeek(project), () => onPeek(null));
  return (
    <article className="m-stack-card" style={{ "--i": index }} {...handlers}>
      <div className="m-card-inner m-card">
        <CardBody project={project} index={index} onDetails={onDetails} />
        <span className="m-card-dim" aria-hidden="true" />
      </div>
    </article>
  );
}
