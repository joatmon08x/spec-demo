## 1. Implementation

- [x] 1.1 From `specs/suggested-credit-client/spec.md`, set the suggested-credit client to v2 in `lib/disputes/suggested-credit-api.ts` only; verify `npx vitest run tests/suggested-credit-api.test.ts tests/suggested-credit-routes.test.ts` passes without editing those test files, the seed, either API route, or the $400 claim

## 2. Verification

- [x] 2.1 Record clean-main baseline (1 failed / 29 passed), then on the implementation branch confirm both routes still exist, `dsp_1043` still stores a 40000-cent claim, suggested credit is 24900 cents, catalog remains $49 / $99 / $249, and `npm test` is fully green without editing `tests/suggested-credit-api.test.ts`
- [x] 2.2 Open `http://127.0.0.1:43173/disputes/dsp_1043` and verify the panel shows Suggested credit `$249.00` sourced from API v2
- [ ] 2.3 Open one product PR whose body includes `Resolves LY-6`; do not merge and do not archive this OpenSpec change
