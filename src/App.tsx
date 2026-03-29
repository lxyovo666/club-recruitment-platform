import { Route, Routes } from "react-router-dom";
import Shell from "./components/layout/Shell";
import ApplicationPage from "./pages/ApplicationPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import ClubExplorePage from "./pages/ClubExplorePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/clubs" element={<ClubExplorePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailPage />} />
        <Route path="/apply/:clubId" element={<ApplicationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
