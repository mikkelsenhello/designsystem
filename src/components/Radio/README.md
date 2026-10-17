# Radio, RadioGroup

```tsx
import { Radio, RadioGroup } from "designsystem";
```

After designsystemet's Radio inside a Fieldset, with their `useRadioGroup` (shared name, value, error) built into `RadioGroup`. Native `<input type="radio">`: arrow keys move the choice, forms submit `name=value`.

**Use for:** one required choice among 2–6 options that are all shown, in a form ("Hva vil du annonsere?").

**Don't use for:** switching a view or mode right away (ToggleGroup); filters (ChipRadio); several choices (Checkbox); many options (a select, not built yet); a single on/off (Checkbox or Switch).

## RadioGroup props

All **Fieldset** props (`legend` required, `description`, `error`, `disabled`), plus:

| Prop | Values | Default | |
|---|---|---|---|
| `name` | string | generated | What the form submits the value as. |
| `value` / `onChange` | string / `(value: string) => void` | | Controlled. |
| `defaultValue` | string | | Uncontrolled starting choice. |
| `required` | boolean | | Native required on every radio. |
| `color` | ColorFamily | `primary` | Checked color. |

`error` marks every radio invalid (danger) and is read out with each one.

## Radio props

| Prop | Values | Default | |
|---|---|---|---|
| `value` | string | required | Submitted / reported when chosen. |
| `label` | ReactNode | required | Clickable; the whole row is clickable. |
| `description` | ReactNode | | Smaller text under the label. |
| `error` | ReactNode | | Only for a lone Radio; in a group use the group's `error`. |
| `color` | ColorFamily | group's, else `primary` | |

Other `<input>` props pass through (`disabled`, `ref`, …).

## Example

```tsx
// Wrong: Chips are filters, and nothing ties the options to the question
<p>Hva vil du annonsere?</p>
<ChipRadio name="kind">Aktivitet</ChipRadio><ChipRadio name="kind">Produkt</ChipRadio>

// Right
<RadioGroup legend="Hva vil du annonsere?" name="kind" value={kind} onChange={setKind} error={kindError}>
  <Radio value="aktivitet" label="Aktivitet" description="Kurs, konsert, arrangement" />
  <Radio value="produkt" label="Produkt eller tjeneste" />
</RadioGroup>
```

Tokens: `tokens/components/radio.css` (size, border, dot, gap), same size as Checkbox. Hover draws an extra ring, as designsystemet does (only on hover-capable devices).

Not built from designsystemet: `readOnly` styling, `position="end"` (radio after the label), `variant="outline"` (boxed radios).
