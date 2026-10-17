# Chip

```tsx
import { ChipButton, ChipCheckbox, ChipGroup, ChipRadio, ChipRemovable } from "designsystem";
```

**Use for:** filters and other quick choices among a few short options, where every option should be visible at once: "Student / Familie / Pensjonist", "I dag / Helg". `ChipCheckbox` = any number on (multi-choice), `ChipRadio` = exactly one on (single choice). Wrap them in a `ChipGroup`, which gives the set its visible name. `ChipRemovable` = an active filter shown as a solid chip with a ×, pressing it removes that value. `ChipButton` = a small chip-styled action that doesn't toggle (a suggested search).

**Don't use for:** form questions the user answers and submits (use Checkbox; a single-choice form question needs RadioGroup); actions (Button); navigation between pages or tabs (Link, Tabs); status or category labels that aren't clickable (Tag); long lists of options (Select). Don't hand-build toggle pills from Buttons with `aria-pressed` or styled `<span>`s.

## Props

**ChipGroup**: a `<fieldset>` with a visible `<legend>`; chips wrap onto new lines.

| Prop | Values | Default | |
|---|---|---|---|
| `legend` | ReactNode | required | Name of the group ("Målgruppe"). Screen readers announce it with each chip. |
| `name` | string | generated | Shared input `name`, what a form submits. Without it a unique one is generated, so ChipRadios in one group are always mutually exclusive. |
| `color` | `primary` \| `neutral` \| … | `primary` | Color of every chip inside. |

Other `<fieldset>` props pass through; `className` is for layout.

**ChipCheckbox / ChipRadio**

| Prop | Values | Default | |
|---|---|---|---|
| `children` | ReactNode | required | The chip's text. One or two words. |
| `color` | `primary` \| `neutral` \| … | group's, else `primary` | Unselected = tinted surface with a subtle border and an outlined box/circle; selected = solid fill, the box/circle turns light with a mark in the chip's color. |

Looks like designsystemet's chip: checkbox chips have slightly rounded corners, radio chips are pills, so the shape tells multi from single choice. Long text is cut off with an ellipsis.

All native `<input>` props pass through to the input: `value`, `checked` + `onChange` (controlled), `defaultChecked`, `disabled`, `name`, `ref`. `className` goes on the chip, for layout only.

**ChipButton / ChipRemovable**: `<button type="button">`; all native button props pass through (`onClick`, `disabled`, `ref`).

| Prop | Values | Default | |
|---|---|---|---|
| `children` | ReactNode | required | The chip's text. |
| `color` | `primary` \| `neutral` \| … | group's, else `primary` | |
| `removeLabel` (ChipRemovable) | string | `"Trykk for å fjerne"` | Read after the text by screen readers, so they know pressing removes it. |

## Example

```tsx
// Wrong: hand-built toggles, no group name for screen readers, raw styling
<div className="flex gap-2">
  {groups.map((g) => (
    <button key={g} onClick={() => toggle(g)} className={on(g) ? "bg-blue-600 text-white rounded-full px-4" : "rounded-full px-4"}>{g}</button>
  ))}
</div>

// Right: multi-choice filter, controlled
<ChipGroup legend="Målgruppe">
  {groups.map((g) => (
    <ChipCheckbox key={g} value={g} checked={selected.includes(g)} onChange={() => toggle(g)}>
      {g}
    </ChipCheckbox>
  ))}
</ChipGroup>

// Right: single choice
<ChipGroup legend="Tidspunkt">
  <ChipRadio value="uke" defaultChecked>Hele uka</ChipRadio>
  <ChipRadio value="idag">I dag</ChipRadio>
  <ChipRadio value="helg">Helg</ChipRadio>
</ChipGroup>
```

```tsx
// Right: active filters the user can remove one by one
{selected.map((g) => (
  <ChipRemovable key={g} onClick={() => toggle(g)}>{g}</ChipRemovable>
))}
```

A "clear filters" action is a `Button variant="tertiary"` next to the groups. Tokens: `tokens/components/chip.css` (height, padding, radii, input size and inset, gaps). Built on native checkbox/radio inputs, so keyboard (Tab, Space, arrow keys between radios) and form submission work as usual.
