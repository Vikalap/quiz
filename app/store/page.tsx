"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Check, ShoppingCart, Star, Zap, Crown, TrendingUp, Sparkles } from "lucide-react";
import { useAuth } from "../components/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Store() {
  const { isAuthenticated, user, updateUser, getRemainingFreeQuizzes } = useAuth();
  const router = useRouter();
  const isFreeUser = user?.plan === "free" || !user?.plan;
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

  const handlePurchase = (planName: string) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/store");
      return;
    }

    // Update user plan
    const plan = planName.toLowerCase().replace(" pack", "") as "free" | "pro" | "premium";
    updateUser({ plan });
    
    // In production, this would process payment
    alert(`Successfully upgraded to ${planName}!`);
  };

  const packages = [
    {
      id: 1,
      name: "Starter Pack",
      description: "Perfect for beginners",
      price: "Free",
      features: ["5 Quiz Categories", "Basic Statistics", "Community Access"],
      popular: false,
    },
    {
      id: 2,
      name: "Pro Pack",
      description: "For serious learners",
      price: "$9.99",
      features: [
        "All Quiz Categories",
        "Advanced Statistics",
        "Priority Support",
        "Ad-Free Experience",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Premium Pack",
      description: "Ultimate learning experience",
      price: "$19.99",
      features: [
        "Everything in Pro",
        "Custom Quiz Creation",
        "Detailed Analytics",
        "1-on-1 Tutoring",
        "Early Access Features",
      ],
      popular: false,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Quiz Packages</h1>
        <p className="text-lg text-slate-400">
          Choose the perfect plan for your learning journey
        </p>
      </div>

      {/* Progress Card for Free Users */}
      {isFreeUser && (
        <Card className="mb-8 border-2 border-blue-500/50 bg-gradient-to-r from-blue-600/10 to-cyan-600/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                  Your Progress
                </CardTitle>
                <CardDescription className="text-slate-300 mt-2">
                  {remaining > 0 
                    ? `You have ${remaining} free ${remaining === 1 ? 'quiz' : 'quizzes'} remaining!`
                    : "You've completed all free quizzes! Upgrade to continue learning."}
                </CardDescription>
              </div>
              {remaining > 0 && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-4 py-1">
                  {remaining} Left
                </Badge>
              )}
            </div>
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
                <div className="rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 border border-blue-500/30">
                  <p className="text-center text-white font-semibold mb-2">
                    🎉 Amazing! You've completed all free quizzes!
                  </p>
                  <p className="text-center text-sm text-slate-300 mb-3">
                    Upgrade now to unlock unlimited quizzes and advanced features.
                  </p>
                  <Button
                    onClick={() => {
                      const proCard = document.getElementById("pro-pack");
                      proCard?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {packages.map((pkg) => {
          const planName = pkg.name.toLowerCase().replace(" pack", "");
          const isCurrentPlan = user?.plan === planName;
          const isPro = planName === "pro";
          
          return (
          <Card
            key={pkg.id}
            id={isPro ? "pro-pack" : undefined}
            className={`relative transition-all hover:scale-105 ${
              pkg.popular
                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                : "border-slate-700"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}
            {isFreeUser && remaining === 0 && isPro && (
              <div className="absolute -top-4 right-4">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse">
                  <Zap className="mr-1 h-3 w-3" />
                  Recommended
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">{pkg.price}</span>
                {pkg.price !== "Free" && (
                  <span className="text-slate-400">/month</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-300">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  pkg.popular
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    : ""
                }`}
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => handlePurchase(pkg.name)}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Current Plan
                  </>
                ) : (
                  <>
                    {isPro && remaining === 0 ? (
                      <>
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade Now
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {pkg.price === "Free" ? "Get Started" : "Subscribe"}
                      </>
                    )}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </main>
  );
}

