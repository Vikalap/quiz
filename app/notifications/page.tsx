import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Mail, Bell, CheckCircle2 } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "You completed the Physics quiz with 100% score",
      icon: Trophy,
      color: "text-yellow-400",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "welcome",
      title: "Welcome to QuizHub!",
      message: "Start taking quizzes to test your knowledge",
      icon: Mail,
      color: "text-blue-400",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      type: "reminder",
      title: "Daily Quiz Reminder",
      message: "Don't forget to take your daily quiz challenge!",
      icon: Bell,
      color: "text-green-400",
      time: "2 days ago",
      read: true,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Notifications</h1>
        <p className="mt-2 text-lg text-slate-400">
          Stay updated with your quiz progress
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card
              key={notification.id}
              className={`transition-all ${
                !notification.read
                  ? "border-blue-500 bg-slate-700/50"
                  : "border-slate-700"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700 ${notification.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-1">
                          {notification.title}
                        </CardTitle>
                        <p className="text-slate-300">{notification.message}</p>
                        <p className="text-sm text-slate-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <Badge variant="default" className="ml-4">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}


