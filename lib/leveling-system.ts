import { getQuizHistory, type QuizHistoryEntry } from "./quiz-history";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt?: string;
  requiresSubscription?: boolean; // Premium-only badges
}

export interface UserLevel {
  level: number;
  xp: number;
  totalXp: number;
  nextLevelXp: number;
  progress: number;
}

const LEVEL_XP_REQUIREMENTS = [
  0,    // Level 1
  100,  // Level 2
  250,  // Level 3
  450,  // Level 4
  700,  // Level 5
  1000, // Level 6
  1350, // Level 7
  1750, // Level 8
  2200, // Level 9
  2700, // Level 10
  3250, // Level 11
  3850, // Level 12
  4500, // Level 13
  5200, // Level 14
  5950, // Level 15
  6750, // Level 16
  7600, // Level 17
  8500, // Level 18
  9450, // Level 19
  10450, // Level 20
];

// Calculate XP for a quiz based on score and time
export function calculateQuizXP(score: number, timeSpent: number, totalQuestions: number): number {
  // Base XP: 10 points per question
  let baseXP = totalQuestions * 10;
  
  // Score multiplier: 0.5x to 1.5x based on score
  const scoreMultiplier = 0.5 + (score / 100) * 1.0;
  
  // Time bonus: faster completion = bonus XP (up to 20% bonus)
  const avgTimePerQuestion = 60; // 60 seconds per question average
  const expectedTime = totalQuestions * avgTimePerQuestion;
  const timeBonus = Math.max(0, (expectedTime - timeSpent) / expectedTime * 0.2);
  
  // Perfect score bonus: +50 XP
  const perfectBonus = score === 100 ? 50 : 0;
  
  // Streak bonus: calculated elsewhere, but can add here
  
  const totalXP = Math.round(baseXP * scoreMultiplier * (1 + timeBonus) + perfectBonus);
  return Math.max(10, totalXP); // Minimum 10 XP
}

// Calculate current level and XP
export function calculateLevel(totalXP: number): UserLevel {
  let level = 1;
  let xp = totalXP;
  
  // Find current level
  for (let i = LEVEL_XP_REQUIREMENTS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_XP_REQUIREMENTS[i]) {
      level = i + 1;
      xp = totalXP - LEVEL_XP_REQUIREMENTS[i];
      break;
    }
  }
  
  // Calculate next level XP requirement
  const nextLevelIndex = level < LEVEL_XP_REQUIREMENTS.length ? level : LEVEL_XP_REQUIREMENTS.length - 1;
  const nextLevelXp = LEVEL_XP_REQUIREMENTS[nextLevelIndex] - LEVEL_XP_REQUIREMENTS[level - 1];
  const progress = nextLevelXp > 0 ? (xp / nextLevelXp) * 100 : 100;
  
  return {
    level,
    xp,
    totalXp: totalXP,
    nextLevelXp,
    progress: Math.min(100, progress),
  };
}

// Get total XP from quiz history
export function getTotalXP(): number {
  const history = getQuizHistory();
  return history.reduce((total, entry) => {
    return total + calculateQuizXP(entry.score, entry.timeSpent, entry.totalQuestions);
  }, 0);
}

// Badge definitions
export const BADGES: Badge[] = [
  {
    id: "first_quiz",
    name: "First Steps",
    description: "Complete your first quiz",
    icon: "🎯",
    rarity: "common",
  },
  {
    id: "perfect_score",
    name: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: "💯",
    rarity: "rare",
  },
  {
    id: "five_quizzes",
    name: "Getting Started",
    description: "Complete 5 quizzes",
    icon: "⭐",
    rarity: "common",
  },
  {
    id: "ten_quizzes",
    name: "Dedicated Learner",
    description: "Complete 10 quizzes",
    icon: "🌟",
    rarity: "common",
  },
  {
    id: "twenty_quizzes",
    name: "Quiz Master",
    description: "Complete 20 quizzes",
    icon: "🏆",
    rarity: "rare",
  },
  {
    id: "fifty_quizzes",
    name: "Quiz Legend",
    description: "Complete 50 quizzes",
    icon: "👑",
    rarity: "epic",
  },
  {
    id: "streak_5",
    name: "On Fire",
    description: "Maintain a 5-day streak",
    icon: "🔥",
    rarity: "rare",
  },
  {
    id: "streak_10",
    name: "Unstoppable",
    description: "Maintain a 10-day streak",
    icon: "⚡",
    rarity: "epic",
  },
  {
    id: "streak_30",
    name: "Consistency King",
    description: "Maintain a 30-day streak",
    icon: "💎",
    rarity: "legendary",
  },
  {
    id: "all_categories",
    name: "Category Master",
    description: "Complete quizzes in all categories",
    icon: "🎓",
    rarity: "epic",
  },
  {
    id: "level_5",
    name: "Rising Star",
    description: "Reach level 5",
    icon: "⭐",
    rarity: "common",
  },
  {
    id: "level_10",
    name: "Expert",
    description: "Reach level 10",
    icon: "🌟",
    rarity: "rare",
  },
  {
    id: "level_15",
    name: "Master",
    description: "Reach level 15",
    icon: "🏆",
    rarity: "epic",
  },
  {
    id: "level_20",
    name: "Grand Master",
    description: "Reach level 20",
    icon: "👑",
    rarity: "legendary",
  },
  {
    id: "average_80",
    name: "High Achiever",
    description: "Maintain 80%+ average score (10+ quizzes)",
    icon: "📈",
    rarity: "rare",
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Complete a quiz in under 2 minutes",
    icon: "⚡",
    rarity: "epic",
  },
  {
    id: "premium_member",
    name: "Premium Member",
    description: "Upgrade to Pro or Premium plan",
    icon: "👑",
    rarity: "legendary",
    requiresSubscription: true,
  },
  {
    id: "unlimited_champion",
    name: "Unlimited Champion",
    description: "Complete 100+ quizzes (Premium feature)",
    icon: "🏅",
    rarity: "legendary",
    requiresSubscription: true,
  },
  {
    id: "pro_achiever",
    name: "Pro Achiever",
    description: "Reach level 25 as a Pro member",
    icon: "⭐",
    rarity: "epic",
    requiresSubscription: true,
  },
];

