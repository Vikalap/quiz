"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Question } from "@/lib/quiz-data";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-white">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;

          let buttonVariant: "default" | "outline" | "secondary" = "outline";
          if (showResult) {
            if (isCorrectOption) {
              buttonVariant = "default";
            } else if (isSelected && !isCorrect) {
              buttonVariant = "destructive";
            }
          } else if (isSelected) {
            buttonVariant = "default";
          }

          return (
            <Button
              key={index}
              variant={buttonVariant}
              className={cn(
                "w-full justify-start text-left h-auto py-4 px-4",
                showResult && isCorrectOption && "bg-green-600 hover:bg-green-600",
                showResult && isSelected && !isCorrect && "bg-red-600 hover:bg-red-600",
                !showResult && isSelected && "bg-blue-600 hover:bg-blue-700"
              )}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
            >
              <div className="flex items-center gap-3 w-full">
                {showResult && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-white flex-shrink-0" />
                )}
                <span className="flex-1">{option}</span>
              </div>
            </Button>
          );
        })}
        {showResult && (
          <div className="mt-4 p-4 rounded-lg bg-slate-700/50 border border-slate-600">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-green-400">Explanation: </span>
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


