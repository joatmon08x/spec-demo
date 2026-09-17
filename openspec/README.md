# OpenSpec end-to-end spec track

Repo: [joatmon08x/spec-demo](https://github.com/joatmon08x/spec-demo). Linear: [openspec](https://linear.app/anysphere/project/openspec-05fc3d7dba89) (team `LY`). Start from **`main`**.

## What you show at `/runbooks/spec`

1. App on **43173**: `dsp_1043` suggested credit **$400** from v1 vs Scale **$249**.
2. Select any Linear Backlog issue; [LY-6](https://linear.app/anysphere/issue/LY-6) is the worked example, with LY-7 and LY-8 available for another run.
3. `/opsx-explore` (not `/plan`) → `/opsx-propose` → strict validation.
4. Partitioned Cloud Agents: implementation owns the product PR with `Resolves <ISSUE_ID>`; verification owns independent evidence.
5. `/autopilot` watches CI and `Cursor Bugbot`; a separate human approves and the operator merges.
6. A closeout Cloud Agent verifies updated `main`, comments evidence on the selected issue, and moves it Done.

Spawn details: [sdk-kickoff.md](sdk-kickoff.md).

Catalog: Starter **$49**, Growth **$99**, Scale **$249**. Do not correct the $400 claim. Do not edit `tests/suggested-credit-api.test.ts` to force green. BugBot is a status check, not a human approval; do not claim it passed unless the check is present.
