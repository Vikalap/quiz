"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizTimer } from "./QuizTimer";
import { QuestionCard } from "./QuestionCard";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { QuizCategory } from "@/lib/quiz-data";

interface QuizInterfaceProps {
  category: QuizCategory;
}

export function QuizInterface({ category }: QuizInterfaceProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(category.questions.length).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = category.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / category.questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== null).length;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const correctAnswers = answers.filter(
      (answer, index) => answer === category.questions[index].correctAnswer
    ).length;
    const score = (correctAnswers / category.questions.length) * 100;

    setIsCompleted(true);
    // Store results in sessionStorage for results page
    sessionStorage.setItem(
      "quizResults",
      JSON.stringify({
        category: category.id,
        categoryName: category.name,
        score,
        correctAnswers,
        totalQuestions: category.questions.length,
        timeSpent,
        answers,
      })
    );

    router.push(`/quiz/${category.id}/results`);
  };

  const handleTimeUp = () => {
    handleComplete();
  };

  if (isCompleted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">{category.name} Quiz</h1>
          <QuizTimer timeLimit={category.timeLimit} onTimeUp={handleTimeUp} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>
              Question {currentQuestionIndex + 1} of {category.questions.length}
            </span>
            <span>{answeredCount} answered</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={answers[currentQuestionIndex] === null}
        >
          {currentQuestionIndex === category.questions.length - 1 ? (
            <>
              Complete Quiz
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

