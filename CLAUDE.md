# Designsystem

A rebrandable, reusable design system, consumed by separate projects (first the newsletter landing page on Vercel, later "Husk og gjør" and others) as a pinned git dependency — not copy-pasted.

## Standing instructions

- **Read `PLAN.md` first**, every session. It holds the full architecture, the phase breakdown, and decisions already made (stack, distribution, license, repo). Don't re-decide something `PLAN.md` already settled — check it before asking the user again.
- **Token-only styling, no exceptions.** No raw hex/rgb colors, no raw spacing/radius/shadow numbers, and no Tailwind arbitrary values (`p-[13px]`, `text-[#fff]`) anywhere outside `tokens/`. If a value is needed that no token covers, add a token (and say so) — never reach past the token layer.
- **Every component gets a colocated `README.md`** (`src/components/<Name>/README.md`): use for / **don't use for** / props / a wrong→right example. The "don't use for" line is mandatory, not optional — it's what stops a duplicate hand-built version of a component from appearing elsewhere in a consuming app.
- **Keep `docs/component-index.md` short** (under ~150 lines). It's the always-loaded index a consuming project's own CLAUDE.md points at before writing any UI — if it gets long, that's a sign to trim descriptions, not to let it grow.
- **Repo is public, all-rights-reserved** (no OSS license file). designsystemet.no's token *values* are MIT-licensed and attributed in `NOTICE.md` — that attribution stays regardless of this repo's own license.
- GitHub: `github.com/mikkelsenhello/designsystem`.
- **Consumers install a pinned tag** (`#v0.2.0`). Setup steps live in `README.md` → "Using it in a project"; update them whenever `package.json` exports, `tokens/index.css`/`base.css`/`tailwind.css`, or required peer setup change. Anything a consumer must import has to be listed in `package.json` `files`.
- **First consumer:** the "Hva skjer" website at `C:\Users\onkel\Documents\Prosjekter\Hva skjer\Nettside` (a growing multi-page site, worked on in its own Claude session). Requests for missing components/tokens come from there as **orders**:
  - **How orders arrive:** a cross-session message from the open `nettside-*` session (component, purpose, variants/props, which page needs it), or, when no design system session was running, an entry in `docs/ds-requests.md` — the only file in this repo Nettside writes. At session start, check that file for open orders (create it if missing).
  - **Base it on designsystemet.** Every order is built as the matching designsystemet.no component (its anatomy, variants, naming, states, accessibility), implemented on our token layer per `PLAN.md` — not their code. If designsystemet has no such component, build it as an extension in the same token-driven way and say so. Don't invent a bespoke component when designsystemet already has one that fits.
  - **Build only what was ordered**, under this repo's normal rules. Anything that would change a decision in `PLAN.md` goes to the user first.
  - **If an order conflicts** with the design system's principles (or with designsystemet's version of the component), reply with the concern and a proposed alternative instead of building it.
  - **When released:** tag a new version (`v0.2.0` …), mark the order done in `docs/ds-requests.md` if it came from there, tell the user the `npm install "github:mikkelsenhello/designsystem#<tag>"` line to run in that folder, and reply to the ordering session (copy the `from` of its message; for file orders, find the open `nettside-*` session with ListAgents) with the tag and a short usage note, e.g. "Released v0.3.0: Card (README at src/components/Card/README.md)".
- **Before calling work done:** `npm run check` (token wiring + `check-ds` lint + types), and look at the change in the playground (`npm run playground`, light + dark side by side).

## Structure

See `PLAN.md` → Architecture for the full tree and the token flow (global → theme → component → Tailwind). Don't restate it here; this file is instructions, `PLAN.md` is the plan.
