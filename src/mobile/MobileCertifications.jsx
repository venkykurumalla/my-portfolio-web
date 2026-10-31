import { useRef, useState } from "react";
import { ArrowUpRight, Award, BadgeCheck, RotateCw, ShieldCheck } from "lucide-react";
import { gsap, useMotionSafe } from "../lib/motion";
import { portfolioData } from "../data/portfolioData";
import SectionHead from "./SectionHead";
import { useSectionIntro } from "./useSectionIntro";

const icons = [ShieldCheck, Award];

// Tap to flip in 3D. The hidden face is `inert`, so keyboard/screen-reader users only reach the visible one.
function CertCard({ cert, index }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = icons[index % icons.length];
  const hasLink = cert.link && cert.link !== "#";

  return (
    <div className={`m-cert ${flipped ? "is-flipped" : ""}`} onClick={(e) => { if (!e.target.closest("a")) setFlipped((v) => !v); }}>
      <div className="m-cert-inner">
        <div className="m-cert-face m-card" inert={flipped}>
          <span className="m-cert-icon"><Icon className="h-6 w-6 text-white" aria-hidden="true" /></span>
          <p className="eyebrow">{cert.issuer}</p>
          <h3>{cert.name}</h3>
          <span className="m-verified"><BadgeCheck className="h-4 w-4" aria-hidden="true" /> Certified</span>
          <button type="button" className="m-flip-btn" onClick={(e) => { e.stopPropagation(); setFlipped(true); }} aria-label={`Show details: ${cert.name}`}>
            <RotateCw className="h-4 w-4" aria-hidden="true" /> Tap to flip
          </button>
        </div>
        <div className="m-cert-face m-cert-back m-card" inert={!flipped}>
          <p className="eyebrow">Issued by</p>
          <p className="m-cert-issuer display">{cert.issuer}</p>
          <p className="m-cert-name">{cert.name}</p>
          {hasLink ? (
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View certificate <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <span className="chip">Credential held</span>
          )}
          <button type="button" className="m-flip-btn" onClick={(e) => { e.stopPropagation(); setFlipped(false); }} aria-label="Flip back">
            <RotateCw className="h-4 w-4" aria-hidden="true" /> Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MobileCertifications() {
  const root = useRef(null);
  useSectionIntro(root);

  useMotionSafe(
    () => {
      gsap.from(".m-cert", {
        y: 50, opacity: 0, rotateX: -20, transformPerspective: 900, duration: 0.9, stagger: 0.15, ease: "expo.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".m-cert-list", start: "top 88%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="certifications" ref={root} className="m-section" aria-label="Certifications">
      <div className="m-wrap">
        <SectionHead label="Certifications" title="Proof of practice." />
        <div className="m-wipe m-cert-list">
          {portfolioData.certifications.map((c, i) => <CertCard key={c.name} cert={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
