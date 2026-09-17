import { RUNBOOK_SECTIONS_SPEC } from "@/lib/runbooks/beats/spec";
import type { DemoSection, DemoTrack } from "@/lib/runbooks/types";

export const RUNBOOK_TRACKS = [
  {
    id: "spec" as const,
    title: "Spec",
    description:
      "Design LY-6 with OpenSpec, partition Cloud Agent implementation and verification, gate merge on BugBot, CI, and human approval, then close the issue from updated main.",
    sections: RUNBOOK_SECTIONS_SPEC,
  },
] as const satisfies readonly {
  id: DemoTrack;
  title: string;
  description: string;
  sections: readonly DemoSection[];
}[];

export type RunbookTrack = (typeof RUNBOOK_TRACKS)[number];

export function getRunbookTrack(track: string): RunbookTrack | undefined {
  return RUNBOOK_TRACKS.find((entry) => entry.id === track);
}
