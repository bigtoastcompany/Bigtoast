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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CTABanner from "@/components/CTABanner";
import PrimaryButton from "@/components/PrimaryButton";

// ─── General Portfolio Data ───────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "reels", label: "Founder Stories" },
  { id: "longvideo", label: "Podcast Work" },
  { id: "aivideo", label: "AI Projects" },
  { id: "website", label: "Websites" },
  { id: "webapp", label: "Web Apps" },
  { id: "mobile", label: "Mobile Apps" },
];

const PROJECTS = [
  { id: "re-snitch", category: "reels", title: "Snitch — Fast-Paced D2C Drop", client: "Snitch", year: "2026", file: "/snitch.mp4", tag: "Fashion Reel", description: "High-retention menswear campaign reel for Snitch featuring rapid-fire cuts, streetwear energy, and punchy transitions." },
  { id: "re-divya-01", category: "reels", title: "Divya — Perspectives on Growth", client: "Divya", year: "2026", file: "/divya 1.mp4", tag: "Creator Story", description: "Engaging personal brand short video highlighting mindset, focus, and modern creator lessons." },
  { id: "re-mokobara", category: "reels", title: "Mokobara — Going Places", client: "Mokobara", year: "2026", file: "/mokobara.mp4", tag: "D2C Brand Film", description: "Premium cinematic commercial reel for Mokobara travel gear with seamless whip-pans and aspirational energy." },
  { id: "re-karishma-01", category: "reels", title: "Karishma — Defining Moments", client: "Karishma", year: "2026", file: "/karishma 1.mp4", tag: "Lifestyle Reel", description: "Vibrant lifestyle reel with punchy transitions, trending sound design, and clean typography." },
  { id: "re-arezou", category: "reels", title: "Arezou — Pure Botanical Luxury", client: "Arezou", year: "2026", file: "/Arezou.mp4", tag: "Beauty Campaign", description: "Sensory beauty & skincare film with delicate lighting, macro textures, and calming sound atmosphere." },
  { id: "re-shrishti-01", category: "reels", title: "Shrishti — Crafting Your Edge", client: "Shrishti", year: "2026", file: "/Shrishti 1.mp4", tag: "Founder Story", description: "Thought-provoking short format discussion on founder resilience, market differentiation, and authentic value." },
  { id: "re-faceoil", category: "reels", title: "Best Face Oil — Product Showcase", client: "D2C Brand", year: "2026", file: "/Best face oil.mp4", tag: "Product Reel", description: "High-impact beauty & skincare product reel with macro detail shots and aesthetic color grade." },
  { id: "re-01", category: "reels", title: "Why People Feel They Are Not Successful", client: "Short Form", year: "2026", file: "/why people feel they are not successful.mp4", tag: "Motivation Reel", description: "Deep dive short-form reel on mindset, growth, and overcoming career plateau." },
  { id: "re-superyou", category: "reels", title: "Superyou — Elevate Everyday", client: "Superyou", year: "2026", file: "/superyou.mp4", tag: "Brand Campaign", description: "Cinematic commercial reel celebrating health, wellbeing, and vibrant lifestyle choices." },
  { id: "re-divya-02", category: "reels", title: "Divya — Embracing the Journey", client: "Divya", year: "2026", file: "/divya 2.mp4", tag: "Creator Story", description: "Dynamic short reel featuring candid life reflections, sharp pacing, and relatable messaging." },
  { id: "re-metrogini", category: "reels", title: "Metrogini — Urban Pulse", client: "Metrogini", year: "2026", file: "/Metrogini.mp4", tag: "Commercial Reel", description: "High-octane urban commercial cut with kinetic typography, beat synchronization, and slick sound design." },
  { id: "re-karishma-02", category: "reels", title: "Karishma — Daily Creative Flow", client: "Karishma", year: "2026", file: "/karishma 2.mp4", tag: "Lifestyle Reel", description: "Snappy daily routine and lifestyle video formatted for maximum watch time and social shares." },
  { id: "re-18", category: "reels", isReel: true, title: "Yanisa — Dubai Tower Showcase", client: "Yanisa Media", year: "2026", file: "/DUBAI TOWER.I.mp4", tag: "Brand Reel", description: "Architectural vertical showcase featuring Dubai Tower visuals synced to soundtrack." },
  { id: "re-shrishti-02", category: "reels", title: "Shrishti — Creative Consistency", client: "Shrishti", year: "2026", file: "/shrishti 2.mp4", tag: "Founder Story", description: "Fast-moving insights reel breaking down daily creative habits and sustainable output." },
  { id: "re-chapter-02", category: "reels", title: "Chapter 2 — The Next Horizon", client: "Creator Brand", year: "2026", file: "/chapter 2.mp4", tag: "Narrative Reel", description: "Compelling narrative short form video exploring life chapters, perspective shifts, and personal reinvention." },
  { id: "re-02", category: "reels", title: "Talking to Strangers", client: "Short Form", year: "2026", file: "/Talking to strangers (1).mp4", tag: "Social Reel", description: "Engaging streetwear / interview style short form video cut." },
  { id: "re-divya-03", category: "reels", title: "Divya — Finding Your Focus", client: "Divya", year: "2026", file: "/divya 3.mp4", tag: "Creator Story", description: "High-retention reel exploring priority management, career clarity, and authentic voice." },
  { id: "re-stories", category: "reels", title: "Stories That Resonate", client: "Big Toast Studio", year: "2026", file: "/Stories.mov", tag: "Brand Narrative", description: "Visual manifesto reel exploring the emotional power of human storytelling in modern digital media." },
  { id: "re-10", category: "reels", title: "Best Date", client: "Short Form", year: "2026", file: "/best date.mp4", tag: "Lifestyle Reel", description: "Vibrant lifestyle reel with smooth camera pans and trending audio." },
  { id: "re-logo", category: "reels", title: "Big Toast — Logo Identity & Motion", client: "Brand Identity", year: "2026", file: "/logo.mov", tag: "Motion Design", description: "Animated visual brand ident showcasing fluid motion, glass textures, and sound design." },
  { id: "re-06", category: "reels", title: "Brihas Quotient", client: "Short Form", year: "2026", file: "/brihas-qoutient-wc.mp4", tag: "Promo Reel", description: "Dynamic brand feature reel with beat sync cuts and custom graphics." },
  { id: "re-12", category: "reels", title: "Fox 1 Fin", client: "Short Form", year: "2026", file: "/fox 1 fin.mp4", tag: "Cinematic Reel", description: "Cinematic vertical edit with dynamic lighting and atmospheric grade." },
  { id: "re-20", category: "reels", isReel: true, title: "Yanisa — GAAS Social Reel", client: "Yanisa Media", year: "2026", file: "/gaas.mp4", tag: "Social Reel", description: "High-energy social reel with bold typography, color pop effects, and snappy edits." },
  { id: "re-03", category: "reels", title: "Rat Race", client: "Short Form", year: "2026", file: "/rat race.mp4", tag: "Mindset Reel", description: "Fast-paced commentary reel exploring modern lifestyle & career hustle." },
  { id: "re-17", category: "reels", isReel: true, title: "Yanisa — Beatsync Reel", client: "Yanisa Media", year: "2026", file: "/beatsync.mp4", tag: "Beat Sync Reel", description: "Precision beat-synced reel with frame-perfect cuts timed to music drops." },
  { id: "re-11", category: "reels", title: "Dads", client: "Short Form", year: "2026", file: "/dads.mp4", tag: "Family Reel", description: "Relatable humor and family storytelling short form video format." },
  { id: "re-16", category: "reels", title: "Stuck", client: "Short Form", year: "2026", file: "/Stuck.mp4", tag: "Motivation Reel", description: "Dynamic short video on overcoming creative and mental blocks." },
  { id: "re-13", category: "reels", title: "Reel 4 BR", client: "Short Form", year: "2026", file: "/Reel 4 BR.mp4", tag: "Creative Reel", description: "Creative visual sequence with seamless whip-pan transitions." },
  { id: "re-04", category: "reels", title: "Intelligent Decision", client: "Short Form", year: "2026", file: "/Intelligent Decision.mp4", tag: "Business Reel", description: "High-impact business insights reel with crisp typography and motion graphics." },
  { id: "re-21", category: "reels", isReel: true, title: "Yanisa — Lata Mangeshkar Tribute", client: "Yanisa Media", year: "2026", file: "/lata mangeshkar new.mp4", tag: "Tribute Reel", description: "Emotional tribute reel with soft color grading, archival-style edits, and subtle overlays." },
  { id: "re-15", category: "reels", title: "Connect With Yourself", client: "Short Form", year: "2026", file: "/connect-with-yourself.mp4", tag: "Mindset Reel", description: "Reflective short-form reel on self-connection and personal clarity." },
  { id: "re-08", category: "reels", title: "Brihas Promo 1", client: "Short Form", year: "2026", file: "/brihas-promo 1.mp4", tag: "Brand Reel", description: "Polished promotional reel highlighting product features and brand aesthetic." },
  { id: "re-19", category: "reels", isReel: true, title: "Yanisa — Event Promo Reel", client: "Yanisa Media", year: "2026", file: "/EVENT PROMO.mp4", tag: "Event Reel", description: "Vertical event highlight reel with high-energy cuts and launch announcements." },
  { id: "re-07", category: "reels", title: "Rapid Fire", client: "Short Form", year: "2026", file: "/rapid-fire-.mp4", tag: "Q&A Reel", description: "High-energy Q&A rapid fire format reel built for social media engagement." },
  { id: "re-09", category: "reels", title: "Brihas Promo 2", client: "Short Form", year: "2026", file: "/brihas-promo-2.mp4", tag: "Brand Reel", description: "Follow-up brand reel cut with rhythm sync and punchy sound design." },
  { id: "re-22", category: "reels", isReel: true, title: "Yanisa — Overtime Reel", client: "Yanisa Media", year: "2026", file: "/OVERTIME_.mp4", tag: "Motivation Reel", description: "Late-night hustle themed reel with moody grading and motivational text overlays." },
  { id: "re-14", category: "reels", title: "Reel 8 BR", client: "Short Form", year: "2026", file: "/Reel 8 BR.mp4", tag: "Creative Reel", description: "High-octane montage reel with frame-by-frame sound effects." },
  { id: "re-05", category: "reels", title: "End of Life", client: "Short Form", year: "2026", file: "/end of life.mp4", tag: "Storytelling Reel", description: "Cinematic short story reel with atmospheric sound design and color grade." },
  { id: "lv-01", category: "longvideo", title: "Yanisa — Podcast & Brand Film", client: "Yanisa Media", year: "2026", duration: "48:00", tag: "Podcast Video", file: "/Copy of TRAILER 1 tiptop.mp4", description: "Full episode podcast edit & brand film with multi-cam switching and custom sound design." },
  { id: "lv-02", category: "longvideo", title: "Yanisa — Event & Keynote Reel", client: "Yanisa Media", year: "2025", duration: "12:40", tag: "Brand Documentary", file: "/Copy of event promo final.mp4", description: "High-energy event documentary and keynote recording with lower-thirds and color grade." },
  {
    id: "lv-03",
    category: "longvideo",
    title: "Yanisa — Podcast Trailer ONE",
    client: "Yanisa Media",
    year: "2026",
    duration: "1:59",
    tag: "Podcast Trailer",
    file: "/trailer ONE.mov",
    description: "Cinematic podcast teaser trailer featuring in-depth dialogue and multi-cam studio production.",
  },
  {
    id: "lv-yt-01",
    category: "longvideo",
    title: "The WILDEST Secrets That Made Couples 10X BETTER In Bed!",
    client: "The Good Gobar Show",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/5PHp4CA5GTY?si=doQ4xX_1RD4Ru-D-",
    youtubeId: "5PHp4CA5GTY",
    description: "Deep dive relationship and intimacy conversation featuring candid relationship insights and expert guidance.",
  },
  {
    id: "lv-yt-02",
    category: "longvideo",
    title: "How Kishore Kumar Proved Every Music Director Wrong",
    client: "The Good Gobar Show",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/a6x-h0YBbRg?si=xupP9aEDbxq7APE9",
    youtubeId: "a6x-h0YBbRg",
    description: "Untold struggles, triumphs, and the legendary journey of Kishore Kumar with storyteller Gaurav Sharma.",
  },
  {
    id: "lv-yt-03",
    category: "longvideo",
    title: "Hidden Struggles of Boys During Puberty",
    client: "The Good Gobar Show",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/Al-eus6jPGc?si=OgeRRjSZdCJgZiXL",
    youtubeId: "Al-eus6jPGc",
    description: "An insightful discussion with Anju Kish breaking down puberty, emotional changes, and teenage growth.",
  },
  {
    id: "lv-yt-04",
    category: "longvideo",
    title: "Why India Kept Losing World Cups? Anjum Chopra Unfiltered",
    client: "The Good Gobar Show",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/djm31XZCVn8?si=U9x1M-jYq_9DCiv9",
    youtubeId: "djm31XZCVn8",
    description: "Former Indian women's cricket captain Anjum Chopra shares raw, unfiltered insights into cricket and elite performance.",
  },
  {
    id: "lv-yt-05",
    category: "longvideo",
    title: "Will AI Replace Sales Jobs? Truth No One Tells",
    client: "The Good Gobar Show",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/OF8jW_B2XD8?si=tXyn-wZ4gusc7sEM",
    youtubeId: "OF8jW_B2XD8",
    description: "The reality of Artificial Intelligence disrupting sales careers, modern revenue generation, and future-proof skills.",
  },
  {
    id: "lv-yt-06",
    category: "longvideo",
    title: "How Coworking Spaces ACTUALLY Make Money",
    client: "The Good Gobar Show",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/ToXu4kS6Wnk?si=ArjKvSTcTe1lbqCc",
    youtubeId: "ToXu4kS6Wnk",
    description: "Uncovering the business models, unit economics, and hidden revenue streams powering modern coworking spaces.",
  },
  {
    id: "lv-yt-07",
    category: "longvideo",
    title: "A Psychologist's Take on Modern Dating & Relationship Expectations",
    client: "Desirable Podcast",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/KCwuChZvsFM?si=d6W7S6q1c01SjdYj",
    youtubeId: "KCwuChZvsFM",
    description: "Clinical psychologist Dr. Orion Taraban delves into modern dating dynamics, relationship psychology, and emotional expectations.",
  },
  {
    id: "lv-yt-08",
    category: "longvideo",
    title: "Delhi Air Pollution: The Scientific Reality & Solutions",
    client: "Science & Policy Podcast",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/NfIQCJQdvuI?si=G23G2pFAzdOf_aVs",
    youtubeId: "NfIQCJQdvuI",
    description: "Aerosol and climate researcher Dr. Sachin D. Ghude breaks down the science behind winter smog, stubble burning, and long-term air solutions.",
  },
  {
    id: "lv-yt-09",
    category: "longvideo",
    title: "Before You Get Married, Watch This — Modern Indian Marriage",
    client: "The Journey Within",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/2xpSTxk1Yqg?si=DVnv7lVPhZiWJdKu",
    youtubeId: "2xpSTxk1Yqg",
    description: "Host Shobha Rana and psychologist Dr. Madhumati Singh discuss modern relationships, emotional maturity, and navigating marital expectations.",
  },
  {
    id: "lv-yt-10",
    category: "longvideo",
    title: "The Biggest Regret of Every Dying Person",
    client: "Life Unwired • Brihas AI",
    year: "2026",
    tag: "Podcast Episode",
    externalUrl: "https://youtu.be/scboQImHFfs?si=fRYVMLBfvdDlBC17",
    youtubeId: "scboQImHFfs",
    description: "Dr. Sunny Garg & Rahul Vij explore life's deepest lessons, mortality, clarity of purpose, and avoiding lifelong regret.",
  },
  {
    id: "lv-yt-11",
    category: "longvideo",
    title: "Ancient Water Manifestation Practice & Subconscious Power",
    client: "Dr. Karishma Ahuja",
    year: "2026",
    tag: "Mindset & Wellness",
    externalUrl: "https://youtu.be/z0TzZ0209Zo?si=vgdLpCP2Ohej4GIt",
    youtubeId: "z0TzZ0209Zo",
    description: "Dr. Karishma Ahuja shares emotional transformation techniques, mindfulness principles, and subconscious affirmation practices.",
  },
  { id: "ai-01", category: "aivideo", title: "Yanisa — AI Avatar Ad Campaign", client: "Yanisa Media", year: "2026", duration: "0:30", tag: "AI Avatar", file: "/yanisa AI ad final.mp4", description: "Synthetic AI voiceover integration, AI avatar presentation, and dynamic product callouts." },
  { id: "ai-02", category: "aivideo", title: "Yanisa — AI Generative Content Film", client: "Yanisa Media", year: "2026", duration: "0:45", tag: "Generative AI Film", file: "/AI content film.mp4", description: "AI text-to-video scene generation, visual background extensions, and futuristic overlays." },
  { id: "ai-snneh-01", category: "aivideo", isReel: true, title: "Snneh — AI Workflow & Synthesis (Pt. 1)", client: "Snneh AI", year: "2026", duration: "1:23", file: "/snneh 1.mp4", tag: "AI Creator Reel", description: "Next-gen AI content creation, digital voiceover integration, and dynamic visual narrative." },
  { id: "ai-reel-05", category: "aivideo", isReel: true, title: "Yanisa — AI Agents Reel", client: "Yanisa Media", year: "2026", file: "/AI AGENTS.mp4", tag: "AI Content Reel", description: "AI-themed short-form content reel with futuristic motion graphics and voiceover." },
  { id: "ai-snneh-02", category: "aivideo", isReel: true, title: "Snneh — Digital Persona & Strategy (Pt. 2)", client: "Snneh AI", year: "2026", duration: "0:52", file: "/snneh 2.mp4", tag: "AI Avatar Reel", description: "AI-assisted storytelling with generative background extensions, kinetic subtitles, and fluid pacing." },
  { id: "ai-reel-06", category: "aivideo", isReel: true, title: "Yanisa — Beatsync Reel", client: "Yanisa Media", year: "2026", file: "/beatsync.mp4", tag: "AI Beat Sync", description: "Precision beat-synced reel with frame-perfect cuts timed to music drops." },
  { id: "ai-snneh-03", category: "aivideo", isReel: true, title: "Snneh — Narrative Intelligence (Pt. 3)", client: "Snneh AI", year: "2026", duration: "0:50", file: "/snneh 3.mp4", tag: "Generative AI Reel", description: "High-retention AI content reel exploring synthetic creative direction and modern social hooks." },
  { id: "ai-reel-07", category: "aivideo", isReel: true, title: "Yanisa — Dubai Tower Showcase", client: "Yanisa Media", year: "2026", file: "/DUBAI TOWER.I.mp4", tag: "AI Architectural Reel", description: "Architectural vertical showcase featuring Dubai Tower visuals synced to soundtrack." },
  { id: "ai-snneh-04", category: "aivideo", isReel: true, title: "Snneh — Creative Evolution (Pt. 4)", client: "Snneh AI", year: "2026", duration: "1:39", file: "/snneh 4.mp4", tag: "AI Production Reel", description: "Cinematic vertical AI film blending generative visual concepts, motion design, and audio mastering." },
  { id: "ai-reel-01", category: "aivideo", isReel: true, title: "Yanisa — Set of 7 (Vol. 1)", client: "Yanisa Media", year: "2026", file: "/1set of 7 (1).mp4", tag: "AI Product Reel", description: "First reel in the Yanisa 7-series — fast-paced AI product cuts with trending audio." },
  { id: "ai-reel-02", category: "aivideo", isReel: true, title: "Yanisa — Topper Reel", client: "Yanisa Media", year: "2026", file: "/2.5 topper.mp4", tag: "AI Beat Sync", description: "Quick-hit topper reel with beat-synced transitions and bold text overlays." },
  { id: "ai-reel-03", category: "aivideo", isReel: true, title: "Yanisa — Invisible Clip", client: "Yanisa Media", year: "2026", file: "/2.invisible clip.mp4", tag: "AI Transition Reel", description: "Seamless invisible-cut reel showcasing smooth outfit and product transitions." },
  { id: "ai-reel-04", category: "aivideo", isReel: true, title: "Yanisa — Wig Showcase", client: "Yanisa Media", year: "2026", file: "/4.wig.mp4", tag: "AI Product Showcase", description: "Dynamic product reel featuring wig collection with glam color grading." },
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

// ─── Helper: Check if Project is with Yanisa ──────────────────────────────────

function isYanisaProject(item?: { client?: string; title?: string; tag?: string } | null) {
  if (!item) return false;
  const c = item.client?.toLowerCase() ?? "";
  const t = item.title?.toLowerCase() ?? "";
  const tag = item.tag?.toLowerCase() ?? "";
  return c.includes("yanisa") || t.includes("yanisa") || tag.includes("yanisa");
}

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

  const isReel = project.category === "reels" || (project as any).isReel;
  const isYanisa = isYanisaProject(project);

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

          {/* Yanisa Badge Overlay */}
          {isYanisa && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-950/85 backdrop-blur-md border border-sky-400/50 text-sky-300 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Yanisa
              </span>
            </div>
          )}

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
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
              {project.client} · {project.year}
            </span>
            {isYanisa && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded-full">
                Yanisa
              </span>
            )}
          </div>
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

        {/* Yanisa Badge Overlay */}
        {isYanisa && (
          <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/85 backdrop-blur-md border border-sky-400/40 text-sky-300 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Yanisa Media
            </span>
          </div>
        )}

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
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            {project.client} · {project.year}
          </span>
          {isYanisa && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded-full">
              Yanisa
            </span>
          )}
        </div>
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

