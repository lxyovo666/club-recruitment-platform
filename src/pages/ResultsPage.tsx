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
          <p>这个结果页会展示你的画像总结、Top 5 推荐社团以及每个推荐背后的解释。</p>
          <div className="hero-actions">
            <Link to="/quiz" className="primary-button">
              去做 AI 测评
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
          <span className="eyebrow">推荐逻辑</span>
          <h2>系统会优先考虑你的兴趣标签、参与节奏和成长目标</h2>
        </div>
        <div className="report-points">
          <div>
            <strong>先看前 3 个</strong>
            <p>这是当前与你匹配度最高、最值得优先点击的社团。</p>
          </div>
          <div>
            <strong>重点看推荐理由</strong>
            <p>每张卡片都解释了推荐依据，不只是给一个分数。</p>
          </div>
        </div>
      </section>
      <section className="results-header">
        <div>
          <span className="eyebrow">Top 5 推荐</span>
          <h2>这些社团最值得你优先点进去看</h2>
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
