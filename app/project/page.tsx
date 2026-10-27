"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Play,
  ArrowUpRight,
  Film,
  Sparkles,
  Globe,
  Code2,
  Smartphone,
  Maximize2,
  X,
} from "lucide-react";
import CTABanner from "@/components/CTABanner";
import PrimaryButton from "@/components/PrimaryButton";

// ─── General Portfolio Data ───────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "reels", label: "Short Form" },
  { id: "longvideo", label: "Podcast Work" },
  { id: "aivideo", label: "AI Projects" },
  { id: "website", label: "Websites" },
  { id: "webapp", label: "Web Apps" },
  { id: "mobile", label: "Mobile Apps" },
];

const PROJECTS = [
  { id: "re-01", category: "reels", title: "Why People Feel They Are Not Successful", client: "Short Form", year: "2026", file: "/why people feel they are not successful.mp4", tag: "Motivation Reel", description: "Deep dive short-form reel on mindset, growth, and overcoming career plateau." },
  { id: "re-02", category: "reels", title: "Talking to Strangers", client: "Short Form", year: "2026", file: "/Talking to strangers (1).mp4", tag: "Social Reel", description: "Engaging streetwear / interview style short form video cut." },
  { id: "re-03", category: "reels", title: "Rat Race", client: "Short Form", year: "2026", file: "/rat race.mp4", tag: "Mindset Reel", description: "Fast-paced commentary reel exploring modern lifestyle & career hustle." },
  { id: "re-04", category: "reels", title: "Intelligent Decision", client: "Short Form", year: "2026", file: "/Intelligent Decision.mp4", tag: "Business Reel", description: "High-impact business insights reel with crisp typography and motion graphics." },
  { id: "re-05", category: "reels", title: "End of Life", client: "Short Form", year: "2026", file: "/end of life.mp4", tag: "Storytelling Reel", description: "Cinematic short story reel with atmospheric sound design and color grade." },
  { id: "re-06", category: "reels", title: "Brihas Quotient", client: "Short Form", year: "2026", file: "/brihas-qoutient-wc.mp4", tag: "Promo Reel", description: "Dynamic brand feature reel with beat sync cuts and custom graphics." },
  { id: "re-07", category: "reels", title: "Rapid Fire", client: "Short Form", year: "2026", file: "/rapid-fire-.mp4", tag: "Q&A Reel", description: "High-energy Q&A rapid fire format reel built for social media engagement." },
  { id: "re-08", category: "reels", title: "Brihas Promo 1", client: "Short Form", year: "2026", file: "/brihas-promo 1.mp4", tag: "Brand Reel", description: "Polished promotional reel highlighting product features and brand aesthetic." },
  { id: "re-09", category: "reels", title: "Brihas Promo 2", client: "Short Form", year: "2026", file: "/brihas-promo-2.mp4", tag: "Brand Reel", description: "Follow-up brand reel cut with rhythm sync and punchy sound design." },
  { id: "re-10", category: "reels", title: "Best Date", client: "Short Form", year: "2026", file: "/best date.mp4", tag: "Lifestyle Reel", description: "Vibrant lifestyle reel with smooth camera pans and trending audio." },
  { id: "re-11", category: "reels", title: "Dads", client: "Short Form", year: "2026", file: "/dads.mp4", tag: "Family Reel", description: "Relatable humor and family storytelling short form video format." },
  { id: "re-12", category: "reels", title: "Fox 1 Fin", client: "Short Form", year: "2026", file: "/fox 1 fin.mp4", tag: "Cinematic Reel", description: "Cinematic vertical edit with dynamic lighting and atmospheric grade." },
  { id: "re-13", category: "reels", title: "Reel 4 BR", client: "Short Form", year: "2026", file: "/Reel 4 BR.mp4", tag: "Creative Reel", description: "Creative visual sequence with seamless whip-pan transitions." },
  { id: "re-14", category: "reels", title: "Reel 8 BR", client: "Short Form", year: "2026", file: "/Reel 8 BR.mp4", tag: "Creative Reel", description: "High-octane montage reel with frame-by-frame sound effects." },
  { id: "re-15", category: "reels", title: "Connect With Yourself", client: "Short Form", year: "2026", file: "/connect-with-yourself.mp4", tag: "Mindset Reel", description: "Reflective short-form reel on self-connection and personal clarity." },
  { id: "re-16", category: "reels", title: "Stuck", client: "Short Form", year: "2026", file: "/Stuck.mp4", tag: "Motivation Reel", description: "Dynamic short video on overcoming creative and mental blocks." },
  { id: "lv-01", category: "longvideo", title: "Yanisa — Podcast & Brand Film", client: "Yanisa Media", year: "2026", duration: "48:00", tag: "Podcast Video", file: "/Copy of TRAILER 1 tiptop.mp4", description: "Full episode podcast edit & brand film with multi-cam switching and custom sound design." },
  { id: "lv-02", category: "longvideo", title: "Yanisa — Event & Keynote Reel", client: "Yanisa Media", year: "2025", duration: "12:40", tag: "Brand Documentary", file: "/Copy of event promo final.mp4", description: "High-energy event documentary and keynote recording with lower-thirds and color grade." },
  { id: "ai-01", category: "aivideo", title: "Yanisa — AI Avatar Ad Campaign", client: "Yanisa Media", year: "2026", duration: "0:30", tag: "AI Avatar", file: "/yanisa AI ad final.mp4", description: "Synthetic AI voiceover integration, AI avatar presentation, and dynamic product callouts." },
  { id: "ai-02", category: "aivideo", title: "Yanisa — AI Generative Content Film", client: "Yanisa Media", year: "2026", duration: "0:45", tag: "Generative AI Film", file: "/AI content film.mp4", description: "AI text-to-video scene generation, visual background extensions, and futuristic overlays." },
  {
    id: "web-01",
    category: "website",
    title: "FitFuel Brand Website",
    client: "FitFuel Brand",
    year: "2026",
    tag: "Next.js Website",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      "/images/project_founder_stories.jpg",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "web-02",
    category: "website",
    title: "Harvest Kitchen Online Store",
    client: "Harvest Kitchen",
    year: "2025",
    tag: "E-Commerce Site",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "wa-01",
    category: "webapp",
    title: "Creator Analytics Dashboard",
    client: "Elevate Media",
    year: "2026",
    tag: "SaaS Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "mob-01",
    category: "mobile",
    title: "PeakFit Workout App",
    client: "PeakFit Studio",
    year: "2026",
    tag: "iOS & Android",
    image: "https://images.unsplash.com/photo-1512941937938-40bdc1c18283?q=80&w=1200&auto=format&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1512941937938-40bdc1c18283?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "mob-02",
    category: "mobile",
    title: "Harvest Kitchen App",
    client: "Harvest Kitchen",
    year: "2025",
    tag: "iOS & Android",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "mob-03",
    category: "mobile",
    title: "Elevate Creator App",
    client: "Elevate Media",
    year: "2026",
    tag: "iOS App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=600&auto=format&fit=crop",
    ],
  },
];

