/** Prefix public paths for GitHub Pages project site (`/selene`). */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Avoid double-prefix if a caller already included the basePath
  if (base && normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}
