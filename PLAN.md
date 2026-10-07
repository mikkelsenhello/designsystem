# Design system — build plan

Goal: a **rebrandable, reusable** design system — not just styling for one app, but something a different project (or a different brand) can adopt by swapping one layer, without touching component code. Modeled on designsystemet.no's token architecture, implemented with Tailwind for build speed.

**First consumer: a newsletter landing page, deployed on Vercel.** "Husk og gjør" is a later consumer, not the first — this matters because it's what proves the "reusable across unrelated projects" goal for real, and it sets the stack/distribution choices below. Both projects staying in separate folders (as already set up) is a deliberate fit with the distribution choice, not an accident.

Consumers of this system are **both humans and Claude writing code**. Every deliverable below is judged against both: would a person understand it, and would Claude reliably pick the right component instead of inventing one?

## Assumptions (flag if wrong — easy to change now, expensive later)

- **Stack**: **Next.js** + TypeScript + Tailwind CSS, tokens as CSS variables. Next.js specifically (not plain React/Vite) because it's what Vercel is built around — SSG/SSR, image optimization, zero-config deploys — and the landing page's SEO/performance depends on that. Tailwind + CSS-variable tokens work the same either way, so this doesn't change the architecture below, only the app shell that later consumes it.
- **Distribution: separate git repo, consumed as a git dependency pinned to a tag** — the landing page's `package.json` will have `"designsystem": "git+https://github.com/mikkelsenhello/designsystem.git#v0.1.0"`. Chosen over a monorepo because: (a) it matches the folder layout already in place (`Designsystem/`, `getshitdone/`, and the landing page as separate top-level projects); (b) pinning to a tag means an in-progress design-system change can't silently break the landing page build — important since both will likely be worked on in parallel. Trade-off accepted: bumping the pin is a manual step, not automatic. **Decided: repo is public** (`github.com/mikkelsenhello/designsystem`) — simplest for Vercel, no deploy key needed. **License: all rights reserved** (no public license file on this repo) — separate from designsystemet.no's own MIT-licensed token values, which are attributed in `NOTICE.md` regardless.
- **Behavior primitives**: for interactive components with real accessibility complexity (Dialog, Dropdown, Tooltip, Popover, Tabs, Switch, Accordion), build on **Radix UI primitives** underneath and skin them with our tokens, rather than writing focus-trap/ARIA logic from scratch. Radix gives correct behavior for free; we only own the visual layer.
- **No Storybook initially** — a lightweight local `playground/` (a few static Next.js pages rendering every component + variant) is enough for visual QA, and is far cheaper to keep in sync. Revisit if a second human (not just Claude) needs to browse it.
- **Scope of components**: build designsystemet.no's set as the target checklist (~41 components), extended with anything it doesn't cover (e.g. Accordion, for an FAQ section), but build them **in the order the current consumer actually needs them**, not all upfront. See Phase 4.

If any of these are wrong, say so before Phase 1 — the stack, distribution, and token decisions are the expensive-to-reverse ones.

## Architecture

```
Designsystem/
├── tokens/
│   ├── global/        # raw values, no meaning: color scales, spacing scale, radius scale, shadow scale, font scale
│   ├── themes/         # meaning layer: default.css (mirrors designsystemet.no), later brand-b.css etc.
│   └── components/     # per-component semantic tokens: button.css references theme tokens
├── src/
│   └── components/
│       └── <Name>/
│           ├── <Name>.tsx
│           ├── <Name>.module.css   (only if Tailwind can't express it)
│           └── README.md           # use for / don't use for / props / examples
├── docs/
│   └── component-index.md          # the SHORT always-loaded index (becomes a CLAUDE.md / SKILL.md for consumers)
├── scripts/
│   └── check-ds.*                  # lint/enforcement script, see Phase 6
├── playground/                     # visual QA pages, one per component
├── tokens/tailwind.css             # Tailwind v4 theme: reads tokens/, not hardcoded values
└── PLAN.md                         # this file
```

Token flow (the part that makes rebranding real):

