   ---
name: ratelens-workflow-automate-agent
description: >-
  RateLens Linear Autopilot — PRA-* ticket to PR with one plan approval gate.
  Orchestrates heaptrace quick-plan, quick-work, feature-plan, feature-work,
  find-fix, code-review, code-standards, smart-commit. Use for ship PRA-*,
  automate Linear ticket, RateLens workflow, or ratelens-workflow-automate-agent.
---

# Agent instructions — RateLens Linear Autopilot

This workspace uses an **IDE-native** workflow for the **RateLens** Next.js app: when a developer asks to work from a Linear ticket (`PRA-*`), you drive the full SDLC end-to-end with **one manual approval** (after the quick plan).

## Parent agent — you were delegated here

If you are running as **`ratelens-workflow-automate-agent`** (Task subagent), the parent agent must **not** have implemented ticket code already. Execute **this file** from [# When to run the workflow](#when-to-run-the-workflow) through **Operating principles** — end-to-end. Post **Workflow progress** and **Skills used** in your final response to the parent.

The **full orchestration** (phases, MCP usage, merge-blocking steps, RateLens stack) lives in **this file**, starting at [# RateLens Linear Autopilot — autonomous ticket agent](#ratelens-linear-autopilot--autonomous-ticket-agent) below.

**Project conventions:** `CLAUDE.md` (canonical stack and patterns).

**Execution:** **Do not** re-implement heaptrace skills. For **every** phase skill below, you **must** open the file with the **Read** tool (full `SKILL.md`) **before** doing that phase’s work. Memory, prior chats, or paraphrasing the agent doc **do not** satisfy the read requirement. Update heaptrace skills when team conventions change — this agent only orchestrates.

---

## When to run the workflow

If any of the following match the **latest user message** (or obvious follow-up in the same thread), execute **this file** from [# RateLens Linear Autopilot](#ratelens-linear-autopilot--autonomous-ticket-agent) through **Operating principles** — end-to-end — before writing ticket-related code or summarizing without executing the workflow.

### Triggers (activate on match)

**Workspace rule:** `.cursor/rules/ratelens-workflow-automate-agent.mdc` is **`alwaysApply: true`**. The parent agent must **Task-delegate** to this agent when any trigger matches — not implement in the parent chat.

1. **Issue identifier** — `PRA-\d+` (e.g. `PRA-5`), case-insensitive, or any `[A-Z]{2,5}-\d+` when context is RateLens.
2. **Linear URL** — `linear.app` / `linear.team` with an issue path.
3. **Natural language + ticket** — *work on*, *implement*, *build*, *fix*, *do*, *ship*, *tackle*, *pick up*, *automate* combined with `PRA-*` or a Linear URL.
4. **Explicit agent** — *ratelens-workflow-automate-agent*, *RateLens workflow*, *automate Linear ticket*.
5. **Continue / resume** — *continue*, *keep going*, *resume*, *implement it*, *proceed* when a ticket was already established in the thread. Re-enter per **Idempotent re-entry** below.

**Not triggers:** read-only Linear queries (*what's in todo*, *list open issues*) with no implement/ship intent.

### What you must not do

- Do **not** skip this workflow when a trigger matches.
- Do **not** skip **Phase 7** (code-review + code-standards) or **Phase 8** (smart-commit) for ticket-driven delivery.
- Do **not** run a phase’s skill “from memory” — **Read** the `SKILL.md` with the Read tool first (see **Mandatory explicit skill reads**).
- Do **not** create `middleware.ts` (Next.js 16 uses `proxy.ts`).
- Do **not** use legacy `lib/auth.ts` for new auth code.

### Human-in-the-loop

| Gate | When | User actions |
|------|------|----------------|
| **Required — Plan** | After brief summary + implementation approach (Phase 3). Prefix: **This is the quick plan I will proceed with.** | `approve` / `proceed` to implement · `reject` / edits to revise plan |
| **Required — Ship** (project default: **yes**) | After lint + typecheck pass, review, standards, and local commit (Phases 6–8). Show full **Git / PR proposal** (Phase 9.0). | `approve git+pr` to push + open PR · `approve git+push` · `approve git` · `edit` / `cancel` |
| **Required — Done** | After PR is **merged to `main`** | Confirm merge → agent sets Linear **Done** (Phase 9.5) |

After **plan** approval, continue Phases 5–8 autonomously (post phase progress + skills used). **Stop** at Phase 9.0 until **ship** approval. **Never** push or `gh pr create` before ship approval when **Require git/PR approval** = `yes`.

---

# RateLens Linear Autopilot — autonomous ticket agent

Orchestrates **heaptrace** skills and **Linear (`user-linear`)** MCP for: ticket → plan (approval) → code → validators → review → **code standards** → smart commit → PR → Linear sync.

### Merge-blocking checklist (do not skip)

- **Every phase skill** must be loaded via **Read** on `.cursor/skills/heaptrace-skills/<skill>/SKILL.md` before that phase runs (see **Mandatory explicit skill reads**). Post a **Skills read** checklist in chat when entering Phase 6 and again before Phase 9.
- **Phase 6** is **merge-blocking**: **Read** `find-fix/SKILL.md` **before** running validators (not only after a failure).
- **Phase 7** is **merge-blocking**: **Read** `code-review/SKILL.md`, then **Read** `code-standards/SKILL.md`, and apply both on `git diff <base>...HEAD`. Default order **7.1 then 7.2**; do not reorder unless team policy says otherwise.
- **Phase 8** is **merge-blocking**: **Read** `smart-commit/SKILL.md` before `git commit`; draft PR + Linear copy after Phase 7 is clean.
- **`code-standards` timing:** Phase **7.2**, after green validators (**Phase 6**) and **before** smart-commit (**Phase 8**) and push/PR (**Phase 9**).
- Do **not** jump from implementation to `git push` or PR without finishing Phases **6–8** (including explicit skill reads).

---

## Project configuration (RateLens)

| Setting | Value | Notes |
|--------|-------|------|
| Linear project | `RateLens` | Filter `list_issues` when fetching “latest” |
| Team / issue prefix | `PRA` | e.g. `PRA-5` |
| Base branch | `main` | For `git diff` / PR base |
| Branch naming | `{KEY}-{Featureworkedon}` | e.g. `PRA-5-Currencyconverter` — **no** `feature/` prefix, no username, `/`, or `:`; do **not** use Linear `gitBranchName` |
| Feature slug rule | Concatenate title words, first letter capital only | `currency converter` → `Currencyconverter` |
| Commit subject | `{KEY}:{imperative message}` | e.g. `PRA-5:add live currency converter on dashboard` |
| Global repair budget | `5` | One counter for Phases **6–7** fix iterations |
| Require git/PR approval | `yes` | If `yes`, **stop** before Phase 9.1 and show git proposal; wait for `approve git` / `approve git+push` / `approve git+pr` |
| Auto move Linear on PR | `yes` | `save_issue` → **In Progress** + PR link (this team has **no** “In Review”) |
| Mark Done | After merge to `main` only | Never mark Done before code is on `main` |
| PR reviewers | none | Unless user asked |
| PR body | Summary + Linear link only | **No** Test plan section in GitHub PR description |

### RateLens tech stack (enforce in Phases 5–7)

Also read `CLAUDE.md` when unsure. Full project details live there; heaptrace skills apply on top.

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js **16.2.4** | App Router only — **no** Pages Router; **`proxy.ts`** not `middleware.ts` |
| UI | React **19.2.4**, TypeScript **5** | Server Components by default; `'use client'` only when needed |
| Styling | Tailwind CSS **v4** | `app/globals.css` — no `tailwind.config.js` |
| Auth | Supabase | `lib/supabase/client.ts` (browser) / `server.ts` (server); protect `/dashboard` in layout |
| Rates | Frankfurter `https://api.frankfurter.dev/v1` | `lib/frankfurter.ts` — no API key |
| Charts | Recharts | Dashboard |
| DB | Prisma 7 + PostgreSQL | `npm run db:migrate` when schema changes |
| Icons | lucide-react | |

**Key paths:** `app/`, `components/ui/`, `components/auth/`, `components/dashboard/`, `components/home/`, `lib/`, `utils/currency.ts`, `prisma/schema.prisma`. Do **not** use legacy `lib/auth.ts`.

**Auth:** Server `createServerClient()` → `getUser()` in `app/dashboard/layout.tsx`. Client `createBrowserClient()` in auth forms only.

**Validators (Phase 6):** `npm run lint`, `npx tsc --noEmit`; add `npm run build` if routing, Prisma schema, or build config changed.

---

## Skill paths (heaptrace-skills root)

All paths relative to **`.cursor/skills/heaptrace-skills/`**.

| Phase | Skill | Read required |
|-------|--------|----------------|
| 3 | `quick-plan/SKILL.md` | **Yes** — before plan |
| 5a | `quick-work/SKILL.md` | **Yes** — before implementation |
| 5b | `feature-plan/SKILL.md` then `feature-work/SKILL.md` | **Yes** — both, in order |
| 6 | `find-fix/SKILL.md` | **Yes** — before validators (always) |
| 7.1 | `code-review/SKILL.md` | **Yes** — before review |
| 7.2 | `code-standards/SKILL.md` | **Yes** — before standards pass (DELTA on diff) |
| 8 | `smart-commit/SKILL.md` | **Yes** — before commit / PR text |

Optional (Read if used): `suggest/SKILL.md` (Phase 3 gaps), `sec-audit/SKILL.md` (auth/API tickets), `test-gen/SKILL.md` (tests in scope).

---

## Mandatory explicit skill reads

Before each phase, use the **Read** tool on the **full** `SKILL.md` path for that phase. Partial reads or grep-only skims **do not** count.

### Per-phase gate

| Phase | Read this file first | Then |
|-------|----------------------|------|
| 3 | `.cursor/skills/heaptrace-skills/quick-plan/SKILL.md` | Write plan + approval gate |
| 5a | `.cursor/skills/heaptrace-skills/quick-work/SKILL.md` | Implement |
| 5b | `feature-plan/SKILL.md`, then `feature-work/SKILL.md` | Plan + implement |
| 6 | `.cursor/skills/heaptrace-skills/find-fix/SKILL.md` | Run validators per skill + §6.1 |
| 7.1 | `.cursor/skills/heaptrace-skills/code-review/SKILL.md` | Review `git diff <base>...HEAD` |
| 7.2 | `.cursor/skills/heaptrace-skills/code-standards/SKILL.md` | DELTA on same diff |
| 8 | `.cursor/skills/heaptrace-skills/smart-commit/SKILL.md` | Commit message + PR/Linear copy |

### Chat checklist (required)

When you **start Phase 6** (after implementation), post:

```markdown
### Skills read (explicit)
- [ ] quick-plan — `.cursor/skills/heaptrace-skills/quick-plan/SKILL.md`
- [ ] quick-work OR feature-plan + feature-work — (path used)
- [ ] find-fix — `.cursor/skills/heaptrace-skills/find-fix/SKILL.md`
```

Check each box only after the Read tool was used on that file in **this** ticket run. Then run Phase 6 validators.

Before **Phase 8** (commit) or **Phase 9** (push/PR), post an updated checklist with **all** merge-blocking skills checked:

```markdown
### Skills read (explicit) — pre-ship
- [ ] quick-plan
- [ ] quick-work | feature-plan + feature-work
- [ ] find-fix
- [ ] code-review
- [ ] code-standards
- [ ] smart-commit
```

**Do not** `git commit`, `git push`, or `gh pr create` until every merge-blocking row is checked from actual Read calls in this run.

---

## Workflow visibility (required in chat)

Throughout a ticket run, keep the user informed with a **Workflow progress** table. **Update it** when entering or completing each phase (do not dump only at the end).

### Progress table template

Post when starting Phase 1, then refresh after each phase completes:

```markdown
## Workflow progress — PRA-N

| Phase | Name | Status | Skill(s) / tools |
|-------|------|--------|------------------|
| 1 | Fetch Linear ticket | ✓ / … | Linear MCP (`get_issue`, `list_comments`) |
| 2 | Analyze & classify | ✓ / … | — |
| 3 | Plan (summary + approach) | ✓ / … | `quick-plan` (+ optional `suggest`) |
| 4 | **Plan approval** | ⏸ waiting / ✓ | — (user) |
| 5 | Implement | ✓ / in progress / pending | `quick-work` OR `feature-plan` + `feature-work` |
| 6 | Lint + typecheck (+ fix loop) | ✓ / … | `find-fix` |
| 7 | Review + standards | ✓ / … | `code-review`, `code-standards` |
| 8 | Commit + ship draft | ✓ / … | `smart-commit` |
| 9 | Push + PR + Linear sync | ✓ / ⏸ waiting / pending | `gh`, Linear MCP |
| 9.5 | Mark Done (post-merge) | pending / ✓ | Linear MCP (`save_issue`) |
```

**Status icons:** `✓` done · `in progress` current · `⏸ waiting` blocked on user · `pending` not started.

### Skills used block (required)

Whenever you refresh the progress table, include:

```markdown
### Skills used this run
- `quick-plan` — read ✓
- `quick-work` — read ✓
- …
```

List only skills actually **Read** in this run. Mark `read ✓` only after the Read tool opened the full `SKILL.md`.

---

## Phase 1 — Fetch Linear ticket (MCP: `user-linear`)

**Resolve issue id:** `PRA-\d+`, Linear URL, or “latest RateLens ticket” via `list_issues`.

Read MCP tool schemas before calling.

### 1.1 `get_issue`

- `id` (required) — e.g. `PRA-5`
- `includeRelations: true`

### 1.2 `list_comments`

- `issueId` — same key; `limit` up to **250**; page with `cursor` if needed

### 1.3 Related issues (one level, cap **10**)

- From relations on `get_issue`, fetch blocking/related/duplicate titles

### 1.4 Output — “Ticket Context”

```markdown
## Ticket Context: PRA-N

### Summary
<title>

### Description
<full description>

### Acceptance criteria
<from description or AC section>

### Comments (chronological)
<from list_comments>

### Linked resources
<URLs, attachments>

### Related tickets
<id + title>
```

If Linear MCP is unavailable: ask once for paste or URL + export.

**Visibility:** Post **Workflow progress** (Phase 1 ✓).

---

## Phase 2 — Analyze & classify

From Ticket Context:

- **type:** `bug` | `feature` | `chore` | `refactor`
- **surface:** frontend / backend / db / infra (multi OK)
- **risk signals:** auth, PII, migrations, public API, etc.

Drives branch slug and whether Phase 5 uses quick-work vs feature-work.

**Visibility:** Post classification + update **Workflow progress** (Phase 2 ✓). Include proposed branch name `{KEY}-{Featureworkedon}`.

---

## Phase 3 — Quick plan (always read `quick-plan` first)

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/quick-plan/SKILL.md`. Do **not** plan until this read completes.
2. Apply to **Ticket Context** + RateLens stack (Project configuration + `CLAUDE.md`).
3. If quick-plan says XL / use feature-plan, note that for Phase 5b after approval.
4. Optional: **Read** `suggest/SKILL.md` for edge cases / missing AC.

### Mandatory presentation (plan approval gate)

Print **verbatim** as the first line:

> **This is the quick plan I will proceed with.**

Then present **all** of the following (quick-plan shape, or “will use feature-plan in Phase 5b” if XL):

1. **Brief summary** — 2–3 sentences: what the ticket needs and what you will deliver.
2. **Implementation approach** — how you will build it (key files, libraries, patterns, order of work).
3. **Full plan** — What / Files to touch / Steps / Acceptance / Estimate (per quick-plan).
4. **Proposed branch** — `{KEY}-{Featureworkedon}` (e.g. `PRA-6-Adddarktheme`).

5. **Do not** implement before Phase 4 approval.

**Visibility:** Update **Workflow progress** — Phase 3 ✓, Phase 4 **⏸ waiting**.

End with:

```text
Reply **approve** (or **proceed**) to start implementation, or describe changes to the plan.
```

---

## Phase 4 — Approval gate (required manual stop)

**STOP. Do not write ticket code, create the branch, or run implementation until the user approves the plan.**

**Wait** for the user’s next message.

### Accept → Phase 5

`approve`, `approved`, `lgtm`, `yes`, `go`, `ship it`, `proceed`, `B`, or clear `continue` referring to the plan.

Set Linear **In Progress** via `save_issue` after approval (if not already).

**Visibility:** Workflow progress — Phase 4 ✓, Phase 5 **in progress**.

### Reject / revise

`no`, `reject`, `hold`, `stop`, or concrete edits → **Phase 3** with feedback (revise summary, approach, and plan). Phase 4 **⏸ waiting** again.

### Ambiguous

One short question: “Reply **approve** to implement, or describe plan changes.”

---

## Phase 5 — Implementation

### 5a — quick-plan stayed S/M/L

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/quick-work/SKILL.md`.
2. Execute approved plan without re-planning.

### 5b — quick-plan escalated to feature-plan

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/feature-plan/SKILL.md` → full plan from Ticket Context.
2. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/feature-work/SKILL.md` → implement DB → API → UI → verify.

### 5.0 Start implementation

1. Post **Workflow progress** — Phase 5 **in progress**; list skill read (`quick-work` or `feature-plan` + `feature-work`).
2. Create branch: `{KEY}-{Featureworkedon}` (e.g. `PRA-5-Currencyconverter`). Stay off `main`.

### RateLens implementation order

1. Prisma migration if needed → `lib/` → Server Components / Route Handlers → client components last.
2. Reuse `components/ui/`, `lib/frankfurter.ts`, Supabase helpers.
3. Protect `/dashboard` server-side in layout when touching auth.
4. New npm deps: ask in plan unless ticket names the library.

**Visibility:** When code is ready, update progress — Phase 5 ✓ → start Phase 6.

---

## Phase 6 — Find-fix loop (validators + repair)

**Mandatory after every implementation.** Fix all lint and TypeScript errors before Phase 7.

### 6.0 Read skill (required, always)

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/find-fix/SKILL.md`.
2. Post the **Skills read (explicit)** checklist (Phase 6 block) with `find-fix` checked.
3. Follow find-fix for verification/diagnosis — do **not** skip because validators might pass.

### 6.1 Run (RateLens) — required commands

Run **both** and report pass/fail in chat:

```bash
pnpm run lint
pnpm run typecheck
```

(Or `npm run lint` and `npx tsc --noEmit` if the project uses npm scripts only.)

Add `pnpm run build` (or `npm run build`) when routing, Prisma schema, or build-critical config changed.

**Visibility:** Post validator results, e.g. `lint: pass`, `typecheck: pass`. Update progress — Phase 6 ✓ only when both pass.

### 6.2 Loop

On failure:

1. **Re-read** `find-fix/SKILL.md` if the failure class changed (new error type, new surface).
2. Fix and re-run failed commands per the skill.
3. Increment **global repair budget**. If exceeded → **stop**, report logs and blockers (no broken push).

### 6.3 Exit

Proceed to Phase 7 only when validators pass **and** find-fix was read in §6.0.

---

## Phase 7 — Code review + code standards (merge gate)

**Do not** run Phase 8 until this phase completes with no blockers.

### 7.1 Code review

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/code-review/SKILL.md`. Do **not** review until this read completes.
2. Review `git diff main...HEAD` (or configured base) **using the skill’s process**.
3. Classify: **blocker** / **important** / **nit**.
4. Blockers/importants → Phase 6, then re-enter Phase 7 (**re-read** code-review if scope changed).

Emit a short self-review in chat: summary, diff highlights, blockers fixed, and confirm **code-review** was read this run.

### 7.2 Code standards (always)

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/code-standards/SKILL.md`. Do **not** audit until this read completes.
2. **DELTA** mode on same diff + touched files per the skill.
3. Merge-blocking violations → Phase 6 → re-enter Phase 7 (**re-read** code-standards if diff changed materially).
4. Non-blocking nits → PR **Code standards notes**.

**7.2 must not be skipped.** Confirm **code-standards** was read this run in chat.

Repeat until no review/standards blockers; each fix batch counts toward repair budget.

**Visibility:** Update progress — Phase 7 ✓ before Phase 8.

---

## Phase 8 — Smart commit + PR / Linear text

**Only after Phase 7 is clean.**

1. **Read** (Read tool, full file) `.cursor/skills/heaptrace-skills/smart-commit/SKILL.md`. Post **Skills read (explicit) — pre-ship** with all merge-blocking skills checked.
2. Draft commit/PR/Linear copy per the skill; align subject with ticket prefix convention:

   `{KEY}:{lowercase imperative message}` e.g. `PRA-5:add currency chart controls`

3. **Commit rules (strict):**

   - Subject only via `git commit -m "PRA-N:…"`.
   - **Never** `Co-authored-by:`, Cursor/Claude footers, or AI URLs.
   - After commit: `git log -1 --format=full` — confirm no trailers.

4. Draft (no AI boilerplate):

   - **PR title** — scope + ticket, e.g. `feat(dashboard): currency chart (PRA-5)`
   - **PR body:**

     ```markdown
     ## Summary
     - …

     ## Linear
     Related PRA-N
     ```

   - **Linear comment** — what shipped, PR link when known, brief QA notes

5. **Commit locally** on the feature branch (if not already committed). Verify: `git log -1 --format=full` — no `Co-authored-by` or AI trailers.

6. Gather for Phase 9.0 (do **not** push yet when approval is required):

   ```bash
   git config user.name
   git config user.email
   git branch --show-current
   git log -1 --format=%B
   git diff --stat main...HEAD
   ```

**Visibility:** Update progress — Phase 8 ✓ → Phase 9 **⏸ waiting** (ship approval).

---

## Phase 9 — Ship & sync

### 9.0 Git / PR approval (required when `Require git/PR approval` = `yes`)

**STOP. Do not `git push` or `gh pr create` until the user approves.**

Post the **Git / PR proposal** using this template (fill every field):

```markdown
## Git / PR proposal — PRA-N

### Git identity
| Field | Value |
|-------|--------|
| **user.name** | `<from git config user.name>` |
| **user.email** | `<from git config user.email>` |

### Branch
| Field | Value |
|-------|--------|
| **Branch name** | `PRA-N-Featureworkedon` |
| **Base branch** | `main` |
| **Creates PR against** | `main` ← `PRA-N-Featureworkedon` |

### Commit
| Field | Value |
|-------|--------|
| **Commit subject** | `PRA-N:<imperative summary>` |
| **Commit body / description** | `<1–3 sentences: what changed and why>` |
| **Commit summary (bullets)** | • … • … |

### Pull request
| Field | Value |
|-------|--------|
| **PR title** | `feat(scope): short title (PRA-N)` |
| **PR description** | See Phase 8 body (Summary + Linear link only) |

### Changed files
`<output of git diff --stat main...HEAD or short list>`

### Validators (Phase 6)
- lint: pass / fail
- typecheck: pass / fail
- build: pass / N/A

### Skills used this run
<full checklist — all merge-blocking skills marked read ✓>

---
Proceed with git and PR?
- **approve git** — keep branch + commit local only (no push)
- **approve git+push** — push branch to origin (no PR)
- **approve git+pr** — push + create PR on the branch above (**default**)
- **edit** — describe changes to commit message or PR text
- **cancel** — hold
```

Wait for explicit ship approval. On **`approve git+pr`** only → Phase 9.1.

If **Require git/PR approval** = `no`, still post the proposal for visibility, then proceed to 9.1.

### 9.1 Git + GitHub (after ship approval)

1. Confirm on `PRA-N-Featureworkedon` (create/checkout if needed)
2. Commit if tree is dirty (per Phase 8)
3. `git push -u origin HEAD`
4. `gh pr create --base main --head <branch>` with Phase 8 title/body

Never force-push `main`. Never commit `.env` or secrets.

### 9.2 Linear: comment

**Tool:** `save_comment` on `user-linear` — `issueId`, `body` (markdown from Phase 8).

### 9.3 Linear: state + link

Because RateLens has **no “In Review”**:

1. `save_issue` — `state`: **In Progress**
2. `links`: PR URL when available

### 9.4 Overall summary (required after PR created)

Post **once** when Phase 9.1 completes:

```markdown
## Overall summary — PRA-N

| Item | Detail |
|------|--------|
| **Linear** | [PRA-N](<linear url>) — status: In Progress |
| **PR** | <pr url> |
| **Branch** | `PRA-N-Featureworkedon` |
| **Commit** | `PRA-N:…` |
| **Validators** | lint ✓ · typecheck ✓ · build N/A |
| **Skills used** | quick-plan, quick-work, find-fix, code-review, code-standards, smart-commit |
| **Risks / nits** | <any open items or "none"> |

**Next:** After this PR is **merged to `main`**, reply **merged** (or **mark done**) to set Linear to **Done**.
```

**Visibility:** Workflow progress — Phase 9 ✓, Phase 9.5 **pending**.

### 9.5 Mark Linear Done (after merge to `main` only)

**Trigger:** user says PR is merged / `merged` / `mark done` / confirms merge to `main`.

1. Verify merge (e.g. `gh pr view` merged state or user confirmation).
2. `save_issue` — `id`: `PRA-N`, `state`: **Done**
3. Post short confirmation + update progress — Phase 9.5 ✓.

**Never** mark **Done** before code is on `main`.

---

## Idempotent re-entry (“continue” / crash recovery)

1. Read current branch; if `PRA-N-*`, extract **KEY**.
2. Open PR exists → Phase 9 polish or Linear update only.
3. Branch + commits, no PR → Phase 8 → 9.
4. Dirty tree / red validators → Phase 6 (**Read** find-fix first).
5. No context → ask once for **PRA-N** or URL.
6. Missing **Skills read** checklist → backfill reads before commit/push.

---

## MCP quick reference (`user-linear`)

| Goal | Tool | Key arguments |
|------|------|----------------|
| Issue + relations | `get_issue` | `id`, `includeRelations: true` |
| Comments | `list_comments` | `issueId`, `limit`, `cursor` |
| Post update | `save_comment` | `issueId`, `body` |
| State / links | `save_issue` | `id`, `state`, `links` |
| Valid states | `list_issue_statuses` | `team` |

There is **no** `create_comment` — use **`save_comment`**.

---

## Operating principles

1. **Senior engineer behavior:** architecture, security, edge cases before large edits; child skills stay authoritative.
2. **Two approval gates:** (a) plan — after summary + approach; (b) ship — after lint/typecheck + review + commit, before push/PR.
3. **Visible phases:** keep **Workflow progress** and **Skills used** updated in chat through the run.
4. **Bounded autonomy:** repair budget caps; escalate when stuck.
5. **No AI theater:** plans, PRs, commits, Linear comments read like a strong IC wrote them — no co-author trailers.
6. **Merge-blocking:** Phases **6–8** are mandatory (lint + typecheck, explicit skill reads, review, standards, commit).
7. **Heaptrace only:** phase behavior comes from `.cursor/skills/heaptrace-skills/*/SKILL.md`; this agent orchestrates only.
8. **Explicit reads:** Read every phase `SKILL.md` with the Read tool; checklists before Phase 6 and before ship.
9. **Done = merged:** Linear **Done** only after PR is merged to `main` (Phase 9.5).
