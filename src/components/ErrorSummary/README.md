# ErrorSummary

```tsx
import { ErrorSummary, ErrorSummaryHeading, ErrorSummaryItem, ErrorSummaryLink, ErrorSummaryList } from "designsystem";
```

After designsystemet's ErrorSummary: a danger-tinted box listing every error in a form, each a link to its field. It takes focus when it appears (so screen readers read it) and is named by its heading (`role="group"`).

**Use for:** a form that failed to submit with more than one error, shown above the form (or above the submit button).

**Don't use for:** a single field's error (the field's `error`); a general failure like "server not reachable" (Alert `color="danger"`); live validation while typing.

## Props

`ErrorSummary`: `<div>` props. Focus moves to it on mount and when `hidden` turns false.
`ErrorSummaryHeading`: Heading props, `level` 2 by default.
`ErrorSummaryList` / `ErrorSummaryItem`: ListUnordered / ListItem.
`ErrorSummaryLink`: Link props, `href="#<field id>"`. Keep the field's own `error` too: the summary repeats it, it doesn't replace it.

## Example

```tsx
// Wrong: plain red text, not focused, no way to reach the fields
{errors.length > 0 && <p className="text-danger-default">Skjemaet har feil</p>}

// Right
{errors.length > 0 && (
  <ErrorSummary>
    <ErrorSummaryHeading>Rett opp disse feilene før du sender</ErrorSummaryHeading>
    <ErrorSummaryList>
      {errors.map((e) => (
        <ErrorSummaryItem key={e.field}><ErrorSummaryLink href={`#${e.field}`}>{e.message}</ErrorSummaryLink></ErrorSummaryItem>
      ))}
    </ErrorSummaryList>
  </ErrorSummary>
)}
```

Tokens: `tokens/components/error-summary.css` (radius, padding, heading size and gap); styles in `tokens/utilities/error-summary.css`.
