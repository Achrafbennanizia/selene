"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TransferArc } from "@/components/TransferArc";
import { asset } from "@/lib/asset";

const CRITICAL = [
  "/photos/earthrise.jpg",
  "/photos/earth-space.jpg",
  "/photos/moon-surface.jpg",
  "/photos/astronaut.jpg",
  "/photos/launch.jpg",
] as const;

function preload(src: string, ms = 3500) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const timer = window.setTimeout(finish, ms);
    img.onload = () => {
      window.clearTimeout(timer);
      finish();
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      finish();
    };
    img.src = asset(src);
    if (img.complete) {
      window.clearTimeout(timer);
      finish();
    }
  });
}

/** Full-page boot — always finishes at 384,400 km before revealing the site. */
export function BootLoader() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    const start = performance.now();
    const minDuration = 1800;

    // Visual arc always runs 0 → 1 on a timer (guaranteed full transfer)
    const runArc = () => {
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / minDuration);
        const eased = 1 - Math.pow(1 - t, 2.2);
        setProgress(eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    runArc();

    (async () => {
      await Promise.all(CRITICAL.map((src) => preload(src)));
      if (cancelled) return;

      const elapsed = performance.now() - start;
      const wait = Math.max(200, minDuration - elapsed + 350);

      window.setTimeout(() => {
        if (cancelled) return;
        setProgress(1);
        setReady(true);
      }, wait);
    })();

    // Absolute fail-safe
    const hardCap = window.setTimeout(() => {
      if (cancelled) return;
      setProgress(1);
      setReady(true);
    }, 6000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(hardCap);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          <p className="display text-xs tracking-[0.32em] text-foam sm:text-sm">
            SELENE
          </p>
          <p className="mt-3 text-[10px] tracking-[0.28em] text-muted uppercase">
            Transfer in progress
          </p>

          <TransferArc progress={progress} className="mt-6 w-full max-w-xl sm:mt-8" />

          <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-foam/60">
            {Math.round(progress * 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
