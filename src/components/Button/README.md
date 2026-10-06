# Button

```tsx
import { Button } from "designsystem";
```

**Use for:** any action the user triggers: submit a form, open a dialog, confirm, cancel.

**Don't use for:** navigating to another page (that's a link); making a card or row clickable; a hand-built `<button className="...">` styled to look like this. If Button can't do what you need, extend Button.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `variant` | `primary` \| `secondary` \| `tertiary` | `primary` | primary = solid fill, the main action (one per view). secondary = outlined. tertiary = text only, for low-emphasis actions. |
| `size` | `sm` \| `md` \| `lg` | `md` | 40 / 48 / 56px tall. |
| `color` | `primary` \| `neutral` \| `danger` \| `success` \| `warning` \| `info` | `primary` | Use `danger` for destructive actions, `neutral` for actions that shouldn't draw the eye. |
| `fullWidth` | boolean | `false` | Stretch to the container. |
| `type` | `button` \| `submit` \| `reset` | `button` | Set `submit` in forms. |

All native `<button>` props (`onClick`, `disabled`, `aria-*`, `ref`, …) pass through. `className` is for layout only (margin, grid placement), not restyling.

## Example

```tsx
// Wrong: hand-built, raw values, breaks on rebrand
<button className="bg-blue-600 text-white px-4 py-2 rounded">Subscribe</button>

// Right
<Button type="submit">Subscribe</Button>
<Button variant="secondary" color="danger" onClick={unsubscribe}>Unsubscribe</Button>
```

Tokens: `tokens/components/button.css` (radius, heights, padding). Colors come from the theme family set by `color`.
