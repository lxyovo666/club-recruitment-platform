import { Link } from "react-router-dom";
import type { Club } from "../../types";

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <article className="club-card club-card-dense" style={{ borderTopColor: club.color }}>
      <div className="club-meta">
        <span className="status-pill">{club.status === "open" ? "招新开放中" : "即将截止"}</span>
        <span>{club.intensity === "high" ? "高投入" : club.intensity === "medium" ? "中投入" : "轻量参与"}</span>
      </div>
      <h3>{club.name}</h3>
      <p>{club.summary}</p>
      <div className="mini-tags">
        {club.tags.slice(0, 5).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
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
