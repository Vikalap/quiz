"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { QuizTimer } from "./QuizTimer";
import { QuestionCard } from "./QuestionCard";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { QuizCategory } from "@/lib/quiz-data";
import { useAuth } from "../providers/AuthProvider";
import { SubscriptionGate } from "../subscription/SubscriptionGate";

interface QuizInterfaceProps {
  category: QuizCategory;
}

interface QuizResult {
  questionId: number;
  selectedAnswer: number;
}

export function QuizInterface({ category }: QuizInterfaceProps) {
  const router = useRouter();
  const { isAuthenticated, canTakeQuiz } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [startTime] = useState(Date.now());
  const [showSubscriptionGate, setShowSubscriptionGate] = useState(false);
  const hasCheckedAccess = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !canTakeQuiz() && !hasCheckedAccess.current) {
      hasCheckedAccess.current = true;
      setShowSubscriptionGate(true);
    }
  }, [isAuthenticated, canTakeQuiz]);

  const currentQuestion = category.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / category.questions.length) * 100;
  const answeredCount = answers.size;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestion.id, answerIndex);
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
    
    // Convert answers map to array format
    const results: QuizResult[] = [];
    category.questions.forEach((question) => {
      const selectedAnswer = answers.get(question.id);
      if (selectedAnswer !== undefined) {
        results.push({
          questionId: question.id,
          selectedAnswer: selectedAnswer,
        });
      }
    });

    // Save results to localStorage
    const storedResults = {
      category: category.id,
      results: results,
      timestamp: Date.now(),
    };
    localStorage.setItem(`quiz_results_${category.id}`, JSON.stringify(storedResults));
    localStorage.setItem(`quiz_time_${category.id}`, timeSpent.toString());

    // Navigate to results page
    router.push(`/quiz/${category.id}/results`);
  };

  const handleTimeUp = () => {
    handleComplete();
  };

  if (showSubscriptionGate) {
    return <SubscriptionGate onClose={() => router.push("/categories")} />;
  }

  const selectedAnswer = answers.get(currentQuestion.id);

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
        selectedAnswer={selectedAnswer ?? null}
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
          disabled={selectedAnswer === undefined}
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
