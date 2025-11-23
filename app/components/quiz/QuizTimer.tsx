"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  timeLimit: number; // in minutes
  onTimeUp: () => void;
}

export function QuizTimer({ timeLimit, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 60;

  return (
    <Card
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        isLowTime && "bg-red-600/20 border-red-500"
      )}
    >
      <Clock className={cn("h-5 w-5", isLowTime ? "text-red-400" : "text-blue-400")} />
      <span
        className={cn(
          "text-lg font-mono font-semibold",
          isLowTime ? "text-red-400" : "text-white"
        )}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </Card>
  );
}

