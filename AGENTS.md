<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.

This block is written and re-added by `next dev`. Removing it only creates a recurring uncommitted change.

<!-- END:nextjs-agent-rules -->

# Ledgerly

Fictional Fieldnote billing operations. Avery Quinn is the operator. No auth or real companies.

Catalog prices are fixed: Starter **$49**, Growth **$99**, Scale **$249**. Read prices from `lib/plans.ts`; read customer names from `prisma/seed.ts` and `prisma/extra-accounts.ts`.

## Cursor Cloud specific instructions

### Install and run

```bash
npm i
npx prisma generate
npx prisma db seed
npm run dev
```

The app listens on port **43173**. SQLite is `prisma/dev.db`; no `.env` is required.

### Tests

```bash
npm test
```

The demo baseline is **1 failed / 29 passed**. `tests/suggested-credit-api.test.ts` expects v2 while `lib/disputes/suggested-credit-api.ts` intentionally selects deprecated v1. Preserve both routes, the valid $400 claim on `dsp_1043`, and the $249 Scale cap. Do not edit the test or seed to get green.

### Spec track

The single runbook is `/runbooks/spec`. Its source of truth is `lib/runbooks/meta.ts` and `lib/runbooks/beats/spec.ts`; presenter guidance is `demo-howto.md`.

The four sections are:

1. Design with OpenSpec.
2. Partitioned Cloud implementation.
3. Guarded PR review and merge.
4. Post-merge Linear closeout.

Do not reintroduce the retired curriculum tracks or their staging/plugin assets.

### OpenSpec

Start spec-driven work with `/opsx-explore`, then `/opsx-propose`, then `/opsx-apply`. Do not use Cursor Plan mode. Product code must not change until `openspec/changes/<id>/` exists and strict validation passes.

```bash
npx openspec validate --changes --strict
npx openspec list
```

Do not archive or sync unless the operator asks.

### Linear and Cloud Agents

Linear project: [openspec](https://linear.app/anysphere/project/openspec-05fc3d7dba89), team `LY`. Git repository: [joatmon08x/spec-demo](https://github.com/joatmon08x/spec-demo), starting ref `main`.

For any selected Linear issue:

- Fill `<ISSUE_ID>`, `<ISSUE_TITLE>`, `<CHANGE_ID>`, `<ACCEPTANCE>`, `<PATHS>`, `<VERIFICATION_STEPS>`, and `<PROTECTED_CONSTRAINTS>` from Linear and the accepted spec.
- Implementation Cloud Agent owns the issue's product paths and one PR with `Resolves <ISSUE_ID>`.
- Verification Cloud Agent owns independent evidence and must not edit product code or protected regression tests.
- `/autopilot` watches conflicts, comments, CI, and the `Cursor Bugbot` check.
- BugBot is not a human approval. A human approves and the operator merges.
- A post-merge Cloud Agent verifies updated `main`, comments evidence on the selected issue, and moves it to Done.

Copy-ready parameterized prompts and filled LY-6 examples live in `openspec/sdk-kickoff.md` and `.cursor/skills/hand-to-cloud-agent/SKILL.md`.

Current Cloud credentials cannot configure BugBot or branch rules. A Cursor-entitled repository administrator must enable BugBot, make its check appear on a safe PR, and require that check plus one human approval. Never claim an external check passed without evidence.

### Protected seams

- Do not complete `lib/disputes/resolve.ts`, its API route, or resolution buttons unless asked.
- Do not rename the FilterPills query key from `state` to `status` unless asked.
- Do not add a database MCP or restore an `mcp/` directory.
- Do not add another catalog-solving agent or talk-track skill.
- Keep Collections, Nudge, Pulse, Slatebook, and Harborbill names unchanged.

### Agents and skills

| Path | Role |
| --- | --- |
| `.cursor/agents/ledgerly-reviewer.md` | Diff reviewer after changes |
| `.cursor/agents/dispute-verifier.md` | Dispute finish-line verifier |
| `.cursor/skills/choose-cursor-workflow/` | Walk the spec track |
| `.cursor/skills/hand-to-cloud-agent/` | Cloud implementation, PR watch, and closeout |
| `.cursor/skills/plan-to-openspec/` | Convert a selected Linear issue into OpenSpec artifacts |
| `.cursor/skills/openspec-*/` | Explore, propose, apply, update, sync, and archive changes |
| `.cursor/skills/reset-demo-state/` | Restore the planted baseline |
| `.cursor/skills/write-prisma-query/` | Query the seeded SQLite data |
