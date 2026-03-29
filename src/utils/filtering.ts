import type { Club } from "../types";

export interface FilterState {
  query: string;
  category: string;
  tags: string[];
}

export function filterClubs(clubList: Club[], filters: FilterState) {
  const query = filters.query.trim().toLowerCase();

  return clubList.filter((club) => {
    const matchQuery =
      query.length === 0 ||
      club.name.toLowerCase().includes(query) ||
      club.summary.toLowerCase().includes(query) ||
      club.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchCategory = filters.category === "all" || club.category === filters.category;
    const matchTags = filters.tags.length === 0 || filters.tags.every((tag) => club.tags.includes(tag));

    return matchQuery && matchCategory && matchTags;
  });
}
