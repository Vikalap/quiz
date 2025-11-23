import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Target, Zap, Users, Award } from "lucide-react";

export default function About() {
  return (
    <main className="container mx-auto px-4 py-12 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            About QuizHub
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Your destination for interactive learning and knowledge testing
          </p>
        </div>

        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                Making learning fun and accessible for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                QuizHub is designed to provide an engaging platform for users to
                test their knowledge across multiple categories. We believe that
                learning should be interactive, enjoyable, and accessible to
                everyone. Our mission is to make knowledge testing a fun
                experience while helping users track their progress and improve
                their understanding of various subjects.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Fast & Interactive</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Experience lightning-fast quiz taking with real-time feedback
                and instant results.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Multiple Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Explore quizzes across Physics, Chemistry, Science, History,
                Math, and General Knowledge.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>For Everyone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Whether you&apos;re a student, teacher, or lifelong learner,
                QuizHub is designed for you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-amber-600 to-orange-600">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Monitor your performance with detailed results and answer
                explanations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

