"use client";

import { ReactNode, useEffect } from "react";
import ReactLenis, { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Non-blocking immediate scroll reset to top
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.start();
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 15);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        autoRaf: true,
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
