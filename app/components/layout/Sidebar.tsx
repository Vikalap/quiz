"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../providers/SidebarProvider";
import { useAuth } from "../providers/AuthProvider";
import { cn } from "@/lib/utils";
import {
  Home,
  Info,
  BookOpen,
  Mail,
  Newspaper,
  X,
  Menu,
  BarChart3,
  Trophy,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "../ui/button";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Categories", href: "/categories", icon: BookOpen },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "News", href: "/news", icon: Newspaper },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-slate-700 px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                QuizHub
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation
              .filter((item) => {
                // Hide protected routes if not authenticated
                if (!isAuthenticated && ["Dashboard", "Leaderboard"].includes(item.name)) {
                  return false;
                }
                return true;
              })
              .map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            {!isAuthenticated && (
              <>
                <div className="my-4 border-t border-slate-700" />
                <Link
                  href="/login"
                  onClick={close}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={close}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90"
                >
                  <UserPlus className="h-5 w-5" />
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </aside>

      {/* Mobile menu button - will be rendered in layout */}
    </>
  );
}

