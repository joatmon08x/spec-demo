## Why

LY-6 (`Dispute dsp_1043 claims $400 against a $249 Scale invoice`) fails because the suggested-credit UI client still selects deprecated v1, which returns the raw $400 claim. v2 already caps at the Scale catalog price of $249. Operators cannot trust the suggested credit on `dsp_1043` until the client uses v2.

## What Changes

- Switch the suggested-credit client selector from v1 to v2 so `SuggestedCredit` loads `/api/v2/disputes/*/suggested-credit`.
- Keep the `$400` claim on `dsp_1043` as valid input against INV-1043 (Scale $249). After the switch, the live suggestion MUST be 24900 cents.
- Leave both v1 and v2 route implementations in place. Do not edit `tests/suggested-credit-api.test.ts` to force green.

## Capabilities

### New Capabilities

- `suggested-credit-client`: Client selection of the current suggested-credit API version, including the LY-6 worked example for `dsp_1043`.

### Modified Capabilities

None. Durable specs under `openspec/specs/` do not yet describe suggested-credit client selection.

## Non-goals

- Changing catalog prices. Catalog remains Starter $49, Growth $99, Scale $249.
- Editing `prisma/seed.ts` or "correcting" the 40000-cent claim on `dsp_1043`.
- Removing or rewriting `/api/v1/disputes/[id]/suggested-credit` or `/api/v2/disputes/[id]/suggested-credit`.
- Editing `tests/suggested-credit-api.test.ts` or adding a second red suite.
- Wiring Accept/Decline on the dispute page.

## Impact

- Product edit: `lib/disputes/suggested-credit-api.ts` only (`SUGGESTED_CREDIT_API_VERSION` `"v1"` → `"v2"`).
- Observable UI: `http://127.0.0.1:43173/disputes/dsp_1043` shows suggested credit `$249.00` from API `v2`.
- Tests: `tests/suggested-credit-api.test.ts` stays untouched and becomes green because the path matches v2. Route tests stay green.
- Linear: implementation PR body includes `Resolves LY-6`. Do not merge or archive in this change's apply step.
