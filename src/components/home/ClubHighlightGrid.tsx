import { Link } from "react-router-dom";
import { featuredClubs } from "../../data/clubs";

export default function ClubHighlightGrid() {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>先看看正在招新的校园热门选择</h2>
      </div>
      <div className="card-grid">
        {featuredClubs.map((club) => (
          <article key={club.id} className="club-card" style={{ borderTopColor: club.color }}>
            <div className="club-meta">
              <span className="status-pill">{club.status === "open" ? "招新开放中" : "即将截止"}</span>
              <span>{club.tags.slice(0, 2).join(" · ")}</span>
            </div>
            <h3>{club.name}</h3>
            <p>{club.slogan}</p>
            <div className="mini-tags">
              {club.tags.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link to={`/clubs/${club.id}`} className="inline-link">
              查看详情
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
