# Ledgerly spec track demo

Presenter run-of-show for `/runbooks/spec`. The goal is to show one complete delivery loop for [Linear LY-6](https://linear.app/anysphere/issue/LY-6): design by specification, partition work across Cloud Agents, review one product PR, merge as a human, then close the ticket with a fresh Cloud Agent.

Ledgerly is fictional. Avery Quinn is the operator. Catalog prices are Starter **$49**, Growth **$99**, and Scale **$249**. The valid claim on `dsp_1043` is **$400**; the current v2 API and stored credit cap it at **$249**.

## Before the demo

```bash
npm i
npx prisma generate
npx prisma db seed
npm run dev
```

Confirm:

- LY-6 is **Backlog** in Linear project `openspec`.
- `dsp_1043` shows **Suggested credit $400.00** from v1.
- `npm test` reports **1 failed / 29 passed**, with only `tests/suggested-credit-api.test.ts` red.
- Both suggested-credit API routes remain.
- No LY-6 product-change OpenSpec change is already active.

If the client already selects v2, restore the demo baseline with `reset-demo-state`.

## Narration pattern

For each beat, state:

1. **Boundary** — what this agent owns and must preserve.
2. **Action** — what Cursor or the external system is doing.
3. **Evidence** — what you inspect before allowing the workflow to continue.
4. **Authority** — which decision still belongs to the operator.

Do not read long prompts aloud. State the intent, copy the matching card from `/runbooks/spec`, and narrate the evidence.

## 1. Design with OpenSpec

### Pull live LY-6

Use the first card to fetch LY-6 with Linear MCP. Show the Backlog state, acceptance criteria, and paths. Do not move it yet.

### Reproduce the planted failure

Open [dsp_1043](http://127.0.0.1:43173/disputes/dsp_1043). Point out the $400 claim, the $249 Scale cap, and the v1 label. Run the test suite and show that only the expected migration contract is red.

The layers are:

| Layer | Evidence |
| --- | --- |
| Seed | `dsp_1043` claims 40000 cents against Scale |
| Domain and v2 | Suggested credit caps at 24900 cents |
| v1 | Compatibility route returns the raw claim |
| Client | `lib/disputes/suggested-credit-api.ts` selects v1 |
| Contract | `tests/suggested-credit-api.test.ts` expects v2 |

### Explore

Paste the `/opsx-explore` card. The exploration must distinguish the one-line client migration from the valid claim, existing routes, and unfinished dispute-resolution stub.

### Propose

Paste the `/opsx-propose` card. Stop after proposal, design, delta spec, and tasks exist under `openspec/changes/<id>/`. No product code changes in this beat.

### Review and validate

Use the review card to confirm:

- The non-goals preserve v1, v2, the seed, the claim, and catalog prices.
- Scenarios use Given/When/Then.
- Implementation owns only the selector.
- Verification owns evidence and cannot edit the protected test.

Then run:

```bash
npx openspec validate --changes --strict
npx openspec list
```

Do not launch product agents until strict validation passes and the operator accepts the spec.

## 2. Partitioned Cloud implementation

Launch the two cards against the same accepted change.

### Implementation Cloud Agent

The implementer moves LY-6 to **In Progress**, runs `/opsx-apply`, changes only `SUGGESTED_CREDIT_API_VERSION` from v1 to v2, verifies the result, and opens one PR containing `Resolves LY-6`. It does not merge or archive.

### Verification Cloud Agent

The verifier independently records the clean-main baseline, then checks the implementation PR against the accepted spec. It does not edit product code, the seed, or `tests/suggested-credit-api.test.ts`. It posts concrete test and UI evidence to the PR and LY-6.

This is partitioned responsibility, not artificial parallel test authoring. The product PR remains singular.

## 3. Guarded PR review and merge

### Watch the PR

Use the `/autopilot` card to refresh live PR state in this order:

1. Conflicts
2. Review comments
3. CI
4. `Cursor Bugbot`

BugBot is a status check and automated reviewer. It does not satisfy the required human approval.

### BugBot setup or fallback

The desired `main` rules require a pull request, the observed `Cursor Bugbot` check, and one human approval. Current Cloud Agent credentials cannot configure repository rules (`admin=false`, `maintain=false`; branch-protection API 403).

Before presenting the automated gate, a Cursor-entitled repository administrator must:

1. Enable `joatmon08x/spec-demo` in **Cursor Dashboard → BugBot Automations**.
2. Open a safe PR so the `Cursor Bugbot` check appears.
3. Add that exact check to the `main` ruleset.
4. Require one approving review.

If this setup is not complete, say so and use the verifier plus a manual human review. Never display or describe a fabricated BugBot pass.

### Human approval and merge

A different authorized human approves the Cloud Agent PR. Only the operator merges after CI, verifier evidence, BugBot or the documented fallback, and human approval are satisfied.

## 4. Post-merge closeout

After the operator merges, launch the closeout card from updated `main`. The closeout Cloud Agent:

1. Verifies the client selects v2.
2. Verifies both API routes remain.
3. Runs the suite and verifies `dsp_1043` shows $249.
4. Comments the merge SHA and evidence on LY-6.
5. Moves LY-6 to the existing **Done** state.
6. Leaves OpenSpec artifacts unchanged unless the operator explicitly requests archive or sync.

Finish on Linear with LY-6 Done, then show the corrected dispute page. The completion signal is not only green code: it is a reviewed merge plus a closed ticket with evidence.

## Reset for the next presentation

After the live LY-6 demo, reset the repository and data only when preparing another presentation:

```bash
git checkout -- lib/disputes/suggested-credit-api.ts
npx prisma db seed
npm test
```

Return LY-6 to Backlog only if the demo environment is explicitly being reset. Do not change live issue history casually.
