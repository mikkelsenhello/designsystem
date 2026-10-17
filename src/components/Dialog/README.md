# Dialog, DialogBlock, DialogTrigger, DialogTriggerContext

```tsx
import { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext } from "designsystem";
```

After designsystemet's Dialog, on a native `<dialog>`: modal by default (page inert and dimmed, focus kept inside and returned to the trigger, Escape closes, page scroll locked), a × button in the corner, fade + slide in (no slide for reduced motion). `placement` makes it a drawer from an edge.

**Use for:** a task that needs full attention before going on: confirming something destructive ("Vil du avbestille?"), a short form, details that need a closer look.

**Don't use for:** a few settings next to a button (Popover); messages that don't need an answer (Alert); long multi-step flows (a page); a menu (Dropdown); hand-built overlays with `fixed inset-0`.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `open` / `onClose` | boolean / `(event) => void` | | Controlled. `onClose` fires when the user closes it, not when `open` turns false. |
| `modal` | boolean | `true` | `false`: people can work next to it. |
| `placement` | `center` `top` `bottom` `left` `right` | `center` | Edges = drawer. |
| `closeButton` | string \| `false` | `"Lukk dialogvindu"` | Screen reader name of the ×; `false` removes it (then give another way out). |
| `closedby` | `closerequest` `any` `none` | `closerequest` | `any` also closes on a backdrop click; `none` ignores Escape. |

Name it: a Heading inside with `aria-labelledby`, or `aria-label`. `autoFocus` on a control focuses it on open.

`DialogTriggerContext` + `DialogTrigger` (Button props): opens the Dialog in the same context without state. `DialogBlock`: padded sections with dividers (header / body / footer).

## Example

```tsx
// Wrong: a fixed div, no focus handling, Escape does nothing
{open && <div className="fixed inset-0 bg-…"><Card>…</Card></div>}

// Right
<DialogTriggerContext>
  <DialogTrigger variant="secondary" color="danger">Avbestill</DialogTrigger>
  <Dialog aria-labelledby="avbestill-tittel">
    <Heading level={2} size="xs" id="avbestill-tittel" className="mb-2">Vil du avbestille?</Heading>
    <Paragraph className="mb-6">Annonsen fjernes fra uke 42.</Paragraph>
    <Button color="danger" onClick={cancel}>Avbestill</Button>
  </Dialog>
</DialogTriggerContext>
```

Tokens: `tokens/components/dialog.css` (size, padding, radius, motion), backdrop color `--ds-color-backdrop` (theme); styles in `tokens/utilities/dialog.css`.

Not built from designsystemet: `asChild`, the `command`/`commandfor` invoker attributes (DialogTrigger does the same with a click handler).
