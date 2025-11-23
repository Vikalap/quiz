export interface QuizHistoryEntry {
  id: string;
  category: string;
  categoryName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: string; // ISO date string
}

const QUIZ_HISTORY_KEY = "quizhub_quiz_history";

export function saveQuizHistory(entry: Omit<QuizHistoryEntry, "id" | "completedAt">): void {
  if (typeof window === "undefined") return;
  
  const history = getQuizHistory();
  const now = new Date();
  const newEntry: QuizHistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
    completedAt: now.toISOString(),
  };
  
  // Check for duplicates: same category within the last 2 seconds (prevent rapid duplicates)
  const twoSecondsAgo = now.getTime() - 2000;
  const isDuplicate = history.some(existing => {
    const existingTime = new Date(existing.completedAt).getTime();
    return (
      existing.category === newEntry.category &&
      existing.score === newEntry.score &&
      existing.correctAnswers === newEntry.correctAnswers &&
      existingTime > twoSecondsAgo
    );
  });
  
  if (isDuplicate) {
    return; // Don't save duplicate
  }
  
  history.unshift(newEntry); // Add to beginning
  // Keep only last 100 entries
  const limitedHistory = history.slice(0, 100);
  localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(limitedHistory));
}

export function getQuizHistory(): QuizHistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(QUIZ_HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function removeDuplicateQuizzes(): void {
  if (typeof window === "undefined") return;
  
  const history = getQuizHistory();
  const seen = new Map<string, QuizHistoryEntry>();
  const unique: QuizHistoryEntry[] = [];
  
  // Keep only the first occurrence of each unique quiz (same category, score, and time within 5 seconds)
  for (const entry of history) {
    const key = `${entry.category}-${entry.score}-${entry.correctAnswers}`;
    const entryTime = new Date(entry.completedAt).getTime();
    
    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, entry);
      unique.push(entry);
    } else {
      // If we find a duplicate, keep the one with the most recent timestamp
      const existingTime = new Date(existing.completedAt).getTime();
      if (Math.abs(entryTime - existingTime) < 5000) {
        // Within 5 seconds, it's a duplicate
        if (entryTime > existingTime) {
          // Replace with newer one
          const index = unique.indexOf(existing);
          if (index !== -1) {
            unique[index] = entry;
            seen.set(key, entry);
          }
        }
      } else {
        // Not a duplicate, add it
        unique.push(entry);
      }
    }
  }
  
  localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(unique));
}

export function getRecentQuizzes(limit: number = 10): QuizHistoryEntry[] {
  return getQuizHistory().slice(0, limit);
}

export function getAverageScore(): number {
  const history = getQuizHistory();
  if (history.length === 0) return 0;
  
  const totalScore = history.reduce((sum, entry) => sum + entry.score, 0);
  return Math.round(totalScore / history.length);
}

export function getTotalTime(): number {
  const history = getQuizHistory();
  return history.reduce((sum, entry) => sum + entry.timeSpent, 0);
}

export function getCategoriesCompleted(): string[] {
  const history = getQuizHistory();
  const uniqueCategories = new Set(history.map(entry => entry.category));
  return Array.from(uniqueCategories);
}

export function getCurrentStreak(): number {
  const history = getQuizHistory();
  if (history.length === 0) return 0;
  
  // Sort by date, most recent first
  const sorted = [...history].sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if there's a quiz today
  const todayQuiz = sorted.find(entry => {
    const entryDate = new Date(entry.completedAt);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === today.getTime();
  });
  
  if (!todayQuiz) {
    // If no quiz today, check yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayQuiz = sorted.find(entry => {
      const entryDate = new Date(entry.completedAt);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === yesterday.getTime();
    });
    if (!yesterdayQuiz) return 0;
    streak = 1;
  } else {
    streak = 1;
  }
  
  // Count consecutive days
  let currentDate = new Date(today);
  if (!todayQuiz) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  for (let i = streak; i < sorted.length; i++) {
    const entryDate = new Date(sorted[i].completedAt);
    entryDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(expectedDate.getDate() - (i - streak + 1));
    
    if (entryDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function getAchievements(): number {
  const history = getQuizHistory();
  let achievements = 0;
  
  // Achievement 1: First quiz
  if (history.length >= 1) achievements++;
  
  // Achievement 2: 5 quizzes completed
  if (history.length >= 5) achievements++;
  
  // Achievement 3: 10 quizzes completed
  if (history.length >= 10) achievements++;
  
  // Achievement 4: Perfect score (100%)
  if (history.some(entry => entry.score === 100)) achievements++;
  
  // Achievement 5: 5-day streak
  if (getCurrentStreak() >= 5) achievements++;
  
  // Achievement 6: All categories completed
  // This will be checked dynamically in the component
  // if (getCategoriesCompleted().length >= totalCategories) achievements++;
  
  // Achievement 7: Average score above 80%
  if (getAverageScore() >= 80 && history.length >= 5) achievements++;
  
  return achievements;
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

