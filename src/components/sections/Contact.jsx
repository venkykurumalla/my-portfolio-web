import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { gsap, useGSAP, useSkew, prefersReducedMotion } from "../../lib/motion";
import { portfolioData } from "../../data/portfolioData";
import { Github, Linkedin } from "../Icons";
import GlassCard from "../GlassCard";
import MagneticButton from "../MagneticButton";
import RevealText from "../RevealText";

const { personalInfo } = portfolioData;
const encode = (data) => new URLSearchParams(data).toString();

export default function Contact() {
  const root = useRef(null);
  const check = useRef(null);
  const skew = useSkew(6);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Gradient text can't be split per-character (background-clip breaks), so it reveals as one word.
      gsap.from(".contact-word", {
        yPercent: 60, opacity: 0, filter: "blur(18px)", letterSpacing: "0.1em", duration: 1.4, ease: "expo.out", delay: 0.3,
        scrollTrigger: { trigger: ".contact-word", start: "top 90%", once: true },
      });
      gsap.from(".contact-reveal", {
        opacity: 0, y: 50, duration: 1.1, stagger: 0.14, ease: "expo.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  // Success: draw the check mark.
  useGSAP(
    () => {
      if (status !== "success" || !check.current) return;
      const path = check.current.querySelector("path");
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.timeline()
        .from(".success-ring", { scale: 0, duration: 0.6, ease: "back.out(2)" })
        .to(path, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, "-=0.1")
        .from(".success-copy", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "expo.out" }, "-=0.2");
    },
    { dependencies: [status], scope: root },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      // Netlify Forms (declared as a static form in index.html so Netlify detects it)
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const details = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s+/g, "")}` },
    { icon: MapPin, label: "Location", value: personalInfo.location },
  ];

  return (
    <section id="contact" ref={root} className="section" aria-label="Contact">
      <div className="container-x">
        <p className="eyebrow chip mb-6">Contact</p>
        <h2 ref={skew} className="display text-[clamp(3rem,10.5vw,9rem)]">
          <RevealText as="span" type="chars" className="block">Let&apos;s build</RevealText>
          <span className="contact-word text-gradient inline-block pb-[0.08em]">something.</span>
        </h2>

        <div className="contact-grid mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr]">
          <GlassCard large tint className="contact-reveal p-6 md:p-10">
            {status === "success" ? (
              <div className="grid min-h-[22rem] place-items-center text-center" role="status">
                <div>
                  <svg ref={check} viewBox="0 0 96 96" className="mx-auto mb-6 h-24 w-24" aria-hidden="true">
                    <circle className="success-ring" cx="48" cy="48" r="44" fill="rgba(34,211,238,0.12)" stroke="var(--cyan)" strokeWidth="2" />
                    <path d="M28 50 L42 64 L68 34" fill="none" stroke="var(--cyan)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 className="success-copy display text-3xl">Message sent.</h3>
                  <p className="success-copy mt-2 muted">Thanks for reaching out — I&apos;ll reply soon.</p>
                  <button type="button" className="success-copy btn btn-glass mt-8" onClick={() => setStatus("idle")}>Send another</button>
                </div>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="flex flex-col gap-4">
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
                <div className="field"><input id="c-name" name="name" type="text" placeholder=" " required autoComplete="name" /><label htmlFor="c-name">Your name</label></div>
                <div className="field"><input id="c-email" name="email" type="email" placeholder=" " required autoComplete="email" /><label htmlFor="c-email">Email address</label></div>
                <div className="field"><textarea id="c-message" name="message" rows={5} placeholder=" " required /><label htmlFor="c-message">Tell me about your project</label></div>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <MagneticButton as="button" type="submit" variant="primary" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message"} <Send className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                  {status === "error" && (
                    <p role="alert" className="text-sm" style={{ color: "var(--pink)" }}>
                      Couldn&apos;t send — please email me at <a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a>.
                    </p>
                  )}
                </div>
              </form>
            )}
          </GlassCard>

          <GlassCard large tint className="contact-reveal flex flex-col justify-between gap-10 p-6 md:p-10">
            <ul className="flex flex-col gap-6">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: "var(--glass-fill-strong)", boxShadow: "inset 0 1px 0 var(--glass-border-hi)" }}>
                    <Icon className="h-5 w-5" style={{ color: "var(--cyan)" }} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow !text-[0.65rem]">{label}</p>
                    {href ? <a href={href} className="break-words font-medium hover:underline">{value}</a> : <p className="font-medium">{value}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <MagneticButton variant="icon" href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github className="h-5 w-5" /></MagneticButton>
              <MagneticButton variant="icon" href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin className="h-5 w-5" /></MagneticButton>
              <MagneticButton variant="icon" href={`mailto:${personalInfo.email}`} aria-label="Send an email"><Mail className="h-5 w-5" /></MagneticButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
