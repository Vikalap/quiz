import { HeroSection } from "./components/home/HeroSection";
import { QuizCategories } from "./components/home/QuizCategories";
import { AuthPrompt } from "./components/home/AuthPrompt";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QuizCategories />
      <AuthPrompt />
    </main>
  );
}
