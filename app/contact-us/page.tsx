"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowDown,
  MessageSquare,
  ChevronDown,
  Check,
} from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";
import FAQSection from "@/components/FAQSection";

const SERVICE_OPTIONS = [
  {
    value: "Story-Driven Short-Form and Long-Form Content",
    title: "Short & Long-Form Content",
    subtitle: "High-retention vertical edits, brand documentaries & YouTube films",
    tag: "Content",
  },
  {
    value: "Podcast Production & Audio Mastering",
    title: "Podcast Production & Audio",
    subtitle: "Multi-camera episodes, sound design & social clips",
    tag: "Audio",
  },
  {
    value: "Content Strategy & Story Development",
    title: "Content Strategy & Story Development",
    subtitle: "Audience insights, narrative design & content roadmaps",
    tag: "Strategy",
  },
  {
    value: "Creative Direction & Content Production",
    title: "Creative Direction & Production",
    subtitle: "End-to-end creative concepts, visual direction & sprint execution",
    tag: "Production",
  },
  {
    value: "Custom Website Development",
    title: "Websites & Brand Platforms",
    subtitle: "High-performance responsive Next.js websites, portfolios & stores",
    tag: "Websites",
  },
  {
    value: "Web Application & SaaS Development",
    title: "Web Apps & SaaS Platforms",
    subtitle: "Interactive dashboards, cloud web apps & custom architectures",
    tag: "Web Apps",
  },
  {
    value: "Mobile App Development",
    title: "Mobile Apps (iOS & Android)",
    subtitle: "Native cross-platform mobile apps with fluid UX and gestures",
    tag: "Mobile",
  },
  {
    value: "Custom Bespoke Production Package",
    title: "Custom Bespoke Production Package",
    subtitle: "Tailored multi-format sprint & dedicated creative team",
    tag: "Full-Suite",
  },
];

function ServiceDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    SERVICE_OPTIONS.find((opt) => opt.value === value) || SERVICE_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Guarantee mouse wheel scrolling works reliably inside dropdown
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !isOpen) return;

    const onNativeWheel = (e: WheelEvent) => {
      e.stopPropagation();
      // Scroll the container smoothly on every mouse wheel tick
      el.scrollTop += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => el.removeEventListener("wheel", onNativeWheel);
  }, [isOpen]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-zinc-800/90 border rounded-xl px-4 py-2.5 text-left flex items-center justify-between transition-all duration-200 group cursor-pointer ${
          isOpen
            ? "border-sky-400 ring-2 ring-sky-500/20 shadow-lg shadow-sky-500/5 bg-zinc-800"
            : "border-zinc-600/70 hover:border-zinc-500 hover:bg-zinc-800"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
          <span className="text-sm font-medium text-white truncate">
            {selectedOption.title}
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300 border border-zinc-600/60 shrink-0">
            {selectedOption.tag}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-zinc-400 group-hover:text-white transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180 text-sky-400" : ""
          }`}
        />
      </button>

      {/* Custom Animated Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onWheel={handleWheel}
            className="absolute left-0 right-0 top-full mt-2 bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700/90 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 overflow-hidden"
          >
            <div
              ref={scrollContainerRef}
              onWheel={handleWheel}
              style={{ overscrollBehavior: "contain" }}
              className="max-h-[300px] overflow-y-auto space-y-1 pr-1 overscroll-contain select-none cursor-pointer"
            >
              {SERVICE_OPTIONS.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-sky-950/60 to-zinc-900 border border-sky-500/30 text-white"
                        : "hover:bg-zinc-800/80 text-zinc-300 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-sm font-semibold leading-snug ${
                            isSelected
                              ? "text-sky-300"
                              : "text-white group-hover:text-sky-200"
                          }`}
                        >
                          {option.title}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                          {option.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight truncate">
                        {option.subtitle}
                      </p>
                    </div>

                    <div className="shrink-0 pl-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-400">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-zinc-700 group-hover:border-zinc-500 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Story-Driven Short-Form and Long-Form Content",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bigtoastcompany@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById("inquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* ── SECTION 1: DIRECT CONTACT & STUDIO CONNECT ── */}
      <section className="min-h-[calc(100vh-6rem)] flex flex-col justify-center max-w-7xl mx-auto px-6 py-6 mb-12 lg:mb-16">
        {/* Section 1 Header */}
        <div className="text-center flex flex-col items-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3"
          >
            Direct Contact &amp; Reach Out
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-normal leading-tight text-white mb-3 max-w-4xl"
          >
            Let&apos;s Start a Conversation About Your{" "}
            <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              Next Launch
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed"
          >
            Reach out directly to our core creative, production, and strategy team. Whether you need fast-turnaround video edits, a full podcast season, or bespoke brand storytelling, we respond within hours.
          </motion.p>
        </div>

        {/* 4-Card Direct Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Direct Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl lg:rounded-3xl p-5 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-center justify-center text-sky-400 mb-3.5 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Direct Email
              </span>
              <h3 className="text-base lg:text-lg font-bold text-white mb-1.5 break-all group-hover:text-sky-300 transition-colors">
                bigtoastcompany@gmail.com
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                Send your brief, deck, or questions. Monitored continuously by our team.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <a
                href="mailto:bigtoastcompany@gmail.com"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                Send Email &rarr;
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
              >
                {copiedEmail ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>

          {/* Card 2: Direct Phone Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl lg:rounded-3xl p-5 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-3.5 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Studio Line
              </span>
              <h3 className="text-base lg:text-lg font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                +91 78277 25025
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                Available Mon – Sat, 10:00 AM – 8:00 PM IST for urgent production requests.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <a
                href="tel:+917827725025"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Call Now &rarr;
              </a>
              <span className="text-[10px] text-zinc-500 font-mono">IST Zone</span>
            </div>
          </motion.div>

          {/* Card 3: Studio Headquarters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl lg:rounded-3xl p-5 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-3.5 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                Studio Headquarters
              </span>
              <h3 className="text-base lg:text-lg font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                Mumbai
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                Mumbai, Maharashtra, India. In-person creative syncs &amp; sound stages.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-400">
                Hybrid Studio
              </span>
              <span className="text-[10px] text-zinc-500">Global Clients</span>
            </div>
          </motion.div>

          {/* Card 4: Detailed Project Inquiry Form Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card rounded-2xl lg:rounded-3xl p-5 border border-zinc-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group shadow-lg bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-sky-950/20 cursor-pointer"
            onClick={scrollToForm}
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3.5 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Detailed Brief
              </span>
              <h3 className="text-base lg:text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                Submit Project Form
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                Have specific deliverables, timeline, or scope? Fill out our 2nd section inquiry form.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={scrollToForm}
                className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                Go to Form <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <span className="text-[10px] text-zinc-500 font-mono">Inquiry Form</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ── */}
      <FAQSection />

      {/* ── DEDICATED INQUIRY FORM SECTION (AT BOTTOM) ── */}
      <section id="inquiry-form" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pt-20 pb-10 border-t border-zinc-800/80 scroll-mt-6">
        {/* Section 2 Header */}
        <div className="text-center flex flex-col items-center mb-5 md:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Project Inquiry Form
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-normal leading-tight text-white mb-1 max-w-2xl">
            Tell Us About Your{" "}
            <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              Project &amp; Goals
            </span>
          </h2>

          <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed">
            Fill in the details below to give us an overview of your vision. We will follow up with tailored recommendations, sample cuts, and production scopes.
          </p>
        </div>

        {/* 2-Column Section 2 Layout: Summary / Next Steps on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: What Happens Next */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card rounded-2xl lg:rounded-3xl p-5 lg:p-6 border border-zinc-800 flex flex-col gap-3.5">
              <h3 className="text-lg font-bold text-white mb-0.5">What Happens Next?</h3>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-xs font-bold text-sky-300 shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5">Discovery &amp; Brief Review</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Our creative lead reviews your footage, script requirements, and brand benchmarks within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-xs font-bold text-sky-300 shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5">Tailored Scope &amp; Sample</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We schedule an intro call or send a customized production deck with timeline, deliverables, and transparent pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-xs font-bold text-sky-300 shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-white mb-0.5">Production Sprint Kickoff</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Upon approval, we launch immediately with dedicated editors, motion designers, and sound engineers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form with Light Grey Inputs */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl lg:rounded-3xl p-5 md:p-6 border border-zinc-750 shadow-xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center gap-3.5"
                >
                  <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 mb-1">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Received!</h3>
                  <p className="text-zinc-400 text-xs md:text-sm max-w-md leading-relaxed">
                    Thank you for reaching out. A BigToast creative director will review your brief and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-zinc-800/90 border border-zinc-600/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-sky-400 focus:bg-zinc-800 focus:ring-1 focus:ring-sky-400/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-zinc-800/90 border border-zinc-600/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-sky-400 focus:bg-zinc-800 focus:ring-1 focus:ring-sky-400/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Creator Lab / Acme"
                        className="w-full bg-zinc-800/90 border border-zinc-600/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-sky-400 focus:bg-zinc-800 focus:ring-1 focus:ring-sky-400/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                        Required Service
                      </label>
                      <ServiceDropdown
                        value={formData.service}
                        onChange={(val) => setFormData({ ...formData, service: val })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                      Project Overview &amp; Goals *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your content, channels, timeline, or current bottlenecks..."
                      className="w-full bg-zinc-800/90 border border-zinc-600/70 rounded-xl p-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-sky-400 focus:bg-zinc-800 focus:ring-1 focus:ring-sky-400/30 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <PrimaryButton text="Submit Project Inquiry" showArrow={true} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
