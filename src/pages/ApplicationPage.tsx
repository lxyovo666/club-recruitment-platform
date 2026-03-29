import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ApplicationForm from "../components/forms/ApplicationForm";
import { clubs } from "../data/clubs";

export default function ApplicationPage() {
  const { clubId } = useParams();
  const club = clubs.find((item) => item.id === clubId);
  const [submitted, setSubmitted] = useState(false);

  if (!club) {
    return (
      <main className="page">
        <section className="panel empty-card">
          <h1>未找到对应社团</h1>
          <Link to="/clubs" className="primary-button">
            返回社团广场
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      {submitted ? (
        <section className="panel success-card">
          <span className="eyebrow">提交成功</span>
          <h1>你的 {club.name} 报名意向已记录</h1>
          <p>演示版不会真的发出通知，但这一步已经完整模拟了从发现社团到提交报名的闭环。</p>
          <div className="hero-actions">
            <Link to="/results" className="secondary-button">
              返回推荐结果
            </Link>
            <Link to="/clubs" className="primary-button">
              继续浏览社团
            </Link>
          </div>
        </section>
      ) : (
        <ApplicationForm clubName={club.name} onSubmit={() => setSubmitted(true)} />
      )}
    </main>
  );
}
