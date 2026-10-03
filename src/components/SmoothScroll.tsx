"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cinematicEase, registerLenis } from "@/lib/scroll-to";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Native touch scroll feels better on phones — programmatic jumps still animate
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || coarse || narrow) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      // Slow, buttery wheel inertia
      duration: 1.85,
      easing: cinematicEase,
      smoothWheel: true,
      wheelMultiplier: 0.78,
      touchMultiplier: 1,
    });

    registerLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
