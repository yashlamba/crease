import type { NextConfig } from "next";

const config: NextConfig = {
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  assetPrefix: process.env.BASE_PATH ?? "",
};

export default config;
