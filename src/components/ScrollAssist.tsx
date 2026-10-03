"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { SECTIONS, type SectionId } from "@/lib/sections";
import {
  isProgrammaticScroll,
  prefersReducedMotion,
  smoothScrollToId,
} from "@/lib/scroll-to";

/** Finish the jump once ~93% of the way to the target section (down or up) */
const SNAP_AT = 0.93;
const SNAP_DURATION = 1.15;

function goToSection(id: string, duration = 2.15) {
  smoothScrollToId(id, duration);
}

function sectionTops(): { id: SectionId; top: number }[] {
  return SECTIONS.map((s) => {
    const el = document.getElementById(s.id);
    return el ? { id: s.id, top: el.offsetTop } : null;
  }).filter((x): x is { id: SectionId; top: number } => Boolean(x));
}

let lastY = 0;
let scrollDir: 1 | -1 | 0 = 0;

function maybeThresholdSnap() {
  if (isProgrammaticScroll() || prefersReducedMotion()) return;

  const tops = sectionTops();
  if (tops.length < 2) return;

  const y = window.scrollY;

  // Index of the last section whose top is at or above the viewport top
  let i = 0;
  for (let n = 0; n < tops.length; n++) {
    if (y >= tops[n].top) i = n;
  }

  // Scroll down → snap to next when 93% through the gap
  if (scrollDir >= 0 && i < tops.length - 1) {
    const a = tops[i].top;
    const b = tops[i + 1].top;
    const span = b - a;
    if (span >= 48) {
      const towardNext = (y - a) / span;
      if (towardNext >= SNAP_AT && y < b - 2) {
        goToSection(tops[i + 1].id, SNAP_DURATION);
        return;
      }
    }
  }

  // Scroll up → snap to previous when 93% through the gap (same rule)
  if (scrollDir <= 0 && i < tops.length - 1) {
    // Between section i and i+1, moving toward i
    const a = tops[i].top;
    const b = tops[i + 1].top;
    const span = b - a;
    if (span >= 48) {
      const towardPrev = (b - y) / span;
      if (towardPrev >= SNAP_AT && y > a + 2) {
        goToSection(tops[i].id, SNAP_DURATION);
        return;
      }
    }
  }

  // On / past the last section start — measure back to the previous one
  if (scrollDir <= 0 && i === tops.length - 1 && i > 0) {
    const curr = tops[i].top;
    const prev = tops[i - 1].top;
    const span = curr - prev;
    if (span >= 48 && y < curr) {
      const towardPrev = (curr - y) / span;
      if (towardPrev >= SNAP_AT && y > prev + 2) {
        goToSection(tops[i - 1].id, SNAP_DURATION);
      }
    }
  }
}

export function ScrollAssist() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<SectionId>("top");
  const [hint, setHint] = useState(true);

  const progressMv = useMotionValue(0);
  const progress = useSpring(progressMv, {
    stiffness: reduced ? 400 : 48,
    damping: reduced ? 40 : 18,
    mass: 0.85,
  });

  useEffect(() => {
    let raf = 0;
    let settle = 0;
    let ticking = false;

    const read = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      progressMv.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      if (window.scrollY > window.innerHeight * 0.45) setHint(false);

      const mid = window.scrollY + window.innerHeight * 0.4;
      let best: SectionId = "top";
      let bestDist = Infinity;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const d = Math.abs(el.offsetTop - mid);
        if (d < bestDist) {
          bestDist = d;
          best = section.id;
        }
      }
      setActive(best);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (Math.abs(dy) > 0.5) scrollDir = dy > 0 ? 1 : -1;
      lastY = y;

      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(read);
      }

      // Fire as soon as we cross ~93%; settle catch covers coasting inertia
      maybeThresholdSnap();
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        maybeThresholdSnap();
      }, 90);
    };

    lastY = window.scrollY;
    const boot = requestAnimationFrame(read);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(boot);
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [progressMv]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (!e.altKey) return;

      const idx = SECTIONS.findIndex((s) => s.id === active);
      const next =
        e.key === "ArrowDown"
          ? Math.min(SECTIONS.length - 1, Math.max(0, idx) + 1)
          : Math.max(0, Math.max(0, idx) - 1);
      if (next === idx) return;
      e.preventDefault();
      goToSection(SECTIONS[next].id);
      setHint(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <aside
        className="pointer-events-none fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 md:right-5 md:block lg:right-8"
        aria-label="Section progress"
      >
        <div className="pointer-events-auto relative flex flex-col items-center gap-3">
          <div
            className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-line"
            aria-hidden
          />
          <motion.div
            className="absolute top-2 left-1/2 w-px origin-top -translate-x-1/2 bg-signal"
            style={{ scaleY: progress, height: "calc(100% - 1rem)" }}
            aria-hidden
          />
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                type="button"
                title={section.label}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  goToSection(section.id);
                  setHint(false);
                }}
                className="focus-ring group relative z-10 flex h-4 w-4 items-center justify-center"
              >
                <motion.span
                  className="block rounded-full bg-muted/60 group-hover:bg-foam"
                  animate={
                    isActive
                      ? {
                          width: 10,
                          height: 10,
                          backgroundColor: "#9ec4ff",
                          boxShadow: "0 0 14px rgba(158,196,255,0.5)",
                        }
                      : {
                          width: 6,
                          height: 6,
                          backgroundColor: "rgba(201,196,186,0.55)",
                          boxShadow: "0 0 0 rgba(158,196,255,0)",
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                    mass: 0.7,
                  }}
                />
                <span className="pointer-events-none absolute right-6 rounded bg-void/90 px-2 py-1 text-[10px] tracking-[0.16em] text-foam uppercase opacity-0 shadow-lg ring-1 ring-line transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <motion.button
        type="button"
        onClick={() => {
          goToSection("log");
          setHint(false);
        }}
        initial={false}
        animate={{
          opacity: hint ? 1 : 0,
          y: hint ? 0 : 10,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`focus-ring fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] tracking-[0.22em] text-foam/75 uppercase md:bottom-8 ${
          hint ? "" : "pointer-events-none"
        }`}
        aria-label="Scroll to next section"
      >
        <span className="copy-legible">Scroll</span>
        <motion.span
          className="block h-8 w-px origin-top bg-gradient-to-b from-signal/85 to-transparent"
          animate={hint && !reduced ? { scaleY: [1, 0.55, 1], opacity: [0.9, 0.35, 0.9] } : {}}
          transition={
            hint && !reduced
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          aria-hidden
        />
      </motion.button>
    </>
  );
}
