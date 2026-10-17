# Popover, PopoverTrigger, PopoverTriggerContext

```tsx
import { Popover, PopoverTrigger, PopoverTriggerContext } from "designsystem";
```

After designsystemet's Popover (with Radix underneath): a small non-modal panel with an arrow next to its trigger. Opening moves focus into it; Escape, a click outside or the trigger again closes it, and focus goes back to the trigger. Rendered in place, not in a portal, so it keeps the page's color scheme and `data-color`.

**Use for:** a few settings or a short explanation that belong to one thing on the page and shouldn't take room until asked for ("Tilpass" over the ad editor); `inline` for explaining a word in running text.

**Don't use for:** content people must read (put it on the page); a list of actions or links (Dropdown); long forms or anything needing a confirm step (Dialog); hover-only hints (Tooltip).

## Props

`PopoverTriggerContext`: `open` / `onOpenChange` (controlled), `defaultOpen`.

`PopoverTrigger`: Button props (pick `variant` / `size`), or `inline` for a dotted-underlined word.

`Popover`:

| Prop | Values | Default | |
|---|---|---|---|
| `placement` | `top` `bottom` `left` `right`, each with `-start` / `-end` | `top` | Flips/shifts to stay on screen. |
| `autoPlacement` | boolean | `true` | |
| `variant` | `default` `tinted` | `default` | |
| `color` | ColorFamily | context | |

Give the panel a Heading when it holds settings.

## Example

```tsx
// Wrong: hand-built panel, no Escape, focus lost
{open && <Card className="absolute">…</Card>}

// Right (replaces Nettside's local Popover: trigger → PopoverTrigger, title → a Heading inside)
<PopoverTriggerContext>
  <PopoverTrigger variant="secondary" size="sm">Tilpass</PopoverTrigger>
  <Popover placement="bottom-end">
    <Heading level={4} size="2xs" className="mb-2">Tilpass annonsen</Heading>
    <ChipGroup legend="Bakgrunnsfarge">…</ChipGroup>
  </Popover>
</PopoverTriggerContext>
```

Tokens: `tokens/components/popover.css` (radius, border, padding, max width, arrow); styles in `tokens/utilities/floating.css`.
