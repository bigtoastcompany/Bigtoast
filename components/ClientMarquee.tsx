"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BRANDS = [
  {
    name: "Yanisa",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/yanisa.png"
          alt="Yanisa"
          className="max-h-10 md:max-h-12 w-auto max-w-[90%] object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
        />
      </div>
    ),
  },
  {
    name: "FOX Real Estate",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/foxrealestate.png"
          alt="FOX Real Estate"
          className="max-h-10 md:max-h-12 w-auto max-w-[85%] object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
        />
      </div>
    ),
  },
  {
    name: "The Last Laugh",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/thelastlaugh.png"
          alt="The Last Laugh"
          className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform rounded-xl"
        />
      </div>
    ),
  },
  {
    name: "PetChef",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/petchef.png"
          alt="PetChef"
          className="max-h-16 md:max-h-20 w-auto max-w-[90%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
        />
      </div>
    ),
  },
  {
    name: "Arezou",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <div className="flex items-center justify-center bg-white/95 px-3.5 py-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
          <img
            draggable={false}
            src="/images/brands/arezou.png"
            alt="Arezou"
            className="max-h-8 md:max-h-9 w-auto max-w-[150px] object-contain"
          />
        </div>
      </div>
    ),
  },
  {
    name: "FIT CO",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/fitco.png"
          alt="FIT CO"
          className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform rounded-xl"
        />
      </div>
    ),
  },
  {
    name: "Retention Max",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/retentionmax.png"
          alt="Retention Max"
          className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform rounded-xl"
        />
      </div>
    ),
  },
  {
    name: "Good Gobar Show",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/goodgobar.png"
          alt="The Good Gobar Show"
          className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform rounded-full"
        />
      </div>
    ),
  },
  {
    name: "Brand Gold",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/brand_gold.png"
          alt="Brand"
          className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform rounded-2xl"
        />
      </div>
    ),
  },
  {
    name: "1DS",
    logo: (
      <div className="flex items-center justify-center w-full h-full px-3">
        <img
          draggable={false}
          src="/images/brands/1ds.png"
          alt="1DS"
          className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform rounded-full"
        />
      </div>
    ),
  },
];

const TOOLS = [
  {
    name: "Premiere Pro",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105">
          <img draggable={false} src="/images/tools/premiere.jpg"
            alt="Premiere Pro"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          PREMIERE PRO
        </span>
      </div>
    ),
  },
  {
    name: "After Effects",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105">
          <img draggable={false} src="/images/tools/aftereffects.jpg"
            alt="After Effects"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          AFTER EFFECTS
        </span>
      </div>
    ),
  },
  {
    name: "Final Cut Pro",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1">
          <img draggable={false} src="/images/tools/finalcutpro.jpg"
            alt="Final Cut Pro"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          FINAL CUT PRO
        </span>
      </div>
    ),
  },
  {
    name: "CapCut",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1.5">
          <img draggable={false} src="/images/tools/capcut.png"
            alt="CapCut"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          CAPCUT
        </span>
      </div>
    ),
  },
  {
    name: "Filmora",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105">
          <img draggable={false} src="/images/tools/filmora.jpg"
            alt="Filmora"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          FILMORA
        </span>
      </div>
    ),
  },
  {
    name: "Audacity",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1">
          <img draggable={false} src="/images/tools/audacity.jpg"
            alt="Audacity"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          AUDACITY
        </span>
      </div>
    ),
  },
  {
    name: "Audition",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105">
          <img draggable={false} src="/images/tools/audition.png"
            alt="Audition"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          AUDITION
        </span>
      </div>
    ),
  },
  {
    name: "ChatGPT",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1.5">
          <img draggable={false} src="/images/tools/chatgpt.jpg"
            alt="ChatGPT"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          CHATGPT
        </span>
      </div>
    ),
  },
  {
    name: "Claude",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1.5">
          <img draggable={false} src="/images/tools/claude.jpg"
            alt="Claude"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          CLAUDE
        </span>
      </div>
    ),
  },
  {
    name: "DaVinci Resolve",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105">
          <img draggable={false} src="/images/tools/davinciresolve.jpg" alt="DaVinci Resolve" className="w-full h-full object-cover" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          DAVINCI RESOLVE
        </span>
      </div>
    ),
  },
  {
    name: "Vegas Pro",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105">
          <img draggable={false} src="/images/tools/vegaspro.jpg" alt="Vegas Pro" className="w-full h-full object-cover" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          VEGAS PRO
        </span>
      </div>
    ),
  },
  {
    name: "Avid Media Composer",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1">
          <img draggable={false} src="/images/tools/avidmc.jpg" alt="Avid Media Composer" className="w-full h-full object-contain" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          AVID MC
        </span>
      </div>
    ),
  },
  {
    name: "Adobe Photoshop",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 ">
          <img draggable={false} src="/images/tools/photoshop.png" alt="Adobe Photoshop" className="w-full h-full object-cover" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          PHOTOSHOP
        </span>
      </div>
    ),
  },
  {
    name: "Canva",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 ">
          <img draggable={false} src="/images/tools/canva.jpg" alt="Canva" className="w-full h-full object-cover" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          CANVA
        </span>
      </div>
    ),
  },
  {
    name: "Blender",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1">
          <img draggable={false} src="/images/tools/blender.jpg" alt="Blender" className="w-full h-full object-contain" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          BLENDER
        </span>
      </div>
    ),
  },
  {
    name: "OBS Studio",
    logo: (
      <div className="flex items-center gap-3.5 md:gap-4 select-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-105 bg-white p-1">
          <img draggable={false} src="/images/tools/obs.jpg" alt="OBS Studio" className="w-full h-full object-contain" />
        </div>
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-wider font-sans text-zinc-200 whitespace-nowrap group-hover:text-white transition-colors">
          OBS STUDIO
        </span>
      </div>
    ),
  },
];


