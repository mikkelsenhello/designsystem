# Card

```tsx
import { Card } from "designsystem";
```

**Use for:** grouping related content into one visible box: a feature, a testimonial, a pricing option, a signup form.

**Don't use for:** page-wide sections or background bands (use a plain element with `bg-background-tinted`); a clickable card that navigates (not supported yet, so put a Button or link inside instead); a hand-built `<div className="border rounded p-6 ...">` lookalike.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `variant` | `default` \| `tinted` | `default` | default = plain surface, tinted = subtly colored. |
| `color` | `neutral` \| `primary` \| `success` \| … | `neutral` | Colors the card *and everything inside it* that uses context colors (Badge, Button secondary, text). |

All native `<div>` props pass through. Children are stacked with even spacing; `className` is for layout (width, grid placement).

## Example

```tsx
// Wrong
<div className="rounded-lg border border-gray-200 bg-blue-50 p-6">…</div>

// Right
<Card variant="tinted" color="primary">
  <Heading level={3} size="xs">Weekly picks</Heading>
  <Paragraph>The best of the week, every Friday.</Paragraph>
</Card>
```

Tokens: `tokens/components/card.css` (radius, padding, gap).
