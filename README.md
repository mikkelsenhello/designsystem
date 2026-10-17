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

**4. Load the font.** The default theme uses Inter but doesn't ship it. With Next.js, use `next/font` and point the design system's Inter at it:

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// <html className={inter.variable}>
```

```css
/* after the design system imports in the global stylesheet */
:root {
  --ds-font-inter: var(--font-inter), sans-serif;
}
```

(Without Next.js: a Google Fonts `<link>` for Inter 400/500/600 in `<head>` is enough, no CSS needed.)

Next.js 16's `create-next-app` sets Tailwind up through `@tailwindcss/turbopack` instead of PostCSS; both work with these imports.

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
