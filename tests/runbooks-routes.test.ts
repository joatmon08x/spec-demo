import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";
import { GET as getRunbookCatalog } from "@/app/api/runbooks/route";
import { GET as getRunbookTrack } from "@/app/api/runbooks/[track]/route";
import { generateStaticParams as generateTrackParams } from "@/app/runbooks/[track]/page";
import { RUNBOOK_TRACKS, runbookSectionHref, runbookTrackHref } from "@/lib/runbooks/meta";

const request = new Request("http://localhost/api/runbooks");
const trackParams = (track: string) => ({ params: Promise.resolve({ track }) });

describe("runbooks API", () => {
  it("lists one spec track with section links", async () => {
    const response = await getRunbookCatalog();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.tracks.map((track: { id: string }) => track.id)).toEqual(["spec"]);
    expect(body.tracks[0].href).toBe("/runbooks/spec");
    expect(body.tracks[0].sections.map((section: { id: string }) => section.id)).toEqual([
      "design",
      "implement",
      "review-merge",
      "closeout",
    ]);
    for (const section of body.tracks[0].sections) {
      expect(section.href).toBe(`/runbooks/spec#${section.id}`);
    }
  });

  it("returns the spec track with beats", async () => {
    const response = await getRunbookTrack(request, trackParams("spec"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBe("spec");
    expect(body.href).toBe("/runbooks/spec");
    expect(body.sections[0].beats[0].id).toBe("pull-ly6");
    expect(body.sections.at(-1).beats.at(-1).id).toBe("ly6-done");
  });

  it.each(["101", "201", "advanced", "bogus"])(
    "returns 404 for retired or unknown track %s",
    async (track) => {
      const response = await getRunbookTrack(request, trackParams(track));
      expect(response.status).toBe(404);
      await expect(response.json()).resolves.toEqual({ error: "Track not found" });
    },
  );
});

describe("runbooks redirects", () => {
  it("sends legacy URLs to the spec track", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const sources = [
      "/workflows",
      "/workflows/:slug",
      "/analysis",
      "/analysis/:path*",
      "/runbooks/advanced",
      "/runbooks/commands",
      "/runbooks/commands/:slug",
      "/runbooks/101",
      "/runbooks/201",
    ];

    for (const source of sources) {
      expect(redirects).toContainEqual({
        source,
        destination: "/runbooks/spec",
        permanent: false,
      });
    }
  });
});

describe("runbooks catalog hrefs", () => {
  it("builds spec track and section links", () => {
    expect(runbookTrackHref("spec")).toBe("/runbooks/spec");
    expect(runbookSectionHref("spec", "design")).toBe("/runbooks/spec#design");
  });
});

describe("runbooks page routes", () => {
  it("prebuilds only the spec track", () => {
    expect(generateTrackParams()).toEqual([{ track: "spec" }]);
    expect(RUNBOOK_TRACKS.map((track) => track.id)).toEqual(["spec"]);
  });
});
