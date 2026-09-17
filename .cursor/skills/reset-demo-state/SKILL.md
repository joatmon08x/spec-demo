---
name: reset-demo-state
description: Restore Ledgerly's seeded LY-6 spec-track baseline when the data, client version, issue state, or dev server has drifted.
---

# Reset the spec-track demo

Goal: seeded Fieldnote data, port 43173, LY-6 Backlog, the client selecting v1, and `npm test` reporting exactly **1 failed / 29 passed**.

## Repository and data

Inspect changes before restoring anything:

```bash
git status
git checkout -- lib/disputes/suggested-credit-api.ts
npx prisma db seed
```

Never discard unrelated work. Do not edit `tests/suggested-credit-api.test.ts`, either API route, the $400 claim, or the seed to manufacture the expected baseline.

## Linear

Read LY-6 and its comments through Linear MCP. Move it back to Backlog only when the operator explicitly says the live demo environment is being reset. Preserve the issue history and existing comments.

## Server

Start `npm run dev` on port 43173. If the port is already occupied, identify the exact process before stopping it; never kill by process name.

## Verify

```bash
npm test
```

Expect exactly one failure in `tests/suggested-credit-api.test.ts` and 29 passing tests.

Open:

- `http://127.0.0.1:43173/runbooks/spec`
- `http://127.0.0.1:43173/disputes/dsp_1043`
- `http://127.0.0.1:43173/api/v2/disputes/dsp_1043/suggested-credit`

The runbook has four sections. The dispute page shows $400 from v1. The v2 response returns 24900 cents. LY-6 remains Backlog.
