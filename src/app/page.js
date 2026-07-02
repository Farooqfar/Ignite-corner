"use client";
import { useState, useEffect } from "react";
import DecryptedText from "@/components/DecryptedText";
import Galaxy from "@/components/Galaxy";
import logo from "@/../public/logo.jpeg";
import { Skiper19 } from "@/components/skippertext";
import ScrollReveal from "@/components/ScrollReveal";
import MetricsSection from "@/components/MetricsSection";
import ServicesSection from "@/components/servicesection";
import HeroSection from "@/components/home";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/nav";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Logo asset link placeholder - Replace with your actual path (e.g., "/logo.png")
  const logoSrc = "/path-to-your-logo/image_17649d.png";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- PREMIUM BRAND-ALIGNED NAVBAR --- */}
      {/* --- PREMIUM BRAND-ALIGNED NAVBAR --- */}
      <Navbar />

      {/* --- BRAND-ALIGNED PREMIUM HERO SECTION --- */}
      <section id="home">
        <HeroSection />
      </section>

      {/* --- CONTENT SECTION --- */}
      <section
        id="services"
        className="relative w-full min-h-screen bg-[#fcfcfc] text-slate-900 flex flex-col justify-center items-center py-20 px-6 md:px-12 lg:px-24 overflow-hidden"
      >
        {/* Elegant background radial glow using your brand gold #FBB80A tuned for soft white contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,184,10,0.12),transparent_65%)] pointer-events-none" />

        <div className="max-w-5xl w-full mx-auto z-10 flex flex-col space-y-6 md:space-y-8">
          {/* Clean, Professional Section Label */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-[2px] bg-[#eab308]" />{" "}
            {/* Tailored crisp gold line */}
            <span className="text-[#ca8a04] font-mono tracking-widest uppercase text-xs md:text-sm font-bold">
              Our Core Philosophy
            </span>
          </div>

          {/* The Core Heading in Deep Premium Dark Blue */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl text-slate-950">
            We Build High-Performance Digital Solutions.
          </h2>

          {/* Clean separation line optimized for the soft white background */}
          <div className="w-full h-[1px] bg-slate-200/80 my-2" />

          {/* Your Original ScrollReveal Text Block in High-Contrast Dark Blue */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase leading-relaxed md:leading-snug text-slate-900">
            <ScrollReveal>
              MOST MARKETING SITES ARE SLOW, GENERIC, AND COSTING YOU LEADS. WE
              BUILD THE ALTERNATIVE: FAST, HIGH-PERFORMANCE WEBSITES DESIGNED TO
              TURN VISITORS INTO CUSTOMERS. BUILT USING FRAMER, WEBFLOW, OR
              CUSTOM SOLUTIONS. WHATEVER YOUR BUSINESS ACTUALLY NEEDS.
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div>
        <MetricsSection />
      </div>
      <div>
        <ServicesSection />
      </div>
      <div>
        <WorkSection />
      </div>
      <div>
        <AboutSection />
      </div>

      <div>
        <ContactSection />
      </div>
      <div className="overflow-hidden">
        <Skiper19 />
      </div>
    </>
  );
}
