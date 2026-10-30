"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowLeft,
  Share2,
  Linkedin,
  Twitter,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Copy,
  Check,
  TrendingUp,
} from "lucide-react";
import { BlogPost } from "@/lib/blogData";
import CTABanner from "@/components/CTABanner";

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative pt-36 pb-20">
      {/* Scroll Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-5xl mx-auto px-6 mb-24">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-sky-300">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl lg:text-6xl font-sans font-normal leading-[1.12] text-white mb-8"
        >
          {post.title}
        </motion.h1>

        {/* Author & Published Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-zinc-800 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-700 shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">
                {post.author.name}
              </span>
              <span className="text-xs text-zinc-400 block">{post.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <span>Published {post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Clock className="w-4 h-4 text-sky-400" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Hero Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-[16/9] rounded-3xl overflow-hidden glass-card p-2 border border-zinc-800 mb-16 shadow-[0_12px_48px_rgba(0,0,0,0.6)]"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Key Takeaways Box */}
        {post.takeaways && post.takeaways.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card-charcoal rounded-3xl p-8 border border-zinc-700/80 mb-16 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider text-xs">
                Key Takeaways & Executive Summary
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.takeaways.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <p className="text-zinc-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stat Callout Banner */}
        {post.statCallout && (
          <div className="mb-16 glass-card rounded-3xl p-8 border border-zinc-800 flex flex-col md:flex-row items-center gap-6 justify-between bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-900/90">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-300 shrink-0">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block mb-1">
                  Impact Metric
                </span>
                <p className="text-zinc-300 text-sm md:text-base max-w-xl">
                  {post.statCallout.label}
                </p>
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-right shrink-0">
              {post.statCallout.value}
            </div>
          </div>
        )}

        {/* Article Body Content & Navigation Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-40 flex flex-col gap-4 p-6 glass-card rounded-2xl border border-zinc-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                Article Outline
              </span>
              <ul className="space-y-3 p-0 list-none text-xs text-zinc-400">
                {post.content.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="hover:text-white transition-colors block line-clamp-1 leading-snug"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-zinc-800/80 mt-2">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider block mb-2">
                  Share Article
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Text */}
          <div className="lg:col-span-9 flex flex-col gap-12 text-zinc-300 text-base md:text-lg leading-relaxed">
            {/* Intro Lead Paragraph */}
            <p className="text-xl md:text-2xl font-normal text-white leading-relaxed border-l-2 border-sky-400 pl-6 py-1 italic font-serif">
              "{post.content.intro}"
            </p>

            {/* Key Quote Callout */}
            {post.content.quote && (
              <div className="glass-card-charcoal rounded-3xl p-8 border border-zinc-700/80 relative overflow-hidden my-2">
                <div className="flex items-start gap-4 relative z-10">
                  <Sparkles className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                  <p className="text-white font-medium text-lg leading-relaxed italic">
                    "{post.content.quote}"
                  </p>
                </div>
              </div>
            )}

            {/* Sections Loop */}
            {post.content.sections.map((sec, idx) => (
              <div key={idx} id={`section-${idx}`} className="flex flex-col gap-5 scroll-mt-36">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-sans flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-bold text-sky-400 flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  {sec.heading}
                </h2>
                <p className="text-zinc-300 leading-relaxed">{sec.body}</p>

                {/* Optional Sub-points */}
                {sec.subPoints && sec.subPoints.length > 0 && (
                  <ul className="space-y-2.5 my-2 pl-2 list-none">
                    {sec.subPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                        <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0 mt-2" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Code Snippet Box */}
                {sec.codeSnippet && (
                  <div className="mt-4 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs md:text-sm">
                    <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-zinc-400">
                      <span className="uppercase text-[11px] font-semibold text-zinc-300">
                        {sec.codeSnippet.language}
                      </span>
                      <button
                        onClick={() => handleCopy(sec.codeSnippet!.code)}
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        {copiedCode === sec.codeSnippet.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-zinc-200 overflow-x-auto leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            {post.content.conclusion && (
              <div className="mt-6 pt-8 border-t border-zinc-800 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">Conclusion & Next Steps</h3>
                <p className="text-zinc-300 leading-relaxed">{post.content.conclusion}</p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Author Bio Card */}
        <div className="mt-20 glass-card rounded-3xl p-8 border border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Written By
            </span>
            <h4 className="text-xl font-bold text-white">{post.author.name}</h4>
            <p className="text-xs font-medium text-zinc-400">{post.author.role}</p>
            <p className="text-sm text-zinc-300 leading-relaxed mt-2">{post.author.bio}</p>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="py-24 border-t border-zinc-800/80 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block mb-2">
              Recommended Reading
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-normal text-white">
              Related <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">Perspectives</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block touch-manipulation"
              >
                <div className="glass-card rounded-3xl p-5 flex flex-col justify-between border border-zinc-800 group-hover:border-zinc-600 transition-all h-full">
                  <div>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 px-3 py-1 rounded-full text-xs font-medium text-zinc-300">
                        {rel.category}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white">
                    <span>Read Article</span>
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
