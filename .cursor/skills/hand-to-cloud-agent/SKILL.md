---
name: hand-to-cloud-agent
description: Hands Ledgerly work to Cloud Agents. Use for durable /goal runs, /autopilot PR supervision, or /orchestrate planner/worker/verifier trees. Not for a local /loop.
---

# Hand work to a Cloud Agent

Local `/loop` lives inside this session and dies when the laptop closes. A Cloud Agent can hold a `/goal`, supervise a PR with `/autopilot`, or staff an `/orchestrate` tree.

Canonical spawn prompts for the `/runbooks/spec` LY-6 partitioned lifecycle live in `openspec/sdk-kickoff.md`. Prefer those copy-ready blocks when handing off.

## When to use

- `/goal` and the finish line will take longer than this sitting, or must continue after the laptop closes.
- `/autopilot` — an open PR needs event-driven passes over conflicts, comments, and checks.
- `/orchestrate` — a root planner decomposes the work; workers are isolated; verifiers check the result.

## OpenSpec gate (before product Cloud Agents)

1. `/opsx-explore` the Linear issue (not Cursor Plan mode).
2. `/opsx-propose` until `openspec/changes/<id>/` has proposal, design, delta specs, and tasks.
3. Confirm `npx openspec validate --changes --strict` passes.
4. Only then launch implementation / verification Cloud Agents against that accepted change.

## Partitioned roles (LY-6)

### Implementation agent

Owns the v1→v2 selector in `lib/disputes/suggested-credit-api.ts` and **one** PR whose body includes `Resolves LY-6`. Preserves both suggested-credit routes. Does not edit `tests/suggested-credit-api.test.ts`, the seed, or the $400 claim. Does not merge or archive.

Copy-ready prompt: see **Implementation agent** in `openspec/sdk-kickoff.md`.

### Verification agent

Independent of the implementer. Records clean-main baseline (1 failed / 29 passed), then checks the product branch against the accepted specs. Reports evidence on the PR and Linear. Never weakens or rewrites the protected regression test. Does not merge.

Copy-ready prompt: see **Verification agent** in `openspec/sdk-kickoff.md`.

### PR supervision (`/autopilot`)

Watches the open product PR: conflicts → comments → CI, and reports the `Cursor Bugbot` status check when present. Bugbot is **not** a human approving review. Human approval and human merge stay with the operator. If Bugbot is not configured, state the prerequisite (Cursor entitlement + repo admin); do not invent a pass.

Copy-ready prompt: see **PR supervision** in `openspec/sdk-kickoff.md`.

### Closeout Cloud Agent

Runs only after the operator merges. Starts from updated `main`, verifies the fix, comments merge + evidence on LY-6, moves LY-6 to Done. Archives or syncs OpenSpec **only** when the operator's instruction says so.

Copy-ready prompt: see **Closeout** in `openspec/sdk-kickoff.md`.

## /goal in the cloud

Scope the finish line so it is verifiable: the client selects v2, both routes remain, `npm test` is green, `dsp_1043` shows $249, and dispute resolution works. For the partitioned lifecycle, prefer separate implementation + verification agents over a single opaque `/goal`. The agent judges when the objective is met; you review.

## /autopilot

Cursor's `/babysit` PR workflow is now the `/autopilot` built-in skill. It needs a real open PR. Refresh live PR state each pass, handle conflicts before comments before CI, stop on ambiguous intent, and leave the merge decision to the human. Treat `Cursor Bugbot` as a status check to watch, not as approval.

## /orchestrate

This one is a **plugin**, not built in. Before running it:

- `bun` on PATH
- `CURSOR_API_KEY` — a personal key or a team service account, not a team admin key
- Slack is optional and mirrors the run in a thread

The root planner writes no code. Workers are isolated; every handoff points up. Split the v1-to-v2 client migration from the dispute-resolution stub work. Name `dispute-verifier` as the verifier for resolution work; for LY-6 migration use the independent verification agent above. Republish a task if a verifier fails.

## What you keep

You approve and merge. Do not treat a green verifier, Bugbot check, or merge-ready PR as a ship decision. Do not use this skill for a local `/loop` on `/api/demo/job`. Do not claim Bugbot is enabled unless the check actually appears on the PR.
