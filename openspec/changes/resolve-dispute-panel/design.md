# Design

## Context

See proposal.md for why. The seam is already sketched and agrees on a body of `{ action: "accept" | "decline", reviewerNote?: string }`:

- `lib/disputes/resolve.ts` throws and returns `Promise<never>`. It already imports `planPriceCents` and `suggestDisputeCredit`.
- `app/api/disputes/[id]/resolve/route.ts` rejects any other action with 400 and maps a thrown helper to 501.
- `app/disputes/[id]/page.tsx` is a server component. Accept and Decline are disabled. The reviewer note textarea is unbound. `SuggestedCredit` is a separate client fetch.

Statuses already exist: `OPEN`, `NEEDS_REVIEW`, `ACCEPTED`, `DECLINED` (`lib/status.ts`). `dsp_1050` is seeded `ACCEPTED` with a note. There is no `RESOLVED` status. The seed writes `suggestedCreditCents` through `suggestDisputeCredit`, so `dsp_1043` already stores 24900 cents against a 40000-cent claim.

## Goals / Non-Goals

**Goals:**

- One server-side cap, computed from the dispute and its invoice, so the panel cannot submit the $400 figure the v1 widget shows.
- Persist status and an optional note with the existing columns.
- Enable the two buttons only for `OPEN` and `NEEDS_REVIEW`.

**Non-Goals:**

- A new column, a new status, or a change to `prisma/seed.ts`.
- Touching `lib/disputes/suggested-credit-api.ts` or either suggested-credit route.
- Server Actions. The repo's mutation pattern here is a client component that fetches.

## Decisions

### Reuse `suggestedCreditCents` on accept

Accept writes `suggestDisputeCredit({ disputedAmountCents, planPriceCents })` back into `suggestedCreditCents`. For `dsp_1043` that is 24900 cents, the same number the seed already stored. Decline does not write the column.

Alternative: add `issuedCreditCents`. Rejected. Nothing asks to issue less than the suggestion, and a migration would put the seed in scope.

### Refuse a second decision with 409

If status is `ACCEPTED` or `DECLINED`, the helper throws a typed error and the route returns 409 without writing. The panel hides both buttons for those statuses.

Alternative: last write wins. Rejected. A double-click in the demo would rewrite a settled dispute.

### Client panel posts, then refreshes

A client component owns the note, both buttons, and the POST. On success it calls `router.refresh()` so the server page re-reads status, note, and the open-dispute count. The page stays a server component and passes the current status down so the buttons render disabled for a settled dispute before any click.

### Note is optional

Empty or omitted `reviewerNote` leaves the stored note unchanged. A non-empty note replaces it on either action.

## Risks / Trade-offs

- [A new passing helper test moves the suite off 1 failed / 33 passed] → Update every doc the sync rule names in the same implementation. Do not edit `tests/suggested-credit-api.test.ts`.
- [Accepting `dsp_1043` drops the open-dispute count from 4 to 3] → Expected. `npm run demo:reset` reseeds.
- [The page still shows $400 from v1 next to a button that stores $249] → Intentional. The spec keeps the client request unchanged.
- [Filter pills write `state` while list pages read `status`] → Out of this change. Do not edit `components/filter-pills.tsx`.

## Migration Plan

No schema change and no data backfill. Rollback is reverting the three files and the new test. Settled rows written during a demo are cleared by reseed.

## Open Questions

None. The status names, the cap, and the no-schema choice are fixed by the existing code and the proposal.
