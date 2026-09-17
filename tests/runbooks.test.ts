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
    expect(RUNBOOK_TRACKS[0].description).toContain("Design LY-6 with OpenSpec");
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

  it("keeps the exact LY-6 beat sequence", () => {
    expect(beats.map((beat) => beat.id)).toEqual([
      "pull-ly6",
      "reproduce-v1",
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
      "ly6-done",
    ]);
    expect(runbookBeatSequence("spec")).toBe(
      "Pull live LY-6 → Reproduce the planted failure → Explore with /opsx-explore → Propose with /opsx-propose → Review the OpenSpec change → Validate strictly → Launch the implementation Cloud Agent → Launch the verifier Cloud Agent → Confirm partitioned ownership → Watch CI on the PR → Require Cursor Bugbot → Collect human approval → Operator merges → Launch the closeout Cloud Agent → Confirm LY-6 Done",
    );
  });

  it("encodes the OpenSpec and protected-baseline gates", () => {
    const beat = (id: string) => beats.find((entry) => entry.id === id);

    expect(beat("pull-ly6")?.example).toContain("Linear MCP");
    expect(beat("opsx-explore")?.example).toContain("/opsx-explore LY-6");
    expect(beat("opsx-propose")?.example).toContain("/opsx-propose");
    expect(beat("opsx-validate")?.example).toContain("validate --changes --strict");
    expect(beat("launch-implementer")?.example).toContain("Resolves LY-6");
    expect(beat("launch-implementer")?.example).toContain('SUGGESTED_CREDIT_API_VERSION to "v2"');
    expect(beat("launch-verifier")?.example).toContain("Do not edit product code");
    expect(beat("launch-verifier")?.example).toContain("tests/suggested-credit-api.test.ts");
    expect(beat("bugbot-gate")?.detail).toContain("not a human approving review");
    expect(beat("operator-merge")?.detail).toContain("Only the operator merges");
    expect(beat("launch-closeout")?.example).toContain("Move LY-6 to the existing Done state");
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
