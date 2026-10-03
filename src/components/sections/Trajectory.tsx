"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { TransferArc } from "@/components/TransferArc";
import { CONTENT } from "@/lib/content";

export function Trajectory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end start"],
  });

  const progressMv = useTransform(scrollYProgress, [0, 0.9, 1], [0, 1, 1]);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(progressMv, "change", (v) => {
    setProgress(v);
  });

  return (
    <section
      id="trajectory"
      ref={ref}
      className="section-panel relative overflow-hidden bg-ink px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-signal uppercase">
            {CONTENT.trajEyebrow}
          </p>
          <h2 className="display mt-3 max-w-xl text-[clamp(1.9rem,4.5vw,3.2rem)] text-foam md:mt-4 md:text-[clamp(2.2rem,5vw,3.6rem)]">
            {CONTENT.trajTitle}
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#d8d3c9] sm:mt-4 sm:text-[16.5px]">
            {CONTENT.trajBody}
          </p>
          <p className="mt-2 max-w-md text-[12px] leading-relaxed text-muted sm:mt-3 sm:text-[13px]">
            {CONTENT.trajNote}{" "}
            <Link
              href="/trajectory"
              className="text-signal underline-offset-4 hover:underline"
            >
              Open full transfer page →
            </Link>
          </p>
        </Reveal>

        <div className="relative mt-8 md:mt-12">
          <TransferArc progress={reduced ? 1 : progress} />
        </div>
      </div>
    </section>
  );
}
