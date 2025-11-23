"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Trophy, Sparkles, X } from "lucide-react";
import { Button } from "../ui/button";
import { type Badge as BadgeType } from "@/lib/leveling-system";

interface LevelUpNotificationProps {
  newLevel: number;
  newBadges?: BadgeType[];
  onClose: () => void;
}

export function LevelUpNotification({ newLevel, newBadges = [], onClose }: LevelUpNotificationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300); // Wait for animation
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <Card className="relative w-full max-w-md border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 animate-in zoom-in-95 duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="pt-8 pb-6 text-center">
          {/* Level Up Animation */}
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Level Up! 🎉
            </h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Level {newLevel}
            </div>
          </div>

          {/* New Badges */}
          {newBadges.length > 0 && (
            <div className="mb-4 space-y-3">
              <p className="text-sm text-slate-300 mb-2">New Badges Unlocked!</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {newBadges.map((badge) => (
                  <Badge
                    key={badge.id}
                    className={`bg-gradient-to-r ${
                      badge.rarity === "legendary"
                        ? "from-purple-600 to-pink-600"
                        : badge.rarity === "epic"
                        ? "from-blue-600 to-purple-600"
                        : badge.rarity === "rare"
                        ? "from-green-600 to-blue-600"
                        : "from-slate-600 to-slate-700"
                    } text-white px-3 py-1`}
                  >
                    <span className="mr-1">{badge.icon}</span>
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* XP Progress */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Keep learning to reach Level {newLevel + 1}!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




