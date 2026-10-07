# Link

```tsx
import { Link } from "designsystem";
```

**Use for:** navigating somewhere: another page, a section (`#signup`), an external site, an email (`mailto:`). In running text, in navigation, in footers.

**Don't use for:** triggering an action that doesn't navigate (use Button); a raw `<a>` with its own color/underline classes (the `check:ds` lint rejects raw `<a>`).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `color` | `primary` \| `neutral` \| … | `primary` | `neutral` for footers and low-emphasis links. |
| `asChild` | boolean | `false` | Style the single child instead of rendering an `<a>`. Use with a router link. |

All native `<a>` props pass through (`href`, `target`, `rel`, …).

## Example

```tsx
// Wrong: raw <a>, raw styling
<a href="/privacy" className="text-blue-600 underline">Privacy</a>

// Right
<Link href="/privacy">Privacy</Link>

// Right, with Next.js client-side routing
import NextLink from "next/link";
<Link asChild>
  <NextLink href="/privacy">Privacy</NextLink>
</Link>
```

Tokens: `tokens/components/link.css` (underline thickness, hover thickness, offset).
