"use client";

import { motion } from "framer-motion";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import CTABanner from "@/components/CTABanner";

export default function ServicesPage() {
  return (
    <div className="pt-36">
      <section className="max-w-7xl mx-auto px-6 mb-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-6"
        >
          Our Capabilities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-sans font-normal leading-tight text-white mb-6 max-w-4xl"
        >
          Storytelling &amp; Content Crafted for{" "}
          <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
            Maximum Impact
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-paragraph text-lg max-w-2xl leading-relaxed"
        >
          From strategic narrative design and high-retention video editing to podcast production, custom websites, web apps, and mobile development — explore how BigToast transforms digital presences.
        </motion.p>
      </section>

      <ServicesSection singleColumn={true} hideHeader={true} />
      <PricingSection />
      <CTABanner />
    </div>
  );
}
