"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  plan?: "free" | "pro" | "premium";
  quizzesCompleted?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  getRemainingFreeQuizzes: () => number;
  canTakeQuiz: () => boolean;
  incrementQuizCount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "quizhub_auth";
const FREE_QUIZ_LIMIT = 12;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedUser = JSON.parse(stored);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user && isAuthenticated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [user, isAuthenticated]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In demo mode, accept any email/password combination
    // In production, this would make an API call to verify credentials
    try {
      // Check if user exists in localStorage (for demo persistence)
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedUser = JSON.parse(stored);
        if (parsedUser.email === email) {
          setUser(parsedUser);
          setIsAuthenticated(true);
          return true;
        }
      }

      // Demo mode: create a default user if none exists
      const defaultUser: User = {
        name: email.split("@")[0] || "User",
        email,
        plan: "free",
        quizzesCompleted: 0,
      };

      setUser(defaultUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In production, this would make an API call to create the account
    try {
      const newUser: User = {
        name,
        email,
        plan: "free",
        quizzesCompleted: 0,
      };

      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const getRemainingFreeQuizzes = (): number => {
    if (!user) return FREE_QUIZ_LIMIT;
    if (user.plan === "pro" || user.plan === "premium") {
      return Infinity; // Unlimited for paid plans
    }
    // Use quiz history count for accurate tracking
    if (typeof window !== "undefined") {
      try {
        const { getQuizHistory } = require("@/lib/quiz-history");
        const history = getQuizHistory();
        const completed = history.length;
        return Math.max(0, FREE_QUIZ_LIMIT - completed);
      } catch {
        // Fallback to user object if quiz history not available
        const completed = user.quizzesCompleted || 0;
        return Math.max(0, FREE_QUIZ_LIMIT - completed);
      }
    }
    const completed = user.quizzesCompleted || 0;
    return Math.max(0, FREE_QUIZ_LIMIT - completed);
  };

  const canTakeQuiz = (): boolean => {
    if (!user) return false;
    if (user.plan === "pro" || user.plan === "premium") {
      return true; // Unlimited for paid plans
    }
    // Use quiz history count for accurate tracking
    if (typeof window !== "undefined") {
      try {
        const { getQuizHistory } = require("@/lib/quiz-history");
        const history = getQuizHistory();
        return history.length < FREE_QUIZ_LIMIT;
      } catch {
        // Fallback to user object if quiz history not available
        const completed = user.quizzesCompleted || 0;
        return completed < FREE_QUIZ_LIMIT;
      }
    }
    const completed = user.quizzesCompleted || 0;
    return completed < FREE_QUIZ_LIMIT;
  };

  const incrementQuizCount = (): void => {
    if (user) {
      const currentCount = user.quizzesCompleted || 0;
      updateUser({ quizzesCompleted: currentCount + 1 });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        updateUser,
        getRemainingFreeQuizzes,
        canTakeQuiz,
        incrementQuizCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
