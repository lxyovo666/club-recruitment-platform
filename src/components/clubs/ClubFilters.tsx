import { allTags } from "../../data/tags";

interface ClubFiltersProps {
  query: string;
  category: string;
  selectedTags: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagToggle: (tag: string) => void;
}

const categories = [
  { value: "all", label: "全部" },
  { value: "tech", label: "学术科技" },
  { value: "arts", label: "文艺创作" },
  { value: "sports", label: "体育竞技" },
  { value: "media", label: "媒体传播" },
  { value: "public-service", label: "公益实践" },
  { value: "social", label: "社交兴趣" },
];

export default function ClubFilters({
  query,
  category,
  selectedTags,
  onQueryChange,
  onCategoryChange,
  onTagToggle,
}: ClubFiltersProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h1>直接浏览，也能快速找到方向</h1>
        <p>支持关键词、分类和标签筛选，适合已经有明确兴趣的新生。</p>
      </div>
      <div className="filters">
        <input
          type="search"
          value={query}
          placeholder="搜索社团、标签或关键词"
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="tag-list">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={selectedTags.includes(tag)}
            className={selectedTags.includes(tag) ? "tag active" : "tag"}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