const BADGES_KEY = "quizhub_badges";

// Get unlocked badges
export function getUnlockedBadges(): Badge[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(BADGES_KEY);
    if (!stored) return [];
    const badgeIds = JSON.parse(stored);
    return BADGES.filter(badge => badgeIds.includes(badge.id));
  } catch {
    return [];
  }
}

// Unlock a badge
export function unlockBadge(badgeId: string): boolean {
  if (typeof window === "undefined") return false;
  
  const unlocked = getUnlockedBadges();
  if (unlocked.some(b => b.id === badgeId)) {
    return false; // Already unlocked
  }
  
  const badge = BADGES.find(b => b.id === badgeId);
  if (!badge) return false;
  
  badge.unlockedAt = new Date().toISOString();
  const badgeIds = unlocked.map(b => b.id).concat([badgeId]);
  localStorage.setItem(BADGES_KEY, JSON.stringify(badgeIds));
  return true;
}

// Check and unlock badges based on user progress
export function checkAndUnlockBadges(userPlan?: "free" | "pro" | "premium"): string[] {
  const history = getQuizHistory();
  const totalXP = getTotalXP();
  const level = calculateLevel(totalXP);
  const unlocked: string[] = [];
  const isSubscribed = userPlan === "pro" || userPlan === "premium";
  
  // First quiz
  if (history.length >= 1 && !getUnlockedBadges().some(b => b.id === "first_quiz")) {
    if (unlockBadge("first_quiz")) unlocked.push("first_quiz");
  }
  
  // Perfect score
  if (history.some(e => e.score === 100) && !getUnlockedBadges().some(b => b.id === "perfect_score")) {
    if (unlockBadge("perfect_score")) unlocked.push("perfect_score");
  }
  
  // Quiz count badges
  if (history.length >= 5 && !getUnlockedBadges().some(b => b.id === "five_quizzes")) {
    if (unlockBadge("five_quizzes")) unlocked.push("five_quizzes");
  }
  if (history.length >= 10 && !getUnlockedBadges().some(b => b.id === "ten_quizzes")) {
    if (unlockBadge("ten_quizzes")) unlocked.push("ten_quizzes");
  }
  if (history.length >= 20 && !getUnlockedBadges().some(b => b.id === "twenty_quizzes")) {
    if (unlockBadge("twenty_quizzes")) unlocked.push("twenty_quizzes");
  }
  if (history.length >= 50 && !getUnlockedBadges().some(b => b.id === "fifty_quizzes")) {
    if (unlockBadge("fifty_quizzes")) unlocked.push("fifty_quizzes");
  }
  
  // Level badges
  if (level.level >= 5 && !getUnlockedBadges().some(b => b.id === "level_5")) {
    if (unlockBadge("level_5")) unlocked.push("level_5");
  }
  if (level.level >= 10 && !getUnlockedBadges().some(b => b.id === "level_10")) {
    if (unlockBadge("level_10")) unlocked.push("level_10");
  }
  if (level.level >= 15 && !getUnlockedBadges().some(b => b.id === "level_15")) {
    if (unlockBadge("level_15")) unlocked.push("level_15");
  }
  if (level.level >= 20 && !getUnlockedBadges().some(b => b.id === "level_20")) {
    if (unlockBadge("level_20")) unlocked.push("level_20");
  }
  
  // Average score badge
  if (history.length >= 10) {
    const avgScore = history.reduce((sum, e) => sum + e.score, 0) / history.length;
    if (avgScore >= 80 && !getUnlockedBadges().some(b => b.id === "average_80")) {
      if (unlockBadge("average_80")) unlocked.push("average_80");
    }
  }
  
  // Speed demon badge
  if (history.some(e => e.timeSpent < 120) && !getUnlockedBadges().some(b => b.id === "speed_demon")) {
    if (unlockBadge("speed_demon")) unlocked.push("speed_demon");
  }
  
  // All categories badge
  const uniqueCategories = new Set(history.map(e => e.category));
  const { categories } = require("./quiz-data");
  if (uniqueCategories.size >= categories.length && !getUnlockedBadges().some(b => b.id === "all_categories")) {
    if (unlockBadge("all_categories")) unlocked.push("all_categories");
  }
  
  // Premium-only badges (only check if user is subscribed)
  if (isSubscribed) {
    // Premium Member badge
    if (!getUnlockedBadges().some(b => b.id === "premium_member")) {
      if (unlockBadge("premium_member")) unlocked.push("premium_member");
    }
    
    // Unlimited Champion (100+ quizzes)
    if (history.length >= 100 && !getUnlockedBadges().some(b => b.id === "unlimited_champion")) {
      if (unlockBadge("unlimited_champion")) unlocked.push("unlimited_champion");
    }
    
    // Pro Achiever (Level 25+)
    if (level.level >= 25 && !getUnlockedBadges().some(b => b.id === "pro_achiever")) {
      if (unlockBadge("pro_achiever")) unlocked.push("pro_achiever");
    }
  }
  
  return unlocked;
}

