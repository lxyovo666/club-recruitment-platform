import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClubCard from "../components/clubs/ClubCard";
import ClubFilters from "../components/clubs/ClubFilters";
import { clubs } from "../data/clubs";
import { filterClubs } from "../utils/filtering";

export default function ClubExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const visibleClubs = useMemo(() => filterClubs(clubs, { query, category, tags: selectedTags }), [query, category, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <main className="page">
      <ClubFilters
        query={query}
        category={category}
        selectedTags={selectedTags}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onTagToggle={toggleTag}
      />
      <section className="entry-strip">
        <p>共找到 {visibleClubs.length} 个社团。你也可以直接用当前标签去生成智能推荐。</p>
        <button
          type="button"
          className="secondary-button"
          disabled={selectedTags.length === 0}
          onClick={() => navigate("/results", { state: { selectedTags } })}
        >
          用当前标签生成推荐
        </button>
      </section>
      <section className="card-grid">
        {visibleClubs.length > 0 ? (
          visibleClubs.map((club) => <ClubCard key={club.id} club={club} />)
        ) : (
          <article className="panel empty-card">
            <h2>暂时没有符合条件的社团</h2>
            <p>可以清空筛选重新看看，或者直接做 AI 测评让系统帮你推荐。</p>
          </article>
        )}
      </section>
    </main>
  );
}
