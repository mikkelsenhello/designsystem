import path from "node:path";
import type { NextConfig } from "next";

// Which theme the playground loads (layout.tsx imports "playground-theme"). `npm run playground:brand`
// picks example-brand; PLAYGROUND_THEME=<file name without .css> picks any theme in tokens/themes/.
const theme =
  process.env.PLAYGROUND_THEME ?? (process.env.npm_lifecycle_event?.endsWith(":brand") ? "example-brand" : "default");

const config: NextConfig = {
  // The playground imports ../src and ../tokens, so the bundler root is the repo root.
  turbopack: {
    root: path.join(__dirname, ".."),
    resolveAlias: { "playground-theme": `../tokens/themes/${theme}.css` },
  },
  env: { PLAYGROUND_THEME: theme },
  // Separate build folders let both themes run side by side (and next to `npm run playground`).
  distDir: process.env.PLAYGROUND_DIST ?? ".next",
};

export default config;
