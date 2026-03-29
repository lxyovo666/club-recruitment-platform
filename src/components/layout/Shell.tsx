import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/clubs", label: "社团广场" },
  { to: "/quiz", label: "AI 测评" },
];

export default function Shell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-mark">
          社团星图
        </NavLink>
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/quiz" className="header-cta">
          开始匹配
        </NavLink>
      </header>
      <Outlet />
      <footer className="site-footer">
        <p>为高校招新设计的智能匹配原型，帮助新生更快找到适合自己的社团。</p>
        <div className="footer-links">
          <NavLink to="/clubs">浏览社团</NavLink>
          <NavLink to="/quiz">做 AI 测评</NavLink>
        </div>
      </footer>
    </div>
  );
}
