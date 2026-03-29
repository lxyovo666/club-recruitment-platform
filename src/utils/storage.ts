import type { Recommendation, UserPreferenceProfile } from "../types";

const PROFILE_KEY = "club-match-profile";
const RESULT_KEY = "club-match-results";

export function saveSession(profile: UserPreferenceProfile, recommendations: Recommendation[]) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  localStorage.setItem(RESULT_KEY, JSON.stringify(recommendations));
}

export function readSession() {
  const profile = localStorage.getItem(PROFILE_KEY);
  const recommendations = localStorage.getItem(RESULT_KEY);

  return {
    profile: profile ? (JSON.parse(profile) as UserPreferenceProfile) : null,
    recommendations: recommendations ? (JSON.parse(recommendations) as Recommendation[]) : [],
  };
}
