# OpenSpec end-to-end spec track

Repo: [joatmon08x/spec-demo](https://github.com/joatmon08x/spec-demo). Linear: [openspec](https://linear.app/anysphere/project/openspec-05fc3d7dba89) (team `LY`). Start from **`main`**.

## What you show at `/runbooks/spec`

1. App on **43173**: `dsp_1043` suggested credit **$400** from v1 vs Scale **$249**.
2. Linear Backlog: [LY-6](https://linear.app/anysphere/issue/LY-6), [LY-7](https://linear.app/anysphere/issue/LY-7), [LY-8](https://linear.app/anysphere/issue/LY-8).
3. `/opsx-explore` (not `/plan`) → `/opsx-propose` → strict validation.
4. Partitioned Cloud Agents: implementation owns the product PR with `Resolves LY-6`; verification owns independent evidence.
5. `/autopilot` watches CI and `Cursor Bugbot`; a separate human approves and the operator merges.
6. A closeout Cloud Agent verifies updated `main`, comments evidence on LY-6, and moves it Done.

Spawn details: [sdk-kickoff.md](sdk-kickoff.md).

Catalog: Starter **$49**, Growth **$99**, Scale **$249**. Do not correct the $400 claim. Do not edit `tests/suggested-credit-api.test.ts` to force green. BugBot is a status check, not a human approval; do not claim it passed unless the check is present.
