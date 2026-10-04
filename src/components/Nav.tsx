"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollToId } from "@/lib/scroll-to";

const LINKS = [
  { href: "/#log", id: "log", label: "Facts" },
  { href: "/trajectory", id: null, label: "Arc" },
  { href: "/#missions", id: "missions", label: "Heritage" },
  { href: "/#reserve", id: "reserve", label: "Brief" },
] as const;

function desktopLabel(label: string) {
  if (label === "Arc") return "Trajectory";
  if (label === "Brief") return "Briefing";
  return label;
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";

  const onHash = (id: string) => (e: React.MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    smoothScrollToId(id, 1.45);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-10">
          <Link
            href="/"
            className="nav-brand focus-ring display min-h-11 min-w-11 touch-manipulation content-center text-xs tracking-[0.28em] text-foam sm:text-sm"
          >
            SELENE
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-[11px] tracking-[0.18em] text-muted uppercase md:flex"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.id ? onHash(link.id) : undefined}
                className="nav-link focus-ring"
              >
                {desktopLabel(link.label)}
              </Link>
            ))}
          </nav>

          <Link
            href="/#reserve"
            onClick={onHash("reserve")}
            className="btn-signal nav-cta focus-ring min-h-11 shrink-0 touch-manipulation px-3 text-[10px] sm:px-5 sm:text-[0.72rem]"
          >
            <span className="sm:hidden">Briefing</span>
            <span className="hidden sm:inline">Join briefing</span>
          </Link>
        </div>
      </header>

      <nav
        aria-label="Mobile zones"
        className="pointer-events-auto fixed inset-x-0 bottom-0 z-50 border-t border-line/80 bg-void/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={link.id ? onHash(link.id) : undefined}
              className="nav-dock-item focus-ring flex min-h-14 touch-manipulation flex-col items-center justify-center gap-0.5 px-1 text-[10px] tracking-[0.14em] text-muted uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
