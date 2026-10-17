# Fieldset

```tsx
import { Fieldset } from "designsystem";
```

After designsystemet's Fieldset: a native `<fieldset>` with a visible legend, optional description, 16px between fields, and a group error at the bottom.

**Use for:** grouping fields that answer one question or belong together (a contact block, a group of Checkboxes).

**Don't use for:** a single choice among options (use **RadioGroup**, which is a Fieldset that also wires up the radios); chip filters (ChipGroup); visual boxes around content (Card); a `<div>` with a bold text above it as a fake legend.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `legend` | ReactNode | required | The group's question/name. Screen readers read it with each field. |
| `description` | ReactNode | | Help text under the legend. |
| `error` | ReactNode | | Group error under the fields. |
| `disabled` | boolean | | Native: disables every field inside. |

Other `<fieldset>` props pass through. `className` is for layout.

## Example

```tsx
// Wrong: no fieldset, the "legend" isn't connected to anything
<div><b>Kontakt</b><Textfield label="Navn" /><Textfield label="E-post" /></div>

// Right
<Fieldset legend="Kontakt" description="Vi svarer innen to dager.">
  <Textfield label="Navn" name="name" />
  <Textfield label="E-post" type="email" name="email" />
</Fieldset>
```

Tokens: `tokens/components/fieldset.css` (gap).