interface InteractiveMarqueeProps<T> {
  items: T[];
  direction?: "left" | "right";
  speed?: number;
  renderItem: (item: T, key: string) => React.ReactNode;
}

function InteractiveMarquee<T>({
  items,
  direction = "left",
  speed = 1.1,
  renderItem,
}: InteractiveMarqueeProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  const widthRef = useRef(0);
  const xRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        const w = setRef.current.offsetWidth;
        if (w > 0) {
          widthRef.current = w;
          if (xRef.current === 0) {
            xRef.current = direction === "left" ? -w : -2 * w;
            if (trackRef.current) {
              trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
            }
          }
        }
      }
    };

    updateWidth();

    let ro: ResizeObserver | null = null;
    if (setRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateWidth());
      ro.observe(setRef.current);
    }
    window.addEventListener("resize", updateWidth);

    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const deltaMs = now - lastTime;
      lastTime = now;
      const dt = Math.min(deltaMs / 16.667, 2.5);

      const W = widthRef.current;
      if (W > 0) {
        if (!isDraggingRef.current) {
          // Auto-scroll when not dragging; subtle 35% speed while hovering so user has full control
          const currentSpeed = isHoveredRef.current ? speed * 0.35 : speed;
          if (direction === "left") {
            xRef.current -= currentSpeed * dt;
          } else {
            xRef.current += currentSpeed * dt;
          }
        }

        // Seamless wrap-around boundary check
        while (xRef.current <= -2 * W) {
          xRef.current += W;
        }
        while (xRef.current > -W) {
          xRef.current -= W;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateWidth);
      if (ro) ro.disconnect();
    };
  }, [direction, speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.clientX;
    startPosRef.current = xRef.current;
    hasMovedRef.current = false;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 3) {
      hasMovedRef.current = true;
    }

    let newX = startPosRef.current + dx;
    const W = widthRef.current;
    if (W > 0) {
      while (newX <= -2 * W) {
        newX += W;
        startPosRef.current += W;
      }
      while (newX > -W) {
        newX -= W;
        startPosRef.current -= W;
      }
    }
    xRef.current = newX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaX || (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 1) {
      let newX = xRef.current - delta;
      const W = widthRef.current;
      if (W > 0) {
        while (newX <= -2 * W) newX += W;
        while (newX > -W) newX -= W;
      }
      xRef.current = newX;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
      }
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
      }}
      onWheel={onWheel}
      onClickCapture={onClickCapture}
      className={`flex overflow-hidden select-none touch-pan-y ${
        isGrabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div
        ref={trackRef}
        className="flex shrink-0 items-center will-change-transform"
      >
        {[0, 1, 2, 3].map((setIndex) => (
          <div
            key={setIndex}
            ref={setIndex === 0 ? setRef : undefined}
            className="flex gap-6 shrink-0 items-center pr-6"
          >
            {items.map((item, idx) => renderItem(item, `${setIndex}-${idx}`))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section className="py-28 relative border-t border-b border-zinc-800/80 overflow-hidden bg-transparent flex flex-col gap-28 md:gap-36">
      {/* Side Ambient Gradient Fade Masks */}
      <div className="absolute top-0 bottom-0 left-0 w-20 md:w-44 bg-gradient-to-r from-[#131317] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 md:w-44 bg-gradient-to-l from-[#131317] to-transparent z-10 pointer-events-none" />

      {/* ROW 1: TRUSTED BY COMPANIES (SLIDE LEFT) */}
      <div>
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-sans font-normal tracking-tight text-white/90"
          >
            Trusted By{" "}
            <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              Companies.
            </span>
          </motion.h2>
        </div>

        {/* Interactive Draggable Left-Sliding Marquee */}
        <InteractiveMarquee
          items={BRANDS}
          direction="left"
          speed={1.0}
          renderItem={(brand, key) => (
            <div
              key={key}
              className="w-56 md:w-64 h-28 md:h-32 shrink-0 glass-card rounded-2xl flex items-center justify-center group cursor-pointer hover:-translate-y-1.5 transition-all duration-300 border border-zinc-800/90 hover:border-zinc-500/80 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] p-5"
            >
              {brand.logo}
            </div>
          )}
        />
      </div>

      {/* ROW 2: OUR PROFICIENCY IN TOOLS & TECH (SLIDE RIGHT) */}
      <div>
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-sans font-normal tracking-tight text-white/90"
          >
            Our Proficiency in{" "}
            <span className="font-serif italic bg-gradient-to-r from-zinc-300 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              Tools & Tech.
            </span>
          </motion.h2>
        </div>

        {/* Interactive Draggable Right-Sliding Marquee */}
        <InteractiveMarquee
          items={TOOLS}
          direction="right"
          speed={1.1}
          renderItem={(tool, key) => (
            <div
              key={key}
              className="w-60 md:w-72 h-28 md:h-32 shrink-0 glass-card rounded-2xl flex items-center justify-center group cursor-pointer hover:-translate-y-1.5 transition-all duration-300 border border-zinc-800/90 hover:border-zinc-500/80 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] px-5 py-4"
            >
              {tool.logo}
            </div>
          )}
        />
      </div>
    </section>
  );
}
