import { Link } from "react-router-dom";
import ClubHighlightGrid from "../components/home/ClubHighlightGrid";

export default function HomePage() {
  return (
    <main className="page home-page">
      <section className="path-grid path-grid-hero">
        <article className="panel path-card path-card-compact">
          <span className="path-label">还没想好</span>
          <h2>先测一测</h2>
          <p>回答几道简单问题，先看看哪些社团更适合你。</p>
          <Link to="/quiz" className="primary-button">
            去做测评
          </Link>
        </article>
        <article className="panel path-card path-card-compact">
          <span className="path-label">已经有方向</span>
          <h2>直接去逛</h2>
          <p>按分类、关键词和标签筛你感兴趣的社团。</p>
          <Link to="/clubs" className="secondary-button">
            去社团广场
          </Link>
        </article>
      </section>

      <ClubHighlightGrid />
    </main>
  );
}
