"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Flame,
  Info,
} from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  usdPrice: string;
  inrPrice: string;
  badge?: string;
  isPopular?: boolean;
  included: string[];
  outcome: string;
  ctaText: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "content-engine",
    name: "Content Engine",
    tagline: "For founders and creators who need consistent, high-quality content.",
    usdPrice: "$600",
    inrPrice: "₹56,999.31",
    isPopular: false,
    ctaText: "Choose Content Engine",
    included: [
      "12 short-form videos per month, up to 60 seconds each",
      "Professional editing, pacing and sound design",
      "Subtitles and basic motion graphics",
      "Hook and storytelling improvements during editing",
      "One consolidated revision round per video",
      "Agreed monthly delivery schedule",
    ],
    outcome:
      "Build a consistent, professional online presence that communicates your ideas clearly, strengthens recognition, and saves you time on content production.",
  },
  {
    id: "storytelling-partner",
    name: "Storytelling Partner",
    tagline: "For founders and personal brands who need strategy and execution.",
    usdPrice: "$1,000",
    inrPrice: "₹94,998.85",
    badge: "Recommended",
    isPopular: true,
    ctaText: "Get Started as Partner",
    included: [
      "16 short-form videos per month, up to 60 seconds each",
      "Monthly content planning and ideation",
      "Hooks and story concepts for all 16 videos",
      "Scripts for up to 8 videos",
      "Creative direction and visual references",
      "Professional editing, subtitles and sound design",
      "One consolidated revision round per video",
      "Monthly content review and recommendations",
    ],
    outcome:
      "Build a recognizable personal brand through strategic storytelling that strengthens audience trust, communicates your expertise, and supports business visibility and lead generation.",
  },
  {
    id: "content-partner",
    name: "Content Partner",
    tagline: "For businesses that want a deeper, ongoing creative partnership.",
    usdPrice: "$1,500",
    inrPrice: "₹1,42,498.58",
    isPopular: false,
    ctaText: "Scale with Content Partner",
    included: [
      "20 short-form videos per month, up to 60 seconds each",
      "Monthly content strategy and content pillars",
      "Concepts, hooks and scripts for all 20 videos",
      "Detailed shoot briefs, shot lists and recording instructions",
      "Creative direction and footage feedback",
      "Professional editing and visual storytelling",
      "One consolidated revision round per video",
      "Monthly performance review and next-month recommendations",
    ],
    outcome:
      "Build a strategic, recognizable brand presence through a structured content system that establishes authority, builds trust, reduces the burden of content creation, and supports lead generation.",
  },
];

const PARTNERSHIP_STEPS = [
  {
    step: "01",
    phase: "Foundation",
    title: "Month 01 · Foundation",
    description:
      "Understand your brand, establish your content direction, and build the creative foundation.",
  },
  {
    step: "02",
    phase: "Consistency",
    title: "Month 02 · Consistency",
    description:
      "Bring the strategy to life through regular content production and refine the storytelling.",
  },
  {
    step: "03",
    phase: "Refinement",
    title: "Month 03 · Refinement",
    description:
      "Review what is working, strengthen the creative approach, and plan the next phase.",
  },
];

export default function PricingSection() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  return (
    <section id="pricing" className="relative py-24 w-full overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-sky-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Big Toast Company | Packages &amp; Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal text-white mb-5 tracking-tight"
          >
            Predictable Packages.{" "}
            <span className="font-serif italic bg-gradient-to-r from-zinc-200 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              Compelling Stories.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Turn raw ideas and footage into magnetic content that connects with
            your target audience, builds personal authority, and drives inbound
            growth.
          </motion.p>

          {/* Currency Toggle Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center p-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md shadow-lg"
          >
            <button
              onClick={() => setCurrency("USD")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${currency === "USD"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-black shadow-md font-bold"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              <span>Global (USD $)</span>
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${currency === "INR"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-black shadow-md font-bold"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              <span>India (INR ₹)</span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {PRICING_TIERS.map((tier, idx) => {
            const isHighlight = tier.isPopular;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 backdrop-blur-xl transition-all duration-500 ${isHighlight
                    ? "bg-zinc-900/90 border-2 border-sky-400/80 shadow-[0_15px_60px_rgba(56,189,248,0.2)] lg:-translate-y-2.5 z-20"
                    : "bg-zinc-900/50 border border-zinc-800/90 hover:border-zinc-700 shadow-xl z-10"
                  }`}
              >
                {/* Luminous Glow for Featured Tier */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-black text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-black" />
                    Recommended
                  </div>
                )}

                <div>
                  {/* Tier Title & Tagline */}
                  <div className="mb-5">
                    <span className="text-xs font-bold text-sky-400 tracking-wider uppercase block mb-1">
                      Package 0{idx + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed min-h-[40px]">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="pb-6 mb-6 border-b border-zinc-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {currency === "USD" ? tier.usdPrice : tier.inrPrice}
                      </span>
                      <span className="text-sm font-medium text-zinc-400">
                        / month
                      </span>
                    </div>
                  </div>

                  {/* What's Included List */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-sky-400" />
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {tier.included.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                        >
                          <div className="w-4 h-4 rounded-full bg-sky-500/15 border border-sky-400/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-sky-300 stroke-[3]" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Section: Outcome & CTA */}
                <div className="pt-6 border-t border-zinc-800/80 mt-auto flex flex-col gap-5">
                  {/* Outcome Box */}
                  <div className="rounded-2xl p-4 bg-zinc-950/70 border border-zinc-800/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                      Expected Outcome
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {tier.outcome}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/contact-us?package=${tier.id}`}
                    className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 select-none ${isHighlight
                        ? "bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 hover:from-sky-300 hover:to-cyan-300 text-black shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02]"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-500 hover:scale-[1.01]"
                      }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partnership Model: Built for Consistency, Not One-Offs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-12 bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="pb-8 mb-8 border-b border-zinc-800/80">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              Partnership Model
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Built for Consistency, Not One-Offs
            </h3>
            <p className="text-base sm:text-lg font-serif italic text-sky-300 mb-4">
              A minimum three-month partnership.
            </p>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl mb-5">
              Meaningful content takes time. The first month is about understanding your brand, defining your direction, and building the foundation. The following months allow us to refine the storytelling, create consistency, and learn what resonates with your audience.
            </p>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-800/50 text-xs sm:text-sm text-sky-200">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>
                All packages operate on a monthly retainer, with a{" "}
                <strong className="text-white font-semibold">minimum commitment of three months</strong>.
              </span>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              How It Works
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PARTNERSHIP_STEPS.map((step, idx) => (
                <div
                  key={step.step}
                  className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 group ${
                    idx === 1
                      ? "bg-gradient-to-b from-sky-950/30 to-zinc-950/80 border border-sky-500/40 shadow-lg shadow-sky-950/20"
                      : "bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-sky-400">
                        Month {step.step}
                      </span>
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        {step.phase}
                      </span>
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                      {step.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Momentum Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-sky-950/40 to-zinc-900 border border-sky-900/40 text-center mb-8">
            <p className="text-sm sm:text-base font-semibold text-white">
              <span className="font-serif italic text-sky-300">One partnership.</span> Three months to build momentum.
            </p>
          </div>

          {/* Need custom work banner */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  Need custom volume, long-form podcast editing, or tailored production?
                </span>
                <span className="text-xs text-zinc-400">
                  We customize deliverables for ambitious agencies, enterprises, and global founder roadmaps.
                </span>
              </div>
            </div>

            <Link
              href="/contact-us"
              className="px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-white transition-all duration-300 hover:border-sky-400 hover:scale-105 shrink-0"
            >
              Talk to Himanshu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
