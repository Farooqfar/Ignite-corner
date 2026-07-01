"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const formFieldsRef = useRef([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // WhatsApp & Email Config
  const WHATSAPP_NUMBER = "923001234567"; // Replace with your number (with country code, no +)
  const EMAIL_ADDRESS = "hello@ignitecorner.com"; // Replace with your email

  const projectTypes = [
    "Web Design",
    "Web Development",
    "Branding & Identity",
    "E-Commerce",
    "Mobile App",
    "Other",
  ];

  const budgetRanges = [
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Not Sure Yet",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── 1. Header Entrance ───
      const headerEls = headerRef.current.querySelectorAll(".contact-header");
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

      // ─── 2. Form Fields Staggered Rise ───
      formFieldsRef.current = formFieldsRef.current.filter(Boolean);
      gsap.fromTo(
        formFieldsRef.current,
        { opacity: 0, y: 40, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          transformPerspective: 1000,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ─── 3. Info Panel Slide In ───
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ─── 4. Floating Animation for Contact Cards ───
      const infoCards = infoRef.current.querySelectorAll(".info-card");
      infoCards.forEach((card, i) => {
        gsap.to(card, {
          y: Math.sin(i) * 5,
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          projectType: "",
          budget: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const sendToWhatsApp = () => {
    const text = `Hello Ignite Corner!%0A%0A*Name:* ${formData.name || "Not provided"}%0A*Email:* ${formData.email || "Not provided"}%0A*Project Type:* ${formData.projectType || "Not selected"}%0A*Budget:* ${formData.budget || "Not selected"}%0A%0A*Message:*%0A${formData.message || "No message"}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const sendToEmail = () => {
    const subject = `Project Inquiry from ${formData.name || "Website"}`;
    const body = `Name: ${formData.name || "Not provided"}%0D%0AEmail: ${formData.email || "Not provided"}%0D%0AProject Type: ${formData.projectType || "Not selected"}%0D%0ABudget: ${formData.budget || "Not selected"}%0D%0A%0D%0AMessage:%0D%0A${formData.message || "No message"}`;
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#0a0e1a] text-white overflow-hidden font-sans selection:bg-[#f1b418] selection:text-[#0a0e1a]"
    >
      {/* ─── Background ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1e3a5f]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#f1b418]/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        {/* ─── Header ─── */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-24">
          <div className="contact-header inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1b418] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f1b418]"></span>
            </span>
            <span className="text-[11px] text-[#8ba3c7] font-semibold tracking-[0.2em] uppercase">
              Get In Touch
            </span>
          </div>

          <h2 className="contact-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
            Let's Build <span className="text-[#f1b418]">Something</span>
            <br />
            Extraordinary
          </h2>

          <p className="contact-header text-[#8ba3c7] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear about it. Drop us a
            message and we'll get back within 24 hours.
          </p>
        </div>

        {/* ─── Main Grid: Form + Info ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* ─── Contact Form ─── */}
          <div ref={formRef} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl p-6 sm:p-8 lg:p-10"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.6) 0%, rgba(10,14,26,0.9) 100%)",
                border: "1px solid rgba(30,58,95,0.3)",
                boxShadow: "0 25px 60px -15px rgba(0,0,0,0.3)",
              }}
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-[#f1b418]/40 to-transparent" />
                <div className="absolute top-0 right-0 h-[1px] w-10 bg-gradient-to-l from-[#f1b418]/40 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div
                  ref={(el) => {
                    formFieldsRef.current[0] = el;
                  }}
                  className="group"
                >
                  <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-3 group-focus-within:text-[#f1b418] transition-colors">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0a0e1a]/50 border border-[#1e3a5f]/30 rounded-xl px-5 py-4 text-sm text-white placeholder-[#5a7090]/50 focus:outline-none focus:border-[#f1b418]/50 focus:ring-1 focus:ring-[#f1b418]/20 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div
                  ref={(el) => {
                    formFieldsRef.current[1] = el;
                  }}
                  className="group"
                >
                  <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-3 group-focus-within:text-[#f1b418] transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full bg-[#0a0e1a]/50 border border-[#1e3a5f]/30 rounded-xl px-5 py-4 text-sm text-white placeholder-[#5a7090]/50 focus:outline-none focus:border-[#f1b418]/50 focus:ring-1 focus:ring-[#f1b418]/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Project Type */}
                <div
                  ref={(el) => {
                    formFieldsRef.current[2] = el;
                  }}
                  className="group"
                >
                  <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-3 group-focus-within:text-[#f1b418] transition-colors">
                    Project Type
                  </label>
                  <div className="relative">
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0e1a]/50 border border-[#1e3a5f]/30 rounded-xl px-5 py-4 text-sm text-white appearance-none focus:outline-none focus:border-[#f1b418]/50 focus:ring-1 focus:ring-[#f1b418]/20 transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0a0e1a]">
                        Select a service
                      </option>
                      {projectTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-[#0a0e1a]"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a7090] pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Budget */}
                <div
                  ref={(el) => {
                    formFieldsRef.current[3] = el;
                  }}
                  className="group"
                >
                  <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-3 group-focus-within:text-[#f1b418] transition-colors">
                    Estimated Budget
                  </label>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#0a0e1a]/50 border border-[#1e3a5f]/30 rounded-xl px-5 py-4 text-sm text-white appearance-none focus:outline-none focus:border-[#f1b418]/50 focus:ring-1 focus:ring-[#f1b418]/20 transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0a0e1a]">
                        Select budget range
                      </option>
                      {budgetRanges.map((range) => (
                        <option
                          key={range}
                          value={range}
                          className="bg-[#0a0e1a]"
                        >
                          {range}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a7090] pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div
                ref={(el) => {
                  formFieldsRef.current[4] = el;
                }}
                className="group mb-8"
              >
                <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-3 group-focus-within:text-[#f1b418] transition-colors">
                  Tell Us About Your Project
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your vision, goals, and any specific requirements..."
                  className="w-full bg-[#0a0e1a]/50 border border-[#1e3a5f]/30 rounded-xl px-5 py-4 text-sm text-white placeholder-[#5a7090]/50 focus:outline-none focus:border-[#f1b418]/50 focus:ring-1 focus:ring-[#f1b418]/20 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Buttons Row */}
              <div
                ref={(el) => {
                  formFieldsRef.current[5] = el;
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="relative flex-1 px-8 py-4 bg-[#f1b418] text-[#0a0e1a] font-bold text-xs tracking-[0.2em] uppercase rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(241,180,24,0.25)] hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span
                    className={`relative z-10 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                  >
                    {submitted ? (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Message Sent
                      </>
                    ) : (
                      <>Send Message</>
                    )}
                  </span>
                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin w-5 h-5 text-[#0a0e1a]"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                  )}
                </button>

                {/* WhatsApp Quick Button */}
                <button
                  type="button"
                  onClick={sendToWhatsApp}
                  className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] font-semibold text-xs tracking-[0.15em] uppercase hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </button>

                {/* Email Quick Button */}
                <button
                  type="button"
                  onClick={sendToEmail}
                  className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-[#EA4335]/30 bg-[#EA4335]/10 text-[#EA4335] font-semibold text-xs tracking-[0.15em] uppercase hover:bg-[#EA4335]/20 hover:border-[#EA4335]/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </button>
              </div>
            </form>
          </div>

          {/* ─── Contact Info Panel ─── */}
          <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-6">
            {/* Direct Contact Card */}
            <div
              className="info-card relative rounded-2xl p-7 sm:p-8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(30,58,95,0.4) 0%, rgba(15,23,42,0.6) 100%)",
                border: "1px solid rgba(30,58,95,0.4)",
              }}
            >
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-[#f1b418]/40 to-transparent" />
                <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-[#f1b418]/40 to-transparent" />
              </div>

              <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
                Direct Contact
              </h3>

              <div className="space-y-5">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[#0a0e1a]/40 border border-[#1e3a5f]/20 hover:border-[#25D366]/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-0.5">
                      WhatsApp
                    </p>
                    <p className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                      +92 300 123 4567
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[#0a0e1a]/40 border border-[#1e3a5f]/20 hover:border-[#EA4335]/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EA4335]/10 flex items-center justify-center text-[#EA4335] group-hover:bg-[#EA4335]/20 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-0.5">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-white group-hover:text-[#EA4335] transition-colors">
                      hello@ignitecorner.com
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0e1a]/40 border border-[#1e3a5f]/20">
                  <div className="w-11 h-11 rounded-xl bg-[#f1b418]/10 flex items-center justify-center text-[#f1b418]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a7090] mb-0.5">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Karachi, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div
              className="info-card relative rounded-2xl p-7 sm:p-8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(30,58,95,0.4) 0%, rgba(15,23,42,0.6) 100%)",
                border: "1px solid rgba(30,58,95,0.4)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
                Working Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#1e3a5f]/20">
                  <span className="text-sm text-[#8ba3c7]">
                    Monday - Friday
                  </span>
                  <span className="text-sm font-semibold text-white">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1e3a5f]/20">
                  <span className="text-sm text-[#8ba3c7]">Saturday</span>
                  <span className="text-sm font-semibold text-white">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[#8ba3c7]">Sunday</span>
                  <span className="text-sm font-semibold text-[#f1b418]">
                    Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="info-card relative rounded-2xl p-7 sm:p-8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(30,58,95,0.4) 0%, rgba(15,23,42,0.6) 100%)",
                border: "1px solid rgba(30,58,95,0.4)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[
                  {
                    name: "Instagram",
                    color: "#E4405F",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    color: "#0A66C2",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Twitter",
                    color: "#1DA1F2",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Dribbble",
                    color: "#EA4C89",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12 5.372-12 12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="group w-12 h-12 rounded-xl bg-[#0a0e1a]/40 border border-[#1e3a5f]/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ color: "#5a7090" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.borderColor = `${social.color}40`;
                      e.currentTarget.style.backgroundColor = `${social.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#5a7090";
                      e.currentTarget.style.borderColor = "rgba(30,58,95,0.2)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(10,14,26,0.4)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom Trust Bar ─── */}
        <div className="mt-20 sm:mt-28 pt-10 border-t border-[#1e3a5f]/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-[#5a7090] tracking-wide">
              © 2024 Ignite Corner. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-xs text-[#5a7090] hover:text-[#f1b418] transition-colors tracking-wide"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-[#5a7090] hover:text-[#f1b418] transition-colors tracking-wide"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
