## Purpose

Defines a repeatable runbook that demonstrates the complete LY-6 spec-driven delivery lifecycle without consuming the planted bug before the presentation.

## ADDED Requirements

### Requirement: Single spec track
The runbook catalog SHALL expose one canonical track named `spec` and SHALL route the catalog entry point and retired curriculum URLs to that track.

#### Scenario: Open the runbook catalog
- **GIVEN** the demo application is running
- **WHEN** the operator opens `/runbooks`
- **THEN** the application displays the `spec` track at `/runbooks/spec`

#### Scenario: Open a retired curriculum URL
- **GIVEN** an operator has a saved 101 or 201 runbook URL
- **WHEN** the operator opens that URL
- **THEN** the application redirects to `/runbooks/spec`

### Requirement: Ordered delivery lifecycle
The spec track SHALL present design, partitioned Cloud Agent implementation, guarded PR merge, and Linear closeout as four ordered sections with copy-ready prompts.

#### Scenario: Follow the demo from start to finish
- **GIVEN** LY-6 is in Backlog and the suggested-credit client selects v1
- **WHEN** the operator follows each section in order
- **THEN** every beat needed to design, implement, review, merge, and close LY-6 is available without consulting the retired tracks

### Requirement: Demo-ready baseline
Repository cleanup SHALL preserve the valid 40000-cent dispute claim, the 24900-cent Scale catalog cap, both suggested-credit routes, and the intentionally failing client migration test.

#### Scenario: Verify the shipped baseline
- **GIVEN** the runbook cleanup is complete
- **WHEN** the operator runs the full test suite before the LY-6 demo
- **THEN** the sole expected failure shows that the client still selects v1
- **AND** the v1 and v2 route tests continue to pass
