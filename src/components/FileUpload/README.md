# FileUpload

```tsx
import { FileUpload } from "designsystem";
```

After designsystemet's FileUpload (dashed area, upload icon, a real `<input type="file">` covering the area so clicks and drops both work, focus ring on the area), **extended** with one-file state: an image preview filling the area (`object-cover`), a remove button, and controlled `value`.

**Use for:** choosing one file, typically an image, with click, drag and drop, or keyboard (Tab to it, Enter/Space opens the dialog).

**Don't use for:** several files (not built); showing an existing image that can't be changed (plain `<img>`); a hidden `<input type="file">` behind a hand-made box or Button.

## Props

| Prop | Values | Default | |
|---|---|---|---|
| `label` | ReactNode | required | The field's label. |
| `hideLabel` | boolean | `false` | Label for screen readers only (when the area explains itself). |
| `children` | ReactNode | required | Text in the empty area, e.g. "Trykk for å velge bilde". |
| `description` | ReactNode | | Help text above the area ("PNG eller JPG, maks 2 MB."). |
| `error` | ReactNode | | Under the area; danger border, `aria-invalid`. |
| `value` / `onChange` | `File \| null` / `(file: File \| null) => void` | | Controlled. `null` from the remove button. Without `value` it keeps its own state. |
| `accept` | string | `"image/*"` | Native. A **dropped** file skips it: check `file.type` in onChange. |
| `aspectRatio` | e.g. `"16 / 9"` | | Fixed area shape. Default: as tall as its content. |
| `name` | string | | The real input submits the file under it. Kept in step with `value`, also in a newly mounted FileUpload. |
| `removeLabel` | string | `"Fjern fil"` | Accessible name of the × button. |
| `disabled`, `required`, `ref`, … | | | Pass through to the input. |

You check size (and type) in `onChange`, then set `error` and keep the old `value` if it fails. Non-image files show their name instead of a preview.

## Example

```tsx
// Wrong: hidden input behind a Button, no label, no drop, no keyboard focus ring on the area
<input type="file" hidden ref={ref} /><Button onClick={() => ref.current.click()}>Velg bilde</Button>

// Right
<FileUpload
  label="Bilde" hideLabel name="image" aspectRatio="16 / 9"
  value={image}
  onChange={(file) => (file && file.size > MAX ? setImageError("Bildet er større enn 2 MB.") : (setImageError(undefined), setImage(file)))}
  error={imageError}
>
  Trykk for å velge bilde
</FileUpload>
```

Tokens: `tokens/components/file-upload.css` (radius, dashed border, padding, icon size, remove-button inset). Colors follow the data-color context.

Not built from designsystemet: several files, the read-only state (lock icon), the secondary-Button label inside the area.
