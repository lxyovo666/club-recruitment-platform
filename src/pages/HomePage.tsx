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
          <span className="eyebrow">高校社团招新平台</span>
          <h1>更快找到适合你的社团</h1>
          <p>把新生选社团这件事整理成一条更清晰的路径。你可以先做智能测评，也可以直接浏览正在招新的社团。</p>
          <div className="hero-actions">
            <Link to="/quiz" className="primary-button">
              开始智能测评
            </Link>
            <Link to="/clubs" className="secondary-button">
              直接浏览社团
            </Link>
          </div>
        </div>
        <div className="hero-visual hero-panel">
          <div className="flow-card">
            <span className="eyebrow">使用流程</span>
            <ol className="flow-list">
              <li>选择测评或直接浏览</li>
              <li>获取推荐结果或筛选结果</li>
              <li>查看社团详情与招新信息</li>
              <li>提交报名意向</li>
            </ol>
          </div>
          <div className="floating-card subtle">
            <p>当前状态</p>
            <strong>12 个社团可浏览</strong>
            <span>支持智能推荐、直接筛选和线上报名闭环</span>
          </div>
        </div>
      </section>

      <section className="path-grid">
        <article className="panel path-card">
          <span className="eyebrow">路径 1</span>
          <h2>不知道该选哪个社团</h2>
          <p>回答几道简短问题，系统会给出你的社团画像和优先推荐名单。</p>
          <Link to="/quiz" className="primary-button">
            去做智能测评
          </Link>
        </article>
        <article className="panel path-card">
          <span className="eyebrow">路径 2</span>
          <h2>已经有兴趣方向</h2>
          <p>直接进入社团广场，按分类、关键词和标签筛选合适的社团。</p>
          <Link to="/clubs" className="secondary-button">
            去社团广场
          </Link>
        </article>
      </section>

      <QuickTags selectedTags={selectedTags} onToggle={toggleTag} />
      <section className="entry-strip compact-strip">
        <div>
          <span className="eyebrow">快捷入口</span>
          <h2>如果你已经知道偏好，也可以直接用标签生成推荐</h2>
        </div>
        <button type="button" className="primary-button" onClick={() => navigate("/results", { state: { selectedTags } })} disabled={selectedTags.length === 0}>
          用已选标签开始匹配
        </button>
      </section>

      <ClubHighlightGrid />

      <section className="value-row">
        <article className="value-card">
          <strong>智能匹配</strong>
          <p>根据兴趣、投入意愿和成长目标生成推荐。</p>
        </article>
        <article className="value-card">
          <strong>信息集中</strong>
          <p>把社团介绍、招新状态和详情入口放在一个平台里。</p>
        </article>
        <article className="value-card">
          <strong>报名闭环</strong>
          <p>从发现社团到提交意向，在同一条链路内完成。</p>
        </article>
      </section>
    </main>
  );
}
