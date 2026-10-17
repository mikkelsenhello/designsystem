# Tokens: the closed set

These are the **only** styling classes and tokens that exist. Tailwind's default palette, spacing, radii, shadows and font sizes are switched off (`tokens/tailwind.css`), so `bg-blue-500`, `text-sm` or `shadow-2xl` don't compile.

**If the value you need isn't here, stop and add a token** (global value → theme token → Tailwind mapping), and say so. Never reach for an arbitrary value (`p-[13px]`, `text-[#fff]`) or a raw hex/px outside `tokens/`.

## Setup

```css
@import "tailwindcss";
@import "designsystem/tokens/index.css";    /* all token values + default theme */
@import "designsystem/tokens/tailwind.css"; /* Tailwind utilities → tokens */
```

Dark mode: set `data-color-scheme="dark"` (or `"auto"` to follow the OS) on `<html>` or any element. Light is the default.

## Color

**Families** (pick by meaning): `neutral` (default UI), `primary` (brand, main action), `info`, `success`, `warning`, `danger`.

**Two forms of every color class:**
- `bg-surface-default`, `text-subtle`, `border-strong`: follow the **color context**. The context is `neutral`, unless an ancestor (or the element itself) has `data-color="primary|danger|…"`. Prefer this form: one attribute recolors a whole block.
- `bg-primary-surface-default`, `text-danger-subtle`: always that family.

Each role only exists on the utility it's meant for (`bg-subtle` or `text-surface-default` don't exist):

