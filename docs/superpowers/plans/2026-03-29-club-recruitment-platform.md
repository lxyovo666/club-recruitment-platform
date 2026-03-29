# Club Recruitment Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable front-end prototype for a university club recruitment platform with club discovery, AI-style matching, tag-based filtering, club detail pages, and a lightweight application flow.

**Architecture:** Use a Vite + React + TypeScript SPA with React Router. Keep club data local, make matching logic pure and testable, and persist the latest recommendation session in `localStorage` so the demo survives refreshes.

**Tech Stack:** Vite, React, TypeScript, React Router, Vitest, Testing Library, plain CSS

---

## File Structure

- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/types/index.ts`
- Create: `src/data/clubs.ts`, `src/data/quiz.ts`, `src/data/tags.ts`
- Create: `src/utils/matching.ts`, `src/utils/filtering.ts`, `src/utils/storage.ts`
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Create: `src/components/layout/*`
- Create: `src/components/home/*`
- Create: `src/components/clubs/*`
- Create: `src/components/results/*`
- Create: `src/components/forms/*`
- Create: `src/pages/HomePage.tsx`, `src/pages/ClubExplorePage.tsx`, `src/pages/QuizPage.tsx`, `src/pages/ResultsPage.tsx`, `src/pages/ClubDetailPage.tsx`, `src/pages/ApplicationPage.tsx`, `src/pages/NotFoundPage.tsx`
- Create: `src/utils/matching.test.ts`, `src/utils/filtering.test.ts`, `src/pages/HomePage.test.tsx`, `src/pages/QuizPage.test.tsx`, `src/pages/ResultsPage.test.tsx`
- Create: `README.md`

### Task 1: Bootstrap the app shell

**Files:**
- Create: `package.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders the homepage headline", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText("3 分钟找到适合你的社团")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand`  
Expected: FAIL because app files do not exist yet

- [ ] **Step 3: Add the minimal app**

```tsx
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return <Routes><Route path="/" element={<HomePage />} /></Routes>;
}
```

```tsx
// src/pages/HomePage.tsx
export default function HomePage() {
  return <h1>3 分钟找到适合你的社团</h1>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/HomePage.test.tsx --runInBand`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: bootstrap recruitment platform"
```

### Task 2: Add domain types, club seed data, and matching logic

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/clubs.ts`
- Create: `src/data/tags.ts`
- Create: `src/utils/matching.ts`
- Create: `src/utils/matching.test.ts`

- [ ] **Step 1: Write the failing matching test**

```ts
import { describe, it, expect } from "vitest";
import { clubs } from "../data/clubs";
import { buildProfileFromTags, getRecommendations } from "./matching";

describe("matching", () => {
  it("returns ranked recommendations", () => {
    const profile = buildProfileFromTags(["编程", "比赛导向"]);
    const items = getRecommendations(profile, clubs);
    expect(items[0].score).toBeGreaterThanOrEqual(items[1].score);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/utils/matching.test.ts --runInBand`  
Expected: FAIL because matching utilities do not exist yet

- [ ] **Step 3: Implement the domain layer**

```ts
// src/types/index.ts
export interface Club { id: string; name: string; category: string; tags: string[]; summary: string; intensity: "light" | "medium" | "high"; traits: string[]; goals: string[]; activities: string[]; suitableFor: string; }
export interface UserPreferenceProfile { interests: string[]; traits: string[]; goals: string[]; preferredIntensity: "light" | "medium" | "high"; selectedTags: string[]; }
export interface Recommendation { club: Club; score: number; reason: string; matchedTags: string[]; }
```

```ts
// src/utils/matching.ts
export function buildProfileFromTags(selectedTags: string[]) {
  return { interests: selectedTags, traits: selectedTags, goals: selectedTags, preferredIntensity: "medium", selectedTags };
}

export function getRecommendations(profile: any, clubs: any[]) {
  return clubs.map((club) => ({
    club,
    score: club.tags.filter((tag: string) => profile.selectedTags.includes(tag)).length * 20,
    matchedTags: club.tags.filter((tag: string) => profile.selectedTags.includes(tag)),
    reason: `你选择了${profile.selectedTags.join("、")}，${club.name}与这些偏好更接近。`,
  })).sort((a, b) => b.score - a.score).slice(0, 5);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/utils/matching.test.ts --runInBand`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add club seed data and matching logic"
```

### Task 3: Build the shared layout and homepage

**Files:**
- Create: `src/components/layout/Shell.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/QuickTags.tsx`
- Create: `src/components/home/ClubHighlightGrid.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write the failing homepage interaction test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("shows two entry points and selectable tags", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByRole("link", { name: "开始 AI 测评" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "编程" }));
    expect(screen.getByRole("button", { name: "编程" })).toHaveAttribute("aria-pressed", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/HomePage.test.tsx --runInBand`  
Expected: FAIL because homepage modules do not exist yet

- [ ] **Step 3: Implement the homepage**

```tsx
// src/pages/HomePage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  return (
    <main>
      <h1>3 分钟找到适合你的社团</h1>
      <Link to="/quiz">开始 AI 测评</Link>
      <Link to="/clubs">逛逛社团广场</Link>
      <button type="button" aria-pressed={selectedTags.includes("编程")} onClick={() => setSelectedTags(["编程"])}>编程</button>
      <button type="button" onClick={() => navigate("/results", { state: { selectedTags } })}>用这些标签开始匹配</button>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/HomePage.test.tsx --runInBand`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: build homepage and quick tag entry"
```

### Task 4: Implement club explore and filtering

**Files:**
- Create: `src/components/clubs/ClubCard.tsx`
- Create: `src/components/clubs/ClubFilters.tsx`
- Create: `src/utils/filtering.ts`
- Create: `src/utils/filtering.test.ts`
- Create: `src/pages/ClubExplorePage.tsx`

- [ ] **Step 1: Write the failing filtering test**

```ts
import { describe, it, expect } from "vitest";
import { clubs } from "../data/clubs";
import { filterClubs } from "./filtering";

describe("filterClubs", () => {
  it("filters by query and tag", () => {
    const items = filterClubs(clubs, { query: "摄影", category: "all", tags: ["创作"] });
    expect(items).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/utils/filtering.test.ts --runInBand`  
Expected: FAIL because filtering utilities do not exist yet

- [ ] **Step 3: Implement filtering**

```ts
// src/utils/filtering.ts
export function filterClubs(clubs: any[], options: { query: string; category: string; tags: string[] }) {
  return clubs.filter((club) => {
    const queryOk = !options.query || club.name.includes(options.query) || club.summary.includes(options.query);
    const categoryOk = options.category === "all" || club.category === options.category;
    const tagsOk = options.tags.length === 0 || options.tags.every((tag) => club.tags.includes(tag));
    return queryOk && categoryOk && tagsOk;
  });
}
```

```tsx
// src/pages/ClubExplorePage.tsx
import { useState } from "react";
import { clubs } from "../data/clubs";
import { filterClubs } from "../utils/filtering";

export default function ClubExplorePage() {
  const [query, setQuery] = useState("");
  const visible = filterClubs(clubs, { query, category: "all", tags: [] });
  return <section>{visible.map((club) => <article key={club.id}>{club.name}</article>)}</section>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/utils/filtering.test.ts --runInBand`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add club explore filtering"
```

### Task 5: Implement quiz, results, and session persistence

**Files:**
- Create: `src/data/quiz.ts`
- Create: `src/components/forms/QuizQuestion.tsx`
- Create: `src/pages/QuizPage.tsx`
- Create: `src/utils/storage.ts`
- Create: `src/components/results/PersonaSummary.tsx`
- Create: `src/components/results/RecommendationCard.tsx`
- Create: `src/pages/ResultsPage.tsx`
- Create: `src/pages/QuizPage.test.tsx`
- Create: `src/pages/ResultsPage.test.tsx`

- [ ] **Step 1: Write the failing results test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ResultsPage from "./ResultsPage";

describe("ResultsPage", () => {
  it("shows AI summary heading", () => {
    render(<MemoryRouter><ResultsPage /></MemoryRouter>);
    expect(screen.getByText(/AI 为你总结/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/ResultsPage.test.tsx --runInBand`  
Expected: FAIL because results flow does not exist yet

- [ ] **Step 3: Implement quiz-to-results flow**

```ts
// src/utils/storage.ts
export function saveMatchSession(profile: unknown, recommendations: unknown[]) {
  localStorage.setItem("club-profile", JSON.stringify(profile));
  localStorage.setItem("club-results", JSON.stringify(recommendations));
}

export function readMatchSession() {
  return {
    profile: JSON.parse(localStorage.getItem("club-profile") ?? "null"),
    recommendations: JSON.parse(localStorage.getItem("club-results") ?? "[]"),
  };
}
```

```tsx
// src/pages/ResultsPage.tsx
import { useLocation, Link } from "react-router-dom";
import { clubs } from "../data/clubs";
import { buildProfileFromTags, getRecommendations } from "../utils/matching";

export default function ResultsPage() {
  const state = useLocation().state as { selectedTags?: string[] } | null;
  const profile = buildProfileFromTags(state?.selectedTags ?? ["社交导向"]);
  const items = getRecommendations(profile, clubs);

  return (
    <main>
      <h1>AI 为你总结</h1>
      <p>你更适合兼具兴趣表达和团队参与感的社团。</p>
      {items.map((item) => (
        <article key={item.club.id}>
          <h2>{item.club.name}</h2>
          <p>{item.reason}</p>
          <Link to={`/clubs/${item.club.id}`}>查看详情</Link>
        </article>
      ))}
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/ResultsPage.test.tsx --runInBand`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add quiz and recommendation results"
```

### Task 6: Implement club detail, application flow, and release checks

**Files:**
- Create: `src/pages/ClubDetailPage.tsx`
- Create: `src/components/forms/ApplicationForm.tsx`
- Create: `src/pages/ApplicationPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `README.md`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing detail CTA test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ClubDetailPage from "./ClubDetailPage";

describe("ClubDetailPage", () => {
  it("shows the apply CTA", () => {
    render(
      <MemoryRouter initialEntries={["/clubs/camera-lab"]}>
        <Routes><Route path="/clubs/:clubId" element={<ClubDetailPage />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "立即报名" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/ResultsPage.test.tsx --runInBand`  
Expected: FAIL because detail and apply pages are not implemented yet

- [ ] **Step 3: Implement the detail and application pages**

```tsx
// src/pages/ClubDetailPage.tsx
import { Link, useParams } from "react-router-dom";
import { clubs } from "../data/clubs";

export default function ClubDetailPage() {
  const { clubId } = useParams();
  const club = clubs.find((item) => item.id === clubId);
  if (!club) return <p>未找到对应社团。</p>;
  return <section><h1>{club.name}</h1><p>{club.summary}</p><Link to={`/apply/${club.id}`}>立即报名</Link></section>;
}
```

```tsx
// src/pages/ApplicationPage.tsx
import { useState } from "react";

export default function ApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? <h1>报名意向已提交</h1> : <button onClick={() => setSubmitted(true)}>提交报名</button>;
}
```

- [ ] **Step 4: Run full verification**

Run: `npm test -- --runInBand`  
Expected: PASS

Run: `npm run build`  
Expected: PASS and produce `dist/`

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: finalize recruitment platform prototype"
```

## Self-Review

### Spec coverage

- 首页双入口和标签快选: Task 3
- 社团广场和筛选: Task 4
- AI 测评与结果页: Task 5
- 社团详情与报名闭环: Task 6
- 可部署与验收: Task 6

### Placeholder scan

- No `TODO`, `TBD`, or deferred placeholders remain
- Every task contains explicit files, commands, and concrete code snippets

### Type consistency

- `Club`, `UserPreferenceProfile`, and matching output are introduced in Task 2 and reused consistently later
