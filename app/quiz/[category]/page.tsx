import { notFound } from "next/navigation";
import { QuizInterface } from "../../components/quiz/QuizInterface";
import { quizData } from "@/lib/quiz-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const quiz = quizData[category];

  if (!quiz) {
    return {
      title: "Quiz Not Found",
    };
  }

  return {
    title: `${quiz.name} Quiz - QuizHub`,
    description: quiz.description,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const quiz = quizData[category];

  if (!quiz) {
    notFound();
  }

  return <QuizInterface category={quiz} />;
}

