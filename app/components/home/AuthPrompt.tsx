"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "../providers/AuthProvider";
import { LogIn, UserPlus, Trophy, BarChart3 } from "lucide-react";

export function AuthPrompt() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-slate-800/50 to-transparent">
      <div className="container mx-auto px-4 lg:px-6">
        <Card className="max-w-4xl mx-auto border-blue-500/50 bg-gradient-to-br from-slate-800 to-slate-900">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Unlock Full Features</CardTitle>
            <CardDescription className="text-lg">
              Sign up to track your progress, compete on leaderboards, and unlock achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-semibold mb-1">Track Progress</h3>
                <p className="text-sm text-slate-400">
                  Monitor your quiz performance and improvement
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="font-semibold mb-1">Compete</h3>
                <p className="text-sm text-slate-400">
                  Climb the leaderboard and unlock achievements
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <UserPlus className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <h3 className="font-semibold mb-1">Personalized</h3>
                <p className="text-sm text-slate-400">
                  Get customized recommendations and insights
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Link href="/signup">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Free Account
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


