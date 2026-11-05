"use client";

function getSafeThumbName(file: string): string {
  const base = file.split("/").pop()?.replace(/\.[^/.]+$/, "") || "";
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_");
}


import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Play,
  Pause,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Volume2,
  VolumeX,
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  type: "video" | "image";
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  rating?: number;
  categoryTag?: string;
  verified?: boolean;
  // Video-specific (for type === "video")
  videoUrl?: string;
  duration?: string;
  // Image-specific (for type === "image")
  image?: string;
}

// ─── Testimonials Data (3 Video Reels + 2 Image Cards = 5 Testimonials Total) ──
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  // ── 1. Video Reel Testimonial: Yash Sanghavi ──
  {
    id: "test-video-yash",
    type: "video",
    name: "Yash Sanghavi",
    role: "Founder",
    company: "Yanisa Execution",
    avatar: "/images/avatars/yash_sanghavi.jpg",
    quote:
      "Big Toast completely understands founder-led storytelling. Their pacing, retention hooks, and high-energy edits took our content performance to another level.",
    rating: 5,
    videoUrl: "/yash_testimonial.mp4",
    duration: "1:35",
    categoryTag: "Founder Story",
    verified: true,
  },
  // ── 2. Video Reel Testimonial: Arezou Botanicals ──
  {
    id: "test-video-arezou",
    type: "video",
    name: "Arezou Botanicals",
    role: "Brand Review",
    company: "Luxury Botanicals",
    avatar: "/images/avatars/arezou_speaker.jpg",
    quote:
      "The aesthetic precision and storytelling for our Anti-Pigmentation Face Oil were outstanding. Big Toast captured the premium feel and real essence of our brand.",
    rating: 5,
    videoUrl: "/arezou_testimonial.mp4",
    duration: "0:28",
    categoryTag: "D2C Brand",
    verified: true,
  },
  // ── 3. Video Reel Testimonial: Client & Founder Story ──
  {
    id: "test-video-client",
    type: "video",
    name: "Growth & Performance",
    role: "Growth Director",
    company: "Direct-to-Consumer",
    avatar: "/images/avatars/client_founder.jpg",
    quote:
      "Finding an editing partner who deeply understands audience psychology and conversion narratives is rare. Big Toast delivers world-class retention and polish every single time.",
    rating: 5,
    videoUrl: "/testimonial_client.mp4",
    duration: "1:43",
    categoryTag: "Client Story",
    verified: true,
  },
  // ── 4. Image Testimonial: Nayan Shah (PetChef) ──
  {
    id: "test-img-nayan",
    type: "image",
    name: "Nayan Shah",
    role: "Co-Founder",
    company: "PetChef",
    avatar: "/images/avatars/nayan_shah.jpg",
    image: "/images/thumbs/nayan_petchef.jpg",
    quote:
      "Working with Himanshu and Big Toast Company has been a great experience for PetChef.\n\nWhat stands out is Himanshu's ability to understand our brand, think creatively and turn our ideas into engaging content. His involvement goes beyond editing. From developing creative concepts and storytelling to visual direction and execution, he takes ownership of the entire process.\n\nWhat I appreciate most is his passion, attention to detail and the initiative he brings to every project. It's exciting to see what he's building with Big Toast Company, and I look forward to seeing it grow.\n\nI'd definitely recommend Himanshu to brands and founders looking for a creative partner who understands more than just content production.",
    rating: 5,
    categoryTag: "Client Review",
    verified: true,
  },
  // ── 5. Image Testimonial: Kaushik Mehta (Ruloans) ──
  {
    id: "test-img-ruloans",
    type: "image",
    name: "Kaushik Mehta",
    role: "Founder & CEO",
    company: "Ruloans",
    avatar: "/images/avatars/kaushik_mehta.jpg",
    image: "/images/thumbs/ruloans_testimonial.jpg",
    quote:
      "Big Toast captured the heart and scale of our 25-year journey with unmatched cinematic clarity. From documenting our leadership vision to showcasing our nationwide loan distribution scale across 4,000+ cities, their commercial podcast and brand documentary truly elevated our brand authority and customer trust.",
    rating: 5,
    categoryTag: "Brand Documentary",
    verified: true,
  },
];

// Helper to extract YouTube ID
function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/i
  );
  return match ? match[1] : null;
}

