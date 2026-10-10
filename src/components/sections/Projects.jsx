import React, { useRef, useLayoutEffect, useMemo } from "react";
import { ArrowUpRight, ShieldCheck, MapPin, Database, BookOpen, Smartphone, Trees } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getProjectVisual = (id) => {
  const base = "relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden group-hover:bg-zinc-900 transition-colors duration-500";
  const grid = "absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20";

  switch (id) {
    case "smart-ambulance":
      return (
        <div className={base}>
          <div className={grid} />
          <svg className="w-4/5 h-2/3 text-accent/20 z-0 group-hover:scale-105 transition-transform duration-700" viewBox="0 0 200 100">
            <path d="M 20 80 Q 80 20 120 70 T 180 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="20" cy="80" r="4" className="text-zinc-600" fill="currentColor" />
            <circle cx="180" cy="30" r="4" className="text-accent" fill="currentColor" />
          </svg>
          <div className="absolute flex flex-col items-center z-10 text-center">
            <MapPin className="w-8 h-8 text-accent animate-bounce mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">Real-Time Geolocation</span>
          </div>
        </div>
      );
    case "student-api":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-110 transition-transform duration-700">
            <Database className="w-8 h-8 text-accent mb-2" />
            <code className="text-sm text-zinc-400 font-mono bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded">GET /api/v1/students</code>
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-600">Mongoose Schema active</div>
        </div>
      );
    case "ai-tutor-web":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:-translate-y-2 transition-transform duration-700">
            <BookOpen className="w-8 h-8 text-accent mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">Web LLM Integration</span>
          </div>
          <div className="absolute top-4 right-4 flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
        </div>
      );
    case "ai-tutor-app":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:rotate-2 transition-transform duration-700">
            <Smartphone className="w-8 h-8 text-accent mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">K-10 Interactive App</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-zinc-600">Prompt Engineered</div>
        </div>
      );
    case "ap-forest":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-700">
            <Trees className="w-8 h-8 text-accent mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">APSFA Training Syllabus Hub</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-zinc-600">AI Chatbot & RAG Integration</div>
        </div>
      );
    case "smart-exam-portal":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-700">
            <ShieldCheck className="w-8 h-8 text-accent mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">Anti-Cheating Secure Portal</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-zinc-600">Real-time WebRTC Proctoring</div>
        </div>
      );
    case "riet-crt":
      return (
        <div className={base}>
          <div className={grid} />
          <div className="absolute z-10 flex flex-col items-center text-center group-hover:scale-110 transition-transform duration-700">
            <BookOpen className="w-8 h-8 text-accent mb-2" />
            <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">CRT Learning Hub</span>
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-zinc-600">Campus Recruitment Platform</div>
        </div>
      );
    default:
      return null;
  }
};

