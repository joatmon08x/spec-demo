# Tasks

## 1. Parallel, file-disjoint

- [ ] 1.1 Implement `resolveDispute` in `lib/disputes/resolve.ts` per `specs/dispute-resolution/spec.md`: load the dispute and invoice, refuse `ACCEPTED` and `DECLINED` without writing, set `ACCEPTED` and store `suggestDisputeCredit` on accept, set `DECLINED` without changing the stored credit on decline, and save a reviewer note only when one is submitted. Verify by calling it for `dsp_1043` and reading the row back: status `ACCEPTED`, stored credit 24900 cents, disputed amount still 40000 cents. Do not add a test file in this task.
- [ ] 1.2 Map `app/api/disputes/[id]/resolve/route.ts` onto the helper per `specs/dispute-resolution/spec.md`: keep 400 for an action other than accept or decline, return 409 when the helper refuses a settled dispute, and return the updated dispute on success. Verify with one `curl` each for 400, 409, and a successful accept. Do not add a test file in this task.
- [ ] 1.3 Enable the Resolution panel on `app/disputes/[id]/page.tsx` per `specs/dispute-resolution/spec.md`: a client control posts `{ action, reviewerNote }` to `POST /api/disputes/{id}/resolve`, refreshes the page on success, and shows Accept and Decline only while the status is `OPEN` or `NEEDS_REVIEW`. Leave `SuggestedCredit` and both suggested-credit routes unchanged. Verify on `http://127.0.0.1:43173/disputes/dsp_1043` that both buttons are enabled and the suggested-credit figure is still the current client's.

## 2. Sequential after the three files

- [ ] 2.1 Add the helper and route tests from 1.1 and 1.2 in one test pass (not a parallel worker), then update every doc that cites **1 failed / 33 passed** so the count matches `npm test`. Verify `npm test` shows the planted `tests/suggested-credit-api.test.ts` failure and no new failure.
- [ ] 2.2 On `http://127.0.0.1:43173/disputes/dsp_1043`, accept with a note and verify the status is Accepted, the note is stored, and the disputed amount is still $400. Then decline a different open dispute and verify its status is Declined and a second decision is refused. Verify `npm run demo:reset` restores both rows.
