# Skeleton

```tsx
import { Skeleton } from "designsystem";
```

After designsystemet's Skeleton. Always `aria-hidden`: it is decoration, not content.

**Use for:** grey stand-ins for content that is loading, or for content that is only implied (placeholder posts around a preview). `rectangle` for images and blocks, `circle` for avatars, `text` for a run of text.

**Don't use for:** a loading message people must hear (put "Laster …" text or an `aria-busy` region next to it); empty states with real text; a hand-built grey `<div className="bg-… rounded-…">` stand-in.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `variant` | `rectangle` `circle` `text` | `rectangle` | |
| `width` | CSS length or px number | full width (circle: 1.3em) | Not used by `text`. |
| `height` | CSS length or px number | 1.3em | Circle: follows `width`. |
| `aspectRatio` | e.g. `"16 / 9"` | | Rectangle sized by width + ratio, for images. |
| `characters` | number | 1 | `text` only: length of the fake text. It wraps like text, so the last line ends up shorter. |
| `static` | boolean | `false` | No pulse: a still grey shape. |

Inside a `Heading` or `Paragraph`, `text` picks up that size, so a fake title is as tall as a real one. Native `<span>` props pass through.

## Example

```tsx
// Wrong: hand-built, announced by screen readers, pulse not tokenized
<div className="h-4 w-48 animate-pulse rounded bg-neutral-surface-tinted" />

// Right: a placeholder newsletter post, still
<Skeleton static aspectRatio="16 / 9" />
<Heading level={3} size="xs"><Skeleton static variant="text" characters={24} /></Heading>
<Paragraph><Skeleton static variant="text" characters={140} /></Paragraph>
```

Tokens: `tokens/components/skeleton.css` (radius, height, pulse speed and depth). The pulse is a fade, so it keeps running for reduced motion, at half speed (as designsystemet does).

Not built from designsystemet: `asChild` (skeleton look on your own element, sized by its children).
