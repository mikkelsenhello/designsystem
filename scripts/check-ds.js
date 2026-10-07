#!/usr/bin/env node
// Design-system lint: fails if code styles around the token layer instead of through it.
//
// Usage: check-ds [dir ...] [--allow-raw-elements <dir>]
//   dirs default to whichever of src, app, components, pages exist.
//   --allow-raw-elements: where raw <button>/<input>/<a> are allowed (the design system's own components).
// Escape hatch: a `ds-allow: <reason>` comment on the line or the line above skips that line.
// Files inside any `tokens/` directory are skipped: raw values belong there.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const args = process.argv.slice(2);
const dirs = [];
const allowRawElements = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--allow-raw-elements") allowRawElements.push(args[++i]);
  else dirs.push(args[i]);
}
if (!dirs.length) dirs.push(...["src", "app", "components", "pages"].filter((d) => existsSync(d)));

const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "out", ".git", "tokens"]);
const CODE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const STYLES = new Set([".css", ".scss"]);
const JSX = new Set([".tsx", ".jsx"]);

// Start of a class name: start of line, whitespace, quote, brace, or a variant colon.
const C = String.raw`(?:^|[\s"'\x60{:])`;
const rules = [
  {
    id: "raw-color",
    files: (ext) => CODE.has(ext) || STYLES.has(ext),
    re: [
      /(?<!(?:href|to)=["'`{]?\s*)#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/,
      /\b(?:rgba?|hsla?|oklch|oklab|lch|lab|hwb)\(/,
    ],
    hint: "use a color class or token: bg-surface-default, text-subtle, var(--ds-color-...)",
  },
  {
    id: "arbitrary-value",
    files: (ext) => CODE.has(ext) || STYLES.has(ext),
    re: [
      new RegExp(String.raw`${C}!?-?[a-z][\w-]*-\[[^\]\s]+\](?!:)`),
      new RegExp(String.raw`${C}!?-?[a-z][\w-]*-\(--[\w-]+\)`),
    ],
    hint: "Tailwind arbitrary values bypass the token set; use a class from docs/tokens.md or add a token",
  },
  {
    id: "arbitrary-property",
    files: (ext) => CODE.has(ext),
    re: [new RegExp(String.raw`${C}\[[a-z-]+:[^\]\s]+\]`)],
    hint: "Tailwind arbitrary properties bypass the token set; add a token or a utility in tokens/",
  },
  {
    id: "bare-number-utility",
    files: (ext) => CODE.has(ext) || STYLES.has(ext),
    re: [
      new RegExp(
        String.raw`${C}(?:border(?:-[xytblrse])?|divide-[xy]|outline|outline-offset|ring|ring-offset|opacity|duration|delay|stroke|decoration|underline-offset)-\d+(?:\.\d+)?(?=$|[\s"'\x60}])`,
      ),
    ],
    hint: "number classes ignore the theme; use border-width-default, opacity-disabled, focus-ring, ...",
  },
  {
    id: "raw-element",
    files: (ext, file) => JSX.has(ext) && !allowRawElements.some((d) => isInside(file, d)),
    re: [/<(?:button|input|a)(?=[\s>/])/],
    hint: "use the design system's Button, Textfield/Checkbox or Link (Link asChild for router links)",
  },
  {
    id: "inline-style",
    files: (ext) => JSX.has(ext),
    re: [/\bstyle=\{\{/],
    hint: "inline styles bypass tokens; use classes (add ds-allow with a reason for truly dynamic values)",
  },
  {
    id: "raw-length",
    files: (ext) => STYLES.has(ext),
    re: [/(?<![\w-])-?\d*\.?\d+(?:px|rem)\b/],
    hint: "raw lengths belong in tokens/; use var(--ds-space-*) or a token",
  },
];

function isInside(file, dir) {
  const rel = relative(dir, file);
  return !rel.startsWith("..") && !rel.startsWith(sep) && rel !== file;
}

function walk(path, out) {
  if (!existsSync(path)) return out;
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) if (!SKIP_DIRS.has(name)) walk(join(path, name), out);
  } else out.push(path);
  return out;
}

const problems = [];
for (const file of dirs.flatMap((d) => walk(d, []))) {
  const ext = extname(file);
  const active = rules.filter((r) => r.files(ext, file));
  if (!active.length) continue;
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    if (line.includes("ds-allow") || (lines[i - 1] ?? "").includes("ds-allow")) return;
    for (const rule of active) {
      const hits = new Set(
        rule.re.flatMap((re) => [...line.matchAll(new RegExp(re.source, "g"))].map((m) => m[0].replace(/^[\s"'`{:]+/, ""))),
      );
      for (const text of hits) problems.push({ file, line: i + 1, rule, text });
    }
  });
}

if (problems.length) {
  for (const p of problems) console.error(`${p.file}:${p.line}  ${p.rule.id}  "${p.text}"  -> ${p.rule.hint}`);
  console.error(`\ncheck-ds: ${problems.length} problem(s). Legal classes: docs/tokens.md. Exception: add "ds-allow: <reason>".`);
  process.exit(1);
}
console.log(`check-ds: ok (${dirs.join(", ")})`);
