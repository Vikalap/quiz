"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check, ShoppingCart, Star, Zap } from "lucide-react";
import { useAuth } from "../components/providers/AuthProvider";
import { useRouter } from "next/router";

export default function Store() {
  const { isAuthenticated, user, updateUser } = useAuth();
  const router = useRouter();

  const handlePurchase = (planName: string) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/store");
      return;
    }

    // Update user plan
    const plan = planName.toLowerCase().replace(" pack", "") as "free" | "pro" | "premium";
    updateUser({ plan });
    
    // In production, this would process payment
    alert(`Successfully upgraded to ${planName}!`);
  };

  const packages = [
    {
      id: 1,
      name: "Starter Pack",
      description: "Perfect for beginners",
      price: "Free",
      features: ["5 Quiz Categories", "Basic Statistics", "Community Access"],
      popular: false,
    },
    {
      id: 2,
      name: "Pro Pack",
      description: "For serious learners",
      price: "$9.99",
      features: [
        "All Quiz Categories",
        "Advanced Statistics",
        "Priority Support",
        "Ad-Free Experience",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Premium Pack",
      description: "Ultimate learning experience",
      price: "$19.99",
      features: [
        "Everything in Pro",
        "Custom Quiz Creation",
        "Detailed Analytics",
        "1-on-1 Tutoring",
        "Early Access Features",
      ],
      popular: false,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Quiz Packages</h1>
        <p className="text-lg text-slate-400">
          Choose the perfect plan for your learning journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative transition-all hover:scale-105 ${
              pkg.popular
                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                : "border-slate-700"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-linear-to-r from-blue-600 to-cyan-600">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">{pkg.price}</span>
                {pkg.price !== "Free" && (
                  <span className="text-slate-400">/month</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-300">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  pkg.popular
                    ? "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    : ""
                }`}
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => handlePurchase(pkg.name)}
                disabled={user?.plan === pkg.name.toLowerCase().replace(" pack", "")}
              >
                {user?.plan === pkg.name.toLowerCase().replace(" pack", "") ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Current Plan
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {pkg.price === "Free" ? "Get Started" : "Subscribe"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

