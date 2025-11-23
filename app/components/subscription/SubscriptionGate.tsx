"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Zap, 
  Crown, 
  Sparkles, 
  TrendingUp, 
  Award, 
  CheckCircle2,
  ArrowRight,
  Lock
} from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import Link from "next/link";

interface SubscriptionGateProps {
  onClose?: () => void;
}

export function SubscriptionGate({ onClose }: SubscriptionGateProps) {
  const { user, getRemainingFreeQuizzes } = useAuth();
  const router = useRouter();
  const FREE_QUIZ_LIMIT = 12;
  
  // Use quiz history for accurate count
  let quizzesCompleted = 0;
  if (typeof window !== "undefined") {
    try {
      const { getQuizHistory } = require("@/lib/quiz-history");
      const history = getQuizHistory();
      quizzesCompleted = history.length;
    } catch {
      quizzesCompleted = user?.quizzesCompleted || 0;
    }
  } else {
    quizzesCompleted = user?.quizzesCompleted || 0;
  }
  
  const remaining = getRemainingFreeQuizzes();
  const progress = (quizzesCompleted / FREE_QUIZ_LIMIT) * 100;

  const handleUpgrade = () => {
    router.push("/store");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="relative w-full max-w-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-1 text-sm font-bold">
            <Sparkles className="mr-2 h-4 w-4" />
            Unlock Unlimited Quizzes
          </Badge>
        </div>

        <CardHeader className="text-center pt-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            You've Used All Free Quizzes! 🎉
          </CardTitle>
          <CardDescription className="text-lg text-slate-300 mt-2">
            You've completed {quizzesCompleted} amazing quizzes. Ready for more?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Free Quizzes Used</span>
              <span className="font-semibold text-white">
                {quizzesCompleted} / {FREE_QUIZ_LIMIT}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-center text-sm text-slate-400">
              {remaining === 0 
                ? "All free quizzes used! Upgrade to continue." 
                : `${remaining} free ${remaining === 1 ? 'quiz' : 'quizzes'} remaining`}
            </p>
          </div>

          {/* Benefits */}
          <div className="rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              What You Get with Pro
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Unlimited Quiz Access",
                "Advanced Statistics",
                "Priority Support",
                "Ad-Free Experience",
                "Custom Quiz Creation",
                "Detailed Analytics",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleUpgrade}
              size="lg"
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
            >
              <Crown className="mr-2 h-5 w-5" />
              Upgrade to Pro
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                size="lg"
                variant="outline"
                className="flex-1"
              >
                Maybe Later
              </Button>
            )}
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm text-slate-400">
              Join <span className="font-semibold text-blue-400">10,000+</span> learners who upgraded to Pro
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

