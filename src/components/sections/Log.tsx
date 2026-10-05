"use client";

import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { CONTENT } from "@/lib/content";

export function Log() {
  return (
    <section
      id="log"
      className="section-panel section-scrim relative px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-12 lg:gap-16">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-signal uppercase">
            {CONTENT.logEyebrow}
          </p>
          <h2 className="display mt-3 text-[clamp(1.9rem,4.5vw,3.4rem)] text-foam md:mt-4 md:text-[clamp(2.2rem,5vw,3.8rem)]">
            {CONTENT.logTitle}
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted sm:text-[15px] md:mt-4 md:text-[16.5px]">
            {CONTENT.logBody}
          </p>
          <div className="relative mt-5 max-h-[28vh] overflow-hidden rounded-[20px] border border-line sm:mt-6 sm:max-h-[32vh] sm:rounded-[24px] md:mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/photos/astronaut.jpg")}
              alt="Apollo astronaut on the lunar surface — NASA public domain"
              width={1280}
              height={1280}
              className="aspect-[4/3] h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-black/30" />
            <p className="copy-legible absolute bottom-3 left-4 text-[9px] tracking-[0.14em] text-foam/85 uppercase">
              PD · NASA Apollo 11
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center gap-0 border-t border-line">
          {CONTENT.logEntries.map((entry, i) => (
            <Reveal key={entry.label} delay={i * 0.06}>
              <div className="grid gap-1.5 border-b border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:py-5 md:py-6">
                <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
                  {entry.label}
                </p>
                <div>
                  <p className="display text-xl text-foam sm:text-2xl md:text-3xl">
                    {entry.value}
                  </p>
                  <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-[#d8d3c9] sm:mt-2 sm:text-[15px]">
                    {entry.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
