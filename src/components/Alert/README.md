# Alert

```tsx
import { Alert } from "designsystem";
```

After designsystemet's Alert: a tinted box with a border and an icon per color, aligned to the first line (of the heading, when the alert starts with one).

**Use for:** important information about the page or a task that people should read: a moved event, a deadline, an error after submitting, a confirmation.

**Don't use for:** errors on one field (Textfield `error` / ValidationMessage); a list of form errors (ErrorSummary); a plain boxed group of content (Card); a one-word status (Tag, Badge); a hand-built colored `<div>` with an icon.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `color` | `info` `success` `warning` `danger` (any ColorFamily) | `info` | Picks colors and icon; neutral/primary use the info icon. |

Native `<div>` props pass through. Start with a `Heading` (give it `className="mb-2"`) for a title. No live region by default: add `role="alert"` only for a message that appears without a page load and must interrupt.

## Example

```tsx
// Wrong: hand-built box, icon not aligned, colors not themed
<div className="flex gap-2 rounded-md bg-warning-surface-tinted p-6">⚠ Konserten er flyttet</div>

// Right
<Alert color="warning">
  <Heading level={2} size="xs" className="mb-2">Arrangementet er flyttet</Heading>
  <Paragraph>Konserten er flyttet til Kulturhuset.</Paragraph>
</Alert>
```

Tokens: `tokens/components/alert.css` (radius, border, padding, icon size and gap); styles in `tokens/utilities/alert.css`.