// ─── Yanisa Video Data ────────────────────────────────────────────────────────

const YANISA_HORIZONTAL = [
  {
    id: "yh-01",
    file: "/yanisa AI ad final.mp4",
    title: "Yanisa — AI Ad Final",
    description: "Final AI-powered brand ad with synthetic voiceover, avatar integration, and product showcasing — built for paid social and performance campaigns.",
    tag: "AI Ad",
  },
  {
    id: "yh-02",
    file: "/Copy of TRAILER 1 tiptop.mp4",
    title: "Yanisa — Brand Trailer",
    description: "Cinematic brand reveal trailer with high-energy cuts, 4K footage, and original sound design. Showcases Yanisa's product range and brand identity.",
    tag: "Cinematic Trailer",
  },
  {
    id: "yh-03",
    file: "/Copy of event promo final.mp4",
    title: "Yanisa — Event Promo",
    description: "High-energy event promotion video with dynamic motion graphics, countdown sequences, and branded lower-thirds for Yanisa's product launch event.",
    tag: "Event Promo",
  },
];

const YANISA_REELS = [
  {
    id: "yr-01",
    file: "/1set of 7 (1).mp4",
    title: "Set of 7 — Vol.1",
    description: "First reel in the Yanisa 7-series — fast-paced product cuts with trending audio.",
    tag: "Product Reel",
  },
  {
    id: "yr-02",
    file: "/2.5 topper.mp4",
    title: "Topper Reel",
    description: "Quick-hit topper reel with beat-synced transitions and bold text overlays.",
    tag: "Beat Sync",
  },
  {
    id: "yr-03",
    file: "/2.invisible clip.mp4",
    title: "Invisible Clip",
    description: "Seamless invisible-cut reel showcasing smooth outfit/product transitions.",
    tag: "Transition Reel",
  },
  {
    id: "yr-04",
    file: "/4.wig.mp4",
    title: "Wig Showcase",
    description: "Dynamic product reel featuring wig collection with glam color grading.",
    tag: "Product Showcase",
  },
  {
    id: "yr-05",
    file: "/AI AGENTS.mp4",
    title: "AI Agents Reel",
    description: "AI-themed short-form content reel with futuristic motion graphics and voiceover.",
    tag: "AI Content",
  },
  {
    id: "yr-06",
    file: "/AI content film.mp4",
    title: "AI Content Film",
    description: "Short-form AI content reel blending real footage with AI-generated visuals.",
    tag: "AI Hybrid",
  },
  {
    id: "yr-07",
    file: "/beatsync.mp4",
    title: "Beatsync Reel",
    description: "Precision beat-synced reel with frame-perfect cuts timed to music drops.",
    tag: "Beat Sync",
  },
  {
    id: "yr-08",
    file: "/DUBAI TOWER.I.mp4",
    title: "Dubai Tower Reel",
    description: "Architectural vertical showcase featuring Dubai Tower visuals synced to soundtrack.",
    tag: "Brand Reel",
  },
  {
    id: "yr-09",
    file: "/EVENT PROMO.mp4",
    title: "Event Promo Reel",
    description: "Vertical event highlight reel with high-energy cuts and launch announcements.",
    tag: "Event Reel",
  },
  {
    id: "yr-10",
    file: "/gaas.mp4",
    title: "GAAS Reel",
    description: "High-energy social reel with bold typography, color pop effects, and snappy edits.",
    tag: "Social Reel",
  },
  {
    id: "yr-11",
    file: "/lata mangeshkar new.mp4",
    title: "Lata Mangeshkar Tribute",
    description: "Emotional tribute reel with soft color grading, archival-style edits, and subtle overlays.",
    tag: "Tribute Reel",
  },
  {
    id: "yr-12",
    file: "/OVERTIME_.mp4",
    title: "Overtime Reel",
    description: "Late-night hustle themed reel with moody grading and motivational text overlays.",
    tag: "Motivation Reel",
  },
];

