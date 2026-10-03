import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_PAGES === "true" ||
  process.env.NEXT_PUBLIC_BASE_PATH === "/selene";

const basePath = isGithubPages ? "/selene" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Inlined into client + SSG so public assets resolve under /selene/
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
