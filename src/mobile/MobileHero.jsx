import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { gsap, SplitText, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";

const { personalInfo, hero } = portfolioData;
const [firstName, lastName] = personalInfo.name.split(" ");

// Slot-machine / flip role switcher
function RoleFlip() {
  const ref = useRef(null);
  useMotionSafe(() => {
    const el = ref.current;
    let i = 0;
    const flip = () => {
      gsap.timeline({ onComplete: () => gsap.delayedCall(2.2, flip) })
        .to(el, { rotateX: -90, yPercent: -30, opacity: 0, duration: 0.35, ease: "power2.in" })
        .add(() => { i = (i + 1) % hero.roles.length; el.textContent = hero.roles[i]; })
        .fromTo(el, { rotateX: 90, yPercent: 30, opacity: 0 }, { rotateX: 0, yPercent: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
    };
    const call = gsap.delayedCall(3.2, flip);
    return () => call.kill();
  }, { scope: ref });
  return (
    <span className="m-role-wrap">
      <span className="sr-only">{hero.roles.join(", ")}</span>
      <span ref={ref} className="m-role text-gradient" aria-hidden="true">{hero.roles[0]}</span>
    </span>
  );
}

function Particles() {
  const dots = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    left: (i * 37 + 11) % 100, top: 20 + ((i * 53) % 70), size: 2 + (i % 3),
    dur: 7 + (i % 5) * 1.6, delay: -(i * 0.9), dx: (i % 2 ? 1 : -1) * (10 + (i % 4) * 8),
  })), []);
  return (
    <div className="m-particles" aria-hidden="true">
      {dots.map((d, i) => (
        <span key={i} style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`, "--dx": `${d.dx}px` }} />
      ))}
    </div>
  );
}

export default function MobileHero() {
  const root = useRef(null);
  const inner = useRef(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  // Pause the particles while the hero is off-screen.
  useEffect(() => {
    const el = root.current;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-paused", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useMotionSafe(
    () => {
      const el = root.current;

      // --- Entrance (< 1.3s): letters rise with a 3D tilt and blur-to-sharp
      const s1 = SplitText.create(".m-name-1", { type: "chars", aria: "none" });
      const s2 = SplitText.create(".m-name-2", { type: "chars", aria: "none" });
      // The last name is gradient text: give each letter its slice of one shared gradient.
      const paintGradient = () => {
        const w = el.querySelector(".m-name-2").getBoundingClientRect().width;
        s2.chars.forEach((c) => {
          c.classList.add("m-grad-char");
          c.style.backgroundSize = `${w}px 100%`;
          c.style.backgroundPosition = `${-c.offsetLeft}px 0`;
        });
      };
      paintGradient();
      document.fonts?.ready.then(paintGradient);

      const charFrom = { yPercent: 90, rotateX: -80, opacity: 0, transformOrigin: "50% 100%", duration: 0.65, stagger: 0.03 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".m-bubble-wrap", { scale: 0.6, opacity: 0, duration: 0.9, ease: "back.out(1.6)" }, 0)
        .from(".m-badge", { opacity: 0, y: 12, duration: 0.5 }, 0.1)
        .from(s1.chars, charFrom, 0.15)
        .from(".m-name-1", { filter: "blur(12px)", duration: 0.7 }, 0.15)
        .from(s2.chars, charFrom, 0.3)
        .from(".m-name-2", { filter: "blur(12px)", duration: 0.7 }, 0.3)
        .from(".m-sub, .m-role-line", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, 0.7)
        .from(".m-scroll-hint", { opacity: 0, duration: 0.6 }, 1.1);
      tl.eventCallback("onComplete", () => {
        gsap.set([s1.chars, s2.chars, ".m-name-1", ".m-name-2"], { clearProps: "transform,opacity,filter" });
      });

      // --- "Stacked sheets": as the About sheet slides over, the hero zooms back and dims
      gsap.to(inner.current, {
        scale: 0.9, opacity: 0.3, ease: "none", transformOrigin: "50% 40%",
        scrollTrigger: {
          trigger: document.getElementById("about"), start: "top bottom", end: "top 25%", scrub: true,
          onLeave: () => gsap.set(el, { visibility: "hidden" }),
          onEnterBack: () => gsap.set(el, { visibility: "visible" }),
        },
      });

      // --- Pull-down at the very top: elastic stretch, springs back on release
      let startY = null;
      const onStart = (e) => { startY = window.scrollY <= 0 ? e.touches[0].clientY : null; };
      const onMove = (e) => {
        if (startY === null) return;
        const dy = e.touches[0].clientY - startY;
        if (dy <= 0 || window.scrollY > 0) { return; }
        const pull = Math.min(dy * 0.35, 90);
        gsap.set(inner.current, { y: pull, scaleY: 1 + pull / 700, transformOrigin: "50% 0%" });
      };
      const onEnd = () => {
        if (startY === null) return;
        startY = null;
        gsap.to(inner.current, { y: 0, scaleY: 1, duration: 0.9, ease: "elastic.out(1, 0.45)" });
      };
      window.addEventListener("touchstart", onStart, { passive: true });
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("touchend", onEnd, { passive: true });
      window.addEventListener("touchcancel", onEnd, { passive: true });

      return () => {
        s1.revert(); s2.revert();
        window.removeEventListener("touchstart", onStart);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
        window.removeEventListener("touchcancel", onEnd);
      };
    },
    { scope: root },
  );

  const cta = (i) => ({
    initial: { scale: 0.55, opacity: 0, y: 24 },
    animate: { scale: 1, opacity: 1, y: 0 },
    transition: { type: "spring", bounce: 0.55, duration: 0.8, delay: 0.95 + i * 0.12 },
  });

  return (
    <section id="home" ref={root} className="m-hero" aria-label="Introduction">
      <div ref={inner} className="m-hero-inner">
        <Particles />

        <div className="m-bubble-wrap">
          <span className="m-ring" aria-hidden="true" />
          <div className="m-bubble">
            {!photoFailed ? (
              <img src="/VenkateshKurumalla.jpg" alt="Portrait of Venkatesh Kurumalla" width="458" height="573"
                   decoding="async" fetchPriority="high" onError={() => setPhotoFailed(true)} />
            ) : (
              <span className="m-monogram display" role="img" aria-label="Venkatesh Kurumalla monogram">VK</span>
            )}
          </div>
        </div>

        <p className="m-badge chip"><span className="m-dot" aria-hidden="true" />Open to internships</p>

        <h1 className="m-name display" aria-label={personalInfo.name}>
          <span className="m-name-1" aria-hidden="true">{firstName}</span>
          <span className="m-name-2" aria-hidden="true">{lastName}</span>
        </h1>

        <h2 className="m-sub">Aspiring Software Engineer <span className="dim">|</span> Full-Stack &amp; AI/LLM</h2>
        <p className="m-role-line"><span className="dim">I build as a</span> <RoleFlip /></p>

        <div className="m-ctas">
          <motion.a {...cta(0)} href="#projects" className="btn btn-primary btn-shine" style={{ "--sd": "1.6s" }}>
            View Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.a>
          <motion.a {...cta(1)} href={personalInfo.resume} download="Venkatesh_Kurumalla_Resume.pdf" className="btn btn-glass btn-shine" style={{ "--sd": "3.1s" }}>
            Download Resume <Download className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        </div>

        <span className="m-scroll-hint" aria-hidden="true"><ChevronDown className="h-5 w-5" /></span>
      </div>
    </section>
  );
}
