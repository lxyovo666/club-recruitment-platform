export type ClubCategory =
  | "tech"
  | "arts"
  | "sports"
  | "media"
  | "public-service"
  | "social";

export type ClubIntensity = "light" | "medium" | "high";

export type ClubTrait =
  | "expression"
  | "tech"
  | "teamwork"
  | "creative"
  | "competition"
  | "leadership";

export type Goal = "friends" | "skill" | "resume" | "competition" | "fun";

export interface Club {
  id: string;
  name: string;
  category: ClubCategory;
  summary: string;
  slogan: string;
  tags: string[];
  traits: ClubTrait[];
  goals: Goal[];
  intensity: ClubIntensity;
  status: "open" | "closing-soon";
  suitableFor: string;
  activities: string[];
  recruitInfo: string;
  color: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  helper: string;
  options: {
    label: string;
    value: string;
    tags: string[];
    intensity?: ClubIntensity;
  }[];
}

export interface UserPreferenceProfile {
  interests: ClubCategory[];
  traits: ClubTrait[];
  goals: Goal[];
  preferredIntensity: ClubIntensity;
  selectedTags: string[];
}

export interface Recommendation {
  club: Club;
  score: number;
  matchedTags: string[];
  reason: string;
}
