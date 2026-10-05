---
name: plan-to-openspec
description: Turns an explored feature request into an OpenSpec change after /opsx-explore, then files it as one Linear issue. Last 101 beat only.
disable-model-invocation: true
---

# Explore, propose, file the ticket

Planning artifacts only. Do not edit product code. Do not `/opsx-apply`. Stop after `openspec validate <id> --strict` passes and the Linear issue exists.

This is the last 101 beat (MCP / Linear). Earlier beats use Plan mode and Agent mode as written; do not replace them with OpenSpec.

## Rough loop

Specs live in an `openspec/` folder (what the system should do).
A change gets its own folder: proposal, design, tasks, delta specs.
In the AI assistant you run slash commands like /opsx:explore → /opsx:propose → /opsx:apply → /opsx:archive.
When done, the change archives and specs become the new source of truth.

Cursor Desktop spells those commands with hyphens: `/opsx-explore`, `/opsx-propose`, `/opsx-apply`, `/opsx-archive`.

## Input

A scoped request the user already explored with `/opsx-explore`. The 101 track uses the dispute Resolution panel (`resolve-dispute-panel`). Do not invent a fourth catalog price.

Worked mappings: [examples.md](examples.md).

## Steps

1. Confirm `openspec/` exists (`openspec context --json`). If `no_openspec_root`, stop and tell the user to `openspec init`. Do not init automatically.
2. If explore has not run, run `/opsx-explore` on the request first. Do not skip to files.
3. Read `openspec/config.yaml` `context` and this repo’s catalog: Starter **$49**, Growth **$99**, Scale **$249**. Operator Avery Quinn. No real companies.
4. Derive a kebab-case change id from the explored topic. Skip if `openspec/changes/<id>/` already exists unless the user asked to refresh it.
5. Follow `/opsx-propose` (or `openspec new change "<id>"` plus artifacts):
   - `proposal.md` — why, what, non-goals, capabilities
   - `specs/<capability>/spec.md` — ADDED/MODIFIED requirements with Given/When/Then
   - `design.md` — how, ownership, out of scope
   - `tasks.md` — checklist; one capability per isolated worker when work splits files
6. `openspec validate <id> --strict` and `openspec status --change <id>`.
7. File one Linear issue through the Linear MCP in the project the operator names: title from the proposal, acceptance from the delta spec, paths from tasks, plus a link back to `openspec/changes/<id>/`. Report the issue identifier. Do not implement.

## Constraints

- `dsp_1043` may claim $400 against Scale **$249**. Do not “correct” the claim or the seed. Stored credit on accept is **$249**.
- Do not edit `tests/suggested-credit-api.test.ts` to force green. Preserve v1 and v2 suggested-credit routes.
- Resolution-panel change: Accept credit and Decline only; no suggested-credit migration. Email change: no email-format validation. Filter change: only filter selection.
- Do not complete `lib/disputes/resolve.ts` — this beat ends at the ticket.
- Do not archive. Specs become source of truth only after a later `/opsx-archive`.
- Linear MCP cannot create teams. Use the project the operator names; never `save_project` onto a public team.
