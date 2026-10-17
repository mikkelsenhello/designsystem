# ToggleGroup, ToggleGroupItem

```tsx
import { ToggleGroup, ToggleGroupItem } from "designsystem";
```

After designsystemet's ToggleGroup: Button-sized items in one outlined bar, exactly one selected. Built on hidden radio inputs, so arrow keys move between items and screen readers hear "1 av 2".

**Use for:** switching how something is shown, right away: 2–4 short options ("I annonsen" / "Som skjema", "Dag / Uke / Måned").

**Don't use for:** a form question that gets submitted (RadioGroup); filters (ChipRadio); navigating between pages (Link); tabs with their own panels (Tabs, not built yet); a row of Buttons with a hand-made "active" style.

## ToggleGroup props

| Prop | Values | Default | |
|---|---|---|---|
| `aria-label` or `aria-labelledby` | string | required (one of them) | What the group switches, e.g. "Visning". |
| `value` / `onChange` | string / `(value: string) => void` | | Controlled. |
| `defaultValue` | string | | Uncontrolled starting item. |
| `size` | `sm` `md` | `md` | 40px / 48px, the Button sizes. |
| `variant` | `primary` `secondary` | `primary` | primary: selected item filled. secondary: tinted bar, selected item white with a border. |
| `color` | ColorFamily | `primary` | |
| `name` | string | generated | Name of the radios. Inside a `<form>` the selection is submitted under it; ignore it server-side if you don't need it. |

## ToggleGroupItem props

`value` (required), `children` (the text), `disabled`. Other `<label>` props pass through.

## Example

```tsx
// Wrong: two Buttons faking a selected state
<Button variant={view === "ad" ? "primary" : "tertiary"} onClick={() => setView("ad")}>I annonsen</Button>
<Button variant={view === "form" ? "primary" : "tertiary"} onClick={() => setView("form")}>Som skjema</Button>

// Right
<ToggleGroup aria-label="Visning" value={view} onChange={setView} size="sm">
  <ToggleGroupItem value="ad">I annonsen</ToggleGroupItem>
  <ToggleGroupItem value="form">Som skjema</ToggleGroupItem>
</ToggleGroup>
```

Tokens: `tokens/components/toggle-group.css` (radius, outline, heights, padding; follow Button's tokens by default).

Not built from designsystemet: icon-only items (`icon`), link items (`<a aria-current>`), `readOnly`. Arrow keys select as they move (native radio behaviour); designsystemet's web component moves focus only and selects on Space/Enter.
