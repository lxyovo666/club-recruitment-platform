import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizQuestion from "../components/forms/QuizQuestion";
import { clubs } from "../data/clubs";
import { quizQuestions } from "../data/quiz";
import type { QuizQuestion as QuizQuestionType } from "../types";
import { buildProfileFromQuiz, getRecommendations } from "../utils/matching";
import { saveSession } from "../utils/storage";

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, QuizQuestionType["options"][number]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
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
    </main>
  );
}
