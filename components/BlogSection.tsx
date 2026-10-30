"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

import { BLOG_POSTS } from "@/lib/blogData";

interface BlogSectionProps {
  limit?: number;
  offset?: number;
  hideHeader?: boolean;
}

export default function BlogSection({ limit, offset = 0, hideHeader = false }: BlogSectionProps) {
  const postsToDisplay = limit
    ? BLOG_POSTS.slice(offset, offset + limit)
    : BLOG_POSTS.slice(offset);

  return (
    <section
      className={`relative bg-transparent ${
        hideHeader
          ? "py-0 w-full"
          : "min-h-screen flex flex-col justify-center pt-24 pb-12 border-t border-zinc-800/80"
      }`}
    >
      <div className={hideHeader ? "w-full" : "max-w-7xl mx-auto px-6 w-full"}>
        {/* Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3"
              >
                Latest Insights
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-sans font-normal leading-tight text-white"
              >
                Thoughts on Storytelling,{" "}
                <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                  Content & Distribution
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <PrimaryButton text="Explore All Articles" href="/blog" showArrow={true} />
            </motion.div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 w-full">
          {postsToDisplay.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block touch-manipulation h-full"
              >
                <div className="glass-card rounded-2xl p-3.5 lg:p-4 flex flex-col justify-between border border-zinc-800 group-hover:border-zinc-600/80 transition-all shadow-[0_12px_40px_rgba(0,0,0,0.4)] h-full">
                  <div>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-2.5">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 px-2 py-0.5 rounded-full text-[10px] font-medium text-zinc-300">
                        {post.category}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-1">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm lg:text-[15px] font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
