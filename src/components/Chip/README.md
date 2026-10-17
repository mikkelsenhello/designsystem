# Chip

```tsx
import { ChipCheckbox, ChipGroup, ChipRadio } from "designsystem";
```

**Use for:** filters and other quick choices among a few short options, where every option should be visible at once: "Student / Familie / Pensjonist", "I dag / Helg". `ChipCheckbox` = any number on (multi-choice), `ChipRadio` = exactly one on (single choice). Wrap them in a `ChipGroup`, which gives the set its visible name.

**Don't use for:** form questions the user answers and submits (use Checkbox; a single-choice form question needs Radio, not built yet); actions (Button); navigation between pages or tabs (Link; tabs not built yet); status or category labels that aren't clickable (Badge; Tag not built yet); long lists of options (needs a select/dropdown, not built yet). Don't hand-build toggle pills from Buttons with `aria-pressed` or styled `<span>`s.

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
| `color` | `primary` \| `neutral` \| … | group's, else `primary` | Unselected = tinted surface, selected = solid fill with a check mark. |

All native `<input>` props pass through to the (visually hidden) input: `value`, `checked` + `onChange` (controlled), `defaultChecked`, `disabled`, `name`, `ref`. `className` goes on the chip, for layout only.

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

A "clear filters" action is a `Button variant="tertiary"` next to the groups. Tokens: `tokens/components/chip.css` (radius, height, padding, gaps). Built on native checkbox/radio inputs, so keyboard (Tab, Space, arrow keys between radios) and form submission work as usual.
