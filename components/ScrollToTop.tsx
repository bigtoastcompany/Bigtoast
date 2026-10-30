"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 group flex h-[54px] w-[54px] min-w-[54px] items-center justify-center overflow-hidden rounded-full border border-white/20 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:border-sky-300/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.65),0_0_80px_rgba(14,165,233,0.3)] transition-all duration-500 touch-manipulation cursor-pointer select-none"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/80 via-slate-600/90 to-cyan-800 group-hover:from-zinc-400/80 group-hover:via-sky-600/80 group-hover:to-cyan-600 transition-all duration-500" />

          {/* Glossy Top Shine */}
          <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/25 via-white/10 to-transparent rounded-t-full pointer-events-none" />

          {/* Inner Ring Highlight */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 group-hover:ring-white/30 transition-all duration-500 pointer-events-none" />

          <div className="arrow-icon-relative relative z-10 flex items-center justify-center drop-shadow-sm">
            <ArrowUp className="h-5 w-5 text-white" />
          </div>
          <div className="arrow-icon-absolute relative z-10 flex items-center justify-center drop-shadow-sm">
            <ArrowUp className="h-5 w-5 text-white" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
