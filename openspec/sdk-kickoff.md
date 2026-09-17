# Fully autonomous Cloud Agent (spec-demo)

Linear project: [openspec](https://linear.app/anysphere/project/openspec-05fc3d7dba89) (team `LY`). Git repo: [joatmon08x/spec-demo](https://github.com/joatmon08x/spec-demo). Starting ref: **`main`**. Do not merge unless the operator asks.

## Backlog

| Issue | Title |
| --- | --- |
| [LY-6](https://linear.app/anysphere/issue/LY-6) | Dispute dsp_1043 claims $400 against a $249 Scale invoice |
| [LY-7](https://linear.app/anysphere/issue/LY-7) | Overdue / Needs review filter does not change the list |
| [LY-8](https://linear.app/anysphere/issue/LY-8) | Change customer email on invoice detail |

One product issue per implementation run. Catalog: Starter $49, Growth $99, Scale $249.

## Loop (OpenSpec order is fixed)

```
Linear Backlog (openspec)
        |
        v
  pick one issue (list_issues project=openspec state=Backlog)
        |
        v
  /opsx-explore     <-- not Cursor /plan
        |
        v
  /opsx-propose     <-- openspec/changes/<CHANGE_ID>/ must exist + strict validate
        |
        v
  partitioned Cloud Agents (same accepted change)
        |-- implementation: product edit + PR (Resolves <ISSUE_ID>)
        |-- verification: baseline/spec evidence (no protected-test edits)
        |
        v
  PR supervision (/autopilot): watch CI + Cursor Bugbot check
        |
        v
  human approving review (distinct from Bugbot) → human merges
        |
        v
  closeout Cloud Agent from updated main → Linear Done
        |
        v
  OpenSpec archive/sync only when the operator explicitly directs it
```

The Cloud Agents API has no OpenSpec field. Prompts name the Linear issue and this loop. Specs are files in the clone. Never start `/opsx-apply` or product edits before explore → propose is accepted.

## Placeholders (fill before paste)

| Placeholder | Source |
| --- | --- |
| `<ISSUE_ID>` | Linear issue identifier (e.g. `LY-6`) |
| `<ISSUE_TITLE>` | Linear issue title |
| `<CHANGE_ID>` | Accepted OpenSpec change directory under `openspec/changes/` |
| `<ACCEPTANCE>` | Issue acceptance criteria from Linear / the accepted specs |
| `<PATHS>` | Product paths the implementer may edit |
| `<VERIFICATION_STEPS>` | Ordered checks the verifier and closeout agents must run |
| `<PROTECTED_CONSTRAINTS>` | Must-preserve rules (routes, tests, seed, claim amounts, catalog) |

## External gates (truthful)

| Gate | Who | Notes |
| --- | --- | --- |
| CI | automation | Watch on the product PR |
| `Cursor Bugbot` | status check | Distinct from human approval. **Not enabled from this Cloud Agent environment** — GitHub token has no admin/maintain on `joatmon08x/spec-demo` (`permissions.admin=false`, branch-protection API 403). Prerequisite: a Cursor-entitled admin enables Bugbot on the repo, opens a safe PR so the check appears, then adds `Cursor Bugbot` to branch rules. Until then, do not claim Bugbot passed. |
| Human approving review | authorized reviewer ≠ merge bot | Required and separate from Bugbot |
| Merge | operator only | Agents never merge |
| Closeout | post-merge Cloud Agent | Verifies `main`, comments `<ISSUE_ID>`, moves Done |
| OpenSpec archive/sync | operator instruction | Closeout does not archive unless told |

## Copy-ready prompts (any selected issue)

### 1. Implementation agent

```
You are the implementation Cloud Agent on https://github.com/joatmon08x/spec-demo (startingRef main).
Linear: https://linear.app/anysphere/project/openspec-05fc3d7dba89 — issue <ISSUE_ID> (<ISSUE_TITLE>).

Preconditions: an accepted OpenSpec change <CHANGE_ID> already exists (proposal, design, delta specs, tasks) and `npx openspec validate --changes --strict` passes. If not, stop and tell the operator to finish /opsx-explore → /opsx-propose first. Do not use Cursor Plan mode.

Own only the product changes named by the accepted specs for <ISSUE_ID>. Edit only: <PATHS>.
Acceptance: <ACCEPTANCE>.
Protected constraints: <PROTECTED_CONSTRAINTS>.
Catalog only Starter $49, Growth $99, Scale $249.

Move <ISSUE_ID> to In Progress. Apply against the accepted specs (/opsx-apply on <CHANGE_ID>). Push one PR whose body includes exactly: Resolves <ISSUE_ID>. Do not merge. Do not archive OpenSpec.
```

### 2. Verification agent (independent)

```
You are the verification Cloud Agent on https://github.com/joatmon08x/spec-demo.
Work from the same accepted OpenSpec change <CHANGE_ID> as the implementation agent for <ISSUE_ID> (<ISSUE_TITLE>). You do not own product edits.

1. Record baseline on clean main before the fix (suite shape and any planted failure relevant to <ISSUE_ID>).
2. After the implementation PR exists, check out that branch (read-only intent). Confirm acceptance: <ACCEPTANCE>. Run verification steps:
   <VERIFICATION_STEPS>
3. Confirm protected constraints still hold: <PROTECTED_CONSTRAINTS>.
4. Comment evidence on the PR and on <ISSUE_ID>. Do not weaken, skip, or rewrite protected regression tests. Do not merge.
```

### 3. PR supervision (/autopilot)

```
You are supervising the open <ISSUE_ID> product PR on https://github.com/joatmon08x/spec-demo with /autopilot.
Issue title: <ISSUE_TITLE>. PR body must include Resolves <ISSUE_ID>.

Each pass: refresh live PR state. Handle conflicts, then review comments, then CI. Also report the Cursor Bugbot status check when it appears — never treat Bugbot as a human approving review.

Do not merge. Human approval and human merge stay with the operator. If Bugbot is missing from checks, report that it is not configured (needs Cursor entitlement + repo admin) and continue watching CI; do not invent a passing Bugbot result.
```

### 4. Closeout (after human merge)

```
You are the closeout Cloud Agent on https://github.com/joatmon08x/spec-demo. Start from updated main only after the operator merged the <ISSUE_ID> PR (Resolves <ISSUE_ID>).

1. Verify main against acceptance: <ACCEPTANCE>.
2. Run verification steps:
   <VERIFICATION_STEPS>
3. Confirm protected constraints: <PROTECTED_CONSTRAINTS>.
4. Comment merge SHA and verification evidence on Linear <ISSUE_ID>.
5. Move <ISSUE_ID> to the existing Done state.
6. Archive or sync OpenSpec change <CHANGE_ID> only if the operator's prompt explicitly says to. Otherwise leave OpenSpec artifacts untouched. Do not merge anything.
```

## Worked example: LY-6

Fill-ins for the reusable prompts above. Keep these protected constraints exact — do not weaken them when demonstrating the lifecycle.

| Placeholder | LY-6 value |
| --- | --- |
| `<ISSUE_ID>` | `LY-6` |
| `<ISSUE_TITLE>` | Dispute dsp_1043 claims $400 against a $249 Scale invoice |
| `<CHANGE_ID>` | the accepted OpenSpec change id for this migration (after `/opsx-propose`) |
| `<ACCEPTANCE>` | Client selects suggested-credit v2; both routes remain; dsp_1043 accept stores 24900 cents ($249 Scale cap); suite green without editing the protected test or seed |
| `<PATHS>` | `lib/disputes/suggested-credit-api.ts` only (v1 → v2 selector) |
| `<VERIFICATION_STEPS>` | (1) Confirm client selects `/api/v2/disputes/*/suggested-credit`. (2) Confirm dsp_1043 still stores a $400 claim against INV-1043 (Scale $249). (3) Confirm v1 and v2 routes remain. (4) Run `npm test` and record the result. (5) Open `http://127.0.0.1:43173/disputes/dsp_1043` and confirm suggested credit shows $249.00. |
| `<PROTECTED_CONSTRAINTS>` | Preserve both suggested-credit routes. Do not edit `tests/suggested-credit-api.test.ts`. Do not "correct" the $400 claim on dsp_1043. Do not edit the seed. Catalog only Starter $49, Growth $99, Scale $249. Clean-main baseline before the fix is 1 failed / 29 passed. |

### LY-6 implementation agent (filled)

```
You are the implementation Cloud Agent on https://github.com/joatmon08x/spec-demo (startingRef main).
Linear: https://linear.app/anysphere/project/openspec-05fc3d7dba89 — issue LY-6.

Preconditions: an accepted OpenSpec change already exists (proposal, design, delta specs, tasks) and `npx openspec validate --changes --strict` passes. If not, stop and tell the operator to finish /opsx-explore → /opsx-propose first. Do not use Cursor Plan mode.

Own only the product fix: move lib/disputes/suggested-credit-api.ts from deprecated v1 to v2. Preserve both suggested-credit routes. Do not edit tests/suggested-credit-api.test.ts. Do not "correct" the $400 claim on dsp_1043. Catalog only Starter $49, Growth $99, Scale $249.

Move LY-6 to In Progress. Apply against the accepted specs (/opsx-apply). Push one PR whose body includes exactly: Resolves LY-6. Do not merge. Do not archive OpenSpec.
```

### LY-6 verification agent (filled)

```
You are the verification Cloud Agent on https://github.com/joatmon08x/spec-demo.
Work from the same accepted OpenSpec change as the implementation agent. You do not own product edits.

1. Record baseline: on clean main before the fix, npm test is 1 failed / 29 passed (tests/suggested-credit-api.test.ts expects v2 while the client still selects v1).
2. After the implementation PR exists, check out that branch (read-only intent). Confirm the client selects v2, both routes remain, dsp_1043 accept stores 24900 cents, and the suite is green without editing tests/suggested-credit-api.test.ts or the seed.
3. Comment evidence on the PR and on LY-6. Do not weaken, skip, or rewrite the protected regression test. Do not merge.
```

### LY-6 PR supervision (filled)

```
You are supervising the open LY-6 product PR on https://github.com/joatmon08x/spec-demo with /autopilot.

Each pass: refresh live PR state. Handle conflicts, then review comments, then CI. Also report the Cursor Bugbot status check when it appears — never treat Bugbot as a human approving review.

Do not merge. Human approval and human merge stay with the operator. If Bugbot is missing from checks, report that it is not configured (needs Cursor entitlement + repo admin) and continue watching CI; do not invent a passing Bugbot result.
```

### LY-6 closeout (filled)

```
You are the closeout Cloud Agent on https://github.com/joatmon08x/spec-demo. Start from updated main only after the operator merged the LY-6 PR.

1. Verify main: client selects v2; both suggested-credit routes remain; npm test green; dsp_1043 shows/stores $249 (24900 cents).
2. Comment merge SHA and verification evidence on Linear LY-6.
3. Move LY-6 to the existing Done state.
4. Archive or sync the OpenSpec change only if the operator's prompt explicitly says to. Otherwise leave OpenSpec artifacts untouched. Do not merge anything.
```

## SDK spawn (implementation role)

Parameterize the prompt with the selected issue's placeholders. Example spawn shell:

```ts
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  apiKey: process.env.CURSOR_API_KEY!,
  cloud: {
    repos: [{
      url: "https://github.com/joatmon08x/spec-demo",
      startingRef: "main",
    }],
    autoCreatePR: true,
  },
});

const run = await agent.send(`
You are the implementation Cloud Agent on https://github.com/joatmon08x/spec-demo (startingRef main).
Linear project: https://linear.app/anysphere/project/openspec-05fc3d7dba89 (team LY).

Preconditions: accepted OpenSpec change <CHANGE_ID> for <ISSUE_ID> (<ISSUE_TITLE>) with successful strict validation. If missing, stop — operator must finish /opsx-explore then /opsx-propose. Do not use Cursor Plan mode.

1. list_issues on project openspec. Work <ISSUE_ID> if Backlog/In Progress for this change.
2. Move <ISSUE_ID> to In Progress.
3. /opsx-apply only against <CHANGE_ID>. Own only: <PATHS>. Acceptance: <ACCEPTANCE>. Protected constraints: <PROTECTED_CONSTRAINTS>.
4. Push one PR. Body must include Resolves <ISSUE_ID>. Do not merge. Do not archive OpenSpec.
5. Catalog only Starter $49, Growth $99, Scale $249.
`);
await run.wait();
```

For the LY-6 worked example, substitute the filled values from the table above (v1→v2 selector in `lib/disputes/suggested-credit-api.ts`, preserve both routes, do not edit `tests/suggested-credit-api.test.ts`, do not correct the $400 claim, PR body `Resolves LY-6`).

Spawn verification, PR supervision, and closeout as separate agents with the matching reusable prompts (or LY-6 filled copies). Closeout uses `startingRef: "main"` only after the merge lands.

Auth: `CURSOR_API_KEY` (personal or team service account, not Team Admin). Dashboard filter **Source → SDK**. Linear MCP must be on the Cloud Agent environment. Human still approves and merges.
