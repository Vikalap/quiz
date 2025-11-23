export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: BadgeRarity;
  unlockedAt?: number; // Level at which badge is unlocked
  condition?: string; // Condition description for unlocking
}

export interface LevelInfo {
  level: number;
  xp: number;
  xpRequired: number;
  xpForNextLevel: number;
}

export interface UserProgress {
  level: number;
  xp: number;
  totalXp: number;
  badges: Badge[];
  quizzesCompleted: number;
  perfectScores: number;
  streak: number;
}

/**
 * Calculate XP required for a specific level
 * Using exponential formula: XP = 100 * level^1.5
 */
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level, 1.5));
}

/**
 * Calculate total XP needed to reach a level
 */
export function getTotalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += getXpForLevel(i);
  }
  return total;
}

/**
 * Calculate level from total XP
 */
export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  let xp = 0;
  
  while (xp < totalXp) {
    level++;
    xp += getXpForLevel(level);
    if (xp > totalXp) {
      level--;
      break;
    }
  }
  
  return Math.max(1, level);
}

/**
 * Calculate level info from current XP
 */
export function getLevelInfo(totalXp: number): LevelInfo {
  const currentLevel = getLevelFromXp(totalXp);
  const xpForCurrentLevel = getTotalXpForLevel(currentLevel);
  const xpForNextLevel = getTotalXpForLevel(currentLevel + 1);
  const xpRequired = totalXp - xpForCurrentLevel;
  const xpForNext = xpForNextLevel - xpForCurrentLevel;
  
  return {
    level: currentLevel,
    xp: xpRequired,
    xpRequired: xpForNext - xpRequired,
    xpForNextLevel: xpForNext,
  };
}

/**
 * Calculate XP earned from quiz completion
 */
export function calculateQuizXp(score: number, totalQuestions: number, timeLimit: number, timeUsed: number): number {
  const baseXp = 10;
  const scoreMultiplier = score / 100; // 0 to 1 based on percentage
  const timeBonus = Math.max(0, (timeLimit - timeUsed) / timeLimit); // Bonus for finishing faster
  
  const xp = Math.floor(baseXp * totalQuestions * scoreMultiplier * (1 + timeBonus * 0.5));
  return Math.max(1, xp); // Minimum 1 XP
}

/**
 * Available badges in the system
 */
export const availableBadges: Badge[] = [
  {
    id: "first-quiz",
    name: "First Steps",
    icon: "👶",
    description: "Complete your first quiz",
    rarity: "common",
    unlockedAt: 1,
    condition: "Complete 1 quiz",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    icon: "💯",
    description: "Get 100% on a quiz",
    rarity: "rare",
    condition: "Get a perfect score on any quiz",
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    icon: "⚡",
    description: "Complete a quiz in under 5 minutes",
    rarity: "rare",
    condition: "Finish a quiz in less than 5 minutes",
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    icon: "🎓",
    description: "Complete 10 quizzes",
    rarity: "epic",
    unlockedAt: 5,
    condition: "Complete 10 quizzes",
  },
  {
    id: "category-expert",
    name: "Category Expert",
    icon: "🏆",
    description: "Perfect score in all categories",
    rarity: "epic",
    condition: "Get 100% in all 6 categories",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    icon: "🔥",
    description: "Maintain a 7-day streak",
    rarity: "epic",
    condition: "Complete quizzes 7 days in a row",
  },
  {
    id: "level-10",
    name: "Decade Champion",
    icon: "👑",
    description: "Reach level 10",
    rarity: "legendary",
    unlockedAt: 10,
    condition: "Reach level 10",
  },
  {
    id: "level-25",
    name: "Elite Scholar",
    icon: "🌟",
    description: "Reach level 25",
    rarity: "legendary",
    unlockedAt: 25,
    condition: "Reach level 25",
  },
  {
    id: "level-50",
    name: "Grandmaster",
    icon: "💎",
    description: "Reach level 50",
    rarity: "legendary",
    unlockedAt: 50,
    condition: "Reach level 50",
  },
];

/**
 * Check which badges should be unlocked based on user progress
 */
export function checkBadgeUnlocks(
  currentBadges: Badge[],
  progress: UserProgress
): Badge[] {
  const unlockedBadgeIds = new Set(currentBadges.map((b) => b.id));
  const newBadges: Badge[] = [];
  
  for (const badge of availableBadges) {
    if (unlockedBadgeIds.has(badge.id)) continue;
    
    let shouldUnlock = false;
    
    // Check level-based unlocks
    if (badge.unlockedAt && progress.level >= badge.unlockedAt) {
      shouldUnlock = true;
    }
    
    // Check condition-based unlocks
    switch (badge.id) {
      case "first-quiz":
        shouldUnlock = progress.quizzesCompleted >= 1;
        break;
      case "perfect-score":
        shouldUnlock = progress.perfectScores >= 1;
        break;
      case "quiz-master":
        shouldUnlock = progress.quizzesCompleted >= 10;
        break;
      case "streak-master":
        shouldUnlock = progress.streak >= 7;
        break;
    }
    
    if (shouldUnlock) {
      newBadges.push({ ...badge, unlockedAt: progress.level });
    }
  }
  
  return newBadges;
}

/**
 * Check if user leveled up and return level difference
 */
export function checkLevelUp(oldXp: number, newXp: number): number | null {
  const oldLevel = getLevelFromXp(oldXp);
  const newLevel = getLevelFromXp(newXp);
  
  if (newLevel > oldLevel) {
    return newLevel;
  }
  
  return null;
}

