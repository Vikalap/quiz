"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useSearch } from "../providers/SearchProvider";
import { useAuth } from "../providers/AuthProvider";
import { categories } from "@/lib/quiz-data";
import { Clock, TrendingUp, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubscriptionGate } from "../subscription/SubscriptionGate";
import { useState } from "react";

export function QuizCategories() {
  const { searchTerm } = useSearch();
  const { isAuthenticated, canTakeQuiz, getRemainingFreeQuizzes } = useAuth();
  const router = useRouter();
  const [showSubscriptionGate, setShowSubscriptionGate] = useState(false);
  const remaining = getRemainingFreeQuizzes();
  const isFreeUser = !isAuthenticated || (isAuthenticated && getRemainingFreeQuizzes() !== Infinity);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (e: React.MouseEvent, categoryId: string) => {
    if (isAuthenticated && !canTakeQuiz()) {
      e.preventDefault();
      setShowSubscriptionGate(true);
    }
  };

  return (
    <section className="py-12 lg:py-20">
      {showSubscriptionGate && (
        <SubscriptionGate onClose={() => setShowSubscriptionGate(false)} />
      )}
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Explore Quiz Categories
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Choose a category and start testing your knowledge
          </p>
          {isFreeUser && isAuthenticated && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 border border-blue-500/30">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-200">
                {remaining > 0 
                  ? `${remaining} free ${remaining === 1 ? 'quiz' : 'quizzes'} remaining`
                  : "Upgrade to Pro for unlimited quizzes"}
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => {
            const isLocked = isAuthenticated && !canTakeQuiz();
            
            return (
            <div key={category.id} className="relative">
              {isLocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-300 font-semibold">Upgrade Required</p>
                  </div>
                </div>
              )}
              <Link 
                href={isLocked ? "#" : `/quiz/${category.id}`}
                onClick={(e) => handleCategoryClick(e, category.id)}
              >
                <Card className={`group h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 border-slate-700 hover:border-blue-500/50 ${
                  isLocked ? "opacity-60" : ""
                }`}>
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${category.gradient} text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      {category.icon}
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      {category.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>{category.timeLimit} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span>{category.questions.length} questions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            </div>
          );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-slate-400">
              No categories found matching &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

