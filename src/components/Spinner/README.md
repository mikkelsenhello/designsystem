# Spinner

```tsx
import { Spinner } from "designsystem";
```

After designsystemet's Spinner: a turning ring, `role="img"`. Keeps turning (3× slower) for reduced motion, since it is the only sign that something is happening.

**Use for:** a wait of unknown length: loading a list, sending a form. Inside a button use Button `loading` instead.

**Don't use for:** placeholders for content that's on its way and has a known shape (Skeleton); progress you can measure; a hand-built `animate-spin` icon.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `aria-label` | string | required (or `aria-hidden`) | What is loading. `aria-hidden` when text next to it says it. |
| `size` | `2xs` `xs` `sm` `md` `lg` `xl` | `md` | 12 / 20 / 32 / 44 / 60 / 88px. |
| `color` | ColorFamily | surrounding context | |

## Example

```tsx
// Wrong: hand-built, not announced, ignores reduced motion tokens
<svg className="animate-spin" />

// Right
<Spinner aria-label="Laster arrangementer" />
<Button type="submit" loading={sending}>Send</Button>
```

Tokens: `tokens/components/spinner.css` (sizes, turn speed via the theme's `--ds-motion-duration-spin`); styles in `tokens/utilities/spinner.css`.

Not built from designsystemet: synchronizing several spinners' animation phase.
