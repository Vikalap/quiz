"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { User, Mail, Calendar, Trophy, Award, Sparkles, Crown } from "lucide-react";
import { useAuth } from "../components/providers/AuthProvider";
import { calculateLevel, getTotalXP, getUnlockedBadges, BADGES, type Badge } from "@/lib/leveling-system";

export default function Profile() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [userLevel, setUserLevel] = useState(calculateLevel(getTotalXP()));
  const [unlockedBadges, setUnlockedBadges] = useState<Badge[]>([]);
  const isSubscribed = user?.plan === "pro" || user?.plan === "premium";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/profile");
    } else {
      setUserLevel(calculateLevel(getTotalXP()));
      setUnlockedBadges(getUnlockedBadges());
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    avatar: null,
  };

  // Get all badges with unlock status
  const allBadges = BADGES.map(badge => ({
    ...badge,
    unlocked: unlockedBadges.some(ub => ub.id === badge.id),
    // Show premium badges to all users, but indicate they need subscription
    isLocked: badge.requiresSubscription && !isSubscribed,
  }));

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-lg text-slate-400">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white">
                {userData.name.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700">
                <Trophy className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {userData.email}
              </CardDescription>
              <div className="mt-3 flex items-center gap-4 flex-wrap">
                <Badge variant="secondary" className="gap-2">
                  <Award className="h-3 w-3" />
                  Level {userLevel.level}
                </Badge>
                {user?.plan && (
                  <Badge variant="default" className="gap-2">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                  </Badge>
                )}
                <span className="text-sm text-slate-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                  {userLevel.xp} / {userLevel.nextLevelXp} XP
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Progress to Level {userLevel.level + 1}</span>
              <span className="text-slate-300">
                {Math.round(userLevel.progress)}%
              </span>
            </div>
            <Progress value={userLevel.progress} className="h-3" />
            <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
              <span>Total XP: {userLevel.totalXp.toLocaleString()}</span>
              <span>{unlockedBadges.length} / {BADGES.length} Badges</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all relative ${
                  badge.unlocked
                    ? "bg-slate-700/50 border-slate-600 hover:scale-105"
                    : badge.isLocked
                    ? "bg-slate-800/30 border-purple-500/30 opacity-60"
                    : "bg-slate-800/30 border-slate-700 opacity-50"
                }`}
              >
                {badge.isLocked && (
                  <div className="absolute top-2 right-2">
                    <Crown className="h-4 w-4 text-purple-400" />
                  </div>
                )}
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
                {badge.isLocked && !badge.unlocked && (
                  <Badge className="text-xs mt-1 bg-linear-to-r from-purple-600 to-pink-600">
                    🔒 Premium Only
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

