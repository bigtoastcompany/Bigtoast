"use client";

import { motion } from "framer-motion";
import BlogSection from "@/components/BlogSection";
import CTABanner from "@/components/CTABanner";

export default function BlogPage() {
  return (
    <div className="pb-16">
      {/* ── SECTION 1: VIDEO EDITING & POST-PRODUCTION ── */}
      <section className="pt-28 pb-8 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Video Editing
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-normal text-white">
              Perspectives on Video Editing &amp;{" "}
              <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                Post-Production Craft
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 max-w-md">
            Explore deep dives into pacing, multi-cam podcast editing, narrative storytelling, and viral short-form retention.
          </p>
        </div>

        {/* 3 Featured Blog Cards */}
        <div className="w-full">
          <BlogSection hideHeader={true} limit={3} />
        </div>
      </section>

      {/* ── SECTION 2: MORE ARTICLES & ARCHIVE ── */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 border-t border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Tech Services
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-normal text-white">
              Perspectives on Tech Services &amp;{" "}
              <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                Digital Engineering
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 max-w-md">
            Explore deep dives into custom high-performance websites, scalable web applications, and native mobile apps.
          </p>
        </div>

        <BlogSection hideHeader={true} offset={3} />
      </section>

      <CTABanner />
    </div>
  );
}
