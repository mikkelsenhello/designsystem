# Tokens: the closed set

These are the **only** styling classes and tokens that exist. Tailwind's default palette, spacing, radii, shadows and font sizes are switched off (`tokens/tailwind.css`), so `bg-blue-500`, `text-sm` or `shadow-2xl` don't compile.

**If the value you need isn't here, stop and add a token** (global value → theme token → Tailwind mapping), and say so. Never reach for an arbitrary value (`p-[13px]`, `text-[#fff]`) or a raw hex/px outside `tokens/`.

## Setup

```css
@import "tailwindcss";
@import "designsystem/tokens/index.css";    /* global values + default theme */
@import "designsystem/tokens/tailwind.css"; /* Tailwind utilities → tokens */
```

Dark mode: set `data-color-scheme="dark"` (or `"auto"` to follow the OS) on `<html>` or any element. Light is the default.

## Color: `{bg|text|border}-{family}-{role}`

**Families** (pick by meaning): `neutral` (default UI), `primary` (brand, main action), `info`, `success`, `warning`, `danger`.

Each role only exists on the utility it's meant for:

| Utility | Roles | Use |
|---|---|---|
| `bg-*` | `background-default`, `background-tinted` | Page / section background |
| | `surface-default`, `surface-tinted`, `surface-hover`, `surface-active` | Cards, inputs, menus, and their states |
| | `base-default`, `base-hover`, `base-active` | Solid fills: primary button, filled badge |
| `text-*` | `text-default`, `text-subtle` | Main and secondary text |
| | `base-contrast-default`, `base-contrast-subtle` | Text/icons on a `base` fill |
| `border-*`, `divide-*` | `border-subtle` | Dividers, decorative |
| | `border-default` | Interactive controls (3:1 contrast) |
| | `border-strong` | Extra emphasis |
| | `base-default` | Border matching a solid fill (outlined button) |

Examples: `bg-primary-base-default text-primary-base-contrast-default`, `bg-neutral-surface-default border-neutral-border-default`, `text-danger-text-default`.

Also: `text-link-visited`, `outline-focus-outer`, `ring-focus-inner`.

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

Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 (px).

## Not blocked by Tailwind (caught by the Phase 6 lint instead)

Tailwind generates some classes from bare numbers regardless of the theme: `border-2`, `outline-3`, `ring-2`, `opacity-50`, `z-10`, `duration-200`, plus all arbitrary values `[...]`. Don't use them for styling; use the token classes above. (`z-*` for stacking order is fine until stacking tokens exist.)

## Token layers (for theme authors)

`tokens/global/*.css` (raw `--ds-*` values) → `tokens/themes/default.css` (meaning, `--ds-color-*`, `--ds-text-*`, `--ds-radius-*` …) → `tokens/tailwind.css` (utilities). A new theme defines every name in `default.css`; `npm run check:tokens` verifies it.
