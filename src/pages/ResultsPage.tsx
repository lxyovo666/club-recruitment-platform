import { Link, useLocation } from "react-router-dom";
import PersonaSummary from "../components/results/PersonaSummary";
import RecommendationCard from "../components/results/RecommendationCard";
import { clubs } from "../data/clubs";
import type { Recommendation, UserPreferenceProfile } from "../types";
import { buildProfileFromTags, getRecommendations } from "../utils/matching";
import { readSession, saveSession } from "../utils/storage";

interface ResultState {
  selectedTags?: string[];
  profile?: UserPreferenceProfile;
  recommendations?: Recommendation[];
}

export default function ResultsPage() {
  const { state } = useLocation();
  const routeState = (state as ResultState | null) ?? {};
  const cached = readSession();

  const profile = routeState.profile ?? (routeState.selectedTags ? buildProfileFromTags(routeState.selectedTags) : cached.profile);
  const recommendations = routeState.recommendations ?? (profile ? getRecommendations(profile, clubs) : cached.recommendations);

  if (!profile || recommendations.length === 0) {
    return (
      <main className="page">
        <section className="panel empty-card">
          <span className="eyebrow">还没有匹配结果</span>
          <h1>先完成测评，或者挑选一些标签再回来</h1>
          <p>做完之后，这里会帮你整理出值得优先看的社团。</p>
          <div className="hero-actions">
            <Link to="/quiz" className="primary-button">
              去做测评
            </Link>
            <Link to="/" className="secondary-button">
              返回首页选标签
            </Link>
          </div>
        </section>
      </main>
    );
  }

  saveSession(profile, recommendations);

  return (
    <main className="page">
      <PersonaSummary profile={profile} />
      <section className="panel report-panel">
        <div>
          <span className="eyebrow">可以先这样看</span>
          <h2>先点前几个更适合你的社团，再决定要不要报名</h2>
        </div>
        <div className="report-points">
          <div>
            <strong>先看前 3 个</strong>
            <p>这几个和你的兴趣、参与方式会更贴近一些。</p>
          </div>
          <div>
            <strong>重点看推荐理由</strong>
            <p>每张卡片都会告诉你，为什么会推荐这个社团。</p>
          </div>
        </div>
      </section>
      <section className="results-header">
        <div>
          <span className="eyebrow">Top 5 推荐</span>
          <h2>这些社团你可以先点进去看看</h2>
        </div>
        <Link to="/clubs" className="secondary-button">
          继续浏览全部社团
        </Link>
      </section>
      <section className="results-grid">
        {recommendations.map((item) => (
          <RecommendationCard key={item.club.id} recommendation={item} />
        ))}
      </section>
    </main>
  );
}