// ─── Horizontal Video Card ───────────────────────────────────────────────────

function HorizontalVideoCard({
  video,
  idx,
  activeVideoId,
  setActiveVideoId,
  onOpenModal,
  className = "",
}: {
  className?: string;
  video: {
    id: string;
    file?: string;
    title: string;
    description?: string;
    tag?: string;
    client?: string;
    year?: string;
    duration?: string;
    isReel?: boolean;
    externalUrl?: string;
    youtubeId?: string;
    thumbnail?: string;
  };
  idx: number;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  onOpenModal: (data: { file: string; title: string; tag: string; isReel?: boolean }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = activeVideoId === video.id;
  const [isInView, setIsInView] = useState(false);
  const isYanisa = isYanisaProject(video);
  const isExternal = Boolean(video.externalUrl);

  useEffect(() => {
    if (isExternal) return;
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
  }, [isPlaying, setActiveVideoId, isExternal]);

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isExternal && video.externalUrl) {
      window.open(video.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
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
    if (isExternal && video.externalUrl) {
      window.open(video.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideoId(null);
    if (video.file) {
      onOpenModal({
        file: video.file,
        title: video.title,
        tag: video.tag || (isYanisa ? "Yanisa Media" : "Video"),
        isReel: false,
      });
    }
  };

  const encodedFile = video.file ? encodeURI(video.file) : undefined;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
      className={`glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 group ${className}`}
    >
      {/* 16:9 video player or external thumbnail */}
      <div
        className="relative aspect-video bg-zinc-950 overflow-hidden cursor-pointer group/media"
        onClick={togglePlay}
      >
        {isExternal ? (
          <>
            {/* YouTube Thumbnail */}
            <img
              src={
                video.thumbnail ||
                (video.youtubeId
                  ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
                  : "")
              }
              onError={(e) => {
                if (video.youtubeId) {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                }
              }}
              alt={video.title}
              className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 group-hover/media:bg-black/20 transition-all duration-300" />

            {/* Badge Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/85 backdrop-blur-md border border-red-500/40 text-red-400 shadow-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                YouTube Podcast
              </span>
            </div>

            {/* External link button */}
            <a
              href={video.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:scale-110 hover:border-red-500/50 transition-all z-10"
              title="Watch on YouTube (Opens in new tab)"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-red-600/90 backdrop-blur-md border border-red-400/40 flex items-center justify-center shadow-2xl group-hover/media:scale-110 group-hover/media:bg-red-600 transition-all duration-300">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              src={isInView && encodedFile ? `${encodedFile}#t=0.1` : undefined}
              className="w-full h-full object-cover"
              preload={isInView ? "metadata" : "none"}
              playsInline
              onEnded={() => setActiveVideoId(null)}
              onClick={togglePlay}
            />

            {/* Yanisa Badge Overlay */}
            {isYanisa && (
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/85 backdrop-blur-md border border-sky-400/40 text-sky-300 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Yanisa Media
                </span>
              </div>
            )}

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
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {video.tag || (isExternal ? "YouTube Podcast" : "Featured Video")}
          </span>
          {isYanisa && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2.5 py-0.5 rounded-full">
              ✦ Yanisa Project
            </span>
          )}
          {isExternal && video.externalUrl && (
            <a
              href={video.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400 hover:text-red-300 bg-red-950/60 border border-red-500/30 px-2.5 py-0.5 rounded-full transition-colors"
            >
              Watch on YouTube <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
          {isExternal && video.externalUrl ? (
            <a
              href={video.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors inline-flex items-center gap-1.5"
            >
              {video.title}
            </a>
          ) : (
            video.title
          )}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{video.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Reel Card (vertical 9:16) ───────────────────────────────────────────────

function ReelCard({
  reel,
  idx,
  activeVideoId,
  setActiveVideoId,
  onOpenModal,
  className = "",
}: {
  className?: string;
  reel: {
    id: string;
    file: string;
    title: string;
    description?: string;
    tag?: string;
    client?: string;
    year?: string;
    isReel?: boolean;
  };
  idx: number;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  onOpenModal: (data: { file: string; title: string; tag: string; isReel?: boolean }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = activeVideoId === reel.id;
  const [isInView, setIsInView] = useState(false);
  const isYanisa = isYanisaProject(reel);

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
      tag: reel.tag || (isYanisa ? "Yanisa" : "Reel"),
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
      className={`glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 group flex flex-col ${className}`}
    >
      {/* 9:16 vertical reel container */}
      <div className="relative bg-zinc-950 overflow-hidden" style={{ aspectRatio: "9/16" }}>
        <video
          ref={videoRef}
          src={isInView ? `${encodeURI(reel.file)}#t=0.1` : undefined}
          className="w-full h-full object-cover"
          preload={isInView ? "metadata" : "none"}
          playsInline
          onEnded={() => setActiveVideoId(null)}
          onClick={togglePlay}
        />

        {/* Yanisa Badge Overlay */}
        {isYanisa && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-950/85 backdrop-blur-md border border-sky-400/50 text-sky-300 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Yanisa
            </span>
          </div>
        )}

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
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            {reel.tag || "Short Form"}
          </span>
          {isYanisa && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded-full">
              Yanisa
            </span>
          )}
        </div>
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

  const isMediaVideo = /\.(mov|mp4|webm|ogg)(\?.*)?$/i.test(videoData.file) || videoData.file.startsWith("/") || Boolean(videoData.isReel);

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
                src={encodeURI(videoData.file)}
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


// ─── Horizontal Slider Component ─────────────────────────────────────────────

function HorizontalSlider({
  title,
  subtitle,
  badge,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header with Title and Left/Right Arrows */}
      {(title || badge) && (
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-gradient-to-b from-sky-400 to-cyan-500" />
            <div>
              <div className="flex items-center gap-2.5">
                {title && <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>}
                {badge && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border ${
                canScrollLeft
                  ? "bg-zinc-800/90 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-500 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-600 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border ${
                canScrollRight
                  ? "bg-zinc-800/90 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-500 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-600 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Slider Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-6 pt-1 px-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
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
        <AnimatePresence mode="wait">
          {activeCategory === "all" ? (
            <motion.div key="all" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-16">
              {CATEGORIES.filter((cat) => cat.id !== "all").map((cat, catIdx) => {
                const items = PROJECTS.filter((p) => p.category === cat.id);
                if (items.length === 0) return null;

                if (cat.id === "reels") {
                  return (
                    <HorizontalSlider
                      key={cat.id}
                      title={cat.label}
                      badge={`${items.length} Reels`}
                      subtitle="Swipe horizontally or use arrows to explore founder stories and reels"
                    >
                      {items.map((project, idx) => (
                        <ReelCard
                          key={project.id}
                          reel={project as any}
                          idx={idx}
                          activeVideoId={activeVideoId}
                          setActiveVideoId={setActiveVideoId}
                          onOpenModal={(data) => setModalVideoData(data)}
                          className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
                        />
                      ))}
                    </HorizontalSlider>
                  );
                }

                if (cat.id === "longvideo") {
                  return (
                    <HorizontalSlider
                      key={cat.id}
                      title={cat.label}
                      badge={`${items.length} Videos`}
                      subtitle="Full episode podcast edits, brand films & documentaries"
                    >
                      {items.map((project, idx) => (
                        <HorizontalVideoCard
                          key={project.id}
                          video={project as any}
                          idx={idx}
                          activeVideoId={activeVideoId}
                          setActiveVideoId={setActiveVideoId}
                          onOpenModal={(data) => setModalVideoData(data)}
                          className="w-[340px] sm:w-[420px] md:w-[480px] shrink-0 snap-start"
                        />
                      ))}
                    </HorizontalSlider>
                  );
                }

                if (cat.id === "aivideo") {
                  const aiFilms = items.filter((p) => !(p as any).isReel);
                  const aiReels = items.filter((p) => (p as any).isReel);
                  return (
                    <div key={cat.id} className="space-y-12">
                      <HorizontalSlider
                        title="AI Films"
                        badge={`${aiFilms.length} Films`}
                        subtitle="Generative video & synthetic avatar brand campaigns"
                      >
                        {aiFilms.map((project, idx) => (
                          <HorizontalVideoCard
                            key={project.id}
                            video={project as any}
                            idx={idx}
                            activeVideoId={activeVideoId}
                            setActiveVideoId={setActiveVideoId}
                            onOpenModal={(data) => setModalVideoData(data)}
                            className="w-[340px] sm:w-[420px] md:w-[480px] shrink-0 snap-start"
                          />
                        ))}
                      </HorizontalSlider>

                      <HorizontalSlider
                        title="AI Reels & Short-Form"
                        badge={`${aiReels.length} Reels`}
                        subtitle="Vertical generative AI video edits & beat-synced reels"
                      >
                        {aiReels.map((project, idx) => (
                          <ReelCard
                            key={project.id}
                            reel={project as any}
                            idx={idx}
                            activeVideoId={activeVideoId}
                            setActiveVideoId={setActiveVideoId}
                            onOpenModal={(data) => setModalVideoData(data)}
                            className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
                          />
                        ))}
                      </HorizontalSlider>
                    </div>
                  );
                }

                if (cat.id === "mobile") {
                  return (
                    <HorizontalSlider
                      key={cat.id}
                      title={cat.label}
                      badge={`${items.length} Apps`}
                      subtitle="Native mobile application UI & interactive screen prototypes"
                    >
                      {items.map((project, idx) => (
                        <MobileAppCard
                          key={project.id}
                          project={project as any}
                          idx={idx}
                          className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
                        />
                      ))}
                    </HorizontalSlider>
                  );
                }

                if (cat.id === "website" || cat.id === "webapp") {
                  return (
                    <HorizontalSlider
                      key={cat.id}
                      title={cat.label}
                      badge={`${items.length} Projects`}
                      subtitle="Modern web platforms, interactive dashboards & SaaS applications"
                    >
                      {items.map((project, idx) => (
                        <WebsiteCard
                          key={project.id}
                          project={project as any}
                          idx={idx}
                          className="w-[360px] sm:w-[460px] md:w-[520px] shrink-0 snap-start"
                        />
                      ))}
                    </HorizontalSlider>
                  );
                }

                return null;
              })}
            </motion.div>
          ) : activeCategory === "reels" ? (
            <motion.div key="reels" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <HorizontalSlider
                title="Founder Stories Showcase"
                badge={`${filtered.length} Reels`}
                subtitle="Swipe horizontally or use arrows to explore all founder stories and reels"
              >
                {filtered.map((project, idx) => (
                  <ReelCard
                    key={project.id}
                    reel={project as any}
                    idx={idx}
                    activeVideoId={activeVideoId}
                    setActiveVideoId={setActiveVideoId}
                    onOpenModal={(data) => setModalVideoData(data)}
                    className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
                  />
                ))}
              </HorizontalSlider>
            </motion.div>
          ) : activeCategory === "longvideo" ? (
            <motion.div key="longvideo" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <HorizontalSlider
                title="Podcast Work & Documentaries"
                badge={`${filtered.length} Videos`}
                subtitle="Swipe horizontally or use arrows to browse all podcast episodes and brand films"
              >
                {filtered.map((project, idx) => (
                  <HorizontalVideoCard
                    key={project.id}
                    video={project as any}
                    idx={idx}
                    activeVideoId={activeVideoId}
                    setActiveVideoId={setActiveVideoId}
                    onOpenModal={(data) => setModalVideoData(data)}
                    className="w-[340px] sm:w-[420px] md:w-[480px] shrink-0 snap-start"
                  />
                ))}
              </HorizontalSlider>
            </motion.div>
          ) : activeCategory === "aivideo" ? (
            <motion.div
              key="aivideo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-14"
            >
              {/* AI Films Horizontal Slider */}
              <HorizontalSlider
                title="AI Films"
                badge={`${filtered.filter((p) => !(p as any).isReel).length} Films`}
                subtitle="High-concept generative video & synthetic avatar campaigns"
              >
                {filtered.filter((p) => !(p as any).isReel).map((project, idx) => (
                  <HorizontalVideoCard
                    key={project.id}
                    video={project as any}
                    idx={idx}
                    activeVideoId={activeVideoId}
                    setActiveVideoId={setActiveVideoId}
                    onOpenModal={(data) => setModalVideoData(data)}
                    className="w-[340px] sm:w-[420px] md:w-[480px] shrink-0 snap-start"
                  />
                ))}
              </HorizontalSlider>

              {/* AI Reels & Short-Form Horizontal Slider */}
              <HorizontalSlider
                title="AI Reels & Short-Form"
                badge={`${filtered.filter((p) => (p as any).isReel).length} Reels`}
                subtitle="Vertical generative AI video generation & beat-sync edits"
              >
                {filtered.filter((p) => (p as any).isReel).map((project, idx) => (
                  <ReelCard
                    key={project.id}
                    reel={project as any}
                    idx={idx}
                    activeVideoId={activeVideoId}
                    setActiveVideoId={setActiveVideoId}
                    onOpenModal={(data) => setModalVideoData(data)}
                    className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
                  />
                ))}
              </HorizontalSlider>
            </motion.div>
          ) : activeCategory === "mobile" ? (
            <motion.div key="mobile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <HorizontalSlider
                title="Mobile App Experiences"
                badge={`${filtered.length} Apps`}
                subtitle="Swipe horizontally or use arrows to explore interactive native mobile designs"
              >
                {filtered.map((project, idx) => (
                  <MobileAppCard
                    key={project.id}
                    project={project as any}
                    idx={idx}
                    className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
                  />
                ))}
              </HorizontalSlider>
            </motion.div>
          ) : (
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <HorizontalSlider
                title={activeCategory === "website" ? "Websites & Brand Platforms" : "Web Applications & SaaS"}
                badge={`${filtered.length} Projects`}
                subtitle="Swipe horizontally or use arrows to explore interactive web products"
              >
                {filtered.map((project, idx) => (
                  <WebsiteCard
                    key={project.id}
                    project={project as any}
                    idx={idx}
                    className="w-[360px] sm:w-[460px] md:w-[520px] shrink-0 snap-start"
                  />
                ))}
              </HorizontalSlider>
            </motion.div>
          )}
        </AnimatePresence>
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-zinc-500">
            No projects in this category yet.
          </motion.div>
        )}
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
