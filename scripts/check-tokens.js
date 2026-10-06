// Checks the token layers in tokens/ are wired correctly:
//   global (raw values) -> themes -> components / color-context -> tailwind.css
// - every var(--ds-*) reference resolves to a token in an allowed layer, and nothing references itself
// - every theme defines the same names as themes/default.css (it may also override component tokens)
// Spacing is deliberately unthemed, so the global --ds-space-* scale may be used by any layer.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "tokens");
const read = (p) => readFileSync(join(root, p), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const cssIn = (dir) => readdirSync(join(root, dir)).filter((f) => f.endsWith(".css"));
const defs = (css) => new Map([...css.matchAll(/(--ds-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2]]));
const refs = (value) => [...value.matchAll(/var\((--ds-[\w-]+)\)/g)].map((m) => m[1]);
const merge = (files) => new Map(files.flatMap((f) => [...defs(read(f))]));
const isSpace = (r) => r.startsWith("--ds-space-");

const errors = [];
const global = merge(cssIn("global").map((f) => `global/${f}`));
const components = merge(cssIn("components").map((f) => `components/${f}`));
const context = defs(read("color-context.css"));
const themes = new Map(cssIn("themes").map((f) => [f, defs(read(`themes/${f}`))]));
const base = themes.get("default.css");

function checkRefs(file, map, allowed) {
  for (const [k, v] of map) {
    for (const r of refs(v)) {
      if (r === k) errors.push(`${file}: ${k} references itself`);
      else if (!allowed(r)) errors.push(`${file}: ${k} -> ${r} is not allowed here (undefined, or from the wrong layer)`);
    }
  }
}

for (const [k, v] of global) if (refs(v).length) errors.push(`global: ${k} references another token; global values must be raw`);

for (const [f, theme] of themes) {
  checkRefs(`themes/${f}`, theme, (r) => global.has(r) || theme.has(r));
  for (const k of theme.keys()) if (global.has(k)) errors.push(`themes/${f}: ${k} reuses a global token name`);
  if (f === "default.css") continue;
  for (const k of base.keys()) if (!theme.has(k)) errors.push(`themes/${f}: missing ${k} (defined in default.css)`);
  for (const k of theme.keys()) if (!base.has(k) && !components.has(k)) errors.push(`themes/${f}: ${k} is neither a default.css nor a component token`);
}

checkRefs("components", components, (r) => base.has(r) || components.has(r) || isSpace(r));
checkRefs("color-context.css", context, (r) => base.has(r));
for (const r of refs(read("tailwind.css"))) {
  if (!base.has(r) && !components.has(r) && !context.has(r) && !isSpace(r)) {
    errors.push(`tailwind.css: ${r} is not a theme, component or context token${global.has(r) ? " (it is global)" : ""}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`tokens ok: ${global.size} global, ${base.size} theme, ${components.size} component, ${context.size} context; ${themes.size} theme file(s)`);
