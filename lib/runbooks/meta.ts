/**
 * Grok Build runbooks as they appear on /runbooks and in the README.
 * The spec track is shipped; its beats are the source of truth.
 */

export * from "@/lib/runbooks/types";
export { RUNBOOK_SECTIONS_SPEC } from "@/lib/runbooks/beats/spec";
export { PROJECT_AGENTS, PROJECT_SKILLS } from "@/lib/runbooks/agents";
export { RUNBOOK_TRACKS, getRunbookTrack, type RunbookTrack } from "@/lib/runbooks/tracks";
export {
  runbookBeatSequence,
  runbookBeats,
  runbookSectionHref,
  runbookTrackHref,
} from "@/lib/runbooks/catalog";
