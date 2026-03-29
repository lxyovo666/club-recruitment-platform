import { tagGroups } from "../../data/tags";

interface QuickTagsProps {
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export default function QuickTags({ selectedTags, onToggle }: QuickTagsProps) {
  return (
    <div>
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
    </div>
  );
}
