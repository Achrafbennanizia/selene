export const SECTIONS = [
  { id: "top", label: "Rise" },
  { id: "log", label: "Facts" },
  { id: "trajectory", label: "Arc" },
  { id: "missions", label: "Heritage" },
  { id: "reserve", label: "Brief" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