export default function Projects() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Generate sequence of slides: Info -> Images for each project
  const slides = useMemo(() => {
    const sequence = [];
    portfolioData.projects.forEach(project => {
      sequence.push({ id: `${project.id}-info`, type: 'info', project, direction: 'up' });
      
      if (project.images && project.images.length > 0) {
        project.images.forEach((img, index) => {
          sequence.push({
            id: `${project.id}-media-${index}`,
            type: 'image',
            project,
            imageSrc: img,
            direction: index === 0 ? 'up' : 'left'
          });
        });
      } else {
        sequence.push({ id: `${project.id}-media`, type: 'visual', project, direction: 'up' });
      }
    });
    return sequence;
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean); // filter out nulls
    
    if (!section || cards.length === 0) return;

    let ctx = gsap.context(() => {
      // Animate cards through a timeline based on the scroll position of the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom", 
          scrub: 2.5,
          invalidateOnRefresh: true,
        },
      });

      // Set initial states for cards based on their entry direction
      cards.forEach((card, i) => {
        const slide = slides[i];
        if (i === 0) {
          gsap.set(card, { autoAlpha: 1, scale: 1, x: 0, y: 0 });
        } else {
          if (slide.direction === 'left') {
            gsap.set(card, { autoAlpha: 0, scale: 0.95, x: "100%", y: 0 });
          } else {
            gsap.set(card, { autoAlpha: 0, scale: 0.95, x: 0, y: "100%" }); 
          }
        }
      });

      // Build the sequence
      cards.forEach((card, i) => {
        const slide = slides[i];
        
        if (i === 0) {
          const nextSlide = slides[i + 1];
          tl.to(card, {
            autoAlpha: 0,
            scale: 0.95,
            x: nextSlide && nextSlide.direction === 'left' ? "-100%" : 0,
            y: nextSlide && nextSlide.direction === 'left' ? 0 : "-100%", 
            duration: 1,
            ease: "power2.inOut",
          }, "+=0.8"); 
        } else {
          tl.to(card, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.inOut", 
          }, "<");

          if (i !== cards.length - 1) {
            const nextSlide = slides[i + 1];
            tl.to(card, {
              autoAlpha: 0,
              scale: 0.95,
              x: nextSlide.direction === 'left' ? "-100%" : 0,
              y: nextSlide.direction === 'left' ? 0 : "-100%",
              duration: 1,
              ease: "power2.inOut",
            }, "+=0.5"); 
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [slides.length]); 

  return (
    <section
      ref={sectionRef}
      id="projects-inner"
      className="relative bg-[#09090b] w-full overflow-x-clip"
      style={{ height: `${slides.length * 35}vh` }}
    >
      {/* Sticky container that stays in the viewport */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-start md:justify-center overflow-hidden pt-24 pb-10 md:py-16">
        
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col h-full">
          {/* Heading */}
          <div className="mb-4 md:mb-6 flex flex-col items-center text-center shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
              Projects
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
              Selected Work
            </h2>
            <div className="h-[2px] w-12 bg-accent mt-3 mx-auto" />
          </div>

          {/* Card Container */}
          <div 
            ref={containerRef}
            className="relative w-full h-[60vh] md:h-[85vh] min-h-[420px] md:min-h-[500px] mx-auto perspective-1000 my-auto"
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                {slide.type === 'info' && (
                  <a
                    href={slide.project.link}
                    target={slide.project.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-full h-full relative group bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-y-auto hover:border-accent/40 hover:bg-zinc-900/60 transition-colors duration-500 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl cursor-pointer"
                  >
                    {/* Top Right Live Link Button */}
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 inline-flex shrink-0 items-center text-[10px] md:text-sm font-bold uppercase tracking-wider text-zinc-950 bg-accent hover:bg-accent/90 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 group-hover:scale-105 z-10 shadow-lg shadow-accent/20">
                      Live Website
                      <ArrowUpRight className="ml-1.5 md:ml-2 w-3.5 h-3.5 md:w-5 md:h-5" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8 mt-12 md:mt-0">
                      {slide.project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 md:px-3 py-1.5 bg-zinc-950 border border-zinc-850 text-[10px] md:text-xs text-zinc-400 font-semibold tracking-wide uppercase rounded-full group-hover:border-accent/30 group-hover:text-zinc-200 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="font-display text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 group-hover:text-accent transition-colors duration-300 max-w-4xl">
                      {slide.project.title}
                    </h3>
                    
                    <p className="text-zinc-400 font-medium text-sm md:text-xl leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 max-w-3xl">
                      {slide.project.description}
                    </p>
                  </a>
                )}

                {slide.type === 'image' && (
                  <a
                    href={slide.project.link}
                    target={slide.project.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-full h-full rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl group cursor-pointer bg-zinc-950/80 p-2 md:p-6 flex items-center justify-center"
                  >
                    <img 
                      src={slide.imageSrc} 
                      alt={slide.project.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                    />
                  </a>
                )}

                {slide.type === 'visual' && (
                  <a
                    href={slide.project.link}
                    target={slide.project.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-full h-full rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl cursor-pointer flex items-center justify-center"
                  >
                    {getProjectVisual(slide.project.id)}
                  </a>
                )}
              </div>
            ))}
          </div>
          
          {/* Scroll indicator for the pinned section */}
          <div className="mt-4 md:mt-8 flex justify-center text-zinc-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase animate-pulse shrink-0">
            Scroll to explore projects
          </div>
        </div>
      </div>
    </section>
  );
}
