# ListUnordered, ListOrdered, ListItem

```tsx
import { ListItem, ListOrdered, ListUnordered } from "designsystem";
```

After designsystemet's List: native `<ul>` / `<ol>` with bullets or numbers, 24px indent, 12px between items (8px in a nested list).

**Use for:** lists in running text: bullet points, steps, rankings. Nest a list inside a ListItem.

**Don't use for:** a navigation menu or a row of cards (style a plain `<ul>` for layout); an FAQ (Accordion); tabular data (Table); a hand-built list with "•" characters.

## Props

All three take their element's native props (`start`, `reversed` on ListOrdered) and `asChild` (style your own element).

## Example

```tsx
// Wrong: Tailwind's preflight removes bullets, and fake bullets aren't read as a list
<div>• Konserter<br />• Kurs</div>

// Right
<ListUnordered>
  <ListItem>Konserter</ListItem>
  <ListItem>Kurs</ListItem>
</ListUnordered>
```

Tokens: `tokens/components/list.css` (indent, gaps); styles in `tokens/utilities/list.css`.
