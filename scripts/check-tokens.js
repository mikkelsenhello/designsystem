// Checks the token layers in tokens/ are wired correctly:
// - every var(--ds-*) reference resolves, and no token references itself
// - tailwind.css references only theme tokens (plus the unthemed --ds-space-* scale)
// - every theme defines exactly the same token names as themes/default.css
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "tokens");
const read = (p) => readFileSync(join(root, p), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const defs = (css) => new Map([...css.matchAll(/(--ds-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2]]));
const refs = (value) => [...value.matchAll(/var\((--ds-[\w-]+)\)/g)].map((m) => m[1]);

const errors = [];
const global = new Map();
for (const f of readdirSync(join(root, "global")).filter((f) => f.endsWith(".css"))) {
  for (const [k, v] of defs(read(`global/${f}`))) {
    if (refs(v).length) errors.push(`global/${f}: ${k} references another token; global values must be raw`);
    global.set(k, v);
  }
}

const themeFiles = readdirSync(join(root, "themes")).filter((f) => f.endsWith(".css"));
const themes = new Map(themeFiles.map((f) => [f, defs(read(`themes/${f}`))]));
const base = themes.get("default.css");
for (const [f, theme] of themes) {
  for (const [k, v] of theme) {
    if (global.has(k)) errors.push(`themes/${f}: ${k} reuses a global token name`);
    for (const r of refs(v)) {
      if (r === k) errors.push(`themes/${f}: ${k} references itself`);
      else if (!global.has(r) && !theme.has(r)) errors.push(`themes/${f}: ${k} -> ${r} is not defined`);
    }
  }
  if (f === "default.css") continue;
  for (const k of base.keys()) if (!theme.has(k)) errors.push(`themes/${f}: missing ${k} (defined in default.css)`);
  for (const k of theme.keys()) if (!base.has(k)) errors.push(`themes/${f}: ${k} is not in default.css`);
}

// Spacing is deliberately unthemed, so tailwind.css maps the global --ds-space-* scale directly.
for (const r of refs(read("tailwind.css"))) {
  if (!base.has(r) && !r.startsWith("--ds-space-")) errors.push(`tailwind.css: ${r} is not a theme token${global.has(r) ? " (it is global; map a theme token instead)" : ""}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`tokens ok: ${global.size} global, ${base.size} per theme, ${themes.size} theme(s)`);
