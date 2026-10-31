import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import { portfolioData } from "../../data/portfolioData";

export default function Contact() {
  const actions = [
    {
      href: `mailto:${portfolioData.personalInfo.email}`,
      icon: <Mail className="w-5 h-5" />,
      label: "Email Me"
    },
    {
      href: `tel:${portfolioData.personalInfo.phone.replace(/\s+/g, '')}`,
      icon: <Phone className="w-5 h-5" />,
      label: "Call Me"
    },
    {
      href: portfolioData.personalInfo.socials.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn Profile",
      external: true
    },
    {
      href: portfolioData.personalInfo.socials.github,
      icon: <Github className="w-5 h-5" />,
      label: "GitHub Profile",
      external: true
    }
  ];

  return (
    <section
      id="contact-inner"
      className="relative min-h-screen flex items-center bg-[#09090b] py-24"
    >
      {/* Background — large warm glow for the ending scene */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Heading */}
        <div className="mb-16 text-center" data-reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2.5 inline-block px-3.5 py-1 rounded-full border border-accent/20 bg-accent/5">
            Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg mt-1">
            Let's Build Together.
          </h2>
          <div className="h-[2px] w-14 bg-accent mt-5 mx-auto strike strike-active" />
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Details Card - Double-Bezel */}
          <div className="double-bezel" data-reveal>
            <div className="double-bezel-inner p-8 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Connect Directly
                </h3>

                {[
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    href: `mailto:${portfolioData.personalInfo.email}`,
                    value: portfolioData.personalInfo.email
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    href: `tel:${portfolioData.personalInfo.phone.replace(/\s+/g, '')}`,
                    value: portfolioData.personalInfo.phone
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Location",
                    value: portfolioData.personalInfo.location
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 text-zinc-300 group">
                    <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-accent group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-zinc-950 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-zinc-500 font-semibold tracking-wider mt-10 border-t border-zinc-800/60 pt-4">
                Available for full-time roles and freelance opportunities.
              </div>
            </div>
          </div>

          {/* Action Buttons Panel - Nested Button Architecture */}
          <div className="flex flex-col justify-center gap-3.5" data-reveal>
            {actions.map((action, idx) => (
              <motion.a
                key={idx}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                href={action.href}
                target={action.external ? "_blank" : "_self"}
                rel={action.external ? "noopener noreferrer" : ""}
                className="group relative flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-900/70 border border-white/10 hover:border-accent/30 rounded-2xl text-zinc-200 hover:text-white transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-zinc-900 border border-white/10 text-accent rounded-xl group-hover:bg-accent group-hover:text-zinc-950 transition-all duration-200">
                    {action.icon}
                  </div>
                  <span className="text-sm font-bold tracking-wide">{action.label}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-accent group-hover:text-zinc-950">
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
