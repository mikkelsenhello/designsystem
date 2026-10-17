# Avatar, AvatarStack

```tsx
import { Avatar, AvatarStack } from "designsystem";
```

After designsystemet's Avatar and AvatarStack. Avatar: a circle (or square) with a picture, initials, an icon, or a person icon when empty; `role="img"` named by `aria-label`. AvatarStack: overlapping avatars in a list, each cut out behind the next.

**Use for:** showing who: an organiser, a profile, the people going to an event.

**Don't use for:** logos or product images (a plain `<img>`); a count or status (Badge); a hand-built round `<div>` with initials.

## Avatar props

| Prop | Values | Default | |
|---|---|---|---|
| `aria-label` | string | required (or `aria-hidden`) | Who it is. Use `aria-hidden` when the name is written next to it. |
| `size` | `xs` `sm` `md` `lg` | `md` | 36 / 42 / 48 / 56px. |
| `variant` | `circle` `square` | `circle` | Square for organisations. |
| `initials` | string | | Shown when there are no children. |
| `color` | ColorFamily | `primary` | Fill color. |
| `asChild` | boolean | `false` | Render the single child (a router link, a button) as the avatar. |

Children: `<img src alt="">` (fills the avatar) or an icon.

## AvatarStack props

| Prop | Values | Default | |
|---|---|---|---|
| `size` | `xs` `sm` `md` `lg` | `md` | Size of every avatar inside. |
| `expandable` | `true` `"fixed"` | | Spread out on hover / keyboard focus; `fixed` keeps the width. |
| `suffix` | ReactNode | | Text after the avatars, e.g. `"+5"`. |

Children: Avatar elements (each is wrapped in an `<li>`). Give the stack an `aria-label` ("Deltakere").

## Example

```tsx
// Wrong: hand-built, not themed, no accessible name
<div className="flex size-12 items-center justify-center rounded-full bg-primary-base-default">ON</div>

// Right
<Avatar aria-label="Ola Nordmann" initials="ON" />
<AvatarStack aria-label="Deltakere" suffix="+5">
  <Avatar aria-label="Ola" initials="ON" />
  <Avatar aria-label="Kari"><img src={kari} alt="" /></Avatar>
</AvatarStack>
```

Tokens: `tokens/components/avatar.css`; styles in `tokens/utilities/avatar.css`. designsystemet's sm/lg come from size modes; here they are fixed sizes (42 / 56px).

Not built from designsystemet: `data-tooltip` (Avatar with a tooltip), AvatarStack's free `gap` / `avatarSize` / `overlap` values (they would bypass the tokens; override the tokens instead).
