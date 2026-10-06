# Component index

Read this before writing any UI. If a component below fits, use it; never hand-build a lookalike. If nothing fits, check `docs/tokens.md` for the legal styling classes, and consider whether the design system needs a new component instead.

All components: `import { Name } from "designsystem";`. Each has a README with props and examples: `src/components/<Name>/README.md`.

| Component | Use for | Don't use for |
|---|---|---|
| **Button** | Actions: submit, confirm, cancel, open. `variant` primary/secondary/tertiary, `color` for danger etc. | Navigation to another page (use a link); clickable cards/rows |
| **Heading** | All headings. `level` = h1–h6 (structure), `size` = 2xl–2xs (look) | Big non-heading text (Paragraph `size="xl"`); bold body text |
| **Paragraph** | Body text, intros, help text. `size` xl–xs, `variant` short/long line height | Headings; form labels |
| **Label** | Visible label of a form field (`htmlFor`) | Headings, bold text, tags/badges |

## Rules that apply everywhere

- Style only with classes from `docs/tokens.md`. No raw hex/px, no arbitrary values (`p-[13px]`), no Tailwind defaults (`bg-blue-500`).
- Recolor a block with `data-color="primary|danger|…"` instead of per-element color classes.
- `className` on a component is for layout (margin, grid placement), not for restyling it.
