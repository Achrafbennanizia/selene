import { CONTENT } from "@/lib/content";

export function Footer() {
  return (
    <footer className="snap-end border-t border-line bg-void px-4 py-8 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-6 md:px-10 md:py-10 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-sm tracking-[0.22em] text-foam">
            {CONTENT.brand}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#d8d3c9]">
            {CONTENT.footerBlurb}
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-[11px] tracking-[0.16em] text-muted uppercase">
          <a href="#log" className="focus-ring hover:text-foam">
            Facts
          </a>
          <a href="/trajectory" className="focus-ring hover:text-foam">
            Trajectory
          </a>
          <a href="#missions" className="focus-ring hover:text-foam">
            Heritage
          </a>
          <a href="#reserve" className="focus-ring hover:text-foam">
            Briefing
          </a>
        </div>
      </div>
    </footer>
  );
}
