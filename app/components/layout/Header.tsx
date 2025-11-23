"use client";

import Link from "next/link";
import { useSearch } from "../providers/SearchProvider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import {
  Search,
  Bell,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Trophy,
  BarChart3,
  Mail,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();
  const showSearch = pathname === "/categories" || pathname === "/";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-700 bg-slate-800/95 backdrop-blur supports-[backdrop-filter]:bg-slate-800/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo/Brand */}
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden md:flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
              <span className="text-lg font-bold text-white">Q</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              QuizHub
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-4">
          {showSearch && (
            <div className="relative hidden md:flex flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                <div className="px-1">
                  <div className="flex flex-col items-start gap-2 py-3 px-3 rounded-sm hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <Trophy className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span className="font-semibold text-sm whitespace-nowrap">New Achievement!</span>
                    </div>
                    <span className="text-xs text-slate-400 pl-6 break-words w-full">
                      You completed the Physics quiz with 100% score
                    </span>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="flex flex-col items-start gap-2 py-3 px-3 rounded-sm hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="font-semibold text-sm whitespace-nowrap">Welcome to QuizHub!</span>
                    </div>
                    <span className="text-xs text-slate-400 pl-6 break-words w-full">
                      Start taking quizzes to test your knowledge
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-center justify-center text-blue-400 cursor-pointer"
                onClick={() => router.push("/notifications")}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Shopping Cart */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  0
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Quiz Packages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-4 text-center text-sm text-slate-400">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No items in cart</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-center justify-center text-blue-400"
                onClick={() => router.push("/store")}
              >
                Browse Quiz Packages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user?.name}</span>
                    <span className="text-xs text-slate-400 font-normal">
                      {user?.email}
                    </span>
                    {user?.plan && (
                      <Badge variant="secondary" className="mt-1 w-fit text-xs">
                        {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/leaderboard")}>
                  <Trophy className="mr-2 h-4 w-4" />
                  Leaderboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-400 cursor-pointer"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
