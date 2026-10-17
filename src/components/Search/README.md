# Search, SearchInput, SearchClear, SearchButton

```tsx
import { Search, SearchButton, SearchClear, SearchInput } from "designsystem";
```

After designsystemet's Search: a search input with a magnifying glass, a × that empties it (shown while there is text) and an optional search button joined to its end.

**Use for:** searching or live-filtering a list (events, the archive).

**Don't use for:** picking a value from known options while typing (Suggestion); ordinary text fields (Textfield).

## Parts

| Part | Props | |
|---|---|---|
| `Search` | `<div>` props | Wraps the parts. Put it in a `<form role="search" onSubmit>` when it submits. |
| `SearchInput` | `<input>` props, `aria-label` | `type="search"`. Without a visible label, `aria-label` is required ("Søk i arrangementer"). |
| `SearchClear` | `aria-label` (default "Fjern tekst") | Empties the input, fires its `onChange`, refocuses it. |
| `SearchButton` | Button props, `variant` primary/secondary | `type="submit"`, text "Søk" by default. |

## Example

```tsx
// Wrong: Textfield + separate Button, no search landmark, no clear
<Textfield label="Søk" /><Button>Søk</Button>

// Right
<form role="search" onSubmit={search}>
  <Search>
    <SearchInput aria-label="Søk i arrangementer" value={q} onChange={(e) => setQ(e.target.value)} />
    <SearchClear />
    <SearchButton />
  </Search>
</form>
```

Tokens: `tokens/components/search.css` (icon, clear button); styles in `tokens/utilities/search.css`; the input uses Textfield's tokens.
