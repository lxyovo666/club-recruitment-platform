import { Link, useParams } from "react-router-dom";
import { clubs } from "../data/clubs";

export default function ClubDetailPage() {
  const { clubId } = useParams();
  const club = clubs.find((item) => item.id === clubId);

  if (!club) {
    return (
      <main className="page">
        <section className="panel empty-card">
          <h1>未找到对应社团</h1>
          <p>你可以回到社团广场重新看看其他社团。</p>
          <Link to="/clubs" className="primary-button">
            返回社团广场
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="panel detail-hero" style={{ borderTopColor: club.color }}>
        <div>
          <h1>{club.name}</h1>
          <p>{club.summary}</p>
          <div className="mini-tags">
            {club.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="detail-side">
          <strong>{club.status === "open" ? "当前开放招新" : "招新即将截止"}</strong>
          <p>{club.recruitInfo}</p>
          <Link to={`/apply/${club.id}`} className="primary-button">
            立即报名
          </Link>
        </div>
      </section>
      <section className="detail-grid">
        <article className="panel">
          <h2>这个社团更适合谁</h2>
          <p>{club.suitableFor}</p>
        </article>
        <article className="panel">
          <h2>加入后可以参加这些活动</h2>
          <ul className="detail-list">
            {club.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h2>大概需要投入多少时间</h2>
          <p>{club.intensity === "high" ? "需要稳定训练或长期投入" : club.intensity === "medium" ? "保持规律参与即可" : "适合轻量参与"}</p>
        </article>
        <article className="panel">
          <h2>招新安排</h2>
          <p>{club.status === "open" ? "当前处于开放招新阶段，提交意向后可进入后续面试或试训安排。" : "当前已接近截止，建议尽快查看并提交报名意向。"}</p>
        </article>
      </section>
    </main>
  );
}
