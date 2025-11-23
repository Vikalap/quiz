"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { QuestionCard } from "./QuestionCard";
import { Progress } from "../ui/progress";
import { Trophy, Clock, CheckCircle2, XCircle, Home, RotateCcw } from "lucide-react";
import { quizData } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";

interface QuizResults {
  category: string;
  categoryName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  answers: (number | null)[];
}

export function QuizResults() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("quizResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-6">
        <p className="text-center text-slate-400">Loading results...</p>
      </div>
    );
  }

  const category = quizData[results.category];
  const scoreColor =
    results.score >= 80
      ? "text-green-400"
      : results.score >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const scoreMessage =
    results.score >= 80
      ? "Excellent! 🎉"
      : results.score >= 60
      ? "Good Job! 👍"
      : "Keep Practicing! 💪";

  const minutes = Math.floor(results.timeSpent / 60);
  const seconds = results.timeSpent % 60;

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      {/* Results Summary */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
          <p className="mt-2 text-lg text-slate-400">{results.categoryName}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className={cn("text-6xl font-bold", scoreColor)}>
                {Math.round(results.score)}%
              </div>
              <p className="mt-2 text-xl text-slate-300">{scoreMessage}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-slate-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-sm text-slate-400">Correct</p>
                      <p className="text-2xl font-bold text-white">
                        {results.correctAnswers}/{results.totalQuestions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-8 w-8 text-red-400" />
                    <div>
                      <p className="text-sm text-slate-400">Incorrect</p>
                      <p className="text-2xl font-bold text-white">
                        {results.totalQuestions - results.correctAnswers}/
                        {results.totalQuestions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-sm text-slate-400">Time Spent</p>
                      <p className="text-2xl font-bold text-white">
                        {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-slate-300">{Math.round(results.score)}%</span>
              </div>
              <Progress value={results.score} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answer Review */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-white">Answer Review</h2>
        <div className="space-y-6">
          {category.questions.map((question, index) => (
            <div key={question.id}>
              <QuestionCard
                question={question}
                selectedAnswer={results.answers[index]}
                onAnswerSelect={() => {}}
                showResult={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/categories">
            <Home className="mr-2 h-5 w-5" />
            Back to Categories
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
        >
          <Link 
            href={`/quiz/${results.category}`}
            onClick={() => {
              sessionStorage.removeItem("quizResults");
            }}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Retake Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}

