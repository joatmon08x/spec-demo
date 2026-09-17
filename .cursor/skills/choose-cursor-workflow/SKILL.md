---
name: choose-cursor-workflow
description: Walk Ledgerly's spec track and choose the Cursor workflow for each delivery gate. The human still reviews and merges.
---

# Walk the spec track

Ledgerly ships one canonical runbook at `/runbooks/spec`. Its beats live in `lib/runbooks/meta.ts` and `lib/runbooks/beats/spec.ts`. Use each beat's copy-ready example without inventing prices, customer data, or a successful external check.

## Sections

1. **Design with OpenSpec** — pull the selected issue from Linear, fill the prompt placeholders, `/opsx-explore`, `/opsx-propose`, review, strict validation. LY-6 is the worked example.
2. **Partitioned Cloud implementation** — implementation owns the selector and PR; verification owns independent evidence.
3. **Guarded PR review and merge** — `/autopilot` watches CI and `Cursor Bugbot`; a different human approves; the operator merges.
4. **Post-merge closeout** — a fresh Cloud Agent verifies `main`, comments evidence, and moves the selected issue Done.

## Choose the workflow

- Use **Ask** for read-only orientation and live Linear inspection.
- Use `/opsx-explore` and `/opsx-propose` for spec design. Do not use Cursor Plan mode.
- Use `/opsx-apply` only after the accepted change passes strict validation.
- Use `hand-to-cloud-agent` for implementation, verification, PR supervision, and closeout prompts.
- Use `/autopilot` only on a real open PR.
- Use `ledgerly-reviewer` for the combined repository diff.

## Guardrails

For any issue, fill `<ISSUE_ID>`, `<ISSUE_TITLE>`, `<CHANGE_ID>`, `<ACCEPTANCE>`, `<PATHS>`, `<VERIFICATION_STEPS>`, and `<PROTECTED_CONSTRAINTS>`. For the LY-6 example, implementation changes only the suggested-credit client selector from v1 to v2 and preserves the $400 claim, $249 Scale cap, both routes, seed, and `tests/suggested-credit-api.test.ts`.

BugBot is a status check, not a human approving review. If the check is absent, report the missing entitlement or repository administration prerequisite and use the documented manual-review fallback. Never fabricate a pass.

The human reviews and merges. The closeout Cloud Agent moves the selected issue to Done only after verifying updated `main`. Do not archive or sync OpenSpec unless asked.
