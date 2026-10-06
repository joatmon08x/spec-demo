## Context

See `proposal.md` for motivation. Today `lib/disputes/suggested-credit-api.ts` sets the client version to `v1`. The dispute page already calls that helper; v1 returns the raw claim and v2 already applies `suggestDisputeCredit` against `lib/plans.ts`. Linear LY-6 lists the page and both routes as related paths; only the selector is wrong.

## Goals / Non-Goals

**Goals:**

- Change one client version constant so UI and the existing path test use v2.
- Keep route handlers, seed, claim, and catalog frozen.

**Non-Goals:**

- Rewriting page layout or Accept/Decline.
- Parallel product-file workers (one implementer owns this spec).

## Decisions

### Edit only the client selector

Set `SUGGESTED_CREDIT_API_VERSION` from `"v1"` to `"v2"` in `lib/disputes/suggested-credit-api.ts`. Alternatives considered: changing the dispute page fetch, deleting v1, or editing the protected test. Those were rejected because the page already delegates to the helper, v1 must stay for compatibility, and the test is the migration contract.

### Treat Linear extra paths as preserve, not edit

LY-6 names `app/disputes/[id]/page.tsx` and both API routes. Those files already behave correctly. Implementation PATHS stay `lib/disputes/suggested-credit-api.ts`. Verification owns evidence, not test rewrites.

### Do not invent parallelism in product code

One implementer applies `specs/suggested-credit-client/spec.md`. A verifier Cloud Agent records baseline (1 failed / 29 passed) then checks the PR; it does not author tests.

## Risks / Trade-offs

- [Editing routes listed on LY-6 would hide the real bug] → Spec and tasks allow only the selector file.
- [Green suite by editing the test] → Forbidden; the path assertion must pass because the client changed.
- [Treating $400 as a new catalog price] → Claim remains 40000 cents; Scale remains 24900 cents.

## Migration Plan

1. Apply the selector change on a branch from `main`.
2. Confirm `npm test` is green without touching the protected test.
3. Confirm `http://127.0.0.1:43173/disputes/dsp_1043` shows `$249.00`.
4. Open a PR with `Resolves LY-6`. Do not merge. Roll back by reverting the one-line selector if needed.
