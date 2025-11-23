"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { QuestionCard } from "./QuestionCard";
import { quizData, type Question, type QuizCategory } from "@/lib/quiz-data";
import { Trophy, RotateCcw, Home, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

interface QuizResult {
  questionId: number;
  selectedAnswer: number;
}

interface StoredResults {
  category: string;
  results: QuizResult[];
  timestamp: number;
}

export function QuizResults() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.category as string;
  
  const [quiz, setQuiz] = useState<QuizCategory | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!categoryId) return;

    // Get quiz data
    const quizInfo = quizData[categoryId];
    if (!quizInfo) {
      router.push("/");
      return;
    }
    setQuiz(quizInfo);

    // Get results from localStorage
    const storedData = localStorage.getItem(`quiz_results_${categoryId}`);
    if (storedData) {
      try {
        const parsed: StoredResults = JSON.parse(storedData);
        setResults(parsed.results);
        
        // Calculate score
        let correctCount = 0;
        parsed.results.forEach((result) => {
          const question = quizInfo.questions.find((q) => q.id === result.questionId);
          if (question && result.selectedAnswer === question.correctAnswer) {
            correctCount++;
          }
        });
        
        const totalQuestions = quizInfo.questions.length;
        setScore(correctCount);
        setPercentage(Math.round((correctCount / totalQuestions) * 100));
      } catch (error) {
        console.error("Error parsing quiz results:", error);
        router.push(`/quiz/${categoryId}`);
      }
    } else {
      // No results found, redirect back to quiz
      router.push(`/quiz/${categoryId}`);
    }
  }, [categoryId, router]);

  if (!quiz || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Loading results...</p>
        </div>
      </div>
    );
  }

  const getQuestionResult = (question: Question) => {
    const result = results.find((r) => r.questionId === question.id);
    return result ? result.selectedAnswer : null;
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 80) return "Excellent Work! 🎉";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 60) return "Not Bad! 💪";
    return "Keep Practicing! 📚";
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Summary Card */}
        <Card className="border-2 border-slate-700">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full bg-slate-800 ${percentage >= 80 ? "bg-green-900/20" : percentage >= 60 ? "bg-yellow-900/20" : "bg-red-900/20"}`}>
                <Trophy className={`h-16 w-16 ${getScoreColor()}`} />
              </div>
            </div>
            <CardTitle className="text-3xl text-white mb-2">
              Quiz Results
            </CardTitle>
            <div className="text-slate-400 mb-4">
              {quiz.name} Quiz
            </div>
            <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
              {percentage}%
            </div>
            <div className="text-xl text-slate-300 mb-4">
              {getScoreMessage()}
            </div>
            <div className="flex items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold">{score}</span>
                <span>correct</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-semibold">{quiz.questions.length - score}</span>
                <span>incorrect</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{quiz.questions.length}</span>
                <span>total</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center gap-4 pt-4">
            <Button
              onClick={() => router.push(`/quiz/${categoryId}`)}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Button>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Questions Review */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Review Your Answers</h2>
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="space-y-2">
              <div className="text-sm text-slate-400 mb-2">
                Question {index + 1} of {quiz.questions.length}
              </div>
              <QuestionCard
                question={question}
                selectedAnswer={getQuestionResult(question)}
                onAnswerSelect={() => {}}
                showResult={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
