"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Compass,
  Code2,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Target,
  Award,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import CTABanner from "@/components/CTABanner";
import PrimaryButton from "@/components/PrimaryButton";

const VALUES = [
  {
    title: "Creative Excellence",
    description: "We focus on thoughtful storytelling, precise execution, and polished results that communicate your message clearly.",
  },
  {
    title: "Smart Use of AI",
    description: "We use AI-assisted workflows where they add value, helping streamline production while maintaining creative quality.",
  },
  {
    title: "Client-First Thinking",
    description: "We align every project with your goals, audience, and brand identity to create relevant digital experiences.",
  },
  {
    title: "Reliable Delivery",
    description: "We value clear communication, organised workflows, and consistent progress throughout every project.",
  },
];

const FOUNDER_MILESTONES = [
  {
    year: "Editor",
    title: "Early Days & Online Learning",
    description: "Started as a video editor while still in school, learning fundamentals, cuts, and pacing through online communities and basic tools.",
  },
  {
    year: "Storyteller",
    title: "Creators & Podcast Production",
    description: "Refined craft working with creators, podcasts, and personal brands, turning raw footage and conversations into high-retention stories.",
  },
  {
    year: "Strategist",
    title: "Agency Jobs & Global Clients",
    description: "Worked in professional agency and corporate jobs, gaining hands-on industry experience leading video production, creative strategy, and campaigns for global clients.",
  },
  {
    year: "Founder",
    title: "Founding Big Toast Company",
    description: "Established Big Toast Company as a dedicated storytelling studio, uniting cinematic editing, content strategy, and creative direction.",
  },
];

const FOUNDER_PRINCIPLES = [
  {
    title: "Story Over Spectacle",
    description: "Every cut, transition, and sound cue must serve the emotional core of the narrative. True audience connection comes from meaning, not filler effects.",
  },
  {
    title: "Craft Grounded in Curiosity",
    description: "From learning on basic tools to adopting modern AI-assisted workflows, staying curious and adaptable is what keeps creative work fresh and effective.",
  },
  {
    title: "Purpose-Driven Content",
    description: "We collaborate closely with founders and brands to understand their real voice, crafting videos and podcasts that build lasting resonance with their audience.",
  },
];

