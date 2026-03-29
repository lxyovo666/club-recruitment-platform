import { clubs } from "../data/clubs";
import type { Club, ClubCategory, ClubTrait, Goal, Recommendation, UserPreferenceProfile } from "../types";

const tagInterestMap: Record<string, ClubCategory[]> = {
  编程: ["tech"],
  摄影: ["media", "arts"],
  街舞: ["arts"],
  辩论: ["social"],
  志愿服务: ["public-service"],
  音乐: ["arts"],
  篮球: ["sports"],
  动漫: ["social"],
};

const tagTraitMap: Record<string, ClubTrait[]> = {
  表达: ["expression"],
  组织: ["leadership"],
  创作: ["creative"],
  技术: ["tech"],
  策划: ["leadership", "creative"],
  运营: ["leadership", "teamwork"],
  比赛导向: ["competition"],
  社交导向: ["teamwork"],
  固定训练: ["competition", "teamwork"],
};

const tagGoalMap: Record<string, Goal[]> = {
  交朋友: ["friends"],
  提升技能: ["skill"],
  丰富履历: ["resume"],
  参加比赛: ["competition"],
  释放兴趣: ["fun"],
  比赛导向: ["competition"],
  社交导向: ["friends"],
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function buildProfileFromTags(selectedTags: string[], preferredIntensity?: UserPreferenceProfile["preferredIntensity"]): UserPreferenceProfile {
  const interests = unique(selectedTags.flatMap((tag) => tagInterestMap[tag] ?? []));
  const traits = unique(selectedTags.flatMap((tag) => tagTraitMap[tag] ?? []));
  const goals = unique(selectedTags.flatMap((tag) => tagGoalMap[tag] ?? []));

  return {
    interests,
    traits,
    goals,
    preferredIntensity: preferredIntensity ?? (selectedTags.includes("固定训练") ? "high" : selectedTags.includes("轻量参与") ? "light" : "medium"),
    selectedTags,
  };
}

export function buildProfileFromQuiz(answers: { tags: string[]; intensity?: UserPreferenceProfile["preferredIntensity"] }[]) {
  const selectedTags = unique(answers.flatMap((answer) => answer.tags));
  const preferredIntensity = answers.find((answer) => answer.intensity)?.intensity;
  return buildProfileFromTags(selectedTags, preferredIntensity);
}

function buildReason(profile: UserPreferenceProfile, club: Club, matchedTags: string[]) {
  const reasons = [
    matchedTags.length > 0 ? `你选择的 ${matchedTags.slice(0, 3).join("、")} 与社团方向高度一致` : "",
    club.intensity === profile.preferredIntensity ? "活动节奏和你期待的投入强度相符" : "",
    club.goals.some((goal) => profile.goals.includes(goal)) ? "它能提供你更看重的成长收益" : "",
  ].filter(Boolean);

  return reasons.join("，") || `${club.name}在活动风格和参与体验上与你的偏好较为接近。`;
}

export function getRecommendations(profile: UserPreferenceProfile, clubList: Club[] = clubs): Recommendation[] {
  return clubList
    .map((club) => {
      let score = 35 * Number(profile.interests.includes(club.category));
      score += club.traits.filter((trait) => profile.traits.includes(trait)).length * 16;
      score += club.goals.filter((goal) => profile.goals.includes(goal)).length * 14;
      score += 12 * Number(club.intensity === profile.preferredIntensity);

      const matchedTags = club.tags.filter((tag) => profile.selectedTags.includes(tag));
      score += matchedTags.length * 10;

      return {
        club,
        score,
        matchedTags,
        reason: buildReason(profile, club, matchedTags),
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);
}

export function summarizePersona(profile: UserPreferenceProfile) {
  const keywords = profile.selectedTags.slice(0, 3).join("、") || "探索型";
  const intensityText =
    profile.preferredIntensity === "high" ? "愿意稳定投入" : profile.preferredIntensity === "light" ? "偏好轻量参与" : "希望保持适中的参与节奏";

  return `你更偏向 ${keywords}，${intensityText}，并期待在大学里找到既有兴趣连接、又能带来成长反馈的社团。`;
}
