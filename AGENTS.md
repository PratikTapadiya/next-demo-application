<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Linear tickets → RateLens workflow agent

Any **implement / ship / fix** request for a Linear issue (`PRA-*`, Linear URL, or ticket in thread) **must** use **`ratelens-workflow-automate-agent`** (Task delegation). Do not implement ticket work in the parent agent.

- Rule (always on): `.cursor/rules/ratelens-workflow-automate-agent.mdc`
- Orchestration: `.cursor/agents/ratelens-workflow-automate-agent.md`
- Manual invoke: `@ratelens-workflow-automate-agent`
