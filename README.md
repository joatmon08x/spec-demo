# Ledgerly

Fictional B2B billing operations for the Fieldnote Workspace. Avery Quinn is the operator. The only catalog prices are Starter **$49**, Growth **$99**, and Scale **$249**. All customer data is synthetic.

This repository demonstrates one end-to-end **spec track**: take Linear issue [LY-6](https://linear.app/anysphere/issue/LY-6) from Backlog through OpenSpec design, partitioned Cloud Agent implementation and verification, guarded PR review, human merge, and post-merge Linear closeout.

Copy-ready beats live at `/runbooks/spec`. The presenter run-of-show is `demo-howto.md`.

## Run

```bash
npm i
npx prisma generate
npx prisma db seed
npm run dev
```

Open [http://localhost:43173](http://localhost:43173).

The clean demo baseline is **1 failed / 29 passed**. `tests/suggested-credit-api.test.ts` is intentionally red because the client still selects deprecated v1. On `dsp_1043`, v1 returns the valid $400 claim; v2 and the stored credit cap at the $249 Scale price. The LY-6 demo fixes the client selection without changing the claim, seed, test, or either API route.

## Spec track

1. **Design with OpenSpec** — fetch LY-6 from Linear, reproduce the planted failure, run `/opsx-explore`, run `/opsx-propose`, review the artifacts, and validate strictly.
2. **Partitioned Cloud implementation** — one agent owns the v1-to-v2 selector and product PR; a second agent owns independent acceptance evidence.
3. **Guarded PR review and merge** — watch CI and `Cursor Bugbot`, collect a separate human approval, then let the operator merge.
4. **Post-merge closeout** — a Cloud Agent verifies updated `main`, comments evidence on LY-6, and moves it to Done.

The OpenSpec sequence is mandatory:

```text
/opsx-explore → /opsx-propose → /opsx-apply
```

Do not use Cursor Plan mode for spec-driven work. Do not archive or sync an OpenSpec change unless the operator asks.

## Review gates

BugBot is a status check, not a human approving review. The intended `main` rules are:

- Require a pull request.
- Require the observed `Cursor Bugbot` status check.
- Require one approving review from a different authorized human.
- Keep merge authority with the operator.

The current Cloud Agent credential does not have `admin` or `maintain` permission on `joatmon08x/spec-demo`; the branch-protection API returns 403. A Cursor-entitled repository administrator must enable the repository in **Cursor Dashboard → BugBot Automations**, open a safe PR so `Cursor Bugbot` appears, then add that check and one approval to the `main` ruleset. Until that is complete, the demo uses the documented manual-review fallback and must not claim BugBot passed.

## Key files

| Surface | Path |
| --- | --- |
| Runbook source | `lib/runbooks/meta.ts`, `lib/runbooks/beats/spec.ts` |
| Presenter script | `demo-howto.md` |
| OpenSpec workflow | `openspec/README.md`, `openspec/sdk-kickoff.md` |
| Cloud handoff | `.cursor/skills/hand-to-cloud-agent/SKILL.md` |
| Review agents | `.cursor/agents/ledgerly-reviewer.md`, `.cursor/agents/dispute-verifier.md` |
| Linear backlog | Project `openspec`, issues LY-6 through LY-8 |

## Guardrails

- Prices come from `lib/plans.ts`; never invent another tier.
- Customer names come from `prisma/seed.ts` and `prisma/extra-accounts.ts`.
- Preserve both suggested-credit routes.
- Do not edit `tests/suggested-credit-api.test.ts` to make the demo green.
- Do not correct the $400 dispute claim.
- The unfinished dispute resolution stub remains out of scope.
