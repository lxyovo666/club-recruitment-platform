import { useState } from "react";

interface ApplicationFormProps {
  clubName: string;
  onSubmit: () => void;
}

export default function ApplicationForm({ clubName, onSubmit }: ApplicationFormProps) {
  const [form, setForm] = useState({
    name: "",
    major: "",
    grade: "2026级",
    contact: "",
    reason: "",
    interview: "愿意",
  });

  const disabled = !form.name || !form.major || !form.contact || !form.reason;

  return (
    <form
      className="application-form panel"
      onSubmit={(event) => {
        event.preventDefault();
        if (!disabled) onSubmit();
      }}
    >
      <div className="section-heading">
        <span className="eyebrow">报名页面</span>
        <h1>提交你的 {clubName} 报名意向</h1>
        <p>演示版不会真的发送到后台，但会完整模拟报名闭环。</p>
      </div>
      <div className="form-grid">
        <label>
          姓名
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          学院 / 专业
          <input value={form.major} onChange={(event) => setForm({ ...form, major: event.target.value })} />
        </label>
        <label>
          年级
          <select value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })}>
            <option>2026级</option>
            <option>2025级</option>
          </select>
        </label>
        <label>
          联系方式
          <input value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} />
        </label>
        <label className="full-span">
          感兴趣原因
          <textarea rows={5} value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} />
        </label>
        <label>
          是否接受面试 / 试训
          <select value={form.interview} onChange={(event) => setForm({ ...form, interview: event.target.value })}>
            <option>愿意</option>
            <option>视时间安排</option>
            <option>暂不接受</option>
          </select>
        </label>
      </div>
      <button type="submit" className="primary-button" disabled={disabled}>
        提交报名
      </button>
    </form>
  );
}
