import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page">
      <section className="panel empty-card">
        <span className="eyebrow">404</span>
        <h1>页面走丢了</h1>
        <p>回到首页重新开始匹配，或者直接去社团广场浏览。</p>
        <div className="hero-actions">
          <Link to="/" className="primary-button">
            返回首页
          </Link>
          <Link to="/clubs" className="secondary-button">
            去社团广场
          </Link>
        </div>
      </section>
    </main>
  );
}
