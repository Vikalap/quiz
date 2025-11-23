"use client";

import { useEffect, useState, useRef } from "react";
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
import { useAuth } from "../providers/AuthProvider";
import { SubscriptionGate } from "../subscription/SubscriptionGate";
import { saveQuizHistory } from "@/lib/quiz-history";
import { calculateQuizXP, calculateLevel, getTotalXP, checkAndUnlockBadges, BADGES, type Badge as BadgeType } from "@/lib/leveling-system";
import { LevelUpNotification } from "../leveling/LevelUpNotification";

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
  const { isAuthenticated, user, incrementQuizCount, canTakeQuiz, getRemainingFreeQuizzes } = useAuth();
  const [results, setResults] = useState<QuizResults | null>(null);
  const hasProcessedRef = useRef(false);
  const [showSubscriptionGate, setShowSubscriptionGate] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ level: number; badges: BadgeType[] } | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("quizResults");
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      
      // Process quiz completion only once
      if (isAuthenticated && !hasProcessedRef.current) {
        hasProcessedRef.current = true;
        
        // Get previous level before saving
        const previousXP = getTotalXP();
        const previousLevel = calculateLevel(previousXP);
        
        // Increment quiz count
        incrementQuizCount();
        
        // Save quiz to history (only once)
        saveQuizHistory({
          category: parsedResults.category,
          categoryName: parsedResults.categoryName,
          score: parsedResults.score,
          correctAnswers: parsedResults.correctAnswers,
          totalQuestions: parsedResults.totalQuestions,
          timeSpent: parsedResults.timeSpent,
        });
        
        // Check for level up and badges
        const newXP = getTotalXP();
        const newLevel = calculateLevel(newXP);
        const newBadges = checkAndUnlockBadges(user?.plan);
        
        // Show level up notification if leveled up
        if (newLevel.level > previousLevel.level) {
          setTimeout(() => {
            setLevelUpData({
              level: newLevel.level,
              badges: newBadges.map(id => BADGES.find(b => b.id === id)).filter((b): b is BadgeType => b !== undefined),
            });
          }, 1500);
        } else if (newBadges.length > 0) {
          // Show badge notification even without level up
          setTimeout(() => {
            setLevelUpData({
              level: newLevel.level,
              badges: newBadges.map(id => BADGES.find(b => b.id === id)).filter((b): b is BadgeType => b !== undefined),
            });
          }, 1500);
        }
        
        // Check if user needs to upgrade after completing this quiz
        setTimeout(() => {
          if (!canTakeQuiz()) {
            setShowSubscriptionGate(true);
          }
        }, 2000); // Show after 2 seconds to let them see their results
      }
    } else {
      router.push("/");
    }
  }, [router, isAuthenticated, incrementQuizCount, canTakeQuiz]);

  if (showSubscriptionGate) {
    return <SubscriptionGate onClose={() => setShowSubscriptionGate(false)} />;
  }

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-6">
        <p className="text-center text-slate-400">Loading results...</p>
      </div>
    );
  }

  const remaining = getRemainingFreeQuizzes();
  const isLastFreeQuiz = remaining === 0 && isAuthenticated;

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
    <>
      {levelUpData ? (
        <LevelUpNotification
          newLevel={levelUpData.level}
          newBadges={levelUpData.badges}
          onClose={() => setLevelUpData(null)}
        />
      ) : null}
      <div className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      {/* Results Summary */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-cyan-600">
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

            {/* Upgrade Prompt for Last Free Quiz */}
            {isLastFreeQuiz && (
              <div className="mt-4 rounded-lg bg-linear-to-r from-blue-600/20 to-cyan-600/20 p-4 border border-blue-500/30">
                <p className="text-center text-sm text-slate-200">
                  🎉 You've completed all {12} free quizzes! Upgrade to Pro for unlimited access.
                </p>
                <Button
                  onClick={() => router.push("/store")}
                  className="mt-3 w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  size="sm"
                >
                  Upgrade Now
                </Button>
              </div>
            )}
            {/* Proactive Upgrade Prompt - When 2 quizzes remaining */}
            {isAuthenticated && remaining === 2 && !isLastFreeQuiz && (
              <div className="mt-4 rounded-lg bg-linear-to-r from-yellow-600/20 to-orange-600/20 p-4 border border-yellow-500/30">
                <p className="text-center text-sm text-slate-200">
                  ⚡ Only 2 free quizzes left! Upgrade now to unlock unlimited access and never run out.
                </p>
                <Button
                  onClick={() => router.push("/store")}
                  className="mt-3 w-full bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  size="sm"
                >
                  Upgrade to Pro
                </Button>
              </div>
            )}
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
    </>
  );
}