// ─── Category Icon ────────────────────────────────────────────────────────────

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "reels": case "longvideo": return Film;
    case "aivideo": return Sparkles;
    case "website": return Globe;
    case "webapp": return Code2;
    case "mobile": return Smartphone;
    default: return Film;
  }
}

// ─── General Project Card ─────────────────────────────────────────────────────

function ProjectCard({
  project,
  idx,
  onOpenModal,
}: {
  project: typeof PROJECTS[0];
  idx: number;
  onOpenModal: (data: { file: string; title: string; tag: string; isReel?: boolean }) => void;
}) {
  const imgSrc = project.image ?? (project as any).file ?? "";
  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenModal({
      file: imgSrc,
      title: project.title,
      tag: project.category,
      isReel: false,
    });
  };

  const isReel = project.category === "reels";

  if (isReel) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.45, delay: idx * 0.06 }}
        className="glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 group cursor-pointer flex flex-col"
        onClick={handleFullscreen}
      >
        {/* 9:16 vertical reel container */}
        <div className="relative bg-zinc-950 overflow-hidden" style={{ aspectRatio: "9/16" }}>
          <Image src={imgSrc} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/40" />

          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Fullscreen icon - ALWAYS visible */}
          <button
            onClick={handleFullscreen}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 transition-all z-10"
            title="View Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex-1">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-0.5">
            {project.client} · {project.year}
          </span>
          <h3 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
            {project.title}
          </h3>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: idx * 0.06 }}
      className="glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 group cursor-pointer"
      onClick={handleFullscreen}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={imgSrc} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Fullscreen Icon - ALWAYS visible top-right */}
        <button
          onClick={handleFullscreen}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 transition-all z-10"
          title="View Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-5">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
          {project.client} · {project.year}
        </span>
        <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Mobile App Card (bare phone mockup, no container) ───────────────────────

