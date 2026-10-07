# Accordion

```tsx
import { Accordion, AccordionItem } from "designsystem";
```

**Use for:** a list of headers that each expand to reveal content, e.g. an FAQ.

**Don't use for:** hiding content that most users need (show it); navigation or tabs; a single show/hide toggle in running text. Don't hand-build one from `<details>` or `useState`: keyboard handling and ARIA come from Radix here.

## Props

**Accordion**

| Prop | Values | Default | |
|---|---|---|---|
| `children` | `AccordionItem` elements | required | |
| `multiple` | boolean | `false` | Allow several items open at once. By default opening one closes the others. |
| `defaultOpen` | `string[]` | `[]` | `value`s of the items open on first render. |
| `color` | `neutral` \| `primary` \| … | `neutral` | |

**AccordionItem**

| Prop | Values | Default | |
|---|---|---|---|
| `value` | string | required | Unique within the Accordion. |
| `title` | ReactNode | required | Header text (the question). |
| `children` | ReactNode | required | Revealed content (the answer). |
| `headingLevel` | `2`–`6` | `3` | Heading element wrapping the header, for document structure. |

## Example

```tsx
// Wrong: no keyboard/ARIA handling, raw styling
<div onClick={() => setOpen(!open)} className="border-b py-4 cursor-pointer">How often?</div>

// Right
<Accordion>
  <AccordionItem value="often" title="How often do you send it?">
    <Paragraph>Once a week, every Friday.</Paragraph>
  </AccordionItem>
  <AccordionItem value="cost" title="Does it cost anything?">
    <Paragraph>No, it's free.</Paragraph>
  </AccordionItem>
</Accordion>
```

Built on `@radix-ui/react-accordion`. Tokens: `tokens/components/accordion.css` (header height, padding, content padding).
