"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { categories } from "@/lib/quiz-data";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function QuizCategories() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-3 sm:text-4xl">
            Choose Your Category
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Test your knowledge across different subjects. Each quiz contains 5 questions with detailed explanations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/quiz/${category.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 border-slate-700 hover:border-blue-500/50 cursor-pointer">
                <CardHeader>
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r ${category.gradient} transition-transform duration-300 group-hover:scale-110`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className={`${
                        category.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400 border-green-500/50"
                          : category.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                          : "bg-red-500/20 text-red-400 border-red-500/50"
                      }`}
                    >
                      {category.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-300 mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>{category.timeLimit} min</span>
                      <span className="mx-2">•</span>
                      <span>{category.questions.length} questions</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
