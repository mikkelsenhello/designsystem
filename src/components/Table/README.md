# Table

```tsx
import { Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow } from "designsystem";
```

After designsystemet's Table: a native `<table>` with row lines, a heavier line under the header, optional frame, stripes, row hover, sticky header and sortable columns.

**Use for:** data people compare across rows and columns: orders, prices per week, schedules.

**Don't use for:** page layout; a list of cards or events (List / Card); key–value pairs of one item (a `<dl>`).

## Props

`Table`:

| Prop | Values | Default | |
|---|---|---|---|
| `border` | boolean | `false` | Frame with rounded corners. |
| `zebra` | boolean | `false` | Striped rows. |
| `hover` | boolean | `false` | Row hover, for tables where rows are acted on. |
| `stickyHeader` | boolean | `false` | Header stays visible; put the table in a scrolling container. |
| `color` | ColorFamily | context | Lines, stripes, hover. |

`TableHeaderCell` `sort`: `"none" | "ascending" | "descending"` makes the header a button with a sort icon; handle `onClick` on the cell and sort the rows yourself.
`TableHead`, `TableBody`, `TableFoot`, `TableRow`, `TableCell`: their native elements. A `<caption>` as first child names the table.

## Example

```tsx
// Wrong: a grid of divs, not a table for screen readers
<div className="grid grid-cols-3">…</div>

// Right
<Table border>
  <caption>Bestillinger</caption>
  <TableHead><TableRow><TableHeaderCell>Uke</TableHeaderCell><TableHeaderCell>Pris</TableHeaderCell></TableRow></TableHead>
  <TableBody><TableRow><TableCell>42</TableCell><TableCell>1500 kr</TableCell></TableRow></TableBody>
</Table>
```

Tokens: `tokens/components/table.css` (padding, line widths, radius, sort icon); styles in `tokens/utilities/table.css`.
