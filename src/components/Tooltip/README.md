# Tooltip

```tsx
import { Tooltip } from "designsystem";
```

After designsystemet's Tooltip (with Radix underneath): short inverted text with an arrow, on hover and keyboard focus after 150ms; Escape hides it.

**Use for:** naming an icon-only button (`type="labelledby"`), or a short extra hint on something focusable.

**Don't use for:** anything people must read or click (it can't be reached on touch screens): use visible text, a Popover or Alert. Never on disabled buttons (they can't get focus).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `content` | string | required | The text. |
| `children` | one focusable element, or a string | required | A string is wrapped in a focusable `<span>`. |
| `type` | `describedby` `labelledby` | `describedby` | `labelledby` = the tooltip is the element's name (sets its `aria-label`). |
| `placement` | `top` … `right-end` | `top` | |
| `autoPlacement` | boolean | `true` | |
| `open` | boolean | | Force open/closed. |

## Example

```tsx
// Wrong: a native title attribute (no keyboard, no styling), or an icon button with no name
<Button icon title="Neste">→</Button>

// Right
<Tooltip content="Neste side" type="labelledby">
  <Button icon variant="tertiary"><ChevronRight /></Button>
</Tooltip>
```

Tokens: `tokens/components/tooltip.css` (radius, padding, arrow); styles in `tokens/utilities/floating.css`.