// ─── Fullscreen Vertical Reel Modal (For Video Testimonials) ──────────────────
function FullscreenReelModal({
  testimonial,
  onClose,
}: {
  testimonial: TestimonialItem | null;
  onClose: () => void;
}) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setPortalNode(document.body);
  }, []);

  useEffect(() => {
    if (!testimonial) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [testimonial, onClose]);

  if (!portalNode || !testimonial) {
    return null;
  }

  const ytId = testimonial.videoUrl ? getYouTubeId(testimonial.videoUrl) : null;
  const isDirectVideo = Boolean(
    testimonial.videoUrl &&
      !ytId &&
      (/\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(testimonial.videoUrl) ||
        testimonial.videoUrl.startsWith("/"))
  );

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#09090d]/90 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Container (9:16 Vertical Reel Shape) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[380px] sm:max-w-[410px] aspect-[9/16] max-h-[92vh] bg-black rounded-3xl overflow-hidden border border-zinc-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 flex flex-col justify-between"
        >
          {/* Top Bar with Badges and Close Button */}
          <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-xs font-semibold text-sky-400">
                {testimonial.categoryTag || "Client Review"}
              </span>
              {testimonial.duration && (
                <span className="text-[11px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded-md">
                  {testimonial.duration}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {isDirectVideo && (
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-sky-400" />
                  )}
                </button>
              )}

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media Container: Video Player or High-Res Image */}
          <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
            {testimonial.type === "image" ? (
              testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : null
            ) : ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                title={testimonial.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : isDirectVideo ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                preload="auto"
                poster={testimonial.videoUrl ? `/images/thumbs/${getSafeThumbName(testimonial.videoUrl)}.jpg` : undefined}
                className="w-full h-full object-cover bg-black"
              >
                <source
                  src={encodeURI(testimonial.videoUrl!)}
                  type="video/mp4"
                />
                <source
                  src={encodeURI(testimonial.videoUrl!)}
                  type="video/quicktime"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={testimonial.videoUrl}
                title={testimonial.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>

          {/* Bottom Overlay with Client Details & Quote */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col gap-2.5 pointer-events-none">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-[11px] font-semibold text-zinc-300 ml-1">
                5.0 Verified Review
              </span>
            </div>

            {/* Quote (Full text scrollable if long) */}
            <div className="max-h-[180px] sm:max-h-[220px] overflow-y-auto pr-1 pointer-events-auto [scrollbar-width:thin]">
              <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium drop-shadow-md">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Client Profile */}
            <div className="flex items-center gap-2.5 pt-1 border-t border-white/10">
              {testimonial.avatar && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-xs truncate">
                    {testimonial.name}
                  </span>
                  {testimonial.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] text-zinc-400 block truncate">
                  {testimonial.role} &bull; {testimonial.company}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    portalNode
  );
}

// ─── Component 1: Video Reel Testimonial Card ─────────────────────────────────
function VideoReelCard({
  item,
  idx,
  activeVideoId,
  setActiveVideoId,
  onOpenModal,
}: {
  item: TestimonialItem;
  idx: number;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  onOpenModal: (t: TestimonialItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = activeVideoId === item.id;
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

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setActiveVideoId(null);
    } else {
      setActiveVideoId(item.id);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideoId(null);
    onOpenModal(item);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (idx % 4) * 0.08 }}
      className="w-[260px] sm:w-[285px] md:w-[310px] shrink-0 snap-start glass-card rounded-3xl overflow-hidden border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 flex flex-col group shadow-xl"
    >
      {/* 9:16 Vertical Reel Video Container */}
      <div
        className="relative bg-zinc-950 overflow-hidden cursor-pointer"
        style={{ aspectRatio: "9/16" }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={isInView && item.videoUrl ? `${item.videoUrl}#t=0.1` : undefined}
          poster={item.videoUrl ? `/images/thumbs/${getSafeThumbName(item.videoUrl)}.jpg` : undefined}
          className="w-full h-full object-cover"
          preload="none"
          playsInline
          onEnded={() => setActiveVideoId(null)}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-[10px] font-semibold text-sky-300 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {item.categoryTag || "Video Review"}
          </span>

          {/* Fullscreen Modal Button */}
          <button
            onClick={handleFullscreen}
            aria-label={`Open ${item.name} video in fullscreen`}
            className="w-8 h-8 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:border-sky-400 hover:scale-110 transition-all shadow-lg pointer-events-auto ml-auto"
            title="Watch Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Glowing Play Button (hidden when playing) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/25 transition-colors z-10 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.7)] group-hover:scale-110 group-hover:bg-sky-400 transition-all duration-300">
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* If Playing: subtle pause overlay on hover */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md">
              <Pause className="w-5 h-5 fill-white" />
            </div>
          </div>
        )}

        {/* Bottom Reel Vignette with Client Quote & Details */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black via-black/85 to-transparent pt-14 flex flex-col justify-end pointer-events-none">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
            <span className="text-[10px] font-semibold text-zinc-300 ml-1">
              5.0
            </span>
          </div>

          {/* Quote snippet */}
          <p className="text-zinc-200 text-xs leading-snug line-clamp-3 mb-2.5 font-medium drop-shadow-sm">
            "{item.quote}"
          </p>

          {/* Client Profile */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/15">
            {item.avatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/25 shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-xs truncate">
                  {item.name}
                </span>
                {item.verified && (
                  <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-zinc-400 block truncate">
                {item.role}, {item.company}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Component 2: Image Testimonial Card (Identical Full-Bleed 9:16 Format) ───
function ImageTestimonialCard({
  item,
  idx,
  onOpenModal,
}: {
  item: TestimonialItem;
  idx: number;
  onOpenModal: (t: TestimonialItem) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (idx % 4) * 0.08 }}
      className="w-[260px] sm:w-[285px] md:w-[310px] shrink-0 snap-start glass-card rounded-3xl overflow-hidden border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 flex flex-col group shadow-xl"
    >
      {/* 9:16 Full-bleed Image Container (identical format to video reel card) */}
      <div
        className="relative bg-zinc-950 overflow-hidden cursor-pointer"
        style={{ aspectRatio: "9/16" }}
        onClick={() => onOpenModal(item)}
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-[10px] font-semibold text-zinc-200 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {item.categoryTag || "Client Review"}
          </span>

          {/* Top-right subtle quote badge matching fullscreen button position */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(item);
            }}
            aria-label={`Read full review from ${item.name}`}
            className="w-8 h-8 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 flex items-center justify-center text-sky-400 hover:text-white hover:border-sky-400 hover:scale-110 transition-all shadow-lg pointer-events-auto ml-auto cursor-pointer"
            title="Read Full Review"
          >
            <Quote className="w-3.5 h-3.5 fill-sky-400/30" />
          </button>
        </div>

        {/* Bottom Reel Vignette with Client Quote & Details (identical to video card) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black via-black/85 to-transparent pt-14 flex flex-col justify-end pointer-events-none">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
            <span className="text-[10px] font-semibold text-zinc-300 ml-1">
              5.0
            </span>
          </div>

          {/* Quote snippet */}
          <p className="text-zinc-200 text-xs leading-snug line-clamp-4 mb-2.5 font-medium drop-shadow-sm">
            "{item.quote}"
          </p>

          {/* Client Profile */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/15">
            {item.avatar && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/25 shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-xs truncate">
                  {item.name}
                </span>
                {item.verified && (
                  <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-zinc-400 block truncate">
                {item.role}, {item.company}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Testimonials Section Component ─────────────────────────────────────
export default function VideoTestimonialsSection({
  testimonials = TESTIMONIALS_DATA,
  className = "",
}: {
  testimonials?: TestimonialItem[];
  className?: string;
}) {
  const [activeModalItem, setActiveModalItem] = useState<TestimonialItem | null>(
    null
  );
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 20);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [testimonials]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 300);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonials"
      className={`relative py-20 bg-zinc-950/40 border-b border-zinc-800/80 overflow-hidden ${className}`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Client Reviews &amp; Stories</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="text-zinc-400 normal-case font-normal text-[11px]">
                Video &amp; Verified Feedback
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-white leading-tight"
            >
              What Founders &amp; Clients Say{" "}
              <span className="font-serif italic bg-gradient-to-r from-zinc-200 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                About Working With Us
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-3"
            >
              Watch firsthand video testimonials and read verified reviews from
              founders, creators, and brands who partner with Big Toast Company.
            </motion.p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous testimonials"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
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
              aria-label="Next testimonials"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
                canScrollRight
                  ? "bg-zinc-800/90 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-500 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-600 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Testimonials Slider (Video Reels + Full-Bleed Image Cards) */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-8 pt-2 px-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item, idx) => {
            if (item.type === "video") {
              return (
                <VideoReelCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                  onOpenModal={(t) => setActiveModalItem(t)}
                />
              );
            }
            return (
              <ImageTestimonialCard
                key={item.id}
                item={item}
                idx={idx}
                onOpenModal={(t) => setActiveModalItem(t)}
              />
            );
          })}
        </div>
      </div>

      {/* Fullscreen Vertical Reel Modal (Only for Video Testimonials) */}
      <FullscreenReelModal
        testimonial={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </section>
  );
}
