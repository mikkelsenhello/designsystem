# Heading

```tsx
import { Heading } from "designsystem";
```

**Use for:** every heading: page titles, section titles, card titles.

**Don't use for:** large text that isn't a heading (a big number, a quote; use Paragraph `size="xl"`); bold body text; a raw `<h1>`–`<h6>` with its own font-size classes.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `level` | `1`–`6` | `2` | Renders `h1`–`h6`. Pick by document structure: one `h1` per page, no skipped levels. |
| `size` | `2xl` \| `xl` \| `lg` \| `md` \| `sm` \| `xs` \| `2xs` | `md` | Visual size, 60px → 18px. Independent of `level`. |

All native heading props pass through. Color is inherited, so it follows the surrounding text color / `data-color`.

## Example

```tsx
// Wrong: size tied to tag, raw classes
<h1 className="text-5xl font-bold">Weekly picks</h1>

// Right
<Heading level={1} size="2xl">Weekly picks</Heading>
<Heading level={2} size="lg">This week</Heading>
```
