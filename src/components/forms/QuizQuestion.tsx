import type { QuizQuestion as QuizQuestionType } from "../../types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  index: number;
  total: number;
  selectedValue?: string;
  onSelect: (answer: QuizQuestionType["options"][number]) => void;
  onNext: () => void;
}

export default function QuizQuestion({ question, index, total, selectedValue, onSelect, onNext }: QuizQuestionProps) {
  return (
    <section className="quiz-shell">
      <div className="section-heading">
        <p className="progress-copy">第 {index + 1} 题 / 共 {total} 题</p>
        <h1>{question.title}</h1>
        <p>{question.helper}</p>
      </div>
      <div className="quiz-options">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={selectedValue === option.value ? "quiz-option active" : "quiz-option"}
            onClick={() => onSelect(option)}
          >
            <strong>{option.label}</strong>
            <span>{option.tags.join(" · ")}</span>
          </button>
        ))}
      </div>
      <button type="button" className="primary-button" onClick={onNext} disabled={!selectedValue}>
        {index === total - 1 ? "查看匹配结果" : "下一题"}
      </button>
    </section>
  );
}
