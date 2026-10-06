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
| `border-*`, `divide-*` | `subtle` | Dividers, decorative |
| | `default` | Interactive controls (3:1 contrast) |
| | `strong` | Extra emphasis |
| | `base-default` | Border matching a solid fill |

Examples: `bg-base-default text-base-contrast-default` (inside `data-color="primary"` = primary button colors), `bg-surface-default border-default`, `text-danger-default`, `text-subtle`.

Also: `text-link-visited`.

`data-color-scheme` resets the color context to `neutral` on that element, so put `data-color` on the same element or inside it.

## Spacing: `p-* m-* gap-* w-* h-* size-* inset-* space-*` …

Steps (×4px): `0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 18 22 26 30`. `p-4` = 16px. Other numbers (`p-16`, `p-17`) don't exist. Spacing is not themed.

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
| `rounded-*` | `sm` (2px), `md` (4px), `lg` (8px), `xl` (12px), `full`, `default` (= md; brand-wide) |
| `shadow-*` | `xs`, `sm`, `md`, `lg`, `xl` (low → high elevation) |
| `border-width-default` | themed border width (use with a `border-*` color) |
| `opacity-disabled` | disabled controls |
| `focus-ring` | keyboard focus ring (`:focus-visible`); put on every focusable element you build |

Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 (px).

## Not blocked by Tailwind (caught by the Phase 6 lint instead)

Tailwind generates some classes from bare numbers regardless of the theme: `border-2`, `outline-3`, `ring-2`, `opacity-50`, `z-10`, `duration-200`, plus all arbitrary values `[...]`. Don't use them for styling; use the token classes above. (`z-*` for stacking order is fine until stacking tokens exist.)

## Component tokens (inside `src/components` only)

Per-component values a brand may want to tune live in `tokens/components/<name>.css` (`--ds-button-radius`, …). Their class is the token name without `--ds-`: `rounded-button`, `px-button-padding-x-md`, `min-h-button-height-md`. Don't use these outside the component they belong to.

## Token layers (for theme authors)

`tokens/global/*.css` (raw `--ds-*` values) → `tokens/themes/default.css` (meaning: `--ds-color-{family}-{role}`, `--ds-text-*`, `--ds-radius-*` …) → `tokens/components/*.css` and `tokens/color-context.css` → `tokens/tailwind.css` (utilities).

A new theme defines every name in `default.css` (keep its `:root, [data-color-scheme]` selector) and may also override component tokens (e.g. `--ds-button-radius: var(--ds-radius-full)` for pill buttons). `npm run check:tokens` verifies it.
