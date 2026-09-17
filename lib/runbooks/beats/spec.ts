import type { DemoSection } from "@/lib/runbooks/types";

export const RUNBOOK_SECTIONS_SPEC = [
  {
    id: "design",
    title: "Design with OpenSpec",
    beats: [
      {
        id: "pull-linear-issue",
        title: "Pull live Linear issue",
        promptType: "reusable",
        detail:
          "Load the selected Linear issue and fill every workflow placeholder. Keep <ISSUE_ID> in Backlog until implementation starts. Do not invent a fourth catalog price.",
        example:
          "/ask Using Linear MCP, fetch <ISSUE_ID> (<ISSUE_TITLE>) from project openspec (https://linear.app/anysphere/project/openspec-05fc3d7dba89). Fill <ACCEPTANCE>, <PATHS>, <VERIFICATION_STEPS>, and <PROTECTED_CONSTRAINTS>. Keep <CHANGE_ID> empty until /opsx-propose creates it. Do not edit product code.",
      },
      {
        id: "reproduce-worked-example",
        title: "Optional worked example: reproduce LY-6 baseline",
        promptType: "reusable",
        detail:
          "Worked example only — when the selected issue is LY-6. Confirm the demo baseline before any OpenSpec work. The $400 claim is valid input; Scale stays $249. Use this beat to fill the reusable placeholder contract.",
        example:
          "Worked example (LY-6): Open http://127.0.0.1:43173/disputes/dsp_1043. Confirm the page still selects suggested-credit v1 and shows $400.00. Confirm npm test fails only in tests/suggested-credit-api.test.ts because the client still selects v1. Do not migrate the client. Placeholder fill: <ISSUE_ID>=LY-6; <ISSUE_TITLE>=Dispute dsp_1043 claims $400 against a $249 Scale invoice; <CHANGE_ID>=the accepted change id created by /opsx-propose; <ACCEPTANCE>=client selects v2, claim stays $400, Scale cap $249, both routes remain, protected test untouched; <PATHS>=lib/disputes/suggested-credit-api.ts; <VERIFICATION_STEPS>=confirm v2 client path, both routes, $400 claim, $249 UI result, and green suite; <PROTECTED_CONSTRAINTS>=do not edit the protected test, seed, claim, catalog, or either route.",
      },
      {
        id: "opsx-explore",
        title: "Explore with /opsx-explore",
        promptType: "reusable",
        detail:
          "Start spec work with OpenSpec explore for the selected issue. Do not use Cursor Plan mode or /plan.",
        example:
          "/opsx-explore <ISSUE_ID> <ISSUE_TITLE>. Acceptance: <ACCEPTANCE>. Catalog only Starter $49, Growth $99, Scale $249. Do not invent a fourth price.",
      },
      {
        id: "opsx-propose",
        title: "Propose with /opsx-propose",
        promptType: "reusable",
        detail:
          "Write proposal, design, delta specs, and tasks under openspec/changes/<id>/. Planning artifacts only — no product code yet.",
        example:
          "/opsx-propose For <ISSUE_ID> (<ISSUE_TITLE>), propose an OpenSpec change that satisfies <ACCEPTANCE>. Catalog only Starter $49, Growth $99, Scale $249. Do not implement product code in this step.",
      },
      {
        id: "opsx-review",
        title: "Review the OpenSpec change",
        promptType: "reusable",
        detail:
          "Confirm the change is accepted before any Cloud Agent applies product code.",
        example:
          "/ask Review the active OpenSpec change for <ISSUE_ID> (<ISSUE_TITLE>). Confirm proposal, design, delta specs, and tasks exist. Confirm the product edits match <ACCEPTANCE> and do not weaken protected regression tests named by the change. Do not implement yet.",
      },
      {
        id: "opsx-validate",
        title: "Validate strictly",
        promptType: "reusable",
        detail: "Gate implementation on a successful strict OpenSpec validation.",
        example:
          "Run `npx openspec validate --changes --strict` and `npx openspec list`. Report whether the <ISSUE_ID> change passes. Do not start /opsx-apply until validation succeeds.",
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
          "One Cloud Agent owns the product changes named by the accepted OpenSpec change and the product PR. Starting ref main on joatmon08x/spec-demo.",
        example: `You are the implementation Cloud Agent for <ISSUE_ID> (<ISSUE_TITLE>) on https://github.com/joatmon08x/spec-demo (startingRef main). Linear project: https://linear.app/anysphere/project/openspec-05fc3d7dba89 (team LY).

Work only from accepted OpenSpec change <CHANGE_ID>. Apply <ACCEPTANCE> by editing only <PATHS>. Preserve <PROTECTED_CONSTRAINTS>. Catalog only Starter $49, Growth $99, Scale $249.

Move <ISSUE_ID> to In Progress. Push a PR whose body includes Resolves <ISSUE_ID>. Do not merge. Do not archive the OpenSpec change.`,
        pasteLabel: "Paste to Cloud Agent",
      },
      {
        id: "launch-verifier",
        title: "Launch the verifier Cloud Agent",
        promptType: "reusable",
        detail:
          "A second Cloud Agent owns independent baseline and acceptance evidence on the same PR and Linear issue. Do not invent parallel test-authoring work.",
        example: `You are the verifier Cloud Agent for <ISSUE_ID> (<ISSUE_TITLE>) on https://github.com/joatmon08x/spec-demo. Linear issue: <ISSUE_ID>.

Work from accepted OpenSpec change <CHANGE_ID>. Do not edit product code or weaken protected regression tests named by that change. Independently verify the implementation PR against <ACCEPTANCE>:

<VERIFICATION_STEPS>

Confirm <PROTECTED_CONSTRAINTS>.

Comment evidence on the PR and on <ISSUE_ID>. Do not merge.`,
        pasteLabel: "Paste to Cloud Agent",
      },
      {
        id: "confirm-partition",
        title: "Confirm partitioned ownership",
        promptType: "none",
        detail:
          "Implementation owns the product edit and PR. Verification owns evidence only. Both agents share the same accepted specification; neither weakens protected regression tests named by the change.",
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
          "/autopilot Watch the open PR for <ISSUE_ID> (body includes Resolves <ISSUE_ID>). Refresh CI and check status each pass. Handle conflicts before comments before CI. Stop on ambiguous intent. Do not merge.",
      },
      {
        id: "bugbot-gate",
        title: "Require Cursor Bugbot",
        promptType: "adaptable",
        detail:
          "BugBot is a status check, not a human approving review. If entitlement or admin access is missing, record the exact prerequisite — never invent a passed check.",
        example:
          "On the <ISSUE_ID> PR, confirm the Cursor Bugbot status check ran. If BugBot is unavailable, report the exact Cursor entitlement or GitHub administration prerequisite and use the manual review fallback. Do not claim BugBot passed without evidence.",
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
        example: `You are the closeout Cloud Agent for <ISSUE_ID> (<ISSUE_TITLE>) on https://github.com/joatmon08x/spec-demo (startingRef main after the merge). Linear issue: <ISSUE_ID>.

1. Pull latest main.
2. Verify <ACCEPTANCE> on updated main.
3. Run issue-specific checks:
<VERIFICATION_STEPS>
4. Confirm <PROTECTED_CONSTRAINTS>.
5. Comment merge SHA and verification evidence on <ISSUE_ID>.
6. Move <ISSUE_ID> to the existing Done state.
7. Archive or sync OpenSpec change <CHANGE_ID> only if the runbook or operator explicitly directs it. Do not invent that instruction.`,
        pasteLabel: "Paste to Cloud Agent",
      },
      {
        id: "issue-done",
        title: "Confirm issue Done",
        promptType: "reusable",
        detail:
          "Finish the lifecycle only when Linear shows Done and the comment carries merge plus verification evidence.",
        example:
          "/ask Using Linear MCP, confirm <ISSUE_ID> is Done, read the closeout comment for merge and verification evidence, and confirm <ACCEPTANCE> still holds on main. Do not reopen product work.",
      },
    ],
  },
] as const satisfies readonly DemoSection[];
