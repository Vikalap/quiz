"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { QuestionCard } from "./QuestionCard";
import { quizData, type Question, type QuizCategory } from "@/lib/quiz-data";
import { Trophy, RotateCcw, Home, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import { SubscriptionGate } from "../subscription/SubscriptionGate";
import { saveQuizHistory } from "@/lib/quiz-history";
import {
  calculateQuizXp,
  addUserXp,
  getUserXp,
  checkLevelUp,
  getUserProgress,
  checkBadgeUnlocks,
  unlockBadge,
  getLevelFromXp,
  type Badge,
} from "@/lib/leveling-system";
import { LevelUpNotification } from "../leveling/LevelUpNotification";

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
  const { isAuthenticated, user, incrementQuizCount, canTakeQuiz, getRemainingFreeQuizzes } = useAuth();
  
  const [quiz, setQuiz] = useState<QuizCategory | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [levelUpData, setLevelUpData] = useState<{ level: number; badges: Badge[] } | null>(null);
  const [showSubscriptionGate, setShowSubscriptionGate] = useState(false);
  const hasProcessedRef = useRef(false);

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
        
        // Get time spent from storage
        const timeData = localStorage.getItem(`quiz_time_${categoryId}`);
        const spent = timeData ? parseInt(timeData, 10) : 0;
        setTimeSpent(spent);
        
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
        
        // Process quiz completion (only once)
        if (isAuthenticated && !hasProcessedRef.current) {
          hasProcessedRef.current = true;
          
          // Get previous XP and level
          const previousXp = getUserXp();
          const previousLevel = getLevelFromXp(previousXp);
          
          // Increment quiz count
          incrementQuizCount();
          
          // Calculate and add XP
          const timeLimitMinutes = quizInfo.timeLimit;
          const timeLimitSeconds = timeLimitMinutes * 60;
          const earnedXp = calculateQuizXp(percentage, totalQuestions, timeLimitSeconds, spent);
          const newXp = addUserXp(earnedXp);
          
          // Save to quiz history
          saveQuizHistory({
            category: categoryId,
            categoryName: quizInfo.name,
            score: percentage,
            correctAnswers: correctCount,
            totalQuestions: totalQuestions,
            timeSpent: spent,
          });
          
          // Check for level up
          const newLevel = checkLevelUp(previousXp, newXp);
          
          // Get user progress and check for badges
          const progress = getUserProgress();
          const newBadges = checkBadgeUnlocks(progress.badges, progress);
          
          // Unlock new badges
          newBadges.forEach(badge => unlockBadge(badge.id));
          
          // Show level up notification
          if (newLevel) {
            setTimeout(() => {
              setLevelUpData({
                level: newLevel,
                badges: newBadges,
              });
            }, 1500);
          } else if (newBadges.length > 0) {
            setTimeout(() => {
              setLevelUpData({
                level: getLevelFromXp(newXp),
                badges: newBadges,
              });
            }, 1500);
          }
          
          // Check if user needs to upgrade
          setTimeout(() => {
            if (!canTakeQuiz()) {
              setShowSubscriptionGate(true);
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Error parsing quiz results:", error);
        router.push(`/quiz/${categoryId}`);
      }
    } else {
      // No results found, redirect back to quiz
      router.push(`/quiz/${categoryId}`);
    }
  }, [categoryId, router, isAuthenticated, incrementQuizCount, canTakeQuiz]);

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

  const remaining = getRemainingFreeQuizzes();
  const isLastFreeQuiz = remaining === 0 && isAuthenticated;

  if (showSubscriptionGate) {
    return <SubscriptionGate onClose={() => setShowSubscriptionGate(false)} />;
  }

  return (
    <>
      {levelUpData && (
        <LevelUpNotification
          newLevel={levelUpData.level}
          newBadges={levelUpData.badges}
          onClose={() => setLevelUpData(null)}
        />
      )}
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
          <CardContent className="space-y-4">
            {/* XP Earned Display */}
            {isAuthenticated && (
              <div className="text-center p-4 rounded-lg bg-linear-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30">
                <p className="text-sm text-slate-300 mb-1">XP Earned</p>
                <p className="text-2xl font-bold text-yellow-400">
                  +{calculateQuizXp(percentage, quiz.questions.length, quiz.timeLimit * 60, timeSpent)} XP
                </p>
              </div>
            )}
            
            {/* Upgrade Prompts */}
            {isLastFreeQuiz && (
              <div className="rounded-lg bg-linear-to-r from-blue-600/20 to-cyan-600/20 p-4 border border-blue-500/30">
                <p className="text-center text-sm text-slate-200 mb-2">
                  🎉 You've completed all {12} free quizzes! Upgrade to Pro for unlimited access.
                </p>
                <Button
                  onClick={() => router.push("/store")}
                  className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  size="sm"
                >
                  Upgrade Now
                </Button>
              </div>
            )}
            {isAuthenticated && remaining === 2 && !isLastFreeQuiz && (
              <div className="rounded-lg bg-linear-to-r from-yellow-600/20 to-orange-600/20 p-4 border border-yellow-500/30">
                <p className="text-center text-sm text-slate-200 mb-2">
                  ⚡ Only 2 free quizzes left! Upgrade now to unlock unlimited access.
                </p>
                <Button
                  onClick={() => router.push("/store")}
                  className="w-full bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  size="sm"
                >
                  Upgrade to Pro
                </Button>
              </div>
            )}
            
            <div className="flex justify-center gap-4 pt-2">
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
            </div>
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
    </>
  );
}
