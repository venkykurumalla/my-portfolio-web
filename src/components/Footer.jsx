import React from "react";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { portfolioData } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-zinc-900 bg-zinc-950/80">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand/Details */}
        <div className="text-center md:text-left">
          <h3 className="font-display font-bold text-white text-base tracking-tight mb-1">
            {portfolioData.personalInfo.name}
          </h3>
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
            Aspiring Software Developer &bull; AI &bull; LLM &bull; Full-Stack Development
          </p>
        </div>

        {/* Social Icons Links */}
        <div className="flex items-center space-x-6">
          <a
            href={portfolioData.personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="text-zinc-500 hover:text-white transition-colors duration-200"
            aria-label="Email Venkatesh"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-600 font-medium">
          &copy; {new Date().getFullYear()} Venkatesh Kurumalla. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
