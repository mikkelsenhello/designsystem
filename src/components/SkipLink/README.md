# SkipLink

```tsx
import { SkipLink } from "designsystem";
```

After designsystemet's SkipLink: invisible until it gets keyboard focus, then a full-width bar at the top of the page that jumps to the main content.

**Use for:** the first element in `<body>` of every page with navigation before the content (one per page).

**Don't use for:** in-page navigation people see (Link to `#section`); anything mouse users need.

## Props

| Prop | Values | |
|---|---|---|
| `href` | `"#main"` | Id of the main content. Make it focusable: `<main id="main" tabIndex={-1}>`. |
| `children` | ReactNode | "Hopp til hovedinnhold". |

Other `<a>` props pass through.

## Example

```tsx
// Wrong: a visible link styled by hand, or none at all
<Link href="#main" className="sr-only">Hopp til innhold</Link>

// Right (first in the root layout)
<body>
  <SkipLink href="#main">Hopp til hovedinnhold</SkipLink>
  <Header />
  <main id="main" tabIndex={-1}>…</main>
</body>
```

No component tokens: background `surface-hover`, padding 16 / 16 / 20px as designsystemet.
