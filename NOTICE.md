# Third-party notices

This repository is all rights reserved, except for the third-party material listed below, which stays under its own license.

## designsystemet.no (Digdir)

The token values in `tokens/global/` (color scales, spacing scale, border-radius scale, shadow scale, type scale, border widths and opacity), and the semantic structure of `tokens/themes/default.css` (color role names and their step mapping, text styles), are taken from **Designsystemet** by Digitaliseringsdirektoratet (Digdir), <https://designsystemet.no>.

- Source: <https://github.com/digdir/designsystemet>, `design-tokens/` (package `@digdir/designsystemet` v1.23.0, commit `c11e60d`, retrieved 2026-10-06)
- Token values, component sizing values (heights, paddings), and icon paths (`src/internal/icons.tsx` and the data-URI masks in `tokens/utilities/`) from `packages/css`.
- The CSS rules in `tokens/utilities/*.css` are adapted from Designsystemet's `packages/css/src/*.css` (retrieved 2026-10-17 from the `main` branch): their `--dsc-*` variables replaced by this repo's tokens, selectors renamed. Behavior logic in Pagination (`paginationSteps`), Breadcrumbs and ErrorSummary follows their `packages/web` web components. The React components themselves are written here; none of Designsystemet's React code is included.
- Changes: values resolved to static CSS custom properties at the default ("md") size mode, renamed, and hex colors lowercased.

## Tailwind CSS (Tailwind Labs)

The layout widths in `tokens/global/container.css` and the breakpoints in `tokens/tailwind.css` are Tailwind CSS v4 defaults, <https://github.com/tailwindlabs/tailwindcss>, MIT License, Copyright (c) Tailwind Labs, Inc.

## make-interfaces-feel-better (Jakub Krehel)

The motion values in `tokens/global/motion.css` and the motion roles in the themes (durations, easing, press scale, enter distance and blur) and the motion rules in `docs/tokens.md` follow `skills/make-interfaces-feel-better/animations.md` from <https://github.com/jakubkrehel/make-interfaces-feel-better>, MIT License, Copyright (c) Jakub Krehel. Only values and guidance were taken, no code.

## Designsystemet license (MIT):

```
Copyright Digitaliseringsdirektoratet (Digdir)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
