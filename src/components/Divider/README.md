# Divider

```tsx
import { Divider } from "designsystem";
```

After designsystemet's Divider: a 1px `<hr>` in neutral border-subtle, half a line of space above and below. `aria-hidden`: purely visual.

**Use for:** a visual break between blocks that belong to the same section (items in a card, groups in a menu).

**Don't use for:** separating page sections (use spacing and headings); borders around things (Card, Table `border`); dividers between list rows you build yourself (use `divide-y divide-subtle`).

## Props

Native `<hr>` props. `className` for margin changes only.

## Example

```tsx
// Wrong: hand-built line, raw color
<div className="h-px bg-neutral-border-subtle" />

// Right
<Paragraph>Konsert fredag</Paragraph>
<Divider />
<Paragraph>Quiz lørdag</Paragraph>
```

Tokens: `tokens/components/divider.css` (width, spacing).
