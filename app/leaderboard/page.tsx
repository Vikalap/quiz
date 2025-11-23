import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: "Alex Johnson", score: 2850, quizzes: 45, badge: "🥇" },
    { rank: 2, name: "Sarah Williams", score: 2720, quizzes: 42, badge: "🥈" },
    { rank: 3, name: "Michael Chen", score: 2650, quizzes: 40, badge: "🥉" },
    { rank: 4, name: "Emily Davis", score: 2480, quizzes: 38 },
    { rank: 5, name: "David Brown", score: 2350, quizzes: 36 },
    { rank: 6, name: "You", score: 1850, quizzes: 28, isCurrentUser: true },
    { rank: 7, name: "Lisa Anderson", score: 1720, quizzes: 25 },
    { rank: 8, name: "James Wilson", score: 1650, quizzes: 24 },
  ];

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-lg text-slate-400">
          Compete with other quiz enthusiasts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Top Performers
          </CardTitle>
          <CardDescription>
            Rankings based on total quiz scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaders.map((leader) => (
              <div
                key={leader.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  leader.isCurrentUser
                    ? "bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20"
                    : leader.rank <= 3
                    ? "bg-slate-700/50 border-slate-600"
                    : "bg-slate-800/30 border-slate-700"
                }`}
              >
                <div className="flex items-center justify-center w-12">
                  {leader.badge ? (
                    <span className="text-3xl">{leader.badge}</span>
                  ) : (
                    <span className="text-lg font-bold text-slate-400">
                      #{leader.rank}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">
                      {leader.name}
                      {leader.isCurrentUser && (
                        <Badge variant="default" className="ml-2">
                          You
                        </Badge>
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-slate-400">
                    {leader.quizzes} quizzes completed
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-white">{leader.score}</p>
                  <p className="text-xs text-slate-400">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}


