import { useRef, useState } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { gsap, useGSAP, useSkew, prefersReducedMotion } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import GlassCard from "../GlassCard";
import Button from "../Button";

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
          .to(el, { yPercent: -80, opacity: 0, duration: 0.35, ease: "power3.in" })
          .add(() => { i = (i + 1) % hero.roles.length; el.textContent = hero.roles[i]; })
          .fromTo(el, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "expo.out" });
      });
      cycle.pause();
      const startCycle = () => cycle.restart(true);

      if (reduced) { startCycle(); return; }

      // Hero is visible immediately; content just fades up quickly (0.5s).
      gsap.from(".hero-copy > *", { opacity: 0, y: 16, duration: 0.5, stagger: 0.05, ease: "power2.out", clearProps: "transform,opacity" });
      gsap.from(".hero-card-wrap", { opacity: 0, duration: 0.5, clearProps: "opacity" });
      startCycle();

      // Scroll parallax (desktop only): copy drifts up and fades, photo frame drifts at its own pace.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover)", () => {
        const trigger = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-copy", { yPercent: -14, opacity: 0.1, ease: "none", scrollTrigger: trigger });
        gsap.to(".hero-card-wrap", { yPercent: -22, ease: "none", scrollTrigger: trigger });
      });
      // Phones: just a light drift on the photo (transform only).
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-card-wrap", { y: -28, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      });

      return () => { mm.revert(); cycle.kill(); };
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center pb-10 pt-24 md:pb-20 md:pt-32" aria-label="Introduction">
      <div className="container-x grid items-center gap-5 md:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
        <div className="hero-copy">
          <p className="hero-badge chip mb-4 max-w-full !flex-wrap !whitespace-normal !rounded-3xl md:mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "var(--cyan)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--cyan)" }} />
            </span>
            Open to internships
            <span className="hidden items-center gap-2 sm:inline-flex">· <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {personalInfo.location}</span>
          </p>

          <h1 ref={skew} className="display text-[clamp(3rem,11vw,8rem)]">
            <span className="hero-first block">{firstName}</span>
            <span className="hero-last text-gradient inline-block pb-[0.08em]">{lastName}</span>
          </h1>

          <h2 className="hero-sub mt-4 max-w-2xl md:mt-6 text-[clamp(1.05rem,2.2vw,1.45rem)] font-medium leading-snug muted">
            Aspiring Software Engineer <span className="dim">|</span> Full-Stack &amp; AI/LLM
          </h2>
          <p className="hero-sub mt-4 flex items-center gap-3 text-[clamp(1rem,2vw,1.25rem)] font-semibold" aria-label={hero.roles.join(", ")}>
            <span className="dim font-normal">I build as a</span>
            <span className="inline-block overflow-hidden pb-1">
              <span ref={role} className="inline-block text-gradient" aria-hidden="true">{hero.roles[0]}</span>
            </span>
          </p>

          <div className="mt-6 grid gap-3 min-[480px]:flex min-[480px]:flex-wrap md:mt-10 md:gap-3.5 [&>a]:w-full min-[480px]:[&>a]:w-auto">
            <Button href="#projects" variant="primary">
              View Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={personalInfo.resume} download="Venkatesh_Kurumalla_Resume.pdf" variant="glass">
              Download Resume <Download className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="hero-card-wrap relative order-first mx-auto w-full md:max-w-[22rem] lg:order-last lg:max-w-none">
          <GlassCard large className="hero-card float-slow aspect-[16/8.5] overflow-hidden p-2.5 md:aspect-[4/5] md:p-3">
            <div className="relative h-full w-full overflow-hidden rounded-[22px]" style={{ background: "linear-gradient(160deg, rgba(59,130,246,0.35), rgba(139,92,246,0.35) 55%, rgba(244,114,182,0.3))" }}>
              {!photoFailed && (
                <picture>
                  <img
                    src="/VenkateshKurumalla.jpg"
                    alt="Portrait of Venkatesh Kurumalla"
                    width="458" height="573" decoding="async" fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover object-[50%_28%] md:object-center"
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
