# Designsystem

A rebrandable, reusable design system, consumed by separate projects (first the newsletter landing page on Vercel, later "Husk og gjør" and others) as a pinned git dependency — not copy-pasted.

## Standing instructions

- **Read `PLAN.md` first**, every session. It holds the full architecture, the phase breakdown, and decisions already made (stack, distribution, license, repo). Don't re-decide something `PLAN.md` already settled — check it before asking the user again.
- **Token-only styling, no exceptions.** No raw hex/rgb colors, no raw spacing/radius/shadow numbers, and no Tailwind arbitrary values (`p-[13px]`, `text-[#fff]`) anywhere outside `tokens/`. If a value is needed that no token covers, add a token (and say so) — never reach past the token layer.
- **Every component gets a colocated `README.md`** (`src/components/<Name>/README.md`): use for / **don't use for** / props / a wrong→right example. The "don't use for" line is mandatory, not optional — it's what stops a duplicate hand-built version of a component from appearing elsewhere in a consuming app.
- **Keep `docs/component-index.md` short** (under ~150 lines). It's the always-loaded index a consuming project's own CLAUDE.md points at before writing any UI — if it gets long, that's a sign to trim descriptions, not to let it grow.
- **Repo is public, all-rights-reserved** (no OSS license file). designsystemet.no's token *values* are MIT-licensed and attributed in `NOTICE.md` — that attribution stays regardless of this repo's own license.
- GitHub: `github.com/mikkelsenhello/designsystem`.

## Structure

See `PLAN.md` → Architecture for the full tree and the token flow (global → theme → component → Tailwind). Don't restate it here; this file is instructions, `PLAN.md` is the plan.
