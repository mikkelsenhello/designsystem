# ValidationMessage

```tsx
import { ValidationMessage } from "designsystem";
```

After designsystemet's ValidationMessage: a short message with an icon about a field's value. It is what Textfield, Checkbox, Radio and Fieldset render for their `error`.

**Use for:** a message tied to a field you compose yourself (point the field's `aria-describedby` at its `id`), or a success/warning/info hint under a field ("Brukernavnet er ledig").

**Don't use for:** errors on the design system's own fields (use their `error` prop); messages about the whole page (Alert); a list of errors (ErrorSummary).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `color` | `danger` `success` `warning` `info` | `danger` | Color and icon. |

Native `<p>` props pass through (`id`).

## Example

```tsx
// Wrong: red text without an icon or a link to the field
<p className="text-danger-default">Ugyldig e-post</p>

// Right
<FileUpload aria-describedby="logo-msg" … />
<ValidationMessage id="logo-msg">Bildet er for stort (maks 2 MB)</ValidationMessage>
```

No component tokens: icon 24px, 8px gap, text-subtle of the message's color.

Not built from designsystemet: `asChild`.
