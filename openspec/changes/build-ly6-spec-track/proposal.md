## Why

Ledgerly's separate 101 and 201 runbooks do not present the complete spec-driven workflow that the `spec-demo` repository is meant to demonstrate. The demo needs one reusable path for any selected Linear issue, from intake through OpenSpec design, partitioned Cloud Agent execution, guarded PR review, human merge, and post-merge issue closure. LY-6 remains the worked example.

## What Changes

- **BREAKING**: Replace the `101` and `201` runbook track identifiers with one `spec` track and redirect legacy track URLs.
- Define four ordered sections for designing, implementing, reviewing, and closing any selected Linear issue.
- Provide copy-ready Cloud Agent roles for implementation, independent verification, PR supervision, and post-merge Linear closeout.
- Document BugBot as a required status check that is separate from a human approval.
- Remove obsolete curriculum-only staging, plugin, and local multitask assets.
- Preserve LY-6 in Backlog and the planted v1 client baseline so the worked example remains repeatable.

## Capabilities

### New Capabilities

- `spec-demo-runbook`: Defines the reusable single spec-driven demo track, its lifecycle, navigation, parameterized prompts, and completion gates.
- `cloud-review-lifecycle`: Defines issue-agnostic partitioned Cloud Agent responsibilities, PR/BugBot review gates, human merge, and Linear closeout behavior.

### Modified Capabilities

None.

## Non-goals

- Migrating the suggested-credit client from v1 to v2 as part of this repository cleanup.
- Removing either suggested-credit API route, changing the valid $400 claim, editing the seed, or changing catalog prices.
- Running implementation agents for any issue or moving LY-6 out of Backlog while authoring the worked example.
- Treating BugBot as a human approving reviewer or simulating a successful external check.

## Impact

- Runbook data, routes, rendering, and tests under `lib/runbooks/`, `app/runbooks/`, `app/api/runbooks/`, `components/`, and `tests/`.
- Presenter and agent guidance in `README.md`, `demo-howto.md`, `AGENTS.md`, `.cursor/`, and `openspec/`.
- Cursor BugBot automation and GitHub branch rules for `joatmon08x/spec-demo`, subject to available administrative access and entitlement.
