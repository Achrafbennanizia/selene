/**
 * Research-backed copy for SELENE.
 * Industry facts → docs/marketing.md (NASA, SpaceX, Artemis context).
 */

export const CONTENT = {
  brand: "SELENE",
  eyebrow: "Private cislunar briefing · interest list",
  heroTitle: "SELENE",
  heroBody:
    "Average distance to the Moon: 384,400 km. Apollo took about three days. The next private seats past Earth orbit will go to people who already understand the transfer — join the briefing list before windows open.",
  heroCta: "Join the briefing list",
  heroSecondary: "See the transfer",

  logEyebrow: "01 — Mission facts",
  logTitle: "Numbers you can defend in a boardroom.",
  logBody:
    "We don’t sell sci-fi. We brief the physics, the heritage sites, and the real commercial timeline — so when private cislunar seats exist, you’re not guessing.",
  logEntries: [
    {
      label: "Distance",
      value: "384,400 km",
      detail:
        "NASA mean Earth–Moon distance. Orbit is elliptical: apogee ≈ 405,500 km.",
    },
    {
      label: "Heritage site",
      value: "0.674°N 23.473°E",
      detail:
        "Apollo 11 Lunar Module in Mare Tranquillitatis (Tranquility Base) — LRO / NSSDC.",
    },
    {
      label: "Transit",
      value: "~3 days",
      detail:
        "Apollo crewed transfers reached lunar orbit in roughly three days (Apollo 11 ≈ 76 hours).",
    },
    {
      label: "Market",
      value: "Cargo NE 2028",
      detail:
        "SpaceX lists Starship lunar cargo no earlier than 2028. dearMoon tourist flyby was cancelled in 2024 — seats are not on sale yet.",
    },
  ],

  trajEyebrow: "02 — Trajectory",
  trajTitle: "The line that inks itself to the Moon.",
  trajBody:
    "Mean transfer span: 384,400 km. Watch the arc complete Earth → Moon — the same order of magnitude every Apollo crew crossed, and every future private flyby must respect.",
  trajNote:
    "Illustration of mean distance, not a live ephemeris. Real transfers vary with launch window and free-return vs capture.",

  missionsEyebrow: "03 — Heritage reel",
  missionsTitle: "Proof from the archive, not a mood board.",
  missionsBody:
    "Public-domain NASA photography. The industry that will sell private cislunar seats is built on this record — we show it before we ask for your email.",
  missions: [
    {
      code: "A-08",
      title: "Earthrise",
      line: "Apollo 8 · 24 Dec 1968 — first crewed lunar orbit.",
      photo: "/photos/earthrise.jpg",
      credit: "PD · NASA Apollo 8",
    },
    {
      code: "A-11",
      title: "Tranquility Base",
      line: "Apollo 11 LM · 0.674°N 23.473°E · Mare Tranquillitatis.",
      photo: "/photos/astronaut.jpg",
      credit: "PD · NASA Apollo 11",
    },
    {
      code: "A-17",
      title: "Blue Marble",
      line: "Apollo 17 — whole-Earth plate from cislunar space.",
      photo: "/photos/earth-space.jpg",
      credit: "PD · NASA Apollo 17",
    },
    {
      code: "ASCENT",
      title: "Saturn departure",
      line: "Apollo 11 launch — the stack that started the three-day transfer.",
      photo: "/photos/launch.jpg",
      credit: "PD · NASA Apollo 11",
    },
    {
      code: "LUNA",
      title: "Near side",
      line: "Full Moon plate — the face every outbound crew leaves behind.",
      photo: "/photos/moon-surface.jpg",
      credit: "PD · Wikimedia / NASA era",
    },
  ],

  reserveEyebrow: "04 — Briefing list",
  reserveTitle: "Hold your place before seats exist.",
  reserveBody:
    "Private lunar flybys are not on a public ticket shelf. SpaceX publishes Starship lunar cargo no earlier than 2028; tourist missions remain invite / charter only. SELENE collects serious interest — you’ll get a short briefing pack (distance, windows, risk language CFOs accept), not a fake boarding pass.",
  reserveCta: "Request briefing pack",
  reserveDisclaimer:
    "Demo form — wire to your CRM. No payment taken. Not affiliated with NASA or SpaceX.",

  footerBlurb:
    "SELENE is a portfolio briefing brand for private cislunar seating interest — facts from NASA & public industry notices; fiction is the waitlist product, not the physics.",

  hud: {
    clockLabel: "Transit clock (demo)",
    clock: "T+ 00:00:00",
    elevLabel: "Mean range",
    elev: "384,400 km",
    site: "Apollo 11 · 0.674°N 23.473°E",
  },
} as const;
