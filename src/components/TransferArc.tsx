"use client";

import { motion } from "motion/react";

type Props = {
  /** 0 → 1 */
  progress: number;
  className?: string;
};

const TOTAL_KM = 384_400;

export function formatKm(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  return `${Math.round(p * TOTAL_KM).toLocaleString("en-US")} km`;
}

/** Earth → Moon transfer arc used by the boot sequence and the trajectory section. */
export function TransferArc({ progress, className }: Props) {
  const pathLength = Math.min(1, Math.max(0, progress));

  return (
    <div className={className}>
      <div className="mb-3 flex items-end justify-between gap-3 sm:gap-4">
        <p className="text-[9px] tracking-[0.16em] text-[#c9c4ba] uppercase sm:text-[10px] sm:tracking-[0.2em]">
          Mean Earth–Moon range
        </p>
        <p className="display text-xl text-foam sm:text-4xl">
          {formatKm(pathLength)}
        </p>
      </div>

      <svg
        viewBox="0 0 1000 320"
        className="h-auto w-full max-h-[42vw] sm:max-h-none"
        role="img"
        aria-label="Earth to Moon transfer trajectory"
      >
        <circle cx="90" cy="200" r="36" fill="#2f6fbf" opacity="0.9" />
        <circle
          cx="90"
          cy="200"
          r="52"
          fill="none"
          stroke="rgba(142,184,255,0.25)"
        />
        <text
          x="90"
          y="270"
          textAnchor="middle"
          fill="rgba(242,240,234,0.45)"
          fontSize="12"
          letterSpacing="0.16em"
        >
          EARTH
        </text>

        <circle cx="900" cy="90" r="22" fill="#c8c4bc" />
        <circle
          cx="900"
          cy="90"
          r="34"
          fill="none"
          stroke="rgba(242,240,234,0.2)"
        />
        <text
          x="900"
          y="150"
          textAnchor="middle"
          fill="rgba(242,240,234,0.45)"
          fontSize="12"
          letterSpacing="0.16em"
        >
          MOON
        </text>

        <path
          d="M126 188 C 320 40, 620 40, 878 96"
          fill="none"
          stroke="rgba(242,240,234,0.12)"
          strokeWidth="2"
        />
        <motion.path
          d="M126 188 C 320 40, 620 40, 878 96"
          fill="none"
          stroke="#8eb8ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

export { TOTAL_KM };
