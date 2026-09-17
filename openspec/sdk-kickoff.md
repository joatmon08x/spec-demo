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
  /opsx-propose     <-- openspec/changes/<id>/ must exist + strict validate
        |
        v
  partitioned Cloud Agents (same accepted change)
        |-- implementation: product edit + PR (Resolves LY-n)
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

## External gates (truthful)

| Gate | Who | Notes |
| --- | --- | --- |
| CI | automation | Watch on the product PR |
| `Cursor Bugbot` | status check | Distinct from human approval. **Not enabled from this Cloud Agent environment** — GitHub token has no admin/maintain on `joatmon08x/spec-demo` (`permissions.admin=false`, branch-protection API 403). Prerequisite: a Cursor-entitled admin enables Bugbot on the repo, opens a safe PR so the check appears, then adds `Cursor Bugbot` to branch rules. Until then, do not claim Bugbot passed. |
| Human approving review | authorized reviewer ≠ merge bot | Required and separate from Bugbot |
| Merge | operator only | Agents never merge |
| Closeout | post-merge Cloud Agent | Verifies `main`, comments LY-n, moves Done |
| OpenSpec archive/sync | operator instruction | Closeout does not archive unless told |

## Copy-ready prompts

### 1. Implementation agent (LY-6)

```
You are the implementation Cloud Agent on https://github.com/joatmon08x/spec-demo (startingRef main).
Linear: https://linear.app/anysphere/project/openspec-05fc3d7dba89 — issue LY-6.

Preconditions: an accepted OpenSpec change already exists (proposal, design, delta specs, tasks) and `npx openspec validate --changes --strict` passes. If not, stop and tell the operator to finish /opsx-explore → /opsx-propose first. Do not use Cursor Plan mode.

Own only the product fix: move lib/disputes/suggested-credit-api.ts from deprecated v1 to v2. Preserve both suggested-credit routes. Do not edit tests/suggested-credit-api.test.ts. Do not "correct" the $400 claim on dsp_1043. Catalog only Starter $49, Growth $99, Scale $249.

Move LY-6 to In Progress. Apply against the accepted specs (/opsx-apply). Push one PR whose body includes exactly: Resolves LY-6. Do not merge. Do not archive OpenSpec.
```

### 2. Verification agent (independent)

```
You are the verification Cloud Agent on https://github.com/joatmon08x/spec-demo.
Work from the same accepted OpenSpec change as the implementation agent. You do not own product edits.

1. Record baseline: on clean main before the fix, npm test is 1 failed / 29 passed (tests/suggested-credit-api.test.ts expects v2 while the client still selects v1).
2. After the implementation PR exists, check out that branch (read-only intent). Confirm the client selects v2, both routes remain, dsp_1043 accept stores 24900 cents, and the suite is green without editing tests/suggested-credit-api.test.ts or the seed.
3. Comment evidence on the PR and on LY-6. Do not weaken, skip, or rewrite the protected regression test. Do not merge.
```

### 3. PR supervision (/autopilot)

```
You are supervising the open LY-6 product PR on https://github.com/joatmon08x/spec-demo with /autopilot.

Each pass: refresh live PR state. Handle conflicts, then review comments, then CI. Also report the Cursor Bugbot status check when it appears — never treat Bugbot as a human approving review.

Do not merge. Human approval and human merge stay with the operator. If Bugbot is missing from checks, report that it is not configured (needs Cursor entitlement + repo admin) and continue watching CI; do not invent a passing Bugbot result.
```

### 4. Closeout (after human merge)

```
You are the closeout Cloud Agent on https://github.com/joatmon08x/spec-demo. Start from updated main only after the operator merged the LY-6 PR.

1. Verify main: client selects v2; both suggested-credit routes remain; npm test green; dsp_1043 shows/stores $249 (24900 cents).
2. Comment merge SHA and verification evidence on Linear LY-6.
3. Move LY-6 to the existing Done state.
4. Archive or sync the OpenSpec change only if the operator's prompt explicitly says to. Otherwise leave OpenSpec artifacts untouched. Do not merge anything.
```

## SDK spawn (implementation role)

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

Preconditions: accepted OpenSpec change for LY-6 with successful strict validation. If missing, stop — operator must finish /opsx-explore then /opsx-propose. Do not use Cursor Plan mode.

1. list_issues on project openspec. Work LY-6 if Backlog/In Progress for this migration.
2. Move LY-6 to In Progress.
3. /opsx-apply only against the accepted change. Own the v1→v2 selector in lib/disputes/suggested-credit-api.ts. Preserve both routes. Do not edit tests/suggested-credit-api.test.ts. Do not correct the $400 claim on dsp_1043.
4. Push one PR. Body must include Resolves LY-6. Do not merge. Do not archive OpenSpec.
5. Catalog only Starter $49, Growth $99, Scale $249.
`);
await run.wait();
```

Spawn verification, PR supervision, and closeout as separate agents with the matching prompts above. Closeout uses `startingRef: "main"` only after the merge lands.

Auth: `CURSOR_API_KEY` (personal or team service account, not Team Admin). Dashboard filter **Source → SDK**. Linear MCP must be on the Cloud Agent environment. Human still approves and merges.
