"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ----------------------------------------------------------------
   Brand palette (matches the Ignite Corner identity)
   Navy   : #0a0e1f  (text / icon ink)
   Gold   : #fbb80a  (single accent, used deliberately — not per-card)
   Surface: #fafafa  (section bg)  /  #ffffff (cards)
------------------------------------------------------------------*/

const services = [
  {
    num: "01",
    title: "Digital Marketing",
    description:
      "SEO, paid media and social campaigns engineered for measurable ROI and compounding, sustainable growth.",
    Icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Graphics Design",
    description:
      "Distinctive visual systems and creative assets that carry your brand's story with precision and restraint.",
    Icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.344l2.122-2.122a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L13.828 10.25"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Web Development",
    description:
      "Fast, responsive, conversion-optimized builds on modern frameworks — engineered, not templated.",
    Icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"
        />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Consultation",
    description:
      "Strategic guidance grounded in real data — the roadmap that helps you outpace the competition.",
    Icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entry
      gsap.fromTo(
        ".animated-title",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".animated-sub",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );

      // Card entry — responsive
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.batch(cardsRef.current, {
          start: "top 88%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
                overwrite: "auto",
              },
            );
          },
        });
      });

      // Per-card hover micro-interactions (GSAP, not CSS)
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const icon = card.querySelector(".svc-icon");
        const arrow = card.querySelector(".svc-arrow");
        const bar = card.querySelector(".svc-bar");
        const watermark = card.querySelector(".svc-watermark");

        const tl = gsap.timeline({ paused: true });
        tl.to(card, { y: -6, duration: 0.4, ease: "power3.out" }, 0)
          .to(bar, { scaleX: 1, duration: 0.45, ease: "power3.out" }, 0)
          .to(
            icon,
            {
              backgroundColor: "#0a0e1f",
              color: "#fbb80a",
              duration: 0.35,
              ease: "power2.out",
            },
            0,
          )
          .to(
            icon,
            { rotate: -8, scale: 1.08, duration: 0.4, ease: "back.out(2)" },
            0,
          )
          .to(
            arrow,
            { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" },
            0.05,
          )
          .to(
            watermark,
            { opacity: 0.05, y: 0, duration: 0.5, ease: "power3.out" },
            0,
          );

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#fafafa] text-[#0a0e1f] py-20 px-6 sm:py-28 sm:px-8 md:px-12 lg:px-16 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="animated-title inline-flex mb-5 items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fbb80a]" />
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0a0e1f]/50">
            What We Do
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="animated-title max-w-xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#0a0e1f]">
              Services That <br />
              Drive <span className="text-[#fbb80a]">Results</span>
            </h2>
          </div>
          <div className="animated-sub max-w-xs md:text-right">
            <p className="text-sm font-medium leading-relaxed text-[#0a0e1f]/55">
              From strategy to execution, we deliver end-to-end solutions that
              move the needle.
            </p>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {services.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-white rounded-[1.75rem] p-8 min-h-[380px] flex flex-col justify-between overflow-hidden border border-[#0a0e1f]/[0.06] shadow-[0_10px_30px_rgba(10,14,31,0.04)] cursor-pointer"
            >
              {/* Top accent bar — animated by GSAP on hover */}
              <span
                className="svc-bar absolute top-0 left-0 h-[3px] w-full bg-[#fbb80a] origin-left"
                style={{ transform: "scaleX(0)" }}
              />

              {/* Icon + arrow row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="svc-icon w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0a0e1f]/[0.05] text-[#0a0e1f]">
                  <item.Icon />
                </div>

                <div
                  className="svc-arrow w-8 h-8 rounded-full border border-[#0a0e1f]/10 flex items-center justify-center bg-white text-[#0a0e1f] opacity-0"
                  style={{ transform: "translateX(8px)" }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </div>

              {/* Copy */}
              <div className="relative z-10 mt-12">
                <h3 className="text-xl font-bold tracking-tight mb-3 text-[#0a0e1f]">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-[#0a0e1f]/55">
                  {item.description}
                </p>
              </div>

              {/* Watermark number */}
              <div
                className="svc-watermark absolute right-4 bottom-[-1rem] pointer-events-none select-none opacity-0"
                style={{ transform: "translateY(8px)" }}
              >
                <span className="text-[9rem] font-black tracking-tighter leading-none block text-[#0a0e1f]">
                  {item.num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
