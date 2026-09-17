## Purpose

Defines how Ledgerly chooses the current suggested-credit API so dispute operators see a catalog-capped suggestion without changing the claim, seed, or catalog.

## ADDED Requirements

### Requirement: Client selects suggested-credit v2
The suggested-credit client SHALL request `/api/v2/disputes/{disputeId}/suggested-credit` for every dispute detail view.

#### Scenario: Path uses v2
- **GIVEN** a dispute identifier of `dsp_1043`
- **WHEN** the client builds the suggested-credit request path
- **THEN** the path is `/api/v2/disputes/dsp_1043/suggested-credit`

#### Scenario: Dispute page loads v2
- **GIVEN** the demo app is running on port 43173
- **WHEN** an operator opens `http://127.0.0.1:43173/disputes/dsp_1043`
- **THEN** the suggested-credit panel shows `$249.00`
- **AND** the source version is `v2`

### Requirement: Catalog cap applies without changing the claim
For `dsp_1043` the live suggested credit MUST be 24900 cents (Scale $249). The stored claim MUST remain 40000 cents against INV-1043. Catalog prices MUST remain Starter $49, Growth $99, and Scale $249.

#### Scenario: Claim stays $400
- **GIVEN** seeded dispute `dsp_1043` against INV-1043 on Scale
- **WHEN** suggested credit is loaded after the client selects v2
- **THEN** the dispute still stores a 40000-cent claim
- **AND** the suggested amount is 24900 cents
- **AND** no fourth catalog price exists

#### Scenario: Stored seed credit stays capped
- **GIVEN** the existing seed for `dsp_1043`
- **WHEN** the client migration is applied
- **THEN** the seed file is unchanged
- **AND** the recorded seed suggested credit remains 24900 cents

### Requirement: Compatibility routes and protected regression stay
The system MUST keep both suggested-credit HTTP routes. Implementers MUST NOT edit `tests/suggested-credit-api.test.ts` to force a green suite.

#### Scenario: Both routes remain
- **GIVEN** the client now selects v2
- **WHEN** a caller requests `/api/v1/disputes/dsp_1043/suggested-credit`
- **THEN** the v1 response still returns 40000 cents with `apiVersion` `v1`
- **AND** `/api/v2/disputes/dsp_1043/suggested-credit` still returns 24900 cents with `apiVersion` `v2`

#### Scenario: Protected test is not rewritten
- **GIVEN** `tests/suggested-credit-api.test.ts` expects the v2 path
- **WHEN** the client selects v2
- **THEN** that test file is unmodified
- **AND** the full suite has no remaining expected failure from this client mismatch
