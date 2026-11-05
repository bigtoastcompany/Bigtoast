"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";

const FOOTER_NAV = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Services", href: "/service" },
  { name: "Projects", href: "/project" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="min-h-screen flex flex-col justify-between relative border-t border-zinc-800 bg-[#131317] pt-20 pb-4 overflow-hidden">
      {/* Background Grid & Charcoal Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-between flex-grow">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-6 pt-4 border-b border-zinc-800/80">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 shrink-0">
                <Image
                  src="/logo.png"
                  alt="BigToast Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </div>
              <span className="text-lg md:text-xl font-serif italic font-normal tracking-normal bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                BigToastCompany
              </span>
            </Link>
            <p className="text-zinc-400 text-xs md:text-sm max-w-sm leading-relaxed">
              Big Toast Company helps founders, creators, and brands build distribution and visibility through content — turning ideas into stories people want to watch, remember, and share.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4 p-0 list-none text-xs">
              {FOOTER_NAV.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2.5">
              Subscribe to Insights
            </h4>
            <p className="text-zinc-400 text-xs mb-3">
              Get our monthly insights on storytelling, content, and creative direction.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 flex items-center justify-center text-white font-bold shrink-0 transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4 text-sky-400" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar & Social Icons */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] md:text-xs text-zinc-400 gap-4 border-b border-zinc-800/80">
          <div className="text-center sm:text-left">
            <span>© 2026 Big Toast Company. All rights reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/bigtoastcompany/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all hover:scale-105"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/himanshuworkshere/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:bigtoastcompany@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              title="Direct Email (Gmail)"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all hover:scale-105"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GIANT "BIGTOAST" DISPLAY TYPOGRAPHY WITH ELEGANT CHARCOAL FADE */}
        <div className="pt-3 pb-1 text-center overflow-hidden select-none cursor-default">
          <h1 className="text-[12vw] leading-none font-serif italic tracking-tight uppercase font-normal bg-gradient-to-b from-zinc-200 via-sky-300/60 to-transparent bg-clip-text text-transparent transform scale-y-105 opacity-70 transition-opacity hover:opacity-100 duration-500">
            BIGTOAST
          </h1>
        </div>
      </div>
    </footer>
  );
}
