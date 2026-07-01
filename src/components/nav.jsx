"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    color: "#E4405F",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Twitter",
    color: "#1DA1F2",
    path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const hamburgerRef = useRef(null);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Mobile menu GSAP animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      );

      gsap.fromTo(
        mobileLinksRef.current.filter(Boolean),
        { opacity: 0, x: -40, skewX: -5 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      const lines = hamburgerRef.current?.querySelectorAll(".h-line");
      if (lines) {
        gsap.to(lines[0], {
          rotate: 45,
          y: 5,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(lines[1], {
          opacity: 0,
          scaleX: 0,
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to(lines[2], {
          rotate: -45,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      const lines = hamburgerRef.current?.querySelectorAll(".h-line");
      if (lines) {
        gsap.to(lines[0], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(lines[1], {
          opacity: 1,
          scaleX: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        });
        gsap.to(lines[2], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [isOpen]);

  // Lock body scroll + Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled || isOpen
            ? "bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-[#1e3a5f]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="relative z-50 flex items-center flex-shrink-0"
            >
              <div className="relative h-12 sm:h-14 w-auto cursor-pointer flex items-center">
                <img
                  src="/logo.png"
                  alt="Ignite Corner Logo"
                  className="h-full w-auto object-contain object-left max-h-[56px]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) {
                      fallback.classList.remove("hidden");
                      fallback.classList.add("flex");
                    }
                  }}
                />
                <span className="hidden items-center gap-1 text-lg sm:text-xl font-bold tracking-widest uppercase text-white">
                  Ignite
                  <span className="text-[#f1b418] font-light">Corner</span>
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 py-2 ${
                      isActive
                        ? "text-[#f1b418]"
                        : "text-[#8ba3c7] hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#f1b418] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="ml-2 px-6 py-2.5 rounded-lg bg-[#f1b418] text-[#0a0e1a] text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(241,180,24,0.3)]"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-xl border border-[#1e3a5f]/30 bg-[#0a0e1a]/40 backdrop-blur-sm active:scale-95 transition-transform duration-200"
              aria-label="Toggle Menu"
            >
              <div
                ref={hamburgerRef}
                className="relative w-5 h-5 flex flex-col justify-center items-center gap-[5px]"
              >
                <span className="h-line w-5 h-[1.5px] bg-white rounded-full origin-center block" />
                <span className="h-line w-5 h-[1.5px] bg-white rounded-full origin-center block" />
                <span className="h-line w-5 h-[1.5px] bg-white rounded-full origin-center block" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 z-40 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0a0e1a]/95 backdrop-blur-2xl transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Content */}
        <div
          className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-16 sm:h-20" />

          {/* Menu Links */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 sm:gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  ref={(el) => {
                    mobileLinksRef.current[i] = el;
                  }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-3xl sm:text-4xl font-black tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-[#f1b418]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#f1b418] rounded-full" />
                  )}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="mt-4 px-10 py-4 rounded-xl bg-[#f1b418] text-[#0a0e1a] text-sm font-bold tracking-[0.15em] uppercase active:scale-95 transition-transform"
            >
              Let's Talk
            </a>
          </div>

          {/* Bottom Info */}
          <div className="pb-10 px-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 flex items-center justify-center text-[#5a7090] transition-all duration-300 active:scale-90"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.borderColor = social.color + "40";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5a7090";
                    e.currentTarget.style.borderColor = "rgba(30,58,95,0.3)";
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-center text-[10px] text-[#5a7090] tracking-widest uppercase">
              hello@ignitecorner.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
