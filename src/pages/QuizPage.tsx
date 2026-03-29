import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/forms/QuizQuestion";
import QuickTags from "../components/home/QuickTags";
import { clubs } from "../data/clubs";
import { quizQuestions } from "../data/quiz";
import type { QuizQuestion as QuizQuestionType } from "../types";
import { buildProfileFromQuiz, buildProfileFromTags, getRecommendations } from "../utils/matching";
import { saveSession } from "../utils/storage";

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, QuizQuestionType["options"][number]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentIndex];
  const selectedOption = answers[currentQuestion.id];

  function handleSelect(option: QuizQuestionType["options"][number]) {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: option }));
  }

  function handleNext() {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    const profile = buildProfileFromQuiz(Object.values(answers));
    const recommendations = getRecommendations(profile, clubs);
    saveSession(profile, recommendations);
    navigate("/results", { state: { profile, recommendations } });
  }

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  function handleTagMatch() {
    const profile = buildProfileFromTags(selectedTags);
    const recommendations = getRecommendations(profile, clubs);
    saveSession(profile, recommendations);
    navigate("/results", { state: { profile, recommendations } });
  }

  return (
    <main className="page">
      <QuizQuestion
        question={currentQuestion}
        index={currentIndex}
        total={quizQuestions.length}
        selectedValue={selectedOption?.value}
        onSelect={handleSelect}
        onNext={handleNext}
      />
      <section className="panel">
        <div className="section-heading">
          <h2>先选几个标签，马上开始匹配</h2>
          <p>如果你不想答题，也可以直接按兴趣、能力和目标来看看。</p>
        </div>
        <QuickTags selectedTags={selectedTags} onToggle={toggleTag} />
        <div className="tag-match-actions">
          <button type="button" className="primary-button" onClick={handleTagMatch} disabled={selectedTags.length === 0}>
            用已选标签开始匹配
          </button>
        </div>
      </section>
    </main>
  );
}
