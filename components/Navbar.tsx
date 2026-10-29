"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Services", href: "/service" },
  { name: "Projects", href: "/project" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ${
          scrolled ? "pt-2.5 sm:pt-3.5" : "pt-4 sm:pt-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`pointer-events-auto transition-all duration-300 rounded-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 ${
              scrolled
                ? "bg-white/[0.06] bg-[#0c0c14]/30 backdrop-blur-xl border border-white/[0.22] shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                : "bg-white/[0.04] bg-[#0c0c14]/15 backdrop-blur-lg border border-white/[0.18] shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group touch-manipulation select-none"
            >
              <div className="relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                <Image
                  src="/logo.png"
                  alt="BigToast Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_14px_rgba(255,255,255,0.2)]"
                  priority
                />
              </div>
              <span className="text-xl sm:text-2xl font-serif italic font-normal tracking-normal bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                BigToastCompany
              </span>
            </Link>

            {/* Floating Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 px-1 py-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-[14px] font-medium transition-colors duration-200 rounded-full touch-manipulation select-none cursor-pointer ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-zinc-700/80 border border-zinc-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 pointer-events-none">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button & Mobile Hamburger */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <PrimaryButton text="Get Started" href="/contact-us" />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="lg:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 rounded-full bg-zinc-800/80 border border-zinc-600 text-white active:bg-zinc-700 transition-colors touch-manipulation"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${
                      mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#131317]/95 backdrop-blur-3xl lg:hidden flex flex-col pt-28 px-8 pb-12 justify-between"
          >
            <div className="flex flex-col gap-5 overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-medium tracking-tight block py-1 ${
                      isActive ? "text-white font-bold" : "text-zinc-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-6 border-t border-zinc-700"
            >
              <PrimaryButton
                text="Get Started"
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full justify-center"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
