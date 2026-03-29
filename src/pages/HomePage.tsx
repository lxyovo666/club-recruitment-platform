import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClubHighlightGrid from "../components/home/ClubHighlightGrid";
import QuickTags from "../components/home/QuickTags";

export default function HomePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  return (
    <main className="page home-page">
      <section className="hero hero-refined">
        <div className="hero-copy">
          <span className="eyebrow">社团招新</span>
          <h1>找社团，不用一个个翻</h1>
          <p>先看看哪些社团更适合你，或者直接去逛一逛正在招新的社团。</p>
          <div className="hero-actions">
            <Link to="/quiz" className="primary-button">
              看看适合我的社团
            </Link>
            <Link to="/clubs" className="secondary-button">
              先逛逛社团
            </Link>
          </div>
        </div>
        <div className="hero-visual hero-panel">
          <div className="flow-card">
            <span className="eyebrow">开始之前</span>
            <ol className="flow-list">
              <li>做个简单匹配，看看推荐结果</li>
              <li>或者直接浏览你感兴趣的社团</li>
              <li>点进详情页看看活动和招新要求</li>
              <li>找到喜欢的就直接报名</li>
            </ol>
          </div>
          <div className="floating-card subtle">
            <p>当前可看</p>
            <strong>12 个社团</strong>
            <span>可以直接浏览、筛选，也可以先做匹配再看</span>
          </div>
        </div>
      </section>

      <section className="path-grid">
        <article className="panel path-card">
          <span className="eyebrow">不知道怎么选</span>
          <h2>不知道该选哪个社团</h2>
          <p>回答几道简单问题，我们会先帮你缩小范围。</p>
          <Link to="/quiz" className="primary-button">
            去做测评
          </Link>
        </article>
        <article className="panel path-card">
          <span className="eyebrow">已经有方向</span>
          <h2>已经有兴趣方向</h2>
          <p>直接按分类、关键词和标签筛你想看的社团。</p>
          <Link to="/clubs" className="secondary-button">
            去社团广场
          </Link>
        </article>
      </section>

      <QuickTags selectedTags={selectedTags} onToggle={toggleTag} />
      <section className="entry-strip compact-strip">
        <div>
          <span className="eyebrow">按兴趣找</span>
          <h2>已经知道自己喜欢什么，就直接选标签看看</h2>
        </div>
        <button type="button" className="primary-button" onClick={() => navigate("/results", { state: { selectedTags } })} disabled={selectedTags.length === 0}>
          用已选标签开始匹配
        </button>
      </section>

      <ClubHighlightGrid />

      <section className="value-row">
        <article className="value-card">
          <strong>少走弯路</strong>
          <p>不用从一堆社团里盲选，先从更适合你的开始看。</p>
        </article>
        <article className="value-card">
          <strong>信息更集中</strong>
          <p>社团介绍、招新状态和报名入口都能在这里看到。</p>
        </article>
        <article className="value-card">
          <strong>看到喜欢就能报</strong>
          <p>从浏览到报名不用来回找入口，整个过程更顺。</p>
        </article>
      </section>
    </main>
  );
}
