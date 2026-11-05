"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  const isDirectVideo =
    /\.(mov|mp4|webm|ogg|m4v)(\?.*)?$/i.test(videoUrl) ||
    videoUrl.startsWith("/") ||
    videoUrl.startsWith("./");

  const formattedUrl = isDirectVideo ? encodeURI(videoUrl) : videoUrl;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Auto-play direct video if open
      if (isDirectVideo && videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay policy might require manual interaction if unmuted
          });
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, isDirectVideo, onClose]);

  if (!portalContainer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop Overlay - completely covers topbar and page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0c0c14]/90 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-black/95 border border-white/25 flex items-center justify-center text-white transition-all backdrop-blur-md shadow-xl hover:scale-110 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isDirectVideo ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-black"
              >
                {videoUrl.toLowerCase().includes("launch") ? (
                  <>
                    <source src="/launch 4k.mp4" type="video/mp4" />
                    <source src="/launch.mp4" type="video/mp4" />
                  </>
                ) : (
                  <source src={formattedUrl.replace(/\.mov$/i, ".mp4")} type="video/mp4" />
                )}
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title="BigToast Showreel"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}
