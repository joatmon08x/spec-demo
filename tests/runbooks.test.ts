import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  RUNBOOK_SECTIONS_SPEC,
  RUNBOOK_TRACKS,
  runbookBeatSequence,
  runbookBeats,
} from "@/lib/runbooks/meta";

const root = process.cwd();
const beats = runbookBeats("spec");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("spec runbook catalog", () => {
  it("ships one canonical spec track", () => {
    expect(RUNBOOK_TRACKS).toHaveLength(1);
    expect(RUNBOOK_TRACKS[0]).toMatchObject({
      id: "spec",
      title: "Spec",
    });
    expect(RUNBOOK_TRACKS[0].description).toContain(
      "Design any selected Linear issue with OpenSpec",
    );
    expect(RUNBOOK_TRACKS[0].description).toContain("LY-6 is the worked example");
  });

  it("orders the four delivery sections", () => {
    expect(RUNBOOK_SECTIONS_SPEC.map((section) => section.id)).toEqual([
      "design",
      "implement",
      "review-merge",
      "closeout",
    ]);
    expect(RUNBOOK_SECTIONS_SPEC.map((section) => section.title)).toEqual([
      "Design with OpenSpec",
      "Partitioned Cloud implementation",
      "Guarded PR review and merge",
      "Post-merge closeout",
    ]);
  });

  it("keeps the exact issue-agnostic beat sequence", () => {
    expect(beats.map((beat) => beat.id)).toEqual([
      "pull-linear-issue",
      "reproduce-worked-example",
      "opsx-explore",
      "opsx-propose",
      "opsx-review",
      "opsx-validate",
      "launch-implementer",
      "launch-verifier",
      "confirm-partition",
      "watch-ci",
      "bugbot-gate",
      "human-approval",
      "operator-merge",
      "launch-closeout",
      "issue-done",
    ]);
    expect(runbookBeatSequence("spec")).toBe(
      "Pull live Linear issue → Worked example: reproduce LY-6 baseline → Explore with /opsx-explore → Propose with /opsx-propose → Review the OpenSpec change → Validate strictly → Launch the implementation Cloud Agent → Launch the verifier Cloud Agent → Confirm partitioned ownership → Watch CI on the PR → Require Cursor Bugbot → Collect human approval → Operator merges → Launch the closeout Cloud Agent → Confirm issue Done",
    );
  });

  it("encodes the OpenSpec and protected-baseline gates", () => {
    const beat = (id: string) => beats.find((entry) => entry.id === id);

    expect(beat("pull-linear-issue")?.example).toContain("Linear MCP");
    expect(beat("pull-linear-issue")?.example).toContain("<ISSUE_ID>");
    expect(beat("pull-linear-issue")?.example).toContain("<ISSUE_TITLE>");
    expect(beat("pull-linear-issue")?.example).toContain("<ACCEPTANCE>");
    expect(beat("reproduce-worked-example")?.title).toContain("Worked example");
    expect(beat("reproduce-worked-example")?.example).toContain("dsp_1043");
    expect(beat("reproduce-worked-example")?.example).toContain("LY-6");
    expect(beat("opsx-explore")?.example).toContain("/opsx-explore");
    expect(beat("opsx-explore")?.example).toContain("<ISSUE_ID>");
    expect(beat("opsx-explore")?.example).toContain("<ACCEPTANCE>");
    expect(beat("opsx-propose")?.example).toContain("/opsx-propose");
    expect(beat("opsx-propose")?.example).toContain("<ISSUE_ID>");
    expect(beat("opsx-validate")?.example).toContain("validate --changes --strict");
    expect(beat("launch-implementer")?.example).toContain("Resolves <ISSUE_ID>");
    expect(beat("launch-implementer")?.example).toContain("<ACCEPTANCE>");
    expect(beat("launch-implementer")?.example).not.toContain("dsp_1043");
    expect(beat("launch-implementer")?.example).not.toContain(
      'SUGGESTED_CREDIT_API_VERSION to "v2"',
    );
    expect(beat("launch-verifier")?.example).toContain("Do not edit product code");
    expect(beat("launch-verifier")?.example).toContain("<VERIFICATION>");
    expect(beat("launch-verifier")?.example).toContain("<ACCEPTANCE>");
    expect(beat("launch-verifier")?.example).not.toContain("dsp_1043");
    expect(beat("watch-ci")?.example).toContain("<ISSUE_ID>");
    expect(beat("watch-ci")?.example).not.toContain("LY-6");
    expect(beat("bugbot-gate")?.detail).toContain("not a human approving review");
    expect(beat("bugbot-gate")?.example).toContain("<ISSUE_ID>");
    expect(beat("operator-merge")?.detail).toContain("Only the operator merges");
    expect(beat("launch-closeout")?.example).toContain(
      "Move <ISSUE_ID> to the existing Done state",
    );
    expect(beat("launch-closeout")?.example).toContain("<VERIFICATION>");
    expect(beat("launch-closeout")?.example).not.toContain("dsp_1043");
    expect(beat("issue-done")?.example).toContain("<ISSUE_ID>");
    expect(beat("issue-done")?.example).toContain("<ACCEPTANCE>");
    expect(beats.every((entry) => entry.promptType !== undefined)).toBe(true);
  });

  it("keeps documentation and project guidance on the spec track", () => {
    const files = [
      "README.md",
      "demo-howto.md",
      "AGENTS.md",
      ".cursor/rules/ledgerly.mdc",
      ".cursor/skills/choose-cursor-workflow/SKILL.md",
      ".cursor/skills/hand-to-cloud-agent/SKILL.md",
    ].map(read);

    for (const contents of files) {
      expect(contents).toContain("/runbooks/spec");
      expect(contents).not.toContain("/runbooks/101");
      expect(contents).not.toContain("/runbooks/201");
      expect(contents).not.toContain("stage-linear-201");
    }
  });

  it("keeps source-of-truth and lifecycle references aligned", () => {
    expect(read("AGENTS.md")).toContain("lib/runbooks/meta.ts");
    expect(read(".cursor/rules/ledgerly.mdc")).toContain("lib/runbooks/meta.ts");
    expect(read("demo-howto.md")).toContain("Cursor Bugbot");
    expect(read("demo-howto.md")).toContain("human approval");
    expect(read("openspec/sdk-kickoff.md")).toContain("Closeout");
    expect(read(".cursor/skills/reset-demo-state/SKILL.md")).toContain("1 failed / 29 passed");
  });
});
