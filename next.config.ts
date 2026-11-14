import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  sassOptions: {
    /* Bootstrap 5.3 still uses Sass @import – hide those deprecation warnings */
    quietDeps: true,
    silenceDeprecations: ["import", "global-builtin", "color-functions", "legacy-js-api", "if-function"],
  },
};

export default nextConfig;
