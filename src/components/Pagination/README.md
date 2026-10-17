# Pagination

```tsx
import { Pagination } from "designsystem";
```

After designsystemet's Pagination: previous / page numbers / next in a `navigation` landmark, ellipses where pages are skipped (their page-picking logic), the current page as a primary Button with `aria-current`, the others tertiary. Previous/next are hidden (keeping their space) on the first/last page.

**Use for:** moving between pages of a long list or search result (the archive, events).

**Don't use for:** steps of a form; "load more" on one page (a Button); switching views (Tabs, ToggleGroup).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `current` / `total` | number | required | Pages count from 1. |
| `onChange` | `(page) => void` | | Buttons mode. |
| `href` | `(page) => string` | | Links mode, e.g. `(p) => "?side=" + p`. Use this for pages that have URLs. |
| `linkAs` | element type | `a` | Link element in links mode, e.g. Next.js `Link`. |
| `show` | number | 7 | Items between previous and next, ellipses included. |
| `size` | `sm` `md` `lg` | `md` | Button size. |
| `color` | ColorFamily | `primary` | |
| `aria-label`, `prevLabel`, `nextLabel` | string | "Bla i sider", "Forrige side", "Neste side" | |

`paginationSteps(current, total, show)` is exported for custom layouts (0 = ellipsis).

## Example

```tsx
// Wrong: hand-built buttons, no current-page state for screen readers
{pages.map((p) => <Button variant={p === page ? "primary" : "tertiary"}>{p}</Button>)}

// Right
<Pagination current={page} total={12} href={(p) => `/arkiv?side=${p}`} linkAs={NextLink} />
```

Tokens: `tokens/components/pagination.css` (gap); the items are Buttons.
