## Purpose

Defines issue-agnostic handoffs and review gates for partitioned Cloud Agent work, BugBot review, human approval, merge, and Linear closure.

## ADDED Requirements

### Requirement: OpenSpec gates implementation
The workflow SHALL require `/opsx-explore` and `/opsx-propose` to produce an accepted OpenSpec change before any Cloud Agent applies product code for the selected Linear issue.

#### Scenario: Start implementation
- **GIVEN** an issue is selected from Linear
- **WHEN** the operator prepares Cloud Agent work
- **THEN** the change has proposal, design, delta specs, tasks, and a successful strict validation

### Requirement: Partitioned Cloud Agent roles
The workflow SHALL assign issue-specific implementation and independent acceptance verification to separate Cloud Agents operating from the same accepted specification.

#### Scenario: Launch partitioned work
- **GIVEN** the OpenSpec change is accepted
- **WHEN** the operator launches the Cloud Agents
- **THEN** the implementation agent owns the product changes named by the issue and one product PR
- **AND** the verification agent owns baseline and acceptance evidence without weakening the protected regression test

### Requirement: Review gates remain distinct
The workflow SHALL present the `Cursor Bugbot` status check and at least one human approving review as distinct merge gates for the selected issue's PR.

#### Scenario: Review a product PR
- **GIVEN** the implementation PR includes `Resolves <ISSUE_ID>`
- **WHEN** automated and human review completes
- **THEN** the operator can see CI, verifier evidence, BugBot output, and a human approval before merging

#### Scenario: BugBot cannot be enabled
- **GIVEN** the repository lacks the required Cursor entitlement or GitHub administration access
- **WHEN** setup is attempted
- **THEN** the runbook reports the exact prerequisite and does not claim that BugBot passed

### Requirement: Human-controlled merge and agent closeout
The workflow SHALL reserve merge authority for the operator and SHALL use a post-merge Cloud Agent to verify `main`, record evidence, and move the selected Linear issue to Done.

#### Scenario: Close a merged issue
- **GIVEN** the operator merged the approved PR
- **WHEN** the closeout Cloud Agent verifies the updated `main`
- **THEN** it comments the merge and verification evidence on the selected issue
- **AND** it moves that issue to the existing Done state
- **AND** it archives or syncs the OpenSpec change only as directed by the runbook
