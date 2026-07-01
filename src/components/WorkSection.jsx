"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "Luxe Interiors",
    category: "Web Design",
    tags: ["UI/UX", "E-Commerce"],
    description: "A immersive digital showroom for a premium furniture brand.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    year: "2024",
  },
  {
    id: 2,
    title: "Nova Fintech",
    category: "Development",
    tags: ["React", "Dashboard"],
    description: "Real-time analytics dashboard for a crypto trading platform.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    year: "2024",
  },
  {
    id: 3,
    title: "Ember Studio",
    category: "Branding",
    tags: ["Identity", "Motion"],
    description: "Complete brand overhaul with dynamic motion guidelines.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    year: "2023",
  },
  {
    id: 4,
    title: "Pulse Health",
    category: "Web Design",
    tags: ["App", "Healthcare"],
    description: "Patient-first telemedicine platform with seamless booking.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    year: "2023",
  },
  {
    id: 5,
    title: "Vertex Architecture",
    category: "Development",
    tags: ["3D", "WebGL"],
    description: "Interactive 3D portfolio with immersive scroll experiences.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    year: "2023",
  },
  {
    id: 6,
    title: "Kinetic Labs",
    category: "Branding",
    tags: ["Strategy", "Visual"],
    description: "Bold identity system for an AI-driven research startup.",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    year: "2022",
  },
];

const filters = ["All", "Web Design", "Development", "Branding"];

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Custom cursor for desktop
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const handleMouseMove = (e) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });
  }, []);

  // Main entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      const headerEls = headerRef.current.querySelectorAll(".work-header");
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Filter tabs entrance
      gsap.fromTo(
        ".filter-tab",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Cards initial entrance
      animateCardsEntrance();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    animateCardsEntrance();
  }, [activeFilter]);

  const animateCardsEntrance = () => {
    cardsRef.current = cardsRef.current.filter(Boolean);
    if (cardsRef.current.length === 0) return;

    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        rotateX: 8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  };

  // 3D tilt on hover
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    // Parallax image inside card
    const img = card.querySelector(".card-image");
    gsap.to(img, {
      x: (x - centerX) / 15,
      y: (y - centerY) / 15,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });

    const img = card.querySelector(".card-image");
    gsap.to(img, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    setHoveredProject(null);
  };

  const handleMouseEnter = (index) => {
    setHoveredProject(index);
    if (cursorTextRef.current) {
      gsap.to(cursorTextRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
      });
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#0a0e1a] text-white py-24 sm:py-32 lg:py-40 overflow-hidden font-sans selection:bg-[#f1b418] selection:text-[#0a0e1a]"
    >
      {/* ─── Background ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#1e3a5f]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#f1b418]/3 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ─── Custom Cursor (Desktop) ─── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block -translate-x-1/2 -translate-y-1/2"
      >
        <div
          ref={cursorTextRef}
          className="w-24 h-24 rounded-full bg-[#f1b418] flex items-center justify-center scale-0 opacity-0"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#0a0e1a]">
            View
          </span>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <div className="work-header inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1b418] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1b418]"></span>
            </span>
            <span className="text-[11px] text-[#8ba3c7] font-semibold tracking-[0.2em] uppercase">
              Selected Works
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="work-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-4">
                Recent <span className="text-[#f1b418]">Projects</span>
              </h2>
              <p className="work-header text-[#8ba3c7] text-sm sm:text-base max-w-lg leading-relaxed">
                A curated collection of our finest work — where strategy meets
                craft and every pixel serves a purpose.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-tab relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#f1b418] text-[#0a0e1a]"
                      : "bg-[#1e3a5f]/20 text-[#8ba3c7] border border-[#1e3a5f]/40 hover:border-[#f1b418]/30 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Projects Grid ─── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.6) 0%, rgba(10,14,26,0.9) 100%)",
                border: "1px solid rgba(30,58,95,0.3)",
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="card-image absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/40 to-transparent transition-opacity duration-500 ${
                    hoveredProject === index ? "opacity-90" : "opacity-60"
                  }`}
                />
                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0a0e1a]/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest uppercase text-[#f1b418]">
                    {project.category}
                  </span>
                </div>
                {/* Year */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#5a7090]">
                    {project.year}
                  </span>
                </div>
                {/* Hover Arrow */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    hoveredProject === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#f1b418] flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#0a0e1a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Project Number */}
                <div className="absolute -top-8 right-6 text-6xl font-black text-[#1e3a5f]/20 leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold tracking-wider uppercase text-[#5a7090] bg-[#1e3a5f]/20 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#f1b418] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-[#8ba3c7] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Bottom Line */}
                <div className="flex items-center justify-between">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f]/50 to-transparent mr-4" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a7090] group-hover:text-[#f1b418] transition-colors duration-300 flex items-center gap-2">
                    View Case Study
                    <svg
                      className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Corner Accent on Hover */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl transition-opacity duration-500 ${
                  hoveredProject === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[#f1b418]/60 to-transparent" />
                <div className="absolute top-0 right-0 h-[1px] w-10 bg-gradient-to-l from-[#f1b418]/60 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="mt-20 sm:mt-28 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#1e3a5f]/50 hidden sm:block" />
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 hover:border-[#f1b418]/30 hover:bg-[#1e3a5f]/30 transition-all duration-300"
            >
              <span className="text-sm font-semibold text-[#8ba3c7] group-hover:text-white transition-colors">
                Want to see more work?
              </span>
              <span className="text-[#f1b418] font-bold text-sm group-hover:translate-x-1 transition-transform">
                Let's Talk →
              </span>
            </a>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#1e3a5f]/50 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