```
tokens/global/*.css        (raw: --blue-60: #1a56db;  --space-4: 16px;)
        ↓ referenced by
tokens/themes/default.css  (meaning: --color-primary: var(--blue-60);)
        ↓ referenced by
tokens/components/button.css (component meaning: --button-bg: var(--color-primary);)
        ↓ consumed by
tokens/tailwind.css         (bg-primary → var(--color-primary))
        ↓ used in
src/components/Button/Button.tsx  (className="bg-primary ...", never a raw hex or arbitrary value)
```

**Rebrand test (the acceptance criterion for this whole architecture):** swapping `tokens/themes/default.css` for a second theme file with different color values, with zero edits to any component file, must restyle the entire system. This gets built and proven in Phase 7, not assumed.

## Phases

### Phase 0 — Extract designsystemet.no's token values
Pull their actual global-token values (color scale, spacing scale, radius scale, shadow/elevation scale, type scale, line-height) — these become `tokens/global/*.css`. This is copying *numbers*, not code (their source is open — Digdir/designsystemet on GitHub — but we're only taking the token values as a starting scale, not their component implementations). Gives us a scale that already "feels like" designsystemet without hand-tuning.

**Output:** `tokens/global/color.css`, `spacing.css`, `radius.css`, `shadow.css`, `typography.css`.

### Phase 1 — Theme layer
Build `tokens/themes/default.css`: give the global tokens meaning (`--color-primary`, `--color-surface`, `--color-text`, `--color-border`, `--color-danger`, etc. — the semantic names components will actually reference). This is the file that gets swapped to rebrand.

**Output:** `tokens/themes/default.css`, with every semantic name documented (what it's *for*, so a second theme author knows what to fill in).

**Decided (Phase 1 done):** color names follow designsystemet's role system, `--color-{family}-{role}` (families: neutral, primary, info, success, warning, danger; 16 roles each, e.g. `--color-primary-base-default`, `--color-neutral-text-subtle`) rather than the flat `--color-primary`/`--color-surface` examples above. Dark mode is built in via CSS `light-dark()`; light is default, opt in with `data-color-scheme="dark|auto"`. Spacing is not themed (Tailwind maps `--space-*` from global directly).

### Phase 2 — Wire Tailwind to tokens
Configure Tailwind so its theme (`colors`, `spacing`, `borderRadius`, etc.) points at the CSS variables from Phase 1, not Tailwind's own defaults. Add the escape-hatch rule in docs: "if a value you need isn't a token, stop and add one — don't reach for a raw Tailwind class."

**Output:** `tailwind.config.ts` fully token-driven; a one-page `docs/tokens.md` listing every legal token (the **closed set**).

**Decided (Phase 2 done):** Tailwind **v4**, which is configured in CSS, not `tailwind.config.ts`. The "preset" is `tokens/tailwind.css` (`@theme inline` with `--*: initial`, so Tailwind's defaults are gone and only token utilities compile). Consumers import `tailwindcss`, then `tokens/index.css`, then `tokens/tailwind.css`. Colors are split per utility (`bg-`/`text-`/`border-` each only get their own roles). **All tokens are prefixed `--ds-`** to avoid clashing with Tailwind's own variable names and with consuming apps. `npm run check:tokens` (`scripts/check-tokens.js`) verifies the layers resolve and that every theme defines the same names as `default.css`. Known gap for Phase 6: bare-number utilities (`border-2`, `opacity-50`, `z-10`, …) and arbitrary values still compile; the lint must catch them.

### Phase 3 — Component token layer
For each component we're about to build, a small `tokens/components/<name>.css` mapping theme tokens → component-specific variables (e.g. `--button-bg-hover: color-mix(in srgb, var(--color-primary) 85%, black)`). Keeps component code itself free of any styling decisions — it only reads component tokens.

**Decided (Phase 3, in progress per component):** component tokens hold only per-component *knobs* a brand might tune (radius, heights, padding, weight), not colors. Colors come from a **color context** (`tokens/color-context.css`, designsystemet's `data-color` pattern): family-less tokens `--ds-color-{role}` that `data-color="primary|danger|…"` re-points; default context is `neutral`. Components set `data-color` from their `color` prop and use family-less classes (`bg-base-default`), so variants × colors need no extra code. Themes may override component tokens. Tailwind key = component token name without `--ds-` (`--ds-button-radius` → `rounded-button`).

**Dark-mode gotcha (found in Phase 4 visual QA):** Tailwind's Lightning CSS rewrites `light-dark()` for older browsers into a form resolved where the token is *declared*, so theme and context tokens are declared on `:root, [data-color-scheme]`, not just `:root`. Side effect: `data-color-scheme` resets the color context to neutral on that element.

### Phase 4 — Build components, in the order the landing page needs them

**Progress:** first batch done: Heading, Paragraph, Label, Button, Textfield, Checkbox, Card, Badge, Accordion. Badge follows designsystemet's Badge (pill with count / one-word status); their text label is Tag (second batch). Textfield border thickness is tokenized (`--ds-textfield-border-width`, `--ds-textfield-border-width-hover`, defaulting to the theme's `--ds-border-width-default`), with hover thickening done as designsystemet does (outline in the border color). Pattern for brand-configurable values: component token defaults to a theme token, so a brand changes one theme value for everything or overrides the component token for one component. Accordion has no open/close animation yet (waiting for motion tokens, below).

**Planned — motion tokens (not started):** duration and easing tokens (global raw values → theme meaning such as `--ds-motion-duration-*`, `--ds-motion-easing-*` → component tokens → Tailwind `duration-*` / `ease-*` / `animate-*`), plus `prefers-reduced-motion` handling. Once they exist: Accordion open/close, Button/Textfield state transitions, and replace the Tailwind default transition values currently hard-coded in `tokens/tailwind.css`.

**Source (chosen by the user):** [jakubkrehel/make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better), `skills/make-interfaces-feel-better/animations.md` (MIT, add to `NOTICE.md` when values are used). Values it specifies:

| Use | Value |
|---|---|
| High-frequency feedback (hover bg/color) | ≤150ms, e.g. 100ms, `ease-out`, opacity/color only |
| Press feedback (Button) | `scale: 0.96` (never below 0.95), 150ms `ease-out`, transition so release reverses smoothly; `static` prop to opt out |
| Enter (infrequent: hero, success, empty state) | 300–400ms `ease-out`, opacity 0→1 + translateY 12px→0 + blur 4px→0 |
| Stagger between enter groups / title words | 100ms / 80ms |
| Exit (softer than enter) | 150ms `ease-out`, translateY −12px, blur 4px; 200ms for full slide-out when spatial context matters |
| Contextual icon swap | scale 0.25→1, opacity 0→1, blur 4px→0, 300ms `cubic-bezier(0.2, 0, 0, 1)` (CSS stand-in for spring, bounce 0) |

Rules to carry into the token docs: CSS transitions (interruptible) for interactive state, keyframes only for one-shot sequences; never `transition: all`, list properties; motion is never the only feedback; reduced motion keeps the static cue and drops the movement; no entrance animations on high-frequency interactions.

Sketch (to confirm before building): global raw values (`--ds-duration-100/150/200/300/400`, `--ds-easing-out`, `--ds-easing-emphasized: cubic-bezier(0.2, 0, 0, 1)`, scale/blur/distance values) → theme roles (`--ds-motion-duration-feedback`, `-press`, `-exit`, `-enter`, `-stagger`; `--ds-motion-easing-default`, `-icon`; `--ds-motion-press-scale`, `--ds-motion-enter-distance`, `--ds-motion-enter-blur`) → component tokens → Tailwind (`duration-*`, `ease-*`, `transition-*`). A brand tunes motion by changing theme roles; reduced motion sets durations to 0 and distances/scale to neutral. (playground: `npm run playground`, each page shows light + dark side by side). Components ship as `.tsx` source, so a Next.js consumer needs `transpilePackages: ["designsystem"]` (Phase 9 docs). No `tailwind-merge`: it can't tell `text-heading-lg` (size) from `text-subtle` (color) and would drop one.
First batch (unblocks the newsletter landing page): **Heading, Paragraph, Label, Button, Textfield (email capture), Checkbox (consent), Card, Badge, Accordion (FAQ — not in designsystemet's list; built the same token-driven way as an extension)**. Each one:
- Built with Tailwind utilities that only reference tokens (Radix primitive underneath for Accordion's expand/collapse behavior).
- Colocated `README.md`: use for / **don't use for** / props / a wrong→right example.
- Added to `playground/` for visual check.

Second batch, when "Husk og gjør" becomes a consumer: List, Tag, Dialog, Toast, Switch, Dropdown — same pattern. This is also the point the "reusable across unrelated apps" goal gets tested for real: does the landing page's theme and the todo app's theme both work off the same component code with only the theme-token file differing?

Remaining designsystemet components get built **on demand**, same pattern, when a consuming app first needs them — not speculatively.

### Phase 5 — The always-loaded component index
`docs/component-index.md`: one line per component that exists so far — name, import path, use for, don't use for. Kept under ~150 lines by design (this is what gets read every single time before any UI code is written, so it must stay cheap to re-read). This file is what later gets pointed to from a consuming project's own `CLAUDE.md` (e.g. "Husk og gjør" will add one line: "UI components → see Designsystem/docs/component-index.md, always read before building a screen").

### Phase 6 — Enforcement (lint)
`scripts/check-ds`: a script (ESLint rule or a grep-based check, whichever is cheaper to stand up) that fails the build if it finds:
- a raw hex/rgb color outside `tokens/`
- a Tailwind arbitrary value (`p-[13px]`, `text-[#fff]`) outside `tokens/`
- a raw `<button>`, `<input>`, `<a>` outside `src/components/`
Wired into a `check:ds` script consuming projects run before merging UI changes. This is what keeps the system from drifting once Claude (or anyone) is deep into a long session and the docs have scrolled out of view.

### Phase 7 — Prove the rebrand
Create `tokens/themes/example-brand.css` with different color values, swap it in, confirm (visually, via `playground/`) that every component restyles correctly with no code changes. This is the test that validates Phases 0–3 actually achieved "rebrandable," not just "looks fine once."

### Phase 8 — Composition recipes
Once there are enough components, document the handful of full-page patterns ("Husk og gjør" will need: list + empty state, form, confirmation dialog flow) as runnable example code in `playground/`. This is where page-level consistency actually gets decided, separate from individual components.

### Phase 9 — Package for reuse (moved up in practice — needed before the landing page can consume anything)
- `git init` this folder, push to `github.com/mikkelsenhello/designsystem` (public, decided above).
- Add a real `package.json` (name `designsystem`, exports pointing at `src/components` and the Tailwind preset). No npm registry publish needed — it's installed as a git dependency, so the name just needs to be internally consistent.
- Add `NOTICE.md` attributing designsystemet.no/Digdir (MIT) for the token values pulled in Phase 0.
- Tag releases (`v0.1.0`, `v0.2.0`, ...) once a batch of components is stable enough to depend on.
- Landing page's `package.json`: `"designsystem": "git+https://github.com/mikkelsenhello/designsystem.git#v0.1.0"`, pinned — bump the tag deliberately when ready, not automatically.
- Document in this repo's own `CLAUDE.md` how a consuming project integrates it (install, Tailwind preset import, pointing the consumer's own CLAUDE.md at `docs/component-index.md`).

### Phase 10 — Vercel-specific notes
- CSS-variable tokens add no runtime JS — fine for a marketing page's performance budget. Tailwind's purge/JIT works normally against a git-dependency package as long as its source files are included in what gets published (don't `.gitignore` `src/` in the design-system repo).
- No monorepo config needed (Root Directory, Turborepo, etc.) since the repos are separate — Vercel just needs normal `npm`/`pnpm install` to succeed, which depends on the git-dependency access being set up (see Phase 9).
- Keep the design system's own build framework-agnostic (plain Tailwind + CSS, no Next.js–specific code inside `src/components`) so it isn't accidentally coupled to the landing page's framework when "Husk og gjør" (or anything else) consumes it later.

## Immediate next step

Phase 0: fetch designsystemet.no's actual token values (color scale, spacing scale, radius, shadow, type scale) and write them into `tokens/global/*.css`. This has no dependencies and unblocks everything else. Shortly after, Phase 9's `git init` + remote should happen early (not at the end) since the landing page will need to pull from this repo soon — say go and I'll start with the token extraction.
