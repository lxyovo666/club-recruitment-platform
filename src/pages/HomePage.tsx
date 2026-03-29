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
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">社团招新智能匹配平台</span>
          <h1>3 分钟找到适合你的社团</h1>
          <p>面向高校新生的招新决策助手。你可以做 AI 测评获得推荐，也可以直接逛社团广场、挑标签快速筛选。</p>
          <div className="hero-actions">
            <Link to="/quiz" className="primary-button">
              开始 AI 测评
            </Link>
            <Link to="/clubs" className="secondary-button">
              逛逛社团广场
            </Link>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>12+</strong>
              <span>示例社团</span>
            </div>
            <div>
              <strong>2</strong>
              <span>发现路径</span>
            </div>
            <div>
              <strong>Top 5</strong>
              <span>推荐结果</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <p>AI 画像</p>
            <strong>创意表达 + 团队协作</strong>
            <span>推荐方向：新媒体、戏剧、摄影</span>
          </div>
          <div className="floating-card accent">
            <p>招新季提示</p>
            <strong>本周 8 个社团开放报名</strong>
            <span>优先查看即将截止的社团</span>
          </div>
        </div>
      </section>
      <QuickTags selectedTags={selectedTags} onToggle={toggleTag} />
      <section className="entry-strip">
        <div>
          <span className="eyebrow">双入口设计</span>
          <h2>不知道怎么选就做测评，已经有方向就直接挑标签</h2>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/results", { state: { selectedTags } })}
          disabled={selectedTags.length === 0}
        >
          用已选标签开始匹配
        </button>
      </section>
      <ClubHighlightGrid />
      <section className="panel value-grid">
        <div>
          <span className="eyebrow">为什么它有用</span>
          <h2>把社团招新里最常见的信息不对称问题，压缩成一个更顺的流程</h2>
        </div>
        <div className="value-card">
          <strong>减少盲选</strong>
          <p>先建立新生画像，再从大而散的社团信息里缩小范围。</p>
        </div>
        <div className="value-card">
          <strong>结果可解释</strong>
          <p>不只给分数，还说明为什么推荐你去看这个社团。</p>
        </div>
        <div className="value-card">
          <strong>发现即报名</strong>
          <p>从首页、广场、结果页都能顺畅进入详情和报名动作。</p>
        </div>
      </section>
    </main>
  );
}
