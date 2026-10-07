# Badge

```tsx
import { Badge } from "designsystem";
```

**Use for:** a small pill with a count or a one-word status: "3", "New", "Free", "Beta".

**Don't use for:** longer labels or categories (a Tag component is planned); anything clickable (use Button); status messages that need a sentence (use an Alert, not built yet). Don't hand-build a `rounded-full px-2 text-xs` pill.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `variant` | `base` \| `tinted` | `base` | base = solid fill, tinted = light fill. |
| `color` | `primary` \| `neutral` \| `danger` \| `success` \| `warning` \| `info` | `primary` | |

All native `<span>` props pass through. If the badge carries meaning only visually (e.g. a count on an icon), add an `aria-label`.

## Example

```tsx
// Wrong
<span className="rounded-full bg-green-600 px-2 text-xs text-white">Free</span>

// Right
<Badge color="success">Free</Badge>
<Badge color="danger" aria-label="3 unread">3</Badge>
```

Tokens: `tokens/components/badge.css` (radius, min size, padding).
