# Suggestion, SuggestionOption

```tsx
import { Suggestion, SuggestionOption } from "designsystem";
```

After designsystemet's Suggestion (single choice): type to narrow a list, then pick one. An input with `role="combobox"` and a listbox under it; arrow keys move, Enter picks, Escape closes, the number of matches is announced. The chosen option gets a checkmark; a × empties the input.

**Use for:** one choice from a long list people would rather type than scroll (places, organisers), or options fetched as they type (`filter={false}` + `onInputChange`).

**Don't use for:** short lists (Select, RadioGroup); free text with no fixed options (Textfield); search that submits (Search).

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `label` | ReactNode | required | Built in, like Textfield (also `description`, `error`). |
| `value` / `onValueChange` | `string \| null` / `(value, label) => void` | | Controlled. `null` when the text no longer matches a choice. |
| `defaultValue` | string | | Uncontrolled. |
| `name` | string | | Submits the chosen value (not the typed text). |
| `filter` | boolean | `true` | Hide options that don't contain the text. |
| `onInputChange` | `(text) => void` | | Every keystroke, e.g. to fetch options. |
| `emptyText` | ReactNode | "Ingen treff" | |
| `clearLabel` | string | "Fjern tekst" | |

Children: `SuggestionOption value="…"` with its text as children (a string). Other `<input>` props pass through (`placeholder`, `disabled`, `required`).

## Example

```tsx
// Wrong: a Textfield with a hand-built list under it (no combobox semantics, no keyboard)
<Textfield label="Sted" onChange={…} />{matches.map((m) => <Button>{m}</Button>)}

// Right
<Suggestion label="Sted" name="sted" value={place} onValueChange={setPlace}>
  {places.map((p) => <SuggestionOption key={p.id} value={p.id}>{p.name}</SuggestionOption>)}
</Suggestion>
```

Tokens: `tokens/components/suggestion.css` (list and options), the clear button uses Search's; styles in `tokens/utilities/suggestion.css`.

Not built from designsystemet: `multiple` (chosen values as removable chips), `creatable` ("Legg til «…»"). The parts (Suggestion.Input / List / Option / Empty / Clear) are one component here, with the label built in.
