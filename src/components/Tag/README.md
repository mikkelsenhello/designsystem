# Tag

```tsx
import { Tag } from "designsystem";
```

After designsystemet's Tag: a 32px tinted label with small corners, optionally outlined.

**Use for:** categorizing something with a word or two: an event's category ("Konsert"), a type, a status in words ("Utsolgt"). With `asChild` on a link: a category people can click to filter by.

**Don't use for:** a number or one-word count bubble (Badge); filters people toggle (ChipCheckbox / ChipRadio); actions (Button).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `variant` | `default` `outline` | `default` | Outline adds a subtle border. |
| `color` | ColorFamily | `primary` | |
| `asChild` | boolean | `false` | Tag look on your own element (Link, router link); gets hover and focus. |

Native `<span>` props pass through. Icons inside are sized to 24px.

## Example

```tsx
// Wrong: Badge is for counts; hand-built spans drift from the tokens
<Badge>Konsert</Badge>
<span className="rounded-sm bg-primary-surface-tinted px-2">Konsert</span>

// Right
<Tag>Konsert</Tag>
<Tag color="danger" variant="outline">Utsolgt</Tag>
```

Tokens: `tokens/components/tag.css` (height, padding, radius, border).
