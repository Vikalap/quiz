import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, User } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "New Quiz Categories Coming Soon",
    description:
      "We're excited to announce that we'll be adding more quiz categories including Geography, Literature, and Technology in the coming weeks.",
    date: "2024-01-15",
    author: "QuizHub Team",
    category: "Announcement",
  },
  {
    id: 2,
    title: "Enhanced Quiz Results Dashboard",
    description:
      "Our new results dashboard now provides more detailed analytics, including time spent per question and performance trends over time.",
    date: "2024-01-10",
    author: "QuizHub Team",
    category: "Update",
  },
  {
    id: 3,
    title: "Mobile App Launch",
    description:
      "QuizHub is now available as a mobile app! Download it from the App Store or Google Play to take quizzes on the go.",
    date: "2024-01-05",
    author: "QuizHub Team",
    category: "Release",
  },
];

export default function News() {
  return (
    <main className="container mx-auto px-4 py-12 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Latest News & Updates
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Stay updated with the latest features and announcements
          </p>
        </div>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{item.author}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}


