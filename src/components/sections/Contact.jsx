import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import { portfolioData } from "../../data/portfolioData";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-900/50 bg-[#09090b]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
            Get In Touch
          </h2>
          <div className="h-[2px] w-12 bg-accent mt-4 mx-auto" />
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Contact Details Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 bg-zinc-900/25 border border-zinc-800/80 rounded flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Connect Directly
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-zinc-300">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Email</p>
                    <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-sm font-semibold hover:text-accent transition-colors duration-200">
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-zinc-300">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Phone</p>
                    <a href={`tel:${portfolioData.personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold hover:text-accent transition-colors duration-200">
                      {portfolioData.personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-zinc-300">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-sm font-semibold">{portfolioData.personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider mt-8 border-t border-zinc-850 pt-4">
              Feel free to call or email regarding internship opportunities.
            </div>
          </motion.div>

          {/* Quick Actions Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-between gap-4"
          >
            <motion.a
              variants={itemVariants}
              href={`mailto:${portfolioData.personalInfo.email}`}
              className="flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800 hover:border-accent/40 rounded text-zinc-200 hover:text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Email Me</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href={`tel:${portfolioData.personalInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800 hover:border-accent/40 rounded text-zinc-200 hover:text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Call Me</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href={portfolioData.personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800 hover:border-accent/40 rounded text-zinc-200 hover:text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">LinkedIn Profile</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href={portfolioData.personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800 hover:border-accent/40 rounded text-zinc-200 hover:text-white transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">GitHub Profile</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
