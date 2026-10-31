import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { gsap, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";
import { Github, Linkedin } from "../components/Icons";
import { useSectionIntro } from "./useSectionIntro";

const { personalInfo } = portfolioData;
const encode = (data) => new URLSearchParams(data).toString();
const palette = ["#3B82F6", "#8B5CF6", "#22D3EE", "#F472B6", "#FBBF24"];

// Confetti burst from an element (transform + opacity only)
function burst(origin) {
  const r = origin.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("span");
    el.className = "m-confetti";
    el.style.cssText = `left:${cx}px;top:${cy}px;background:${palette[i % palette.length]}`;
    document.body.appendChild(el);
    const peakX = gsap.utils.random(-150, 150);
    const peakY = gsap.utils.random(-190, -70);
    gsap.timeline({ onComplete: () => el.remove() })
      .to(el, { x: peakX, y: peakY, rotate: gsap.utils.random(-200, 200), duration: 0.55, ease: "power2.out" })
      .to(el, { y: peakY + gsap.utils.random(200, 300), x: peakX * 1.15, opacity: 0, rotate: "+=180", duration: 0.95, ease: "power1.in" });
  }
}

export default function MobileContact() {
  const root = useRef(null);
  const sendBtn = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  useSectionIntro(root);

  useMotionSafe(
    () => {
      // Kinetic headline: each word arrives from a different direction
      const trigger = { trigger: ".m-kinetic", start: "top 88%", once: true };
      const common = { opacity: 0, duration: 1, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: trigger };
      gsap.from(".k1", { x: -110, rotate: -8, ...common });
      gsap.from(".k2", { x: 110, rotate: 8, ...common, delay: 0.1 });
      gsap.from(".k3", { y: 90, scale: 0.7, ...common, delay: 0.2 });
      gsap.from(".m-contact-card", { y: 40, opacity: 0, duration: 0.9, stagger: 0.14, ease: "expo.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".m-contact-grid", start: "top 90%", once: true } });
    },
    { scope: root },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
      requestAnimationFrame(() => sendBtn.current && burst(sendBtn.current));
      window.setTimeout(() => setStatus("idle"), 4200);
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
    <section id="contact" ref={root} className="m-section" aria-label="Contact">
      <div className="m-wrap">
        <header className="m-head">
          <span className="m-label"><i aria-hidden="true" />Contact</span>
          <h2 className="m-kinetic display" aria-label="Let's build something">
            <span className="k k1" aria-hidden="true">Let&apos;s</span>{" "}
            <span className="k k2" aria-hidden="true">build</span>{" "}
            <span className="k k3 text-gradient" aria-hidden="true">something.</span>
          </h2>
        </header>

        <div className="m-contact-grid">
          <div className="m-contact-card m-card">
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="m-form">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="field"><input id="m-name" name="name" type="text" placeholder=" " required autoComplete="name" /><label htmlFor="m-name">Your name</label></div>
              <div className="field"><input id="m-email" name="email" type="email" placeholder=" " required autoComplete="email" /><label htmlFor="m-email">Email address</label></div>
              <div className="field"><textarea id="m-message" name="message" rows={4} placeholder=" " required /><label htmlFor="m-message">Tell me about your project</label></div>

              <motion.button
                ref={sendBtn} layout type="submit" className={`btn btn-primary m-send ${status === "success" ? "is-done" : ""}`}
                style={{ borderRadius: 999 }} disabled={status === "sending"} whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                aria-label={status === "sending" ? "Sending" : status === "success" ? "Sent" : "Send message"}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {status === "sending" ? (
                    <motion.span key="spin" className="m-spinner" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} />
                  ) : status === "success" ? (
                    <motion.span key="ok" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" /></motion.span>
                  ) : (
                    <motion.span key="txt" className="inline-flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Send message <Send className="h-4 w-4" aria-hidden="true" /></motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="m-form-note" role="status" aria-live="polite">
                {status === "success" && "Message sent — I'll reply soon."}
                {status === "error" && <>Couldn&apos;t send — email me at <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.</>}
              </p>
            </form>
          </div>

          <div className="m-contact-card m-card">
            <ul className="m-details">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <span className="m-detail-icon"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <div><p className="eyebrow">{label}</p>{href ? <a href={href}>{value}</a> : <p>{value}</p>}</div>
                </li>
              ))}
            </ul>
            <div className="m-socials">
              <a className="btn btn-glass btn-icon" href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github className="h-5 w-5" /></a>
              <a className="btn btn-glass btn-icon" href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin className="h-5 w-5" /></a>
              <a className="btn btn-glass btn-icon" href={`mailto:${personalInfo.email}`} aria-label="Send an email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
