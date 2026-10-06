# Label

```tsx
import { Label } from "designsystem";
```

**Use for:** the visible label of a form field (`htmlFor` → the input's `id`).

**Don't use for:** headings or bold body text (use Heading / Paragraph); badges or tags; labelling a field that already gets its label from Textfield's or Checkbox's own `label` prop (once those exist, prefer that).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `size` | `sm` \| `md` \| `lg` | `md` | Match the size of the field. |

All native `<label>` props pass through (`htmlFor`, …).

## Example

```tsx
// Wrong: no association, raw classes
<span className="font-bold text-sm">Email</span>
<input id="email" />

// Right
<Label htmlFor="email">Email</Label>
<input id="email" />
```
