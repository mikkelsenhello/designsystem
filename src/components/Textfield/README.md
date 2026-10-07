# Textfield

```tsx
import { Textfield } from "designsystem";
```

**Use for:** single-line text input with a visible label: email, name, search terms, numbers.

**Don't use for:** multi-line text (needs a Textarea; not built yet); choosing from options (Checkbox, or a future Select/Radio); a raw `<input>` with its own border/padding classes, or a field with only a placeholder and no label.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `label` | ReactNode | required | Visible label, linked to the input. |
| `description` | ReactNode | | Help text between label and input. |
| `error` | ReactNode | | Error text under the input; sets `aria-invalid` and a red border. Omit when valid. |
| `type` | any text-like input type | `text` | `email`, `tel`, `url`, `search`, `password`, `number` … |

All native `<input>` props pass through (`name`, `value`, `onChange`, `required`, `autoComplete`, `disabled`, `ref`, …) to the input itself. `className` goes on the wrapper, for layout.

## Example

```tsx
// Wrong: no label, raw styling, error not linked to the input
<input type="email" placeholder="Email" className="border rounded px-3 py-2" />
<span className="text-red-600">Invalid email</span>

// Right
<Textfield
  label="Email"
  type="email"
  name="email"
  autoComplete="email"
  required
  error={emailError}
/>
```

Tokens: `tokens/components/textfield.css` (radius, height, padding, gap, border thickness). Border thickness: `--ds-textfield-border-width` (resting) and `--ds-textfield-border-width-hover` (total on hover). Both follow the theme's `--ds-border-width-default` unless a theme overrides them.
