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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Let's Build Together.
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-6 mx-auto" />
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded flex flex-col justify-between shadow-2xl hover:border-zinc-700/80 transition-colors duration-500"
          >
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-white mb-4">
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
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-zinc-950 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">{item.label}</p>
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

            <div className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider mt-10 border-t border-zinc-850 pt-4">
              Available for full-time roles and freelance opportunities.
            </div>
          </motion.div>

          {/* Action Buttons Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center gap-4"
          >
            {actions.map((action, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.02, x: 6 }}
                whileTap={{ scale: 0.98 }}
                href={action.href}
                target={action.external ? "_blank" : "_self"}
                rel={action.external ? "noopener noreferrer" : ""}
                className="flex items-center justify-between p-5 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 hover:border-accent/40 rounded text-zinc-200 hover:text-white transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded group-hover:bg-accent group-hover:text-zinc-950 transition-colors duration-300">
                    {action.icon}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider">{action.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
