import { Link } from "react-router-dom";
import type { Recommendation } from "../../types";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const { club, score, matchedTags, reason } = recommendation;

  return (
    <article className="recommendation-card panel" style={{ borderTopColor: club.color }}>
      <div className="club-meta">
        <span className="status-pill">匹配度 {Math.min(score, 98)}%</span>
        <span>{club.name}</span>
      </div>
      <h2>{club.slogan}</h2>
      <p>{reason}</p>
      <div className="mini-tags">
        {matchedTags.length > 0
          ? matchedTags.map((tag) => <span key={tag}>{tag}</span>)
          : club.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="card-actions">
        <Link to={`/clubs/${club.id}`} className="inline-link">
          查看详情
        </Link>
        <Link to={`/apply/${club.id}`} className="ghost-link">
          立即报名
        </Link>
      </div>
    </article>
  );
}
