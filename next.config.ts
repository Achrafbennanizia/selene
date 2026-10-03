import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/selene" : "",
  },
  ...(isGithubPages
    ? {
        basePath: "/selene",
        assetPrefix: "/selene",
      }
    : {}),
};

export default nextConfig;
