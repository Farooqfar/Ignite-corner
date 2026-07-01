"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MetricsSection() {
  const [activeIndex, setActiveIndex] = useState(3);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const numbersRef = useRef([]);
  const glowRef = useRef(null);

  const metrics = [
    {
      title: "Projects Delivered",
      description:
        "Across industries, platforms, and business sizes — each one crafted with precision.",
      value: "40",
      suffix: "+",
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      title: "Years Building",
      description:
        "Refining our craft with every single project we ship and every client we serve.",
      value: "6",
      suffix: "+",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Client Satisfaction",
      description:
        "Clients who come back and bring others with them. Trust built through results.",
      value: "100",
      suffix: "%",
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
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Avg. Turnaround",
      description:
        "From kickoff to a live, performant site. Speed without sacrificing quality.",
      value: "15",
      suffix: " Days",
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
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── 1. Background Glow Animation ───
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        },
      );

      // ─── 2. Header Entrance ───
      const headerEls = headerRef.current.querySelectorAll(".header-animate");
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // ─── 3. Card Staggered Entrance with 3D Tilt ───
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              rotateX: 15,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.9,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        // ─── 4. Number Counter Animation ───
        numbersRef.current.forEach((numEl, i) => {
          if (!numEl) return;
          const targetValue = parseInt(metrics[i].value);
          const obj = { val: 0 };

          gsap.to(obj, {
            val: targetValue,
            duration: 2,
            delay: 0.3 + i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: numEl,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              numEl.textContent = Math.round(obj.val);
            },
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.batch(cardsRef.current, {
          start: "top 92%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                overwrite: "auto",
              },
            );
          },
        });

        // Mobile number counters
        numbersRef.current.forEach((numEl, i) => {
          if (!numEl) return;
          const targetValue = parseInt(metrics[i].value);
          const obj = { val: 0 };

          gsap.to(obj, {
            val: targetValue,
            duration: 1.5,
            delay: 0.2 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: numEl,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              numEl.textContent = Math.round(obj.val);
            },
          });
        });
      });

      // ─── 5. Continuous Floating Animation for Cards ───
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: Math.sin(i) * 6,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // ─── 6. Parallax Background Lines ───
      const lines = sectionRef.current.querySelectorAll(".parallax-line");
      lines.forEach((line, i) => {
        gsap.to(line, {
          y: i % 2 === 0 ? -100 : 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── 3D Tilt Effect on Hover ───
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0e1a] text-white overflow-hidden font-sans selection:bg-[#f1b418] selection:text-[#0a0e1a]"
    >
      {/* ─── Background Elements ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          ref={glowRef}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1e3a5f]/20 rounded-full blur-[120px]"
        />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#f1b418]/5 rounded-full blur-[100px]" />

        {/* Parallax Grid Lines */}
        <div className="parallax-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#1e3a5f]/30 to-transparent" />
        <div className="parallax-line absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-[#1e3a5f]/20 to-transparent" />
        <div className="parallax-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-[#1e3a5f]/30 to-transparent" />

        {/* Subtle Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        {/* ─── Header Section ─── */}
        <div ref={headerRef} className="text-center mb-20 sm:mb-28">
          {/* Pill Badge */}
          <div className="header-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/30 border border-[#1e3a5f]/50 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1b418] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1b418]"></span>
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f1b418]">
              Our Track Record
            </span>
          </div>

          {/* Main Title */}
          <h2 className="header-animate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            <span className="block text-white">Numbers That</span>
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="text-[#f1b418]">Speak</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#f1b418]/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,0 100,8 T200,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-white"> For Themselves</span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="header-animate max-w-2xl mx-auto text-sm sm:text-base text-[#8ba3c7] leading-relaxed mt-6">
            We don't just build websites — we build trust, deliver results, and
            create digital experiences that drive real business growth.
          </p>
        </div>

        {/* ─── Metrics Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">
          {metrics.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => {
                  setActiveIndex(index);
                  handleMouseLeave(index);
                }}
                onClick={() => setActiveIndex(index)}
                className="group relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] cursor-pointer transition-colors duration-500 border"
                style={{
                  background: isActive
                    ? "linear-gradient(145deg, rgba(30,58,95,0.9) 0%, rgba(15,30,60,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(15,23,42,0.6) 0%, rgba(10,14,26,0.8) 100%)",
                  borderColor: isActive
                    ? "rgba(241,180,24,0.3)"
                    : "rgba(30,58,95,0.4)",
                  boxShadow: isActive
                    ? "0 25px 50px -12px rgba(241,180,24,0.15), 0 0 0 1px rgba(241,180,24,0.1)"
                    : "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(241,180,24,0.06), transparent 40%)",
                  }}
                />

                {/* Top Section: Icon & Title */}
                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-500 ${
                      isActive
                        ? "bg-[#f1b418]/20 text-[#f1b418]"
                        : "bg-[#1e3a5f]/30 text-[#8ba3c7] group-hover:bg-[#1e3a5f]/50 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight mb-3 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-[#c8d6e5]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive
                        ? "text-[#8ba3c7]"
                        : "text-[#5a7090] group-hover:text-[#8ba3c7]"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className={`relative z-10 w-full h-px my-6 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-r from-[#f1b418]/50 via-[#f1b418]/20 to-transparent"
                      : "bg-gradient-to-r from-[#1e3a5f]/50 to-transparent"
                  }`}
                />

                {/* Bottom Section: Large Number */}
                <div className="relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span
                      ref={(el) => {
                        numbersRef.current[index] = el;
                      }}
                      className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none transition-colors duration-500 ${
                        isActive
                          ? "text-[#f1b418]"
                          : "text-[#1e3a5f]/60 group-hover:text-[#1e3a5f]/80"
                      }`}
                    >
                      0
                    </span>
                    <span
                      className={`text-2xl sm:text-3xl font-bold transition-colors duration-500 ${
                        isActive
                          ? "text-[#f1b418]/80"
                          : "text-[#1e3a5f]/40 group-hover:text-[#1e3a5f]/60"
                      }`}
                    >
                      {item.suffix}
                    </span>
                  </div>

                  {/* Active Indicator */}
                  <div
                    className={`mt-4 flex items-center gap-2 transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <div className="w-8 h-0.5 bg-[#f1b418] rounded-full" />
                    <span className="text-xs font-medium text-[#f1b418] tracking-wider uppercase">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[#f1b418]/50 to-transparent" />
                  <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-[#f1b418]/50 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="mt-20 sm:mt-28 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 hover:border-[#f1b418]/30 hover:bg-[#1e3a5f]/30 transition-all duration-300 cursor-pointer group">
            <span className="text-sm font-medium text-[#8ba3c7] group-hover:text-white transition-colors">
              Ready to be our next success story?
            </span>
            <span className="text-[#f1b418] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
