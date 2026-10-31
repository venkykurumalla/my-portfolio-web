import { useRef, useState } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { gsap, useGSAP, useSkew, onReady, isReady, prefersReducedMotion, SplitText } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import MagneticButton from "../MagneticButton";

const { personalInfo, hero } = portfolioData;
const [firstName, lastName] = personalInfo.name.split(" ");

export default function Hero() {
  const root = useRef(null);
  const role = useRef(null);
  const skew = useSkew(4);
  const [photoFailed, setPhotoFailed] = useState(false);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      // Role cycling — works with or without motion.
      let i = 0;
      const el = role.current;
      const cycle = gsap.delayedCall(2.4, function swap() {
        if (reduced) { i = (i + 1) % hero.roles.length; el.textContent = hero.roles[i]; cycle.restart(true); return; }
        gsap.timeline({ onComplete: () => cycle.restart(true) })
          .to(el, { yPercent: -80, opacity: 0, filter: "blur(8px)", duration: 0.45, ease: "power3.in" })
          .add(() => { i = (i + 1) % hero.roles.length; el.textContent = hero.roles[i]; })
          .fromTo(el, { yPercent: 80, opacity: 0, filter: "blur(8px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "expo.out" });
      });
      cycle.pause();
      const startCycle = () => cycle.restart(true);

      if (reduced) {
        gsap.from(".hero-in", { opacity: 0, duration: 0.8, stagger: 0.1 });
        startCycle();
        return;
      }

      // Entrance timeline — paused until the preloader curtain lifts.
      const split = SplitText.create(".hero-first", { type: "chars" });
      const tl = gsap.timeline({ paused: !isReady(), delay: 0.1, onComplete: startCycle });
      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, ease: "expo.out" })
        .from(split.chars, { yPercent: 70, opacity: 0, filter: "blur(16px)", duration: 1.1, stagger: 0.04, ease: "expo.out" }, "<0.1")
        .from(".hero-last", { yPercent: 60, opacity: 0, filter: "blur(18px)", letterSpacing: "0.12em", duration: 1.4, ease: "expo.out" }, "<0.25")
        .from(".hero-sub", { opacity: 0, y: 24, duration: 1, ease: "expo.out" }, "<0.4")
        .from(".hero-cta", { opacity: 0, y: 24, scale: 0.94, duration: 0.9, stagger: 0.1, ease: "expo.out" }, "<0.15")
        .from(".hero-card", { opacity: 0, y: 70, scale: 0.9, filter: "blur(14px)", duration: 1.5, ease: "expo.out" }, 0.3)
        .from(".hero-orbit", { opacity: 0, scale: 0.6, duration: 1, stagger: 0.15, ease: "back.out(1.6)" }, 1)
        .from(".scroll-cue-wrap", { opacity: 0, duration: 1 }, 1.4);
      const unsub = isReady() ? undefined : onReady(() => tl.play());

      // Scroll parallax: copy drifts up and fades, photo frame drifts at its own pace.
      gsap.to(".hero-copy", { yPercent: -14, opacity: 0.1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-card-wrap", { yPercent: -22, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".scroll-cue-wrap", { opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "20% top", scrub: true } });

      return () => { unsub?.(); split.revert(); cycle.kill(); };
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center pb-20 pt-32" aria-label="Introduction">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="hero-copy">
          <p className="hero-badge chip mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "var(--cyan)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--cyan)" }} />
            </span>
            Open to internships · <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {personalInfo.location}
          </p>

          <h1 ref={skew} className="display text-[clamp(3rem,11vw,8rem)]">
            <span className="hero-first block">{firstName}</span>
            <span className="hero-last text-gradient inline-block pb-[0.08em]">{lastName}</span>
          </h1>

          <h2 className="hero-sub mt-6 max-w-2xl text-[clamp(1.05rem,2.2vw,1.45rem)] font-medium leading-snug muted">
            Aspiring Software Engineer <span className="dim">|</span> Full-Stack &amp; AI/LLM
          </h2>
          <p className="hero-sub mt-4 flex items-center gap-3 text-[clamp(1rem,2vw,1.25rem)] font-semibold" aria-label={hero.roles.join(", ")}>
            <span className="dim font-normal">I build as a</span>
            <span className="inline-block overflow-hidden pb-1">
              <span ref={role} className="inline-block text-gradient" aria-hidden="true">{hero.roles[0]}</span>
            </span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <MagneticButton href="#projects" variant="primary" className="hero-cta">
              View Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={personalInfo.resume} download="Venkatesh_Kurumalla_Resume.pdf" variant="glass" className="hero-cta">
              Download Resume <Download className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>

        <div className="hero-card-wrap relative mx-auto w-full max-w-[22rem] lg:max-w-none">
          <GlassCard tilt large liquid className="hero-card float-slow aspect-[4/5] overflow-hidden p-3">
            <div className="relative h-full w-full overflow-hidden rounded-[22px]" style={{ background: "linear-gradient(160deg, rgba(59,130,246,0.35), rgba(139,92,246,0.35) 55%, rgba(244,114,182,0.3))" }}>
              {!photoFailed && (
                <picture>
                  <img
                    src="/VenkateshKurumalla.jpg"
                    alt="Portrait of Venkatesh Kurumalla"
                    width="640" height="800" decoding="async" fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setPhotoFailed(true)}
                  />
                </picture>
              )}
              {photoFailed && (
                <div className="absolute inset-0 grid place-items-center" role="img" aria-label="Venkatesh Kurumalla monogram">
                  <span className="display text-[clamp(6rem,16vw,10rem)] text-white/90" style={{ textShadow: "0 8px 40px rgba(0,0,0,0.35)" }}>VK</span>
                </div>
              )}
            </div>
          </GlassCard>

          <span className="hero-orbit chip float-slower absolute -left-3 top-[14%] hidden sm:inline-flex">React.js</span>
          <span className="hero-orbit chip float-slow absolute -right-3 top-[44%] hidden sm:inline-flex">Node.js</span>
          <span className="hero-orbit chip float-slower absolute -left-5 bottom-[12%] hidden sm:inline-flex">LLMs</span>
        </div>
      </div>

      <div className="scroll-cue-wrap pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex" aria-hidden="true">
        <span className="scroll-cue glass glass--pill relative block h-10 w-6" />
      </div>
    </section>
  );
}
