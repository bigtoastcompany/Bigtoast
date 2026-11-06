"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface PrimaryButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "blind";
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function PrimaryButton({
  text,
  href,
  onClick,
  showArrow = true,
  className = "",
  variant = "primary",
  icon,
  type,
  disabled = false,
}: PrimaryButtonProps) {
  const content = (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Text Container */}
      <div
        className={`relative flex items-center justify-center rounded-full px-6 py-3.5 overflow-hidden transition-all duration-500 ${
          variant === "primary"
            ? "border border-white/30 group-hover:border-sky-300 group-hover:shadow-[0_0_35px_rgba(0,210,255,0.7),0_0_70px_rgba(2,132,199,0.4)]"
            : variant === "secondary"
            ? "border border-white/20 group-hover:border-sky-400/50"
            : "bg-transparent text-white/90 hover:text-white"
        } ${className}`}
      >
        {/* Gradient Background Layer - Smoothly Blended Slate Grey into Robotic Blue */}
        {variant !== "blind" && (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#4b5563_0%,#3b5472_25%,#255885_50%,#1a6b9c_72%,#0284c7_88%,#00d2ff_100%)] group-hover:bg-[linear-gradient(135deg,#5e697a_0%,#46658a_25%,#20699c_50%,#0284c7_75%,#00b4d8_90%,#38bdf8_100%)] transition-all duration-500" />
        )}

        {/* Glossy Top-Shine Overlay */}
        {variant !== "blind" && (
          <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-t-full pointer-events-none" />
        )}

        {/* Inner subtle ring highlight */}
        {variant !== "blind" && (
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30 group-hover:ring-white/50 transition-all duration-500 pointer-events-none" />
        )}

        {/* Text */}
        <div className="btn-text-container relative z-10 min-w-[100px] text-center font-semibold text-[17px] text-white drop-shadow-sm">
          <span className="btn-text-relative">{text}</span>
          <span className="btn-text-absolute font-semibold">{text}</span>
        </div>
      </div>

      {/* Arrow Badge */}
      {showArrow && (
        <div className="relative flex h-[50px] w-[50px] min-w-[50px] items-center justify-center overflow-hidden rounded-full border border-white/30 text-white transition-all duration-500 group-hover:border-sky-300 group-hover:shadow-[0_0_35px_rgba(0,210,255,0.7),0_0_70px_rgba(2,132,199,0.4)]">
          {/* Gradient Background Layer - Smoothly Blended Slate Grey into Robotic Blue */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#4b5563_0%,#3b5472_25%,#255885_50%,#1a6b9c_72%,#0284c7_88%,#00d2ff_100%)] group-hover:bg-[linear-gradient(135deg,#5e697a_0%,#46658a_25%,#20699c_50%,#0284c7_75%,#00b4d8_90%,#38bdf8_100%)] transition-all duration-500" />

          {/* Glossy Top-Shine */}
          <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/35 via-white/10 to-transparent rounded-t-full pointer-events-none" />

          {/* Inner ring */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30 group-hover:ring-white/50 transition-all duration-500 pointer-events-none" />

          <div className="arrow-icon-relative relative z-10 flex items-center justify-center drop-shadow-sm">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
          <div className="arrow-icon-absolute relative z-10 flex items-center justify-center drop-shadow-sm">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      )}

      {/* Optional custom icon */}
      {icon && <div className="flex items-center justify-center">{icon}</div>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="touch-manipulation inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`touch-manipulation inline-block ${
        disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
      }`}
    >
      {content}
    </button>
  );
}
