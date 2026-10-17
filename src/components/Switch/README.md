# Switch

```tsx
import { Switch } from "designsystem";
```

After designsystemet's Switch: a native `<input type="checkbox" role="switch">` drawn as a pill with a sliding knob; screen readers say on/off, forms submit it like a checkbox.

**Use for:** a setting that takes effect right away: "Vis bare gratis arrangementer", notification on/off.

**Don't use for:** a choice that's only applied when a form is submitted, or consent (Checkbox); picking one of several options (RadioGroup, ToggleGroup); filters among several (Chip).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `label` | ReactNode | required | Clickable. |
| `description` | ReactNode | | Smaller text under the label. |
| `position` | `start` `end` | `start` | `end`: label first, switch at the row's end (settings lists). |
| `color` | ColorFamily | `primary` | Color when on. |

Other `<input>` props pass through: `checked` / `onChange`, `defaultChecked`, `disabled`, `readOnly` (keeps its value), `name`.

## Example

```tsx
// Wrong: a Checkbox for an instant setting, or a hand-built toggle button
<Checkbox label="Mørk modus" onChange={toggleTheme} />

// Right
<Switch label="Vis bare gratis arrangementer" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
```

Tokens: `tokens/components/switch.css` (size, border, knob inset, slide speed: instant for reduced motion); styles in `tokens/utilities/switch.css`.

Not built from designsystemet: `variant="outline"` (boxed switch).
