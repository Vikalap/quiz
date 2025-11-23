"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { User, Mail, Trophy, Award, Sparkles } from "lucide-react";
import { useAuth } from "../components/providers/AuthProvider";
import {
  getUserProgress,
  getLevelInfo,
  availableBadges,
  type Badge as BadgeType,
} from "@/lib/leveling-system";

export default function Profile() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState(getUserProgress());
  const [levelInfo, setLevelInfo] = useState(getLevelInfo(progress.totalXp));

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/profile");
    } else {
      const userProgress = getUserProgress();
      setProgress(userProgress);
      setLevelInfo(getLevelInfo(userProgress.totalXp));
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const unlockedBadgeIds = new Set(progress.badges.map(b => b.id));
  const allBadges = availableBadges.map(badge => ({
    ...badge,
    unlocked: unlockedBadgeIds.has(badge.id),
  }));

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-lg text-slate-400">
          Your progress and achievements
        </p>
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700">
                <Trophy className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user?.name || "User"}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user?.email || ""}
              </CardDescription>
              <div className="mt-3 flex items-center gap-4 flex-wrap">
                <Badge variant="secondary" className="gap-2">
                  <Award className="h-3 w-3" />
                  Level {progress.level}
                </Badge>
                {user?.plan && (
                  <Badge variant="default" className="gap-2">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                  </Badge>
                )}
                <span className="text-sm text-slate-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                  {levelInfo.xp} / {levelInfo.xpForNextLevel} XP
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Progress to Level {progress.level + 1}</span>
              <span className="text-slate-300">
                {Math.round((levelInfo.xp / levelInfo.xpForNextLevel) * 100)}%
              </span>
            </div>
            <Progress value={(levelInfo.xp / levelInfo.xpForNextLevel) * 100} className="h-3" />
            <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
              <span>Total XP: {progress.totalXp.toLocaleString()}</span>
              <span>{progress.badges.length} / {availableBadges.length} Badges</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{progress.quizzesCompleted}</div>
              <p className="text-sm text-slate-400 mt-1">Quizzes Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{progress.perfectScores}</div>
              <p className="text-sm text-slate-400 mt-1">Perfect Scores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{progress.streak}</div>
              <p className="text-sm text-slate-400 mt-1">Day Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Badges & Achievements
          </CardTitle>
          <CardDescription>
            Unlock badges by completing quizzes and reaching milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allBadges.map((badge) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                  badge.unlocked
                    ? "bg-slate-700/50 border-slate-600 hover:scale-105"
                    : "bg-slate-800/30 border-slate-700 opacity-50"
                }`}
              >
                <div className={`text-4xl ${badge.unlocked ? "" : "grayscale"}`}>
                  {badge.icon}
                </div>
                <span className="text-sm font-medium text-center text-slate-300">
                  {badge.name}
                </span>
                <span className="text-xs text-center text-slate-400">
                  {badge.description}
                </span>
                <Badge
                  className={`text-xs ${
                    badge.unlocked
                      ? badge.rarity === "legendary"
                        ? "bg-linear-to-r from-purple-600 to-pink-600"
                        : badge.rarity === "epic"
                        ? "bg-linear-to-r from-blue-600 to-purple-600"
                        : badge.rarity === "rare"
                        ? "bg-linear-to-r from-green-600 to-blue-600"
                        : "bg-slate-600"
                      : "bg-slate-800"
                  }`}
                >
                  {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                </Badge>
                {badge.unlocked && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    ✓ Unlocked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
