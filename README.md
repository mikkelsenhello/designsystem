# Designsystem

A rebrandable, reusable design system: CSS-variable tokens (global → theme → component) wired into Tailwind v4, with React components that only ever reference tokens. Rebranding means swapping one theme file, not editing components.

- [PLAN.md](PLAN.md): architecture, phases and decisions already made
- [docs/component-index.md](docs/component-index.md): which component to use for what
- [docs/tokens.md](docs/tokens.md): every legal styling class (the closed set)
- [NOTICE.md](NOTICE.md): attribution for third-party values

## Using it in a project

Requires React 19, Tailwind CSS 4.3+. Examples assume Next.js (App Router).

**1. Install, pinned to a tag** (bump the tag deliberately; never point at a branch):

```bash
npm install "git+https://github.com/mikkelsenhello/designsystem.git#v0.1.0"
```

**2. Let Next.js compile it.** Components ship as TypeScript source:

```ts
// next.config.ts
const config: NextConfig = { transpilePackages: ["designsystem"] };
```

**3. Import the CSS, in this order**, in the global stylesheet (with `@tailwindcss/postcss` set up as usual):

```css
@import "tailwindcss";
@import "designsystem/tokens/index.css";    /* token values + default theme */
@import "designsystem/tokens/tailwind.css"; /* Tailwind utilities -> tokens; also scans the components */
```

**4. Load the font.** The default theme uses Inter but doesn't ship it. Simplest, in the root layout's `<head>`:

```tsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
```

(Using `next/font` instead: give it `variable: "--font-inter"` and set `--ds-font-family-body` / `--ds-font-family-heading` to `var(--font-inter)` in your theme.)

**5. Use components:**

```tsx
import { Button, Heading, Textfield } from "designsystem";
```

Dark mode: `data-color-scheme="dark"` (or `"auto"`) on `<html>`. Recolor a block: `data-color="primary"`.

**6. Add the lint** to the project's checks, so nothing styles around the tokens:

```json
"scripts": { "check:ds": "check-ds" }
```

`check-ds` scans `src`, `app`, `components` and `pages` by default (or pass folders).

**7. Point Claude at the index.** Add to the project's `CLAUDE.md`:

```md
## UI
Use the design system (`designsystem` package) for all UI. Before writing any UI, read
`node_modules/designsystem/docs/component-index.md`; for styling, only classes from
`node_modules/designsystem/docs/tokens.md`. Never hand-build a component that exists there.
Run `npm run check:ds` before finishing UI work.
```

## Rebranding

Copy `tokens/themes/default.css` into your project (inside a `tokens/` folder, which `check-ds` treats as the place for raw values), change the values, and keep every name and the `:root, [data-color-scheme]` selector. Then replace the `index.css` import:

```css
@import "tailwindcss";
@import "designsystem/tokens/base.css";      /* everything except the theme */
@import "./tokens/my-brand.css";             /* your theme */
@import "designsystem/tokens/tailwind.css";
```

A theme can also override component tokens, e.g. `--ds-button-radius: var(--ds-radius-full)` for pill buttons.

## Working on the design system itself

```bash
npm install
npm run playground   # http://localhost:3000, every component in light + dark
npm run check        # token wiring + lint + types
```

All rights reserved. Token values derived from designsystemet.no (MIT); see `NOTICE.md`.
