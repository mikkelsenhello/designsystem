import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  // The playground imports ../src and ../tokens, so the bundler root is the repo root.
  turbopack: { root: path.join(__dirname, "..") },
};

export default config;
