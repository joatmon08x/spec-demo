## Context

See `proposal.md` for motivation. Runbooks are static typed data rendered by the App Router and exposed through matching JSON routes. The current repository has no active product-change spec, LY-6 is Backlog, and the v1 client selection remains the intentional demo failure.

## Goals / Non-Goals

**Goals:**

- Make `/runbooks/spec` the only canonical presenter track.
- Keep runbook UI, API output, presenter notes, agent prompts, and tests synchronized.
- Make each external gate truthful: BugBot is a status check, human approval is separate, and only the operator merges.
- Leave a deterministic pre-demo baseline.

**Non-Goals:**

- Applying the LY-6 product fix during this cleanup.
- Creating artificial test-authoring work to make a one-line migration appear parallel.
- Automating a merge or claiming external configuration succeeded without evidence.

## Decisions

### Use one typed track and retain the dynamic route

`DemoTrack` becomes the literal `spec`, and the existing dynamic route/API helpers remain. This minimizes routing churn while allowing legacy redirects and stable `/runbooks/spec` links. Rendering the catalog directly at `/runbooks` was rejected because it would split canonical URLs between the UI and API.

### Remove the single-option track picker

The page will render the spec title and sections directly. Keeping a select with one option adds no navigation value and implies more tracks exist.

### Partition roles, not artificial code

The implementation Cloud Agent owns the isolated v1-to-v2 selector change. A second Cloud Agent owns independent baseline and acceptance verification, then reports evidence on the same PR and Linear issue. Creating a redundant test file was rejected because the shipped regression test already defines the migration contract and project rules forbid assigning test authoring to a parallel worker.

### Keep merge and closeout sequential

BugBot, CI, verifier evidence, and a human approval gate the operator's merge. A fresh closeout Cloud Agent then starts from updated `main`, verifies the result, comments on LY-6, and moves it to Done. The closeout cannot run in parallel because it depends on the merged commit.

### Treat external setup as capability detection

The implementation will attempt BugBot and branch-rule setup using available authenticated surfaces. If entitlement or administration access is absent, presenter documentation will state the exact prerequisite and preserve a manual fallback; repository copy will never fabricate a check result.

## Risks / Trade-offs

- [One implementation edit provides limited code parallelism] → Parallelize implementation and independent verification responsibilities instead of manufacturing source changes.
- [Requiring `Cursor Bugbot` before its first check exists may be unavailable in GitHub settings] → Enable BugBot first, trigger it on a safe PR, then add the observed check to branch rules.
- [One required approval can block a sole maintainer] → Keep the rule but document that a different authorized reviewer must approve Cloud Agent PRs.
- [Removing curriculum assets can leave stale references] → Search semantic 101/201 references and protect unrelated HTTP status and fixture identifiers.

## Migration Plan

1. Add the spec track and switch canonical navigation/API behavior.
2. Update presenter, OpenSpec, Cloud Agent, and repository guidance.
3. Remove obsolete curriculum-only assets and references.
4. Validate focused tests, strict OpenSpec, full suite baseline, lint, build, and UI.
5. Push a cleanup PR; roll back by reverting that PR if legacy curriculum needs restoration.
