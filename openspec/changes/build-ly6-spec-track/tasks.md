## 1. Spec Track

- [x] 1.1 Implement the reusable single `spec` catalog, routes, page, legacy redirects, and exact four-section beat sequence from `specs/spec-demo-runbook/spec.md`; verify focused runbook tests pass
- [x] 1.2 Rewrite presenter and repository guidance for the issue-agnostic `/runbooks/spec` workflow while keeping LY-6 as the worked example; verify no semantic 101/201 curriculum references remain

## 2. Cloud Review Lifecycle

- [x] 2.1 Add parameterized implementation, verifier, PR-watch, and closeout Cloud Agent instructions from `specs/cloud-review-lifecycle/spec.md`; verify strict OpenSpec validation passes
- [x] 2.2 Attempt BugBot automation and GitHub branch-rule setup from `specs/cloud-review-lifecycle/spec.md`; verify the observed configuration or document the exact blocker without simulating success

## 3. Cleanup

- [x] 3.1 Remove obsolete curriculum-only staging, plugin, and local multitask assets from `specs/spec-demo-runbook/spec.md`; verify tracked files and tests contain no stale references

## 4. Verification

- [x] 4.1 Run focused tests, full tests, lint, and build; verify the only expected baseline failure is the unchanged v1 migration test
- [x] 4.2 Manually verify `/runbooks/spec`, legacy redirects, and the four-section flow in the browser; capture walkthrough evidence
- [x] 4.3 Run `ledgerly-reviewer` on the combined diff and resolve all in-scope findings
