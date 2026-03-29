import { describe, expect, it } from "vitest";
import { clubs } from "../data/clubs";
import { buildProfileFromTags, getRecommendations } from "./matching";

describe("matching", () => {
  it("returns ranked recommendations for selected tags", () => {
    const profile = buildProfileFromTags(["摄影", "创作", "交朋友"]);
    const recommendations = getRecommendations(profile, clubs);

    expect(recommendations).toHaveLength(5);
    expect(recommendations[0].score).toBeGreaterThanOrEqual(recommendations[1].score);
  });
});
