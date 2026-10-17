# InlineEditable

```tsx
import { InlineEditable } from "designsystem";
```

**Extension:** designsystemet has no inline editor. Text that looks exactly like the final text (it inherits font, size, weight, italics and color from its parent) and is edited in place. Plain text only: pasted formatting is dropped, dropped content is refused.

States: subtle tint of the text color on hover (hover-capable devices), the standard focus ring while editing, a faded placeholder while empty. Screen readers get a `textbox` with the `aria-label` as its name.

**Use for:** WYSIWYG editing where the editing surface must match the output: typing straight onto a preview (an ad, a card).

**Don't use for:** normal forms (Textfield, `Textfield multiline`): they have visible labels, validation and counters; rich text (bold, links); a `contentEditable` div of your own.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `value` / `onChange` | string / `(value: string) => void` | required | Controlled, plain text. |
| `aria-label` | string | required | E.g. "Tittel". |
| `placeholder` | string | | Shown faded (inherited color) while empty. Always give one: an empty element has no width to click. |
| `multiline` | boolean | `false` | Enter adds a line break. Single-line: Enter does nothing, pasted line breaks become spaces. |
| `maxLength` | number | | Typing and pasting stop there. |
| `name` | string | | Also submit the text with a form (hidden input). |
| `asChild` | boolean | `false` | Edit inside your own element (`<InlineEditable asChild …><strong /></InlineEditable>`). Default: a `<span>`. |

Other `<span>` props pass through (`onBlur`, `aria-required`, `className` for layout). Single-line text still wraps like the text it stands in for.

## Example

```tsx
// Wrong: an input that doesn't look like the result, or a raw contentEditable (keeps pasted HTML)
<input className="font-bold underline text-…" value={title} onChange={…} />
<strong contentEditable onInput={(e) => setTitle(e.currentTarget.innerHTML)} />

// Right: the heading defines the look, InlineEditable only makes it editable
<Heading level={2} size="lg">
  <InlineEditable aria-label="Tittel" placeholder="Tittel" value={title} onChange={setTitle} maxLength={80} />
</Heading>
```

Tokens: `tokens/components/inline-edit.css` (radius, hover tint, placeholder fade).
