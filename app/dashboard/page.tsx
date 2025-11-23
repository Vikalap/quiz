"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../components/providers/AuthProvider";
import { Progress } from "../components/ui/progress";
import { Trophy, Target, Clock, TrendingUp, Award, BookOpen, Zap, Crown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Link from "next/link";

export default function Dashboard() {
  const { isAuthenticated, user, getRemainingFreeQuizzes } = useAuth();
  const router = useRouter();
  const remaining = getRemainingFreeQuizzes();
  const quizzesCompleted = user?.quizzesCompleted || 0;
  const FREE_QUIZ_LIMIT = 12;
  const progress = (quizzesCompleted / FREE_QUIZ_LIMIT) * 100;
  const isFreeUser = user?.plan === "free" || !user?.plan;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/dashboard");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = {
    totalQuizzes: quizzesCompleted,
    averageScore: 85,
    totalTime: 180,
    achievements: 5,
    currentStreak: 7,
    categoriesCompleted: 4,
  };

  const recentQuizzes = [
    { name: "Physics", score: 100, date: "2 days ago", time: "12:30" },
    { name: "Chemistry", score: 80, date: "3 days ago", time: "14:15" },
    { name: "Math", score: 90, date: "5 days ago", time: "11:45" },
  ];

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            <p className="mt-2 text-lg text-slate-400">
              Track your progress and achievements
            </p>
          </div>
          {isFreeUser && (
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50 px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              {remaining > 0 ? `${remaining} free left` : "Upgrade to Pro"}
            </Badge>
          )}
        </div>
      </div>

      {/* Free Quiz Progress Card */}
      {isFreeUser && (
        <Card className="mb-8 border-2 border-blue-500/50 bg-gradient-to-r from-blue-600/10 to-cyan-600/10">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Your Free Quiz Progress
            </CardTitle>
            <CardDescription className="text-slate-300">
              {remaining > 0 
                ? `You have ${remaining} free ${remaining === 1 ? 'quiz' : 'quizzes'} remaining!`
                : "You've completed all free quizzes! Upgrade to continue learning."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Free Quizzes Used</span>
                  <span className="font-semibold text-white">
                    {quizzesCompleted} / {FREE_QUIZ_LIMIT}
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
              {remaining === 0 && (
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 border border-blue-500/30">
                  <div>
                    <p className="text-white font-semibold mb-1">
                      🎉 Amazing! You've completed all free quizzes!
                    </p>
                    <p className="text-sm text-slate-300">
                      Upgrade now to unlock unlimited quizzes and advanced features.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Link href="/store">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Quizzes
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalQuizzes}</div>
            <p className="text-xs text-slate-400 mt-1">Completed quizzes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Average Score
            </CardTitle>
            <Target className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.averageScore}%</div>
            <Progress value={stats.averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Time
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalTime} min</div>
            <p className="text-xs text-slate-400 mt-1">Time spent learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Achievements
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.achievements}</div>
            <p className="text-xs text-slate-400 mt-1">Unlocked badges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Current Streak
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.currentStreak} days</div>
            <p className="text-xs text-slate-400 mt-1">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Categories
            </CardTitle>
            <Award className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats.categoriesCompleted}/6
            </div>
            <p className="text-xs text-slate-400 mt-1">Categories completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quizzes</CardTitle>
          <CardDescription>Your latest quiz attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{quiz.name}</p>
                    <p className="text-sm text-slate-400">
                      {quiz.date} • {quiz.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">{quiz.score}%</p>
                  <p className="text-xs text-slate-400">Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

