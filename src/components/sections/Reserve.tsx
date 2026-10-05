"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { CONTENT } from "@/lib/content";

export function Reserve() {
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    if (!email.includes("@")) {
      setStatus("Enter a work email with an @.");
      return;
    }
    setStatus("Request received. We’ll send the briefing when the next window opens.");
  }
  return (
    <section
      id="reserve"
      className="section-panel relative overflow-hidden bg-ink px-4 py-10 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-12 md:px-10 md:py-16 md:pb-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 20%, rgba(142,184,255,0.14), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-signal uppercase">
            {CONTENT.reserveEyebrow}
          </p>
          <h2 className="display mt-3 text-[clamp(2rem,5.5vw,3.8rem)] text-foam md:mt-4 md:text-[clamp(2.4rem,6vw,4.4rem)]">
            {CONTENT.reserveTitle}
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#d8d3c9] sm:mt-5 sm:text-[16.5px]">
            {CONTENT.reserveBody}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            className="rounded-[24px] border border-line bg-void/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8"
            onSubmit={onSubmit}
          >
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] text-muted uppercase">
                Full name
              </span>
              <input
                required
                name="name"
                autoComplete="name"
                className="focus-ring mt-2 w-full border-b border-line bg-transparent py-3 text-foam outline-none placeholder:text-muted/60"
                placeholder="Alex Rivera…"
              />
            </label>
            <label className="mt-6 block">
              <span className="text-[11px] tracking-[0.18em] text-muted uppercase">
                Work email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                spellCheck={false}
                className="focus-ring mt-2 w-full border-b border-line bg-transparent py-3 text-foam outline-none placeholder:text-muted/60"
                placeholder="alex@fund.com…"
              />
            </label>
            <label className="mt-6 block">
              <span className="text-[11px] tracking-[0.18em] text-muted uppercase">
                Interest window
              </span>
              <select
                name="window"
                className="focus-ring mt-2 w-full border-b border-line bg-void py-3 text-foam outline-none"
                defaultValue="brief-2028"
              >
                <option value="brief-2028">Brief me for 2028+ cargo era</option>
                <option value="flyby">Private lunar flyby (when charters open)</option>
                <option value="surface">Surface mission interest (long-range)</option>
              </select>
            </label>
            <button type="submit" className="btn-signal focus-ring mt-8 min-h-12 w-full">
              {CONTENT.reserveCta}
            </button>
            <p className="mt-4 text-center text-[12px] leading-relaxed text-muted" aria-live="polite">
              {status || CONTENT.reserveDisclaimer}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
