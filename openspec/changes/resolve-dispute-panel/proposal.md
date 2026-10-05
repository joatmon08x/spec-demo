# Proposal

## Why

Avery Quinn can see a suggested credit on a dispute but cannot accept or decline it. The Resolution panel, the resolve route, and `resolveDispute` are an unfinished seam, so a review stops at a disabled button.

## What Changes

- Enable Accept credit and Decline on the dispute Resolution panel.
- Persist the decision through the existing `POST /api/disputes/{id}/resolve` route and `resolveDispute`.
- On accept, store a credit capped at the invoice's catalog plan price. On decline, store no credit.
- Record an optional reviewer note with the decision.

## Capabilities

### New Capabilities

- `dispute-resolution`: An operator can accept or decline an open dispute from its page, with the issued credit capped at the catalog plan price.

### Modified Capabilities

None. `openspec list --specs` is empty.

## Non-goals

- Migrating the suggested-credit client off deprecated v1, or changing either suggested-credit route.
- Editing `tests/suggested-credit-api.test.ts`, the seed, or the $400 claim on `dsp_1043`.
- Changing catalog prices (Starter $49, Growth $99, Scale $249) or adding a schema column.
- Renaming the FilterPills query key.

## Impact

- `lib/disputes/resolve.ts`, `app/api/disputes/[id]/resolve/route.ts`, and the Resolution panel on `app/disputes/[id]/page.tsx`.
- Dispute status moves between the existing values `OPEN`, `NEEDS_REVIEW`, `ACCEPTED`, and `DECLINED`. Accepting an open dispute lowers the open-dispute count shown in the nav and on the dashboard.
- A new passing test for the helper changes the shipped suite count, which the docs that cite **1 failed / 33 passed** must follow in the same implementation.
