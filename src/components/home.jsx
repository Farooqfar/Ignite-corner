"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Galaxy from "./Galaxy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient Glow Pulse
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power2.out",
        },
      );

      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Badge Entrance
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(1.7)",
        },
      );

      // Title Character Split Animation
      const titleChars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        titleChars,
        {
          opacity: 0,
          y: 60,
          rotateX: -90,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.5,
          transformPerspective: 1000,
        },
      );

      // Subtitle Fade
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 1.2,
          ease: "power3.out",
        },
      );

      // Buttons Staggered Rise
      const buttons = buttonsRef.current.querySelectorAll(".btn-animate");
      gsap.fromTo(
        buttons,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 1.5,
          ease: "power3.out",
        },
      );

      // Scroll Indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 0.5,
          y: 0,
          duration: 1,
          delay: 2,
          ease: "power2.out",
        },
      );

      gsap.to(scrollIndicatorRef.current.querySelector(".scroll-line"), {
        scaleY: 1.3,
        transformOrigin: "top",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax on Mouse Move (Desktop)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const handleMouseMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(contentRef.current, {
            x: x * 15,
            y: y * 10,
            duration: 1,
            ease: "power2.out",
          });

          gsap.to(glowRef.current, {
            x: x * 40,
            y: y * 30,
            duration: 1.5,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      });

      // Scroll-Triggered Fade Out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Ignite Corner";
  const titleChars = titleText.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen flex justify-center items-center overflow-hidden bg-[#0a0e1a] selection:bg-[#f1b418] selection:text-[#0a0e1a] pt-20 md:pt-0"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <Galaxy />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0a0e1a_85%)] pointer-events-none" />
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#1e3a5f]/30 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#f1b418]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-[#1e3a5f]/20 rounded-full blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-center items-center px-5 sm:px-6 max-w-5xl mx-auto text-center w-full"
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 backdrop-blur-md mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1b418] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1b418]"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#8ba3c7] font-semibold tracking-[0.2em] uppercase">
            Next-Gen Digital Experience
          </span>
        </div>

        {/* Title - FIXED: responsive sizing + nowrap */}
        <div
          ref={titleRef}
          className="mb-6 sm:mb-8 select-none w-full"
          style={{ perspective: "1000px" }}
        >
          <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] font-black tracking-tighter text-white leading-[0.95] whitespace-nowrap">
            {titleChars}
          </h1>
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#f1b418]/50" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#f1b418]">
              Digital Agency
            </span>
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#f1b418]/50" />
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[#8ba3c7] text-sm sm:text-base md:text-lg font-light max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 leading-[1.8] tracking-wide px-2"
        >
          We engineer high-end digital architecture, pixel-perfect user
          interfaces, and custom brand strategies for global visionaries.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full sm:w-auto"
        >
          <a
            href="#work"
            className="btn-animate group relative w-full sm:w-auto px-8 sm:px-10 py-4 bg-[#f1b418] text-[#0a0e1a] font-bold text-xs tracking-[0.2em] uppercase rounded-lg overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(241,180,24,0.25)] text-center"
          >
            <span className="relative z-10">Explore Showcase</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>

          <a
            href="#services"
            className="btn-animate group flex items-center justify-center gap-3 text-white font-semibold text-xs tracking-[0.2em] uppercase py-4 px-6 transition-all duration-300 hover:text-[#f1b418] relative"
          >
            <span className="relative">
              Our Capabilities
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#f1b418] group-hover:w-full transition-all duration-500" />
            </span>
            <svg
              className="w-4 h-4 transform transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#f1b418]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a7090]">
          Scroll to Explore
        </span>
        <div className="relative w-[1px] h-12 sm:h-14 bg-[#1e3a5f]/50 overflow-hidden">
          <div className="scroll-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#f1b418] to-transparent" />
        </div>
      </div>

      {/* Side Elements - Desktop Only */}
      <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#1e3a5f]/50 to-transparent" />
        <span
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1e3a5f] rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          Ignite Corner
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#1e3a5f]/50 to-transparent" />
      </div>

      <div className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-5 z-10">
        {[
          "M24 4.557c-.883.392-1.832.656-2.828.775...",
          "M12 2.163c3.204 0 3.584.012...",
          "M19 0h-14c-2.761 0-5 2.239-5 5v14...",
        ].map((d, i) => (
          <a
            key={i}
            href="#"
            className="text-[#5a7090] hover:text-[#f1b418] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d={d} />
            </svg>
          </a>
        ))}
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#1e3a5f]/50 to-transparent" />
      </div>
    </section>
  );
}