| Utility | Roles (`{family}-` optional) | Use |
|---|---|---|
| `bg-*` | `background-default`, `background-tinted` | Page / section background |
| | `surface-default`, `surface-tinted`, `surface-hover`, `surface-active` | Cards, inputs, menus, and their states |
| | `base-default`, `base-hover`, `base-active` | Solid fills: primary button, filled badge |
| `text-*` | `default`, `subtle` | Main and secondary text |
| | `base-contrast-default`, `base-contrast-subtle` | Text/icons on a `base` fill |
| | `base-default` | Mark in the `base` color on a light fill (checked chip's check mark) |
| `border-*`, `divide-*` | `subtle` | Dividers, decorative |
| | `default` | Interactive controls (3:1 contrast) |
| | `strong` | Extra emphasis |
| | `base-default` | Border matching a solid fill |

Examples: `bg-base-default text-base-contrast-default` (inside `data-color="primary"` = primary button colors), `bg-surface-default border-default`, `text-danger-default`, `text-subtle`.

Also: `text-link-visited`.

`data-color-scheme` resets the color context to `neutral` on that element, so put `data-color` on the same element or inside it.

## Spacing: `p-* m-* gap-* w-* h-* size-* inset-* space-*` …

Steps (×4px): `0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 18 22 26 30`. `p-4` = 16px. Other numbers (`p-16`, `p-17`) don't exist. Spacing is not themed.

## Layout widths: `max-w-* w-*`

`sm` 384, `md` 448, `lg` 512, `xl` 576, `2xl` 672, `3xl` 768, `4xl` 896, `5xl` 1024, `6xl` 1152, `7xl` 1280 (px), `prose` (65ch, comfortable reading width). Plus Tailwind's built-ins `w-full`, `w-fit`, `w-screen`. Not themed.

**Unknown classes fail silently**: Tailwind doesn't warn about a class that doesn't exist, it just generates nothing. If a class from memory of "normal Tailwind" seems to do nothing, it's probably not in this list.

## Typography

| Class | Sets |
|---|---|
| `text-heading-{2xl,xl,lg,md,sm,xs,2xs}` | size + line height + weight + letter spacing |
| `text-body-{xl,lg,md,sm,xs}` | same; `md` is the page default |
| `leading-short`, `leading-long` | override line height: single-line UI text / long-form reading |
| `font-heading`, `font-body` | font family |
| `font-regular`, `font-medium`, `font-semibold` | weight |

Pick the heading size by visual weight, independent of `h1`–`h6`.

## Shape and state

| Class | Values |
|---|---|
| `rounded-*` | `sm` (2px), `md` (4px), `lg` (8px), `xl` (12px), `full`, `default` (= md; brand-wide, what buttons and inputs use) |
| `shadow-*` | `xs`, `sm`, `md`, `lg`, `xl` (low → high elevation) |
| `border-width-default` | themed border width (use with a `border-*` color) |
| `opacity-disabled` | disabled controls |
| `focus-ring` | keyboard focus ring (`:focus-visible`); put on every focusable element you build |
| `focus-ring-within` | same ring on a wrapper whose inner control has keyboard focus (a label around a hidden input) |
| `focus-ring-inset` | same, drawn inside the element (full-width rows where an outer ring would be clipped) |
| `focus-ring-within-inset` | inside ring on a wrapper whose control has keyboard focus (items flush in a bar) |

## Motion

Only animate with these. Pick by how often the user sees it: the more often, the shorter and subtler.

| Class | Use |
|---|---|
| `transition-colors`, `transition-opacity`, `transition-transform`, `transition` | what animates; default duration/easing = hover feedback (100ms, ease-out) |
| `duration-feedback` | 100ms: hover color/background |
| `duration-press` | 150ms: press feedback |
| `duration-expand` | 200ms: opening/closing in place |
| `duration-enter` / `duration-exit` | 300ms / 150ms: things appearing / leaving |
| (Skeleton only) `--ds-motion-duration-pulse` | 800ms each way: loading pulse; halved in speed for reduced motion |
| `ease-default`, `ease-emphasized` | easing: almost everything / larger moves that should settle softly |
| `animate-enter` | one-shot entrance: fade in, rise 12px, sharpen from blur. For infrequent moments (hero, success message), never on things that appear on every click |
| `delay-stagger-{1,2,…}` | start an `animate-enter` group 1, 2, … steps (100ms) late |

Rules: transitions (interruptible) for interactive state, `animate-*` only for one-shot sequences. Never `transition-all` (`check-ds` catches it). Motion is never the only feedback. Reduced motion is handled in the tokens (`tokens/reduced-motion.css`): movement drops out, fades stay, so nothing extra is needed per element.

Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 (px).

## Enforced by `check-ds`

Tailwind still compiles some classes the theme can't block. `npx check-ds` (in this repo: `npm run check:ds`) fails on them:

| Rule | Catches | Use instead |
|---|---|---|
| `raw-color` | `#1a56db`, `rgba(...)`, `oklch(...)` | color classes / `var(--ds-color-...)` |
| `arbitrary-value` / `arbitrary-property` | `p-[13px]`, `bg-(--x)`, `[mask-type:...]` | a class above, or add a token |
| `bare-number-utility` | `border-2`, `opacity-50`, `ring-2`, `outline-3`, `duration-200` | `border-width-default`, `opacity-disabled`, `focus-ring`, `duration-feedback` |
| `transition-all` | `transition-all` | `transition-colors`, `transition-transform`, … |
| `raw-element` | `<button>`, `<input>`, `<a>` outside the design system | Button, Textfield / Checkbox, Link |
| `inline-style` | `style={{ ... }}` | classes |
| `raw-length` | `24px`, `1.5rem` in CSS files | `var(--ds-space-*)` / tokens |

Allowed: `z-*`, `grid-cols-*`, `rotate-*` and arbitrary *variants* like `data-[state=open]:`. Files inside any `tokens/` folder are skipped. A genuine exception gets a `ds-allow: <reason>` comment on the line or the line above, so the reason is visible in review.

## Component tokens (inside `src/components` only)

Per-component values a brand may want to tune live in `tokens/components/<name>.css` (`--ds-button-radius`, …). Their class is the token name without `--ds-`: `rounded-button`, `px-button-padding-x-md`, `min-h-button-height-md`. Don't use these outside the component they belong to.

## Token layers (for theme authors)

`tokens/global/*.css` (raw `--ds-*` values) → `tokens/themes/default.css` (meaning: `--ds-color-{family}-{role}`, `--ds-text-*`, `--ds-radius-*` …) → `tokens/components/*.css` and `tokens/color-context.css` → `tokens/tailwind.css` (utilities).

A new theme defines every name in `default.css` (keep its `:root, [data-color-scheme]` selector) and may also override component tokens (e.g. `--ds-button-radius: var(--ds-radius-full)` for pill buttons). `npm run check:tokens` verifies it. Worked example: `tokens/themes/example-brand.css`. A theme applies to the whole page, not to one section: component tokens are resolved once at `:root`.
