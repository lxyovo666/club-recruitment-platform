import { describe, expect, it } from "vitest";
import { clubs } from "../data/clubs";
import { filterClubs } from "./filtering";

describe("filterClubs", () => {
  it("matches clubs by query and tag", () => {
    const results = filterClubs(clubs, { query: "摄影", category: "all", tags: ["创作"] });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("camera-lab");
  });
});