function MobileAppCard({
  project,
  idx,
}: {
  project: typeof PROJECTS[0] & { screens?: string[] };
  idx: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const screens = (project as any).screens ?? [project.image];
  const total = screens.length;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((s) => (s - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((s) => (s + 1) % total);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      className="flex flex-col items-center group"
    >
      {/* ── Phone mockup (no wrapper container) ── */}
      <div className="relative flex items-center justify-center">

        {/* Prev / Next arrows — outside phone, on sides */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute -left-11 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 hover:bg-zinc-700 transition-all z-20"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={next}
              className="absolute -right-11 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 hover:bg-zinc-700 transition-all z-20"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}

        {/* Phone frame */}
        <div className="relative" style={{ width: 260, height: 530 }}>
          {/* Outer shell */}
          <div
            className="absolute inset-0 rounded-[52px] border-[4px] border-zinc-600 bg-zinc-900"
            style={{
              boxShadow:
                "0 0 0 1px #3f3f46, 0 50px 100px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          />
          {/* Left side buttons */}
          <div className="absolute -left-[6px] top-[114px] w-[5px] h-11 rounded-l-sm bg-zinc-600" />
          <div className="absolute -left-[6px] top-[176px] w-[5px] h-11 rounded-l-sm bg-zinc-600" />
          {/* Right power button */}
          <div className="absolute -right-[6px] top-[142px] w-[5px] h-16 rounded-r-sm bg-zinc-600" />
          {/* Dynamic Island */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[72px] h-[26px] rounded-full bg-black z-20" />
          {/* Screen */}
          <div
            className="absolute overflow-hidden rounded-[46px] bg-black"
            style={{ top: 8, left: 7, right: 7, bottom: 8 }}
          >
            {screens.map((src: string, i: number) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === currentSlide ? 1 : 0 }}
              >
                <img src={src} alt={`Screen ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {/* Screen glare */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
              }}
            />
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-16 h-[4px] rounded-full bg-zinc-500 z-20" />
        </div>
      </div>

      {/* ── Pagination dots ── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {screens.map((_: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-5 h-2 bg-indigo-400"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Info ── */}
      <div className="mt-5 text-center">
        <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Website / WebApp Browser Mockup Card ─────────────────────────────────────

function WebsiteCard({
  project,
  idx,
}: {
  project: typeof PROJECTS[0] & { screens?: string[] };
  idx: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const screens = (project as any).screens ?? [project.image];
  const total = screens.length;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((s) => (s - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((s) => (s + 1) % total);
  };

  const fakeUrl = `${project.category === "webapp" ? "app" : "www"}.${project.client.toLowerCase().replace(/\s+/g, "")}.com`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      className="flex flex-col items-center group"
    >
      {/* ── Browser shell ── */}
      <div className="relative w-full px-6">
        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 hover:bg-zinc-700 transition-all z-20"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 hover:bg-zinc-700 transition-all z-20"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}

        <div
          className="w-full rounded-2xl overflow-hidden border border-zinc-700/80"
          style={{ boxShadow: "0 0 0 1px #27272a, 0 40px 100px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          {/* Browser chrome */}
          <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-3 flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Nav arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-4 h-4 flex items-center justify-center text-zinc-500">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2"><polyline points="15 18 9 12 15 6" /></svg>
              </div>
              <div className="w-4 h-4 flex items-center justify-center text-zinc-500">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            </div>
            {/* Address bar */}
            <div className="flex-1 bg-zinc-900/80 border border-zinc-700/60 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-zinc-500 stroke-2 shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
              <span className="text-[11px] text-zinc-400 truncate font-mono tracking-tight">{fakeUrl}</span>
            </div>
            {/* Reload + share icons */}
            <div className="flex items-center gap-1.5 shrink-0 text-zinc-500">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
            </div>
          </div>

          {/* Viewport — 16:10 */}
          <div className="relative" style={{ aspectRatio: "16/10", background: "#060609" }}>
            {screens.map((src: string, i: number) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === currentSlide ? 1 : 0 }}
              >
                <img src={src} alt={`Screen ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {/* Glare */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)" }}
            />
            {/* Scrollbar */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-zinc-900/50">
              <div className="mt-2 mx-auto w-1 h-12 rounded-full bg-zinc-600/60" />
            </div>
          </div>

          {/* Status bar */}
          <div className="bg-zinc-800/70 border-t border-zinc-700/50 px-4 py-1.5 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-mono">{project.tag}</span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-600">Screen {currentSlide + 1} of {total}</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                <span className="text-[10px] text-zinc-600">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pagination dots ── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {screens.map((_: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-5 h-2 bg-sky-400"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Title only ── */}
      <div className="mt-3 text-center">
        <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Yanisa Horizontal Video Card ────────────────────────────────────────────

// ─── Yanisa Horizontal Video Card ────────────────────────────────────────────

// ─── Yanisa Horizontal Video Card ────────────────────────────────────────────

function HorizontalVideoCard({
  video,
  idx,
  activeVideoId,
  setActiveVideoId,
  onOpenModal,
}: {
  video: typeof YANISA_HORIZONTAL[0];
  idx: number;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  onOpenModal: (data: { file: string; title: string; tag: string; isReel?: boolean }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = activeVideoId === video.id;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else if (isPlaying) {
            videoRef.current?.pause();
            setActiveVideoId(null);
          }
        });
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaying, setActiveVideoId]);

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setActiveVideoId(null);
    } else {
      setActiveVideoId(video.id);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideoId(null);
    onOpenModal({
      file: video.file,
      title: video.title,
      tag: video.tag,
      isReel: false,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
      className="glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 group"
    >
      {/* 16:9 video player */}
      <div className="relative aspect-video bg-zinc-950 overflow-hidden">
        <video
          ref={videoRef}
          src={isInView ? `${video.file}#t=0.1` : undefined}
          className="w-full h-full object-cover"
          preload={isInView ? "metadata" : "none"}
          playsInline
          onEnded={() => setActiveVideoId(null)}
          onClick={togglePlay}
        />

        {/* Play / Pause overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group/play"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover/play:scale-110 group-hover/play:bg-white/20 transition-all duration-300">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Fullscreen btn */}
        <button
          onClick={handleFullscreen}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 transition-all z-10"
          title="Play Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 leading-snug">{video.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{video.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Yanisa Reel Card (vertical 9:16) ────────────────────────────────────────

function ReelCard({
  reel,
  idx,
  activeVideoId,
  setActiveVideoId,
  onOpenModal,
}: {
  reel: typeof YANISA_REELS[0];
  idx: number;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  onOpenModal: (data: { file: string; title: string; tag: string; isReel?: boolean }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = activeVideoId === reel.id;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else if (isPlaying) {
            videoRef.current?.pause();
            setActiveVideoId(null);
          }
        });
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaying, setActiveVideoId]);

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setActiveVideoId(null);
    } else {
      setActiveVideoId(reel.id);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideoId(null);
    onOpenModal({
      file: reel.file,
      title: reel.title,
      tag: reel.tag,
      isReel: true,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
      className="glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 group flex flex-col"
    >
      {/* 9:16 vertical reel container */}
      <div className="relative bg-zinc-950 overflow-hidden" style={{ aspectRatio: "9/16" }}>
        <video
          ref={videoRef}
          src={isInView ? `${reel.file}#t=0.1` : undefined}
          className="w-full h-full object-cover"
          preload={isInView ? "metadata" : "none"}
          playsInline
          onEnded={() => setActiveVideoId(null)}
          onClick={togglePlay}
        />

        {/* Play overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/45 cursor-pointer group/play"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl group-hover/play:scale-110 group-hover/play:bg-white/20 transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Fullscreen icon - ALWAYS visible */}
        <button
          onClick={handleFullscreen}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 transition-all z-10"
          title="Play Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex-1">
        <h3 className="text-sm font-bold text-white mb-1 leading-snug">{reel.title}</h3>
        <p className="text-zinc-500 text-xs leading-relaxed">{reel.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Fullscreen Video Modal Lightbox ──────────────────────────────────────────

function FullscreenVideoModal({
  videoData,
  onClose,
}: {
  videoData: { file: string; title: string; tag: string; isReel?: boolean } | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!videoData || !mounted) return null;

  const isMediaVideo = videoData.file.endsWith(".mov") || videoData.file.endsWith(".mp4");

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-8"
        onClick={onClose}
      >
        {/* Fixed Top-Right Close Button above everything */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 w-12 h-12 rounded-full bg-zinc-800/90 border border-zinc-600 text-white flex items-center justify-center hover:bg-zinc-700 hover:scale-110 transition-all z-[100000] shadow-2xl"
          title="Close (Esc)"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex flex-col items-center justify-center max-h-[92vh] max-w-[95vw]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Media Container */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-2xl max-h-[82vh]">
            {isMediaVideo ? (
              <video
                src={videoData.file}
                controls
                autoPlay
                playsInline
                className={`max-h-[82vh] object-contain rounded-xl ${
                  videoData.isReel ? "aspect-[9/16] h-[82vh] w-auto" : "w-auto h-auto max-h-[82vh] max-w-[85vw]"
                }`}
              />
            ) : (
              <img
                src={videoData.file}
                alt={videoData.title}
                className="max-h-[82vh] max-w-[85vw] object-contain rounded-xl"
              />
            )}
          </div>

          {/* Video Title */}
          <div className="mt-4 text-center">
            <h4 className="text-base md:text-lg font-bold text-white">{videoData.title}</h4>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [modalVideoData, setModalVideoData] = useState<{
    file: string;
    title: string;
    tag: string;
    isReel?: boolean;
  } | null>(null);

  const filtered =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-36 pb-20">

      {/* ── Hero Header ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-16 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-6"
        >
          Our Portfolio
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-sans font-normal leading-tight text-white mb-6 max-w-5xl"
        >
          Videos, Sites & Apps That{" "}
          <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
            Stop the Scroll
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          From cinematic trailers and viral reels to AI ad campaigns and full-stack apps — browse our complete portfolio below.
        </motion.p>
      </section>

      {/* ── Filter Tabs ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-5 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 touch-manipulation ${
                activeCategory === cat.id
                  ? "bg-zinc-800 text-white font-bold border border-zinc-500 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                  : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── General Projects Grid ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <AnimatePresence mode="popLayout">
          {activeCategory === "all" ? (
            <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
              {CATEGORIES.filter((cat) => cat.id !== "all").map((cat, catIdx) => {
                return (
                  <div key={cat.id} className={catIdx === 0 ? "pt-0" : "pt-6"}>
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-7 rounded-full bg-gradient-to-b from-sky-400 to-cyan-500" />
                      <h3 className="text-2xl font-bold text-white">{cat.label}</h3>
                    </div>

                    {/* Section Grid */}
                    {cat.id === "reels" ? (
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {PROJECTS.filter((p) => p.category === "reels").map((project, idx) => (
                          <ReelCard
                            key={project.id}
                            reel={project as any}
                            idx={idx}
                            activeVideoId={activeVideoId}
                            setActiveVideoId={setActiveVideoId}
                            onOpenModal={(data) => setModalVideoData(data)}
                          />
                        ))}
                      </div>
                    ) : cat.id === "mobile" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {PROJECTS.filter((p) => p.category === "mobile").map((project, idx) => (
                          <MobileAppCard key={project.id} project={project as any} idx={idx} />
                        ))}
                      </div>
                    ) : cat.id === "website" || cat.id === "webapp" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {PROJECTS.filter((p) => p.category === cat.id).map((project, idx) => (
                          <WebsiteCard key={project.id} project={project as any} idx={idx} />
                        ))}
                      </div>
                    ) : cat.id === "longvideo" || cat.id === "aivideo" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {PROJECTS.filter((p) => p.category === cat.id).map((project, idx) => (
                          <HorizontalVideoCard
                            key={project.id}
                            video={project as any}
                            idx={idx}
                            activeVideoId={activeVideoId}
                            setActiveVideoId={setActiveVideoId}
                            onOpenModal={(data) => setModalVideoData(data)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {PROJECTS.filter((p) => p.category === cat.id).map((project, idx) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            idx={idx}
                            onOpenModal={(data) => setModalVideoData(data)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              className={`grid gap-6 ${
                activeCategory === "reels"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : activeCategory === "mobile"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : activeCategory === "website" || activeCategory === "webapp"
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filtered.map((project, idx) =>
                    project.category === "reels" ? (
                      <ReelCard
                        key={project.id}
                        reel={project as any}
                        idx={idx}
                        activeVideoId={activeVideoId}
                        setActiveVideoId={setActiveVideoId}
                        onOpenModal={(data) => setModalVideoData(data)}
                      />
                    ) : project.category === "mobile" ? (
                      <MobileAppCard key={project.id} project={project as any} idx={idx} />
                    ) : project.category === "website" || project.category === "webapp" ? (
                      <WebsiteCard key={project.id} project={project as any} idx={idx} />
                    ) : (project as any).file ? (
                      <HorizontalVideoCard
                        key={project.id}
                        video={project as any}
                        idx={idx}
                        activeVideoId={activeVideoId}
                        setActiveVideoId={setActiveVideoId}
                        onOpenModal={(data) => setModalVideoData(data)}
                      />
                    ) : (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        idx={idx}
                        onOpenModal={(data) => setModalVideoData(data)}
                      />
                    )
                  )}
            </motion.div>
          )}
        </AnimatePresence>
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-zinc-500">
            No projects in this category yet.
          </motion.div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* ── YANISA COMPANY SPOTLIGHT ─────────────────────────────── */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="py-24 border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6">

          {/* Yanisa Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4"
              >
                Company Spotlight
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-sans font-normal leading-tight text-white"
              >
                All Work We Did for{" "}
                <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                  Yanisa
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 text-base leading-relaxed mt-4 max-w-xl"
              >
                A full content partnership — 3 cinematic horizontal videos and 12 viral reels, all produced and edited by BigToast.
              </motion.p>
            </div>

            {/* Professional Enterprise Partner Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="shrink-0"
            >
              <div className="glass-card-charcoal border border-zinc-700/80 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-sky-600 flex items-center justify-center font-extrabold text-zinc-950 text-xl shadow-md">
                  Y
                </div>
                <div>
                  <span className="text-white font-bold text-base block leading-tight">Yanisa Media</span>
                  <span className="text-xs text-sky-400 font-semibold tracking-wide">Featured Enterprise Partnership</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Section 1: Horizontal Videos ─────────────────────── */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-sky-400 to-cyan-500" />
              <h3 className="text-2xl font-bold text-white">Horizontal Videos</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {YANISA_HORIZONTAL.map((video, idx) => (
                <HorizontalVideoCard
                  key={video.id}
                  video={video}
                  idx={idx}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                  onOpenModal={(data) => setModalVideoData(data)}
                />
              ))}
            </div>
          </div>

          {/* ── Section 2: Reels ──────────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-sky-400 to-cyan-500" />
              <h3 className="text-2xl font-bold text-white">Reels & Short-Form</h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {YANISA_REELS.map((reel, idx) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  idx={idx}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                  onOpenModal={(data) => setModalVideoData(data)}
                />
              ))}
            </div>
          </div>

          {/* Partnership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 glass-card-charcoal rounded-3xl p-8 border border-zinc-700/60 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-white font-bold text-xl mb-1">Want to build distribution and visibility through content?</p>
              <p className="text-zinc-400 text-sm">We handle your entire content ecosystem — reels, films, websites, and apps — under one creative team.</p>
            </div>
            <PrimaryButton text="Start a Partnership" href="/contact-us" showArrow={true} />
          </motion.div>

        </div>
      </section>

      {/* Fullscreen Video Modal Lightbox */}
      <FullscreenVideoModal
        videoData={modalVideoData}
        onClose={() => setModalVideoData(null)}
      />

      <CTABanner />
    </div>
  );
}
