"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  plan?: "free" | "pro" | "premium";
  quizzesCompleted?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  incrementQuizCount: () => void;
  canTakeQuiz: () => boolean;
  getRemainingFreeQuizzes: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("quizhub_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ ...parsed, quizzesCompleted: parsed.quizzesCompleted || 0 });
      } catch (error) {
        localStorage.removeItem("quizhub_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo purposes, accept any email/password
    // In production, this would call your authentication API
    const storedUser = localStorage.getItem("quizhub_user");
    let demoUser: User;
    
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.email === email) {
          demoUser = { ...parsed, quizzesCompleted: parsed.quizzesCompleted || 0 };
        } else {
          demoUser = {
            id: "1",
            name: email.split("@")[0],
            email: email,
            plan: "free",
            quizzesCompleted: 0,
          };
        }
      } catch {
        demoUser = {
          id: "1",
          name: email.split("@")[0],
          email: email,
          plan: "free",
          quizzesCompleted: 0,
        };
      }
    } else {
      demoUser = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        plan: "free",
        quizzesCompleted: 0,
      };
    }

    setUser(demoUser);
    localStorage.setItem("quizhub_user", JSON.stringify(demoUser));
    return true;
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo purposes, create a new user
    // In production, this would call your registration API
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      plan: "free",
      quizzesCompleted: 0,
    };

    setUser(newUser);
    localStorage.setItem("quizhub_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("quizhub_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("quizhub_user", JSON.stringify(updatedUser));
    }
  };

  const incrementQuizCount = () => {
    if (user) {
      const updatedUser = {
        ...user,
        quizzesCompleted: (user.quizzesCompleted || 0) + 1,
      };
      setUser(updatedUser);
      localStorage.setItem("quizhub_user", JSON.stringify(updatedUser));
    }
  };

  const FREE_QUIZ_LIMIT = 12;

  const canTakeQuiz = (): boolean => {
    if (!user) return false;
    if (user.plan === "pro" || user.plan === "premium") return true;
    return (user.quizzesCompleted || 0) < FREE_QUIZ_LIMIT;
  };

  const getRemainingFreeQuizzes = (): number => {
    if (!user) return 0;
    if (user.plan === "pro" || user.plan === "premium") return Infinity;
    return Math.max(0, FREE_QUIZ_LIMIT - (user.quizzesCompleted || 0));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        incrementQuizCount,
        canTakeQuiz,
        getRemainingFreeQuizzes,
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

