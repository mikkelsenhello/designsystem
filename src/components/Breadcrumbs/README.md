# Breadcrumbs

```tsx
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList } from "designsystem";
```

After designsystemet's Breadcrumbs: links to the pages above this one, chevrons between them, the last item is the current page (`aria-current="page"`, not underlined). A `BreadcrumbsLink` placed directly in `Breadcrumbs` is a back link; on narrow screens (< 650px) only the back link shows, on wide screens only the list.

**Use for:** pages deep in a hierarchy (Forside › Arkiv › Uke 42), and a "Tilbake til …" link on small screens.

**Don't use for:** the main site navigation; steps in a process (a list or progress UI); a single "back" Button that runs history.back().

## Props

`Breadcrumbs`: `aria-label` (default `"Du er her:"`) plus `<div>` props. It is a `navigation` landmark while the list is visible.
`BreadcrumbsList` (`<ol>`), `BreadcrumbsItem` (`<li>`), `BreadcrumbsLink` (all Link props, `asChild` for router links).

## Example

```tsx
// Wrong: hand-built, no landmark, current page not marked
<p><Link href="/">Forside</Link> / <Link href="/arkiv">Arkiv</Link> / Uke 42</p>

// Right
<Breadcrumbs>
  <BreadcrumbsLink href="/arkiv">Tilbake til Arkiv</BreadcrumbsLink>
  <BreadcrumbsList>
    <BreadcrumbsItem><BreadcrumbsLink href="/">Forside</BreadcrumbsLink></BreadcrumbsItem>
    <BreadcrumbsItem><BreadcrumbsLink href="/arkiv">Arkiv</BreadcrumbsLink></BreadcrumbsItem>
    <BreadcrumbsItem><BreadcrumbsLink href="/arkiv/42">Uke 42</BreadcrumbsLink></BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>
```

Tokens: `tokens/components/breadcrumbs.css` (gap, chevron size); styles in `tokens/utilities/breadcrumbs.css`.