const FOUNDER_METRICS = [
  { value: "Founder", label: "Big Toast Company", sublabel: "Story-first creative studio" },
  { value: "Video", label: "Editing & Pacing", sublabel: "Cinematic post-production" },
  { value: "Content", label: "Partner", sublabel: "For brand, creators & founders" },
  { value: "Creative", label: "Strategy & AI", sublabel: "Modern narrative workflows" },
];

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* Hero Banner - 1 Screen Composition */}
      <section className="relative min-h-[calc(100vh/0.9)] lg:h-[calc(100vh/0.9)] flex flex-col justify-between pt-24 pb-4 lg:pt-20 lg:pb-5 w-full overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center items-center text-center relative z-10 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-5"
          >
            ABOUT BIG TOAST COMPANY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-sans font-normal leading-[1.12] text-white mb-6 max-w-4xl"
          >
            We Turn Ideas Into Stories Worth{" "}
            <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              Paying Attention To.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed flex flex-col gap-3"
          >
            <p>
              Big Toast Company is a storytelling-focused content studio helping founders, creators, and brands turn their ideas, expertise, and experiences into compelling content through strategy, creative direction, video production, and AI-powered workflows.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              We bring together human insight and creative technology to build brands people recognize, trust, and remember.
            </p>
          </motion.div>
        </div>

        {/* Subtle Scroll Hint */}
        <div className="w-full flex items-center justify-center gap-2 text-zinc-500 text-xs py-1.5 pointer-events-none z-10">
          <span>Scroll to explore story</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-sky-400" />
        </div>
      </section>

      {/* Main Image Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden glass-card p-2">
            <Image
              src="/images/about_studio.jpg"
              alt="BigToast Creative Studio & Video Production Team"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Where Creative Ideas Meet Digital Execution
            </h2>
            <p className="text-paragraph text-base leading-relaxed">
              We bring together creative storytelling, thoughtful editing, and modern technology to turn ideas into engaging content and digital experiences for brands, businesses, and creators.
            </p>
            <PrimaryButton text="Work With Us" href="/contact-us" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="pt-24 pb-20 bg-transparent border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-paragraph">The principles that guide our creative process and every client project.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => (
              <div key={val.title} className="glass-card p-6 rounded-2xl border border-white/10">
                <span className="text-2xl font-extrabold text-sky-400 mb-3 block">0{idx + 1}</span>
                <h3 className="text-xl font-bold text-white mb-2">{val.title}</h3>
                <p className="text-paragraph text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ABOUT FOUNDER - SHIFTED TO BOTTOM OF ABOUT US PAGE                       */}
      {/* ========================================================================= */}
      <div id="founder" className="scroll-mt-20">
        {/* Founder Hero Section */}
        <section className="relative pt-24 pb-16 w-full overflow-hidden border-t border-zinc-800/80">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-sky-500/10 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-cyan-500/10 blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
              {/* Left Column - Founder Bio */}
              <div className="lg:col-span-7 flex flex-col items-start gap-4 lg:gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-xs font-semibold uppercase tracking-wider text-zinc-300 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Leadership &amp; Vision</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="text-zinc-400 normal-case font-normal text-[11px]">Founder Profile</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-sans font-normal leading-[1.08] text-white tracking-tight"
                >
                  Meet{" "}
                  <span className="font-serif italic bg-gradient-to-r from-zinc-200 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                    Himanshu Singh
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
                >
                  Founder &amp; Creative Director at Big Toast Company. Started editing in school and learning through online communities, evolving through creator content, podcasts, agencies, and AI-assisted workflows into a story-driven creative director.
                </motion.p>

                {/* Capability Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-2 pt-0.5"
                >
                  <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-sky-400" /> 01. Story-Driven Video Editing
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-cyan-400" /> 02. Podcasts &amp; Content Production
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-sky-300" /> 03. Creative Strategy &amp; Direction
                  </span>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="flex flex-wrap items-center gap-3 pt-2"
                >
                  <PrimaryButton text="Connect With Himanshu" href="/contact-us" />

                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.linkedin.com/in/himanshuworkshere/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Himanshu LinkedIn"
                      title="LinkedIn"
                      className="w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:border-sky-500/60 hover:bg-zinc-800 transition-all hover:scale-105"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/thebizhead/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Himanshu Instagram"
                      title="Instagram"
                      className="w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:border-sky-500/60 hover:bg-zinc-800 transition-all hover:scale-105"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:himanshuworkshere1@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Email Himanshu"
                      title="Direct Email (Gmail)"
                      className="w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:border-sky-500/60 hover:bg-zinc-800 transition-all hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Founder Photo Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
              >
                {/* Ambient Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/15 via-cyan-400/10 to-transparent rounded-[36px] blur-3xl pointer-events-none" />

                <div className="relative rounded-3xl p-2 sm:p-2.5 bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                  <div className="relative w-[280px] sm:w-[320px] md:w-[340px] lg:w-[350px] xl:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900">
                    <Image
                      src="/founder.jpg"
                      alt="Himanshu Singh - Founder & Creative Director"
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dedicated Executive Metrics Transition Section */}
        <section className="relative py-12 bg-zinc-900/50 border-t border-b border-zinc-800/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
              {FOUNDER_METRICS.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    idx !== 0 ? "sm:pl-6 lg:pl-8" : ""
                  } ${idx > 1 ? "pt-4 sm:pt-0" : ""}`}
                >
                  <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-zinc-100 to-sky-300 bg-clip-text text-transparent">
                    {item.value}
                  </span>
                  <span className="text-sm font-semibold text-zinc-200 mt-1">
                    {item.label}
                  </span>
                  <span className="text-xs text-zinc-400 mt-0.5 hidden sm:block">
                    {item.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Story & Letter */}
        <section className="relative py-16 lg:py-20 bg-zinc-900/40 border-b border-zinc-800/80 w-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center">
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest block mb-1.5">
                The Journey
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-normal text-white">
                A Letter From the{" "}
                <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                  Founder
                </span>
              </h2>
            </div>

            {/* Letter Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-9 border border-zinc-800/90 flex flex-col gap-3.5 sm:gap-4 text-zinc-300 text-sm sm:text-base leading-relaxed shadow-2xl">
              <p>
                I started editing video while I was still in school, learning everything through online communities, experimentation, and basic tools. What began as curiosity quickly became a craft — discovering how pacing, sound, and structure could turn simple footage into an emotional experience.
              </p>
              <p>
                Over the years, that journey took me from editor to storyteller, content producer, and creative strategist. I’ve had the privilege of collaborating with creators, podcasts, agencies, ambitious founders, businesses, and international clients, exploring everything from human storytelling to modern AI-assisted production.
              </p>
              <p>
                I founded Big Toast Company on a simple principle: great content always starts with a great story. In a world full of rapid algorithms and visual noise, people don’t remember effects — they remember how a story made them feel and the message it left behind.
              </p>
              <p>
                Whether we are editing short-form reels, producing deep-dive podcasts, or directing brand films, our focus is always on clarity, narrative intention, and craft. Thank you for being part of this journey.
              </p>
              <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block text-base sm:text-lg">Himanshu Singh</span>
                  <span className="text-xs text-zinc-400">Founder &amp; Creative Director, Big Toast Company</span>
                </div>
                <span className="font-serif italic text-xl sm:text-2xl text-sky-300 font-normal">Himanshu S.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest block mb-2">
              Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-normal text-white mb-4">
              Founder's Guiding <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">Principles</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FOUNDER_PRINCIPLES.map((prin, idx) => (
              <motion.div
                key={prin.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold text-sky-400 mb-4 block">0{idx + 1}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{prin.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{prin.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Career Milestones Timeline */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest block mb-2">
              Track Record
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-normal text-white mb-4">
              My Creative <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">Journey</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUNDER_MILESTONES.map((item, idx) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-zinc-800"
              >
                <span className="text-sm font-bold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-full inline-block mb-4">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Final Call-To-Action Section */}
      <CTABanner
        badge="LET'S BUILD SOMETHING GREAT"
        headingPrefix="Have an Idea "
        headingHighlight="Worth Bringing to Life?"
        description="Let's turn your ideas into engaging content and digital experiences. Tell us about your project and let's explore how we can work together."
        buttonText="Start a Conversation"
        buttonHref="/contact-us"
      />
    </div>
  );
}
