# Component index

Read this before writing any UI. If a component below fits, use it; never hand-build a lookalike. If nothing fits, check `docs/tokens.md` for the legal styling classes, and consider whether the design system needs a new component instead.

All components: `import { Name } from "designsystem";`. Each has a README with props and examples: `src/components/<Name>/README.md`.

| Component | Use for | Don't use for |
|---|---|---|
| **Accordion** + **AccordionItem** | Expandable list, e.g. FAQ (`title` = question, children = answer) | Content most users need; navigation/tabs |
| **Badge** | Small pill with a count or one-word status ("3", "New") | Longer labels/categories; anything clickable |
| **Card** | Boxed group of related content; `color` recolors everything inside | Page-wide bands (use `bg-background-tinted`); clickable navigation cards |
| **Checkbox** | Consent / multi-select option with `label`, `description`, `error` | Instant-effect settings (Switch); single choice (Radio); filters (Chip) |
| **ChipGroup** + **ChipCheckbox** / **ChipRadio** | Filters / quick choices among a few short, always-visible options. Checkbox = multi, Radio = one. **ChipRemovable** = an active filter to remove, **ChipButton** = small suggestion action | Submitted form questions (Checkbox); main actions (Button); long option lists |
| **Textfield** | Text input with `label`, `description`, `error` (email, name …). `multiline` = textarea, `counter={300}` = character counter | Placeholder-only fields; editing on a preview (InlineEditable) |
| **RadioGroup** + **Radio** | One submitted choice among a few visible options, with `legend` and group `error` | View switches (ToggleGroup); filters (ChipRadio); many options |
| **Fieldset** | Group of related fields under a `legend` | A single choice (RadioGroup); visual boxes (Card) |
| **ToggleGroup** + **ToggleGroupItem** | Switch a view/mode right away, 2–4 options ("I annonsen" / "Som skjema") | Submitted form questions (RadioGroup); page navigation |
| **FileUpload** | Pick one file/image: click or drop, image preview, remove, `name` submits it | Several files; a hidden input behind a Button |
| **InlineEditable** | Type straight onto a preview; inherits the surrounding typography | Normal forms (Textfield); rich text |
| **Skeleton** | Decorative grey placeholder: `rectangle` / `circle` / `text`, `static` = no pulse | Loading messages people must hear |
| **Alert** | Important message about the page or a task: info / success / warning / danger, icon included | One field's error (field `error`); form error list (ErrorSummary) |
| **ErrorSummary** (+ Heading / List / Item / Link) | After a failed submit: every error, each linking to its field; takes focus | A single field's error; general failures (Alert) |
| **ValidationMessage** | Message with icon under a field you compose yourself (`color` danger/success/warning/info) | The design system's own fields (use their `error`) |
| **Spinner** | Wait of unknown length (`aria-label` = what loads). In buttons: Button `loading` | Content placeholders (Skeleton) |
| **Tag** | Category or status in words ("Konsert", "Utsolgt"); `asChild` on a link | Counts (Badge); toggled filters (Chip) |
| **Avatar**, **AvatarStack** | A person's/organisation's picture, initials or icon; overlapping group with `+5` | Logos and product images (`<img>`) |
| **Table** (+ Head / Body / Foot / Row / Cell / HeaderCell) | Rows × columns of data; `border`, `zebra`, `hover`, sortable headers | Layout; lists of cards |
| **ListUnordered** / **ListOrdered** + **ListItem** | Bullet / numbered lists in text (preflight removes plain list bullets) | Menus and card grids; FAQ (Accordion) |
| **Divider** | Visual line between blocks in one section | Page sections (spacing + headings); frames (Card) |
| **Breadcrumbs** (+ List / Item / Link) | Where a deep page sits (Forside › Arkiv › Uke 42); back link on mobile | Main navigation; process steps |
| **Pagination** | Pages of a long list: `href` for links (`linkAs={NextLink}`), `onChange` for buttons | "Load more"; switching views |
| **SkipLink** | First in `<body>`: "Hopp til hovedinnhold" for keyboard users | Visible in-page links |
| **Button** | Actions: submit, confirm, cancel, open. `variant` primary/secondary/tertiary, `color`, `icon` (square), `loading`, `asChild` (link with button look) | Navigation to another page (use a link); clickable cards/rows |
| **Heading** | All headings. `level` = h1–h6 (structure), `size` = 2xl–2xs (look) | Big non-heading text (Paragraph `size="xl"`); bold body text |
| **Link** | Navigation: pages, `#sections`, external, `mailto:`. `asChild` wraps a router link (Next `<Link>`) | Actions that don't navigate (Button); raw `<a>` |
| **Paragraph** | Body text, intros, help text. `size` xl–xs, `variant` short/long line height | Headings; form labels |
| **Label** | Visible label of a form field (`htmlFor`) | Headings, bold text, tags/badges |

## Rules that apply everywhere

- Style only with classes from `docs/tokens.md`. No raw hex/px, no arbitrary values (`p-[13px]`), no Tailwind defaults (`bg-blue-500`).
- Recolor a block with `data-color="primary|danger|…"` instead of per-element color classes.
- `className` on a component is for layout (margin, grid placement), not for restyling it.
