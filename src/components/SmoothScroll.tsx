"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cinematicEase, registerLenis } from "@/lib/scroll-to";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || coarse || narrow) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: cinematicEase,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      syncTouch: false,
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
