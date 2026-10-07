# Checkbox

```tsx
import { Checkbox } from "designsystem";
```

**Use for:** a yes/no choice the user confirms by submitting, e.g. consent ("I agree to receive emails"), or picking several options from a list.

**Don't use for:** a setting that takes effect immediately (needs a Switch; not built yet); choosing exactly one option (needs Radio); a raw `<input type="checkbox">` with its own styling.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `label` | ReactNode | required | Visible, clickable label. |
| `description` | ReactNode | | Smaller help text under the label. |
| `error` | ReactNode | | Error text; sets `aria-invalid` and turns the box danger-colored. |
| `color` | `primary` \| `neutral` \| `success` \| … | `primary` | Color of the checked box. |

All native `<input>` props pass through (`name`, `checked`, `defaultChecked`, `onChange`, `required`, `disabled`, `ref`, …) to the input. `className` goes on the wrapper, for layout.

## Example

```tsx
// Wrong: label not clickable, raw styling
<input type="checkbox" className="accent-blue-600" /> <span>I agree</span>

// Right
<Checkbox
  name="consent"
  label="I agree to receive the newsletter"
  description="You can unsubscribe at any time."
  required
  error={consentError}
/>
```

Tokens: `tokens/components/checkbox.css` (size, radius, border width, gap).
