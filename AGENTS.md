<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Linear tickets → RateLens workflow agent

Any **work on**, **implement**, **build**, **fix**, or **ship** request for a Linear ticket (`PRA-*`, Linear URL, or ticket named in the thread) **must** Task-delegate to **`ratelens-workflow-automate-agent`**. The parent agent must **not** implement ticket code itself.

**12-step workflow:** (1) read ticket → (2) summarize → (3) plan → (4) plan approval → (5) implement → (6) lint/tests → (7) self-review → (8) standards → (9) commit/PR draft → (10) ship approval → (11) Linear update → (12) summary.

**Skills visibility:** During a ticket run, the workflow agent posts which heaptrace skills it is using (`quick-plan`, `quick-work`, `find-fix`, etc.) in chat and updates the list after each skill is read.

- Rule (always on): `.cursor/rules/ratelens-workflow-automate-agent.mdc`
- Orchestration: `.cursor/agents/ratelens-workflow-automate-agent.md`
- Manual invoke: `@ratelens-workflow-automate-agent`
