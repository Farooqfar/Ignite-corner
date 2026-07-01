"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    title: "Pixel Precision",
    description:
      "We obsess over every detail. From 0.5px borders to micro-interactions, perfection is our baseline.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: "Strategic Craft",
    description:
      "Design without strategy is decoration. Every decision is backed by research, data, and user psychology.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Relentless Speed",
    description:
      "We ship fast without cutting corners. Agile workflows and clear communication keep projects on track.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Partnership First",
    description:
      "We don't have clients — we have partners. Your success is our success, measured in real business outcomes.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

const milestones = [
  {
    year: "2018",
    title: "The Spark",
    desc: "Ignite Corner founded with a single laptop and a vision.",
  },
  {
    year: "2019",
    title: "First Breakthrough",
    desc: "Landed our first Fortune 500 client and doubled the team.",
  },
  {
    year: "2021",
    title: "Global Reach",
    desc: "Expanded to 12 countries with remote-first culture.",
  },
  {
    year: "2023",
    title: "Award Recognition",
    desc: "Named 'Agency of the Year' by Design Awards Global.",
  },
  {
    year: "2024",
    title: "The Future",
    desc: "Pushing boundaries with AI-integrated design systems.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const imageRef = useRef(null);
  const valuesRef = useRef(null);
  const valuesCardsRef = useRef([]);
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const statsRef = useRef(null);
  const statsItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── 1. Header Entrance ───
      const headerEls = headerRef.current.querySelectorAll(".about-header");
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 50, filter: "blur(10px)" },
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

      // ─── 2. Story Text Reveal ───
      const storyParagraphs = storyRef.current.querySelectorAll(".story-text");
      gsap.fromTo(
        storyParagraphs,
        { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ─── 3. Image Parallax & Reveal ───
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Internal image parallax on scroll
      const innerImg = imageRef.current.querySelector(".inner-img");
      gsap.to(innerImg, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ─── 4. Values Cards 3D Stagger ───
      valuesCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateX: 12,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ─── 5. Timeline Horizontal Scroll (Desktop) ───
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const timeline = timelineRef.current;
        const items = timelineItemsRef.current.filter(Boolean);

        gsap.fromTo(
          items,
          { opacity: 0, x: 80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timeline,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        // Animate the connecting line
        const line = timeline.querySelector(".timeline-line");
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: timeline,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        timelineItemsRef.current.forEach((item, i) => {
          if (!item) return;
          gsap.fromTo(
            item,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });

      // ─── 6. Stats Counter Animation ───
      statsItemsRef.current.forEach((stat) => {
        if (!stat) return;
        const numEl = stat.querySelector(".stat-number");
        const suffixEl = stat.querySelector(".stat-suffix");
        const target = parseInt(numEl.dataset.value);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val);
          },
        });

        gsap.fromTo(
          stat,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt on values cards
  const handleValuesMouseMove = (e, index) => {
    const card = valuesCardsRef.current[index];
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
  };

  const handleValuesMouseLeave = (index) => {
    const card = valuesCardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#f8f9fc] text-[#0a0e1a] overflow-hidden font-sans selection:bg-[#f1b418] selection:text-[#0a0e1a]"
    >
      {/* ─── Background Texture ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle, #1e3a5f 0.5px, transparent 0.5px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f1b418]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1e3a5f]/5 rounded-full blur-[120px]" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        {/* ─── Header ─── */}
        <div ref={headerRef} className="mb-20 sm:mb-28">
          <div className="about-header inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1b418] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1b418]"></span>
            </span>
            <span className="text-[11px] text-[#1e3a5f]/70 font-semibold tracking-[0.2em] uppercase">
              About Us
            </span>
          </div>

          <h2 className="about-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
            We Build <span className="text-[#f1b418]">Digital</span>
            <br />
            Experiences That Matter
          </h2>

          <p className="about-header text-[#1e3a5f]/60 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            A team of strategists, designers, and engineers obsessed with
            crafting products that people love to use.
          </p>
        </div>

        {/* ─── Story + Image Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-28 sm:mb-36">
          {/* Story Text */}
          <div ref={storyRef} className="flex flex-col justify-center">
            <div className="space-y-6">
              <p className="story-text text-[#1e3a5f]/80 text-base sm:text-lg leading-[1.8]">
                Ignite Corner was born from a simple belief:{" "}
                <span className="font-semibold text-[#0a0e1a]">
                  great design should be invisible.
                </span>{" "}
                It should feel so natural that users never have to think about
                it.
              </p>
              <p className="story-text text-[#1e3a5f]/80 text-base sm:text-lg leading-[1.8]">
                Since 2018, we have partnered with startups, scale-ups, and
                Fortune 500s to build digital products that drive real business
                outcomes. We don't do templates. We don't do shortcuts.
              </p>
              <p className="story-text text-[#1e3a5f]/80 text-base sm:text-lg leading-[1.8]">
                Every project begins with deep research, continues through
                obsessive iteration, and ends only when the result exceeds every
                expectation. That is the Ignite Corner standard.
              </p>
            </div>

            {/* Signature-style element */}
            <div className="story-text mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#f1b418]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#1e3a5f]/50">
                Founded in 2018
              </span>
            </div>
          </div>

          {/* Image with Parallax */}
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]"
            style={{
              boxShadow: "0 25px 80px -20px rgba(10,14,26,0.15)",
            }}
          >
            <div
              className="inner-img absolute inset-0 bg-cover bg-center scale-110"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80)`,
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/30 to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1e3a5f]/50 mb-1">
                      Team Members
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-[#0a0e1a]">
                      24 <span className="text-[#f1b418]">+</span>
                    </p>
                  </div>
                  <div className="h-10 w-[1px] bg-[#1e3a5f]/10" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1e3a5f]/50 mb-1">
                      Countries
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-[#0a0e1a]">
                      12 <span className="text-[#f1b418]">+</span>
                    </p>
                  </div>
                  <div className="h-10 w-[1px] bg-[#1e3a5f]/10" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1e3a5f]/50 mb-1">
                      Awards
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-[#0a0e1a]">
                      8 <span className="text-[#f1b418]">+</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Stats Bar ─── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-28 sm:mb-36 py-10 sm:py-14 px-6 sm:px-10 rounded-2xl bg-white border border-[#1e3a5f]/5"
          style={{
            boxShadow: "0 4px 40px -10px rgba(10,14,26,0.06)",
          }}
        >
          {[
            { value: "40", suffix: "+", label: "Projects Delivered" },
            { value: "100", suffix: "%", label: "Client Satisfaction" },
            { value: "6", suffix: "+", label: "Years of Excellence" },
            { value: "15", suffix: " Days", label: "Avg. Turnaround" },
          ].map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                statsItemsRef.current[i] = el;
              }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  className="stat-number text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0e1a] tracking-tighter"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="stat-suffix text-xl sm:text-2xl font-bold text-[#f1b418]">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-[#1e3a5f]/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Values Section ─── */}
        <div ref={valuesRef} className="mb-28 sm:mb-36">
          <div className="text-center mb-14 sm:mb-20">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0a0e1a] mb-4">
              Our <span className="text-[#f1b418]">Core</span> Values
            </h3>
            <p className="text-[#1e3a5f]/60 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              The principles that guide every decision we make and every pixel
              we place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                ref={(el) => {
                  valuesCardsRef.current[index] = el;
                }}
                onMouseMove={(e) => handleValuesMouseMove(e, index)}
                onMouseLeave={() => handleValuesMouseLeave(index)}
                className="group relative rounded-2xl p-7 sm:p-8 bg-white border border-[#1e3a5f]/5 hover:border-[#f1b418]/20 transition-all duration-500 cursor-default"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 4px 20px -5px rgba(10,14,26,0.04)",
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#f1b418]/5 to-transparent" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1e3a5f]/5 text-[#1e3a5f] mb-5 group-hover:bg-[#f1b418]/10 group-hover:text-[#f1b418] transition-colors duration-300">
                    {value.icon}
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-[#0a0e1a] mb-3 tracking-tight">
                    {value.title}
                  </h4>

                  <p className="text-sm text-[#1e3a5f]/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[#f1b418]/40 to-transparent" />
                  <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-[#f1b418]/40 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Timeline ─── */}
        <div ref={timelineRef} className="relative">
          <div className="text-center mb-14 sm:mb-20">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0a0e1a] mb-4">
              Our <span className="text-[#f1b418]">Journey</span>
            </h3>
            <p className="text-[#1e3a5f]/60 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              From a single laptop to a global team — this is how we got here.
            </p>
          </div>

          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-[72px] left-0 right-0 h-[2px]">
            <div className="timeline-line h-full bg-gradient-to-r from-[#1e3a5f]/10 via-[#f1b418]/30 to-[#1e3a5f]/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            {milestones.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  timelineItemsRef.current[index] = el;
                }}
                className="group relative flex md:flex-col items-start md:items-center gap-4 md:gap-6"
              >
                {/* Year Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-[#1e3a5f]/10 flex items-center justify-center group-hover:border-[#f1b418] group-hover:shadow-[0_0_20px_rgba(241,180,24,0.2)] transition-all duration-500">
                    <span className="text-xs md:text-sm font-black text-[#0a0e1a] group-hover:text-[#f1b418] transition-colors">
                      {item.year}
                    </span>
                  </div>
                  {/* Mobile connector line */}
                  <div className="md:hidden absolute top-14 left-1/2 w-[2px] h-full bg-gradient-to-b from-[#1e3a5f]/10 to-transparent -translate-x-1/2" />
                </div>

                {/* Content */}
                <div className="md:text-center pb-8 md:pb-0">
                  <h4 className="text-base sm:text-lg font-bold text-[#0a0e1a] mb-2 group-hover:text-[#f1b418] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#1e3a5f]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="mt-24 sm:mt-32 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#1e3a5f]/20 hidden sm:block" />
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0a0e1a] text-white hover:bg-[#f1b418] hover:text-[#0a0e1a] transition-all duration-500"
            >
              <span className="text-sm font-bold tracking-[0.15em] uppercase">
                Start a Project
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </a>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#1e3a5f]/20 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
