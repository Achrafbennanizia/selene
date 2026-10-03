"use client";

import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTENT } from "@/lib/content";

export function Missions() {
  return (
    <section
      id="missions"
      className="section-panel section-scrim relative flex flex-col px-0 py-14 sm:py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl shrink-0 px-4 sm:px-6 md:px-10">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-signal uppercase">
            {CONTENT.missionsEyebrow}
          </p>
          <h2 className="display mt-3 max-w-xl text-[clamp(1.9rem,4.5vw,3.2rem)] text-foam md:mt-4 md:text-[clamp(2.2rem,5vw,3.6rem)]">
            {CONTENT.missionsTitle}
          </h2>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#d8d3c9] sm:mt-3 sm:text-[15px]">
            {CONTENT.missionsBody}
          </p>
        </Reveal>
      </div>

      <div className="marquee-mask mt-8 flex min-h-0 flex-1 items-center overflow-hidden sm:mt-10">
        <div className="animate-reel flex w-max gap-3 px-4 sm:gap-4 md:gap-5 md:px-10">
          {[...CONTENT.missions, ...CONTENT.missions].map((mission, i) => (
            <article
              key={`${mission.code}-${i}`}
              className="group w-[220px] shrink-0 overflow-hidden rounded-[18px] border border-line bg-ink sm:w-[280px] sm:rounded-[22px] md:w-[300px]"
            >
              <div className="relative h-[120px] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 sm:h-[160px] md:h-[170px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(mission.photo)}
                  alt=""
                  className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-black/40" />
                <p className="copy-legible absolute top-3 left-3 text-[10px] tracking-[0.22em] text-foam uppercase sm:top-4 sm:left-4">
                  {mission.code}
                </p>
                <p className="copy-legible absolute right-3 bottom-2 text-[9px] tracking-[0.12em] text-foam/80 uppercase sm:right-4 sm:bottom-3">
                  {mission.credit}
                </p>
              </div>
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <h3 className="display text-lg text-foam sm:text-xl">
                  {mission.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#d8d3c9]">
                  {mission.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
