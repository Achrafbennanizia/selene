"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { asset } from "@/lib/asset";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const earthY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const earthScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const terrainY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const dustY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const figureY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[130dvh] snap-start bg-void md:h-[140dvh]"
      aria-label="Selene earthrise"
    >
      <div className="sticky top-0 h-dvh max-h-dvh overflow-hidden">
        <div className="absolute inset-0 bg-[#05060a]" />

        <motion.div
          className="absolute inset-[-8%]"
          style={reduced ? undefined : { y: starsY }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/photos/earthrise.jpg")}
            alt=""
            className="h-full w-full object-cover opacity-[0.45]"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[#05060a]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-transparent to-void" />
        </motion.div>

        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7), transparent), radial-gradient(1px 1px at 78% 36%, rgba(255,255,255,0.45), transparent), radial-gradient(1.5px 1.5px at 61% 14%, rgba(255,255,255,0.8), transparent)",
          }}
          aria-hidden
        />

        <motion.div
          className="absolute left-[48%] top-[16%] h-[44vmin] w-[44vmin] -translate-x-1/2 sm:left-[56%] sm:top-[10%] sm:h-[50vmin] sm:w-[50vmin]"
          style={reduced ? undefined : { y: earthY, scale: earthScale }}
          aria-hidden
        >
          <div className="h-full w-full overflow-hidden rounded-full shadow-[0_0_90px_rgba(100,160,255,0.4)] ring-1 ring-signal/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/photos/earth-space.jpg")}
              alt=""
              className="h-full w-full scale-110 object-cover"
              decoding="async"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[52%]"
          style={reduced ? undefined : { y: terrainY }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/photos/moon-surface.jpg")}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_70%] opacity-70"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,6,10,0.85) 0%, transparent 28%, transparent 50%, rgba(10,10,11,0.96) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[18%] h-[30%]"
          style={
            reduced
              ? undefined
              : {
                  y: dustY,
                  background:
                    "linear-gradient(180deg, transparent, rgba(180,190,210,0.08), transparent)",
                }
          }
          aria-hidden
        />

        <motion.div
          className="absolute bottom-[22%] left-1/2 w-[9vmin] -translate-x-1/2 sm:bottom-[20%] sm:w-[7.5vmin]"
          style={reduced ? undefined : { y: figureY }}
          aria-hidden
        >
          <svg
            viewBox="0 0 80 160"
            className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
          >
            <ellipse cx="40" cy="28" rx="16" ry="18" fill="#0c0d12" />
            <rect x="28" y="44" width="24" height="42" rx="8" fill="#0c0d12" />
            <rect x="18" y="50" width="10" height="28" rx="4" fill="#0c0d12" />
            <rect x="52" y="50" width="10" height="28" rx="4" fill="#0c0d12" />
            <rect x="30" y="84" width="9" height="40" rx="4" fill="#0c0d12" />
            <rect x="41" y="84" width="9" height="40" rx="4" fill="#0c0d12" />
            <ellipse cx="40" cy="26" rx="9" ry="7" fill="#1a2338" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Strong center veil so type never sits on bright Earth */}
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(5,6,10,0.82) 0%, rgba(5,6,10,0.35) 45%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="copy-legible absolute top-[4.75rem] left-4 hidden text-[10px] tracking-[0.2em] text-foam/80 uppercase sm:left-10 md:block">
            <p className="text-signal">{CONTENT.hud.clockLabel}</p>
            <p className="mt-1 font-mono text-foam">{CONTENT.hud.clock}</p>
          </div>
          <div className="copy-legible absolute top-[4.75rem] right-4 hidden text-right text-[10px] tracking-[0.2em] text-foam/80 uppercase sm:right-10 md:block">
            <p className="text-signal">{CONTENT.hud.elevLabel}</p>
            <p className="mt-1 font-mono text-foam">{CONTENT.hud.elev}</p>
          </div>
          <div className="copy-legible absolute bottom-[5.5rem] left-4 max-w-[70%] text-[9px] tracking-[0.12em] text-foam/75 uppercase sm:bottom-8 sm:left-10 sm:max-w-none sm:text-[10px] sm:tracking-[0.16em] md:bottom-8">
            {CONTENT.hud.site}
          </div>
        </div>

        <motion.div
          className="absolute inset-x-0 top-[22%] z-30 px-4 sm:top-[26%] sm:px-10 md:top-[30%]"
          style={reduced ? undefined : { y: copyY }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              className="copy-legible text-[10px] font-semibold tracking-[0.22em] text-signal uppercase sm:text-[11px] sm:tracking-[0.28em]"
              initial={reduced ? false : { y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.05 }}
            >
              {CONTENT.eyebrow}
            </motion.p>
            <motion.h1
              className="display copy-legible-title mt-3 text-[clamp(2.75rem,14vw,7.5rem)] text-foam sm:mt-4"
              initial={reduced ? false : { y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.12 }}
            >
              {CONTENT.heroTitle}
            </motion.h1>
            <motion.p
              className="copy-legible mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#e8e4dc] line-clamp-4 sm:mt-5 sm:line-clamp-none sm:text-[16.5px]"
              initial={reduced ? false : { y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.22 }}
            >
              {CONTENT.heroBody}
            </motion.p>
            <motion.div
              className="mt-6 flex w-full flex-col items-stretch gap-2.5 px-1 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:px-0"
              initial={reduced ? false : { y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.32 }}
            >
              <a
                href="#reserve"
                className="btn-signal focus-ring min-h-12 w-full touch-manipulation shadow-[0_10px_40px_rgba(0,0,0,0.55)] sm:min-h-11 sm:w-auto"
              >
                {CONTENT.heroCta}
              </a>
              <a
                href="/trajectory"
                className="btn-ghost focus-ring min-h-12 w-full touch-manipulation bg-void/50 backdrop-blur-sm sm:min-h-11 sm:w-auto"
              >
                {CONTENT.heroSecondary}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
