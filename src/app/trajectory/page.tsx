"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { TransferArc, TOTAL_KM } from "@/components/TransferArc";
import { asset } from "@/lib/asset";
import { CONTENT } from "@/lib/content";

/**
 * Full-page trajectory — always drives the arc to 384,400 km on load.
 */
export default function TrajectoryPage() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let raf = 0;

    if (reduced) {
      raf = requestAnimationFrame(() => {
        setProgress(1);
        setComplete(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    let start: number | null = null;
    const duration = 2400;

    const tick = (now: number) => {
      if (start == null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(1);
        setComplete(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-void text-foam">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/photos/earthrise.jpg")}
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/92 to-void" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(5,6,10,0.55), transparent 70%)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-6 sm:py-5 md:px-10">
        <Link
          href="/"
          className="focus-ring display copy-legible min-h-11 content-center text-xs tracking-[0.28em] sm:text-sm"
        >
          SELENE
        </Link>
        <nav className="hidden items-center gap-5 text-[11px] tracking-[0.18em] text-[#d8d3c9] uppercase sm:flex">
          <Link href="/#log" className="focus-ring copy-legible hover:text-foam">
            Facts
          </Link>
          <span className="copy-legible text-signal">Trajectory</span>
          <Link
            href="/#missions"
            className="focus-ring copy-legible hover:text-foam"
          >
            Heritage
          </Link>
          <Link href="/#reserve" className="btn-signal focus-ring min-h-10 px-4">
            Briefing list
          </Link>
        </nav>
        <Link
          href="/#reserve"
          className="btn-signal focus-ring min-h-11 touch-manipulation px-3 text-[10px] sm:hidden"
        >
          Briefing
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] max-w-6xl flex-col justify-center px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-6 sm:pb-16 md:px-10">
        <motion.div
          initial={reduced ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="copy-legible text-[10px] font-semibold tracking-[0.22em] text-signal uppercase sm:text-[11px] sm:tracking-[0.28em]">
            {CONTENT.trajEyebrow}
          </p>
          <h1 className="display copy-legible-title mt-3 max-w-xl text-[clamp(1.9rem,8vw,3.6rem)] sm:mt-4">
            {CONTENT.trajTitle}
          </h1>
          <p className="copy-legible mt-3 max-w-md text-[14px] leading-relaxed text-[#e8e4dc] sm:mt-4 sm:text-[16.5px]">
            {CONTENT.trajBody}
          </p>
          <p className="copy-legible mt-2 max-w-md text-[12px] leading-relaxed text-[#c9c4ba] sm:mt-3 sm:text-[13px]">
            {CONTENT.trajNote} Completes automatically to{" "}
            {TOTAL_KM.toLocaleString("en-US")} km — no scroll required.
          </p>
        </motion.div>

        <div className="mt-10 rounded-[20px] border border-line bg-void/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:mt-14 sm:rounded-[24px] sm:p-5 md:mt-20 md:p-8">
          <TransferArc progress={progress} />
        </div>

        <p
          className={`copy-legible mt-6 text-[10px] tracking-[0.18em] uppercase transition sm:mt-8 sm:text-[11px] sm:tracking-[0.2em] ${
            complete ? "text-signal" : "text-[#c9c4ba]"
          }`}
        >
          {complete
            ? "Transfer complete · mean lunar distance reached"
            : "Inking transfer arc…"}
        </p>

        <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            href="/#reserve"
            className="btn-signal focus-ring min-h-12 w-full touch-manipulation sm:min-h-11 sm:w-auto"
          >
            {CONTENT.reserveCta}
          </Link>
          <Link
            href="/"
            className="btn-ghost focus-ring min-h-12 w-full touch-manipulation bg-void/50 backdrop-blur-sm sm:min-h-11 sm:w-auto"
          >
            ← Back to SELENE
          </Link>
        </div>
      </main>
    </div>
  );
}
