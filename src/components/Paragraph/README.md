# Paragraph

```tsx
import { Paragraph } from "designsystem";
```

**Use for:** body text: descriptions, intros, help text, long-form content.

**Don't use for:** headings (use Heading); form field labels (use Label); a raw `<p>` with its own font-size or line-height classes.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `size` | `xl` \| `lg` \| `md` \| `sm` \| `xs` | `md` | 24 / 21 / 18 / 16 / 14px. `md` is the page's body size; `lg`/`xl` for intros/ingress. |
| `variant` | `default` \| `short` \| `long` | `default` | Line height. `short` for single lines in UI, `long` for articles. |

All native `<p>` props pass through. Color is inherited; for secondary text add `className="text-subtle"`.

## Example

```tsx
// Wrong
<p className="text-sm text-gray-500 leading-relaxed">Sent every Friday.</p>

// Right
<Paragraph size="sm" className="text-subtle">Sent every Friday.</Paragraph>
```
