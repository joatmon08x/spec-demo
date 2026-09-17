import type { DemoSection } from "@/lib/runbooks/types";

export const RUNBOOK_SECTIONS_SPEC = [
  {
    id: "design",
    title: "Design with OpenSpec",
    beats: [
      {
        id: "pull-ly6",
        title: "Pull live LY-6",
        promptType: "reusable",
        detail:
          "Load the live Linear issue. Keep LY-6 in Backlog until implementation starts. Do not invent a fourth catalog price.",
        example:
          "/ask Using Linear MCP, fetch LY-6 from project openspec (https://linear.app/anysphere/project/openspec-05fc3d7dba89). Summarize title, status, acceptance, and paths. Do not edit product code.",
      },
      {
        id: "reproduce-v1",
        title: "Reproduce the planted failure",
        promptType: "reusable",
        detail:
          "Confirm the demo baseline before any OpenSpec work. The $400 claim is valid input; Scale stays $249.",
        example:
          "Open http://127.0.0.1:43173/disputes/dsp_1043. Confirm the page still selects suggested-credit v1 and shows $400.00. Confirm npm test fails only in tests/suggested-credit-api.test.ts because the client still selects v1. Do not migrate the client. Do not edit that test or the seed.",
      },
      {
        id: "opsx-explore",
        title: "Explore with /opsx-explore",
        promptType: "reusable",
        detail:
          "Start spec work with OpenSpec explore. Do not use Cursor Plan mode or /plan for this issue.",
        example:
          "/opsx-explore LY-6 Dispute dsp_1043 claims $400 against a $249 Scale invoice. Root cause is lib/disputes/suggested-credit-api.ts still selecting deprecated v1. Preserve the $400 claim, both suggested-credit routes, and tests/suggested-credit-api.test.ts. Catalog only Starter $49, Growth $99, Scale $249.",
      },
      {
        id: "opsx-propose",
        title: "Propose with /opsx-propose",
        promptType: "reusable",
        detail:
          "Write proposal, design, delta specs, and tasks under openspec/changes/<id>/. Planning artifacts only — no product code yet.",
        example:
          "/opsx-propose For LY-6, propose an OpenSpec change that migrates SUGGESTED_CREDIT_API_VERSION from v1 to v2 in lib/disputes/suggested-credit-api.ts only. Preserve both API routes, the $400 claim on dsp_1043, the $249 Scale cap, and the regression test. Do not implement product code in this step.",
      },
      {
        id: "opsx-review",
        title: "Review the OpenSpec change",
        promptType: "reusable",
        detail:
          "Confirm the change is accepted before any Cloud Agent applies product code.",
        example:
          "/ask Review the active OpenSpec change for LY-6. Confirm proposal, design, delta specs, and tasks exist. Confirm the product edit is limited to selecting suggested-credit v2 and does not weaken tests/suggested-credit-api.test.ts. Do not implement yet.",
      },
      {
        id: "opsx-validate",
        title: "Validate strictly",
        promptType: "reusable",
        detail: "Gate implementation on a successful strict OpenSpec validation.",
        example:
          "Run `npx openspec validate --changes --strict` and `npx openspec list`. Report whether the LY-6 change passes. Do not start /opsx-apply until validation succeeds.",
      },
    ],
  },
  {
    id: "implement",
    title: "Partitioned Cloud implementation",
    beats: [
      {
        id: "launch-implementer",
        title: "Launch the implementation Cloud Agent",
        promptType: "reusable",
        detail:
          "One Cloud Agent owns the isolated v1-to-v2 selector change and the product PR. Starting ref main on joatmon08x/spec-demo.",
        example: `You are the LY-6 implementation Cloud Agent on https://github.com/joatmon08x/spec-demo (startingRef main). Linear project: https://linear.app/anysphere/project/openspec-05fc3d7dba89 (team LY).

Work only from the accepted OpenSpec change for LY-6. Apply the product edit: set SUGGESTED_CREDIT_API_VERSION to "v2" in lib/disputes/suggested-credit-api.ts. Preserve both v1 and v2 suggested-credit routes. Do not edit tests/suggested-credit-api.test.ts. Do not correct the $400 claim on dsp_1043. Catalog only Starter $49, Growth $99, Scale $249.

Move LY-6 to In Progress. Push a PR whose body includes Resolves LY-6. Do not merge. Do not archive the OpenSpec change.`,
        pasteLabel: "Paste to Cloud Agent",
      },
      {
        id: "launch-verifier",
        title: "Launch the verifier Cloud Agent",
        promptType: "reusable",
        detail:
          "A second Cloud Agent owns independent baseline and acceptance evidence on the same PR and Linear issue. Do not invent parallel test-authoring work.",
        example: `You are the LY-6 verifier Cloud Agent on https://github.com/joatmon08x/spec-demo. Linear issue: LY-6.

Do not edit product code or tests/suggested-credit-api.test.ts. Independently verify the implementation PR against the accepted OpenSpec change and LY-6 acceptance:

1. Confirm the client selects /api/v2/disputes/*/suggested-credit.
2. Confirm dsp_1043 still stores a $400 claim against INV-1043 (Scale $249).
3. Confirm v1 and v2 routes remain.
4. Run npm test and record the result.
5. Open http://127.0.0.1:43173/disputes/dsp_1043 and confirm suggested credit shows $249.00.

Comment evidence on the PR and on LY-6. Do not merge.`,
        pasteLabel: "Paste to Cloud Agent",
      },
      {
        id: "confirm-partition",
        title: "Confirm partitioned ownership",
        promptType: "none",
        detail:
          "Implementation owns the selector edit and PR. Verification owns evidence only. Both agents share the same accepted specification; neither weakens the protected regression test.",
      },
    ],
  },
  {
    id: "review-merge",
    title: "Guarded PR review and merge",
    beats: [
      {
        id: "watch-ci",
        title: "Watch CI on the PR",
        promptType: "reusable",
        detail:
          "CI is a required check. Refresh live PR state; do not claim green without evidence.",
        example:
          "/autopilot Watch the open LY-6 PR. Refresh CI and check status each pass. Handle conflicts before comments before CI. Stop on ambiguous intent. Do not merge.",
      },
      {
        id: "bugbot-gate",
        title: "Require Cursor Bugbot",
        promptType: "adaptable",
        detail:
          "BugBot is a status check, not a human approving review. If entitlement or admin access is missing, record the exact prerequisite — never invent a passed check.",
        example:
          "On the LY-6 PR, confirm the Cursor Bugbot status check ran. If BugBot is unavailable, report the exact Cursor entitlement or GitHub administration prerequisite and use the manual review fallback. Do not claim BugBot passed without evidence.",
      },
      {
        id: "human-approval",
        title: "Collect human approval",
        promptType: "none",
        detail:
          "At least one human approving review is required and is distinct from BugBot. A different authorized reviewer must approve Cloud Agent PRs when branch rules demand one approval.",
      },
      {
        id: "operator-merge",
        title: "Operator merges",
        promptType: "none",
        detail:
          "Only the operator merges after CI, verifier evidence, BugBot (or documented fallback), and human approval are satisfied. Agents never merge.",
      },
    ],
  },
  {
    id: "closeout",
    title: "Post-merge closeout",
    beats: [
      {
        id: "launch-closeout",
        title: "Launch the closeout Cloud Agent",
        promptType: "reusable",
        detail:
          "Closeout starts after merge, from updated main. It cannot run in parallel with implementation.",
        example: `You are the LY-6 closeout Cloud Agent on https://github.com/joatmon08x/spec-demo (startingRef main after the merge). Linear issue: LY-6.

1. Pull latest main.
2. Confirm the client selects suggested-credit v2.
3. Confirm dsp_1043 still claims $400 against Scale $249 and the UI shows suggested credit $249.00.
4. Confirm both suggested-credit routes remain and tests/suggested-credit-api.test.ts was not weakened.
5. Comment merge SHA and verification evidence on LY-6.
6. Move LY-6 to the existing Done state.
7. Archive or sync the OpenSpec change only if the runbook or operator explicitly directs it. Do not invent that instruction.`,
        pasteLabel: "Paste to Cloud Agent",
      },
      {
        id: "ly6-done",
        title: "Confirm LY-6 Done",
        promptType: "reusable",
        detail:
          "Finish the lifecycle only when Linear shows Done and the comment carries merge plus verification evidence.",
        example:
          "/ask Using Linear MCP, confirm LY-6 is Done, read the closeout comment for merge and verification evidence, and confirm suggested-credit still selects v2 on main. Do not reopen product work.",
      },
    ],
  },
] as const satisfies readonly DemoSection[];
