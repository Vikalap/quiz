import Link from "next/link";
import { Button } from "./components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 lg:px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}


