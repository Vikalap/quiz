"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";
import { User, Mail, Calendar, Trophy, Award } from "lucide-react";
import { useAuth } from "../components/providers/AuthProvider";

export default function Profile() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/profile");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }
  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    joinDate: "January 2024",
    avatar: null,
    level: 5,
    xp: 1250,
    nextLevelXp: 2000,
  };

  const achievements = [
    { name: "First Quiz", icon: "🎯", unlocked: true },
    { name: "Perfect Score", icon: "💯", unlocked: true },
    { name: "Week Warrior", icon: "🔥", unlocked: true },
    { name: "Category Master", icon: "🏆", unlocked: false },
    { name: "Speed Demon", icon: "⚡", unlocked: false },
  ];

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
              <div className="mt-3 flex items-center gap-4">
                <Badge variant="secondary" className="gap-2">
                  <Award className="h-3 w-3" />
                  Level {userData.level}
                </Badge>
                {user?.plan && (
                  <Badge variant="default" className="gap-2">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                  </Badge>
                )}
                <span className="text-sm text-slate-400">
                  {userData.xp} / {userData.nextLevelXp} XP
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Progress to Level {user.level + 1}</span>
              <span className="text-slate-300">
                {Math.round((userData.xp / userData.nextLevelXp) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
                style={{ width: `${(userData.xp / userData.nextLevelXp) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Unlock achievements by completing quizzes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${
                  achievement.unlocked
                    ? "bg-slate-700/50 border-slate-600"
                    : "bg-slate-800/30 border-slate-700 opacity-50"
                }`}
              >
                <span className="text-4xl">{achievement.icon}</span>
                <span className="text-sm font-medium text-center text-slate-300">
                  {achievement.name}
                </span>
                {achievement.unlocked && (
                  <Badge variant="success" className="text-xs">
                    Unlocked
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

