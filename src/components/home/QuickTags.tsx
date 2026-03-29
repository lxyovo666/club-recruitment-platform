import { tagGroups } from "../../data/tags";

interface QuickTagsProps {
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export default function QuickTags({ selectedTags, onToggle }: QuickTagsProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <span className="eyebrow">快速模式</span>
        <h2>先选几个标签，马上开始匹配</h2>
        <p>不想做完整测评也没关系，点选你在意的方向、能力和目标即可。</p>
      </div>
      <div className="tag-groups">
        {tagGroups.map((group) => (
          <div key={group.title} className="tag-group">
            <p>{group.title}</p>
            <div className="tag-list">
              {group.tags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    className={active ? "tag active" : "tag"}
                    onClick={() => onToggle(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
