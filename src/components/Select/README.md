# Select, SelectOption, SelectOptgroup

```tsx
import { Select, SelectOptgroup, SelectOption } from "designsystem";
```

After designsystemet's Select inside a Field: a native `<select>` with the Textfield look and their drawn chevron, with label, description and error built in like Textfield.

**Use for:** one choice from a list that's too long to show as radios (7+ options), or where space is tight: category, place, week.

**Don't use for:** 2–6 options that should all be visible (RadioGroup); filters (Chip); several choices (Checkbox group); a list people type to search in (Suggestion); navigation menus (Dropdown).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `label` | ReactNode | required | |
| `description` | ReactNode | | Help text under the label. |
| `error` | ReactNode | | Marks it invalid, shown and announced under it. |
| `readOnly` | boolean | `false` | Shown and submitted, can't be changed; lock icon on the label. |
| `width` | `full` `auto` | `full` | `auto` = as wide as the longest option. |

Other `<select>` props pass through (`name`, `value` / `onChange`, `defaultValue`, `required`, `disabled`). No `multiple`: use checkboxes.

Children: `SelectOption` (`<option>`) and `SelectOptgroup` (`<optgroup label>`). For a prompt, start with `<SelectOption value="" disabled>Velg …</SelectOption>` and `defaultValue=""`.

## Example

```tsx
// Wrong: raw select, no label, browser styling
<select name="kategori"><option>Konsert</option></select>

// Right
<Select label="Kategori" name="kategori" defaultValue="" error={errors.kategori}>
  <SelectOption value="" disabled>Velg kategori</SelectOption>
  <SelectOption value="konsert">Konsert</SelectOption>
  <SelectOption value="kurs">Kurs</SelectOption>
</Select>
```

Tokens: Textfield's (`tokens/components/textfield.css`); chevron and read-only look in `tokens/utilities/input.css`.
