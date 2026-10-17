# Dropdown

```tsx
import {
  Dropdown, DropdownButton, DropdownHeading, DropdownItem, DropdownList, DropdownTrigger, DropdownTriggerContext,
} from "designsystem";
```

After designsystemet's Dropdown, on Radix's dropdown menu: a menu of actions or links under a button. Keyboard: Enter / Space / Arrow Down open it, arrows move, Enter picks, typing a letter jumps, Escape closes and returns focus.

**Use for:** a handful of actions or links behind one button ("Del" → copy link, e-mail; a user menu).

**Don't use for:** choosing a value in a form (Select, Suggestion); main navigation that should be visible; settings with controls (Popover).

## Parts

| Part | |
|---|---|
| `DropdownTriggerContext` | Holds the state; `open` / `onOpenChange` for controlled. |
| `DropdownTrigger` | Button props. |
| `Dropdown` | The menu. `placement` (default `bottom-end`), `autoPlacement`. |
| `DropdownHeading` | A title over a group. |
| `DropdownList` | A group of items. |
| `DropdownItem` | Makes its single child a menu item. `onSelect` (menu closes after), `disabled`. |
| `DropdownButton` | The item's look: full-width tertiary Button. `asChild` to wrap a link. |

## Example

```tsx
// Wrong: a Popover with a column of Buttons: no menu keyboard, no roles
<Popover><Button>Kopier lenke</Button><Button>E-post</Button></Popover>

// Right
<DropdownTriggerContext>
  <DropdownTrigger variant="secondary">Del</DropdownTrigger>
  <Dropdown>
    <DropdownHeading>Del arrangementet</DropdownHeading>
    <DropdownList>
      <DropdownItem onSelect={copyLink}><DropdownButton>Kopier lenke</DropdownButton></DropdownItem>
      <DropdownItem><DropdownButton asChild><NextLink href={mailto}>Send på e-post</NextLink></DropdownButton></DropdownItem>
    </DropdownList>
  </Dropdown>
</DropdownTriggerContext>
```

Tokens: `tokens/components/dropdown.css` (radius, padding, min width, item size); styles in `tokens/utilities/floating.css`.

Differs from designsystemet: theirs is a popover with a plain list of buttons; this one has menu roles and arrow-key navigation (Radix), so items are `DropdownItem`s.
