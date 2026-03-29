import type { UserPreferenceProfile } from "../../types";
import { summarizePersona } from "../../utils/matching";

interface PersonaSummaryProps {
  profile: UserPreferenceProfile;
}

export default function PersonaSummary({ profile }: PersonaSummaryProps) {
  return (
    <section className="panel persona-panel">
      <span className="eyebrow">AI 为你总结</span>
      <h1>你的社团画像已经生成</h1>
      <p>{summarizePersona(profile)}</p>
      <div className="mini-tags">
        {profile.selectedTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </section>
  );
}
