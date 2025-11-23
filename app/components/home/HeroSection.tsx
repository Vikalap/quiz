import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Challenge Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Knowledge
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
            Test your skills across multiple categories with our interactive quiz
            platform. From physics to history, challenge yourself and track your
            progress.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/60"
            >
              <Link href="/categories" className="flex items-center gap-2">
                <span>Start Quiz</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:text-blue-400"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

