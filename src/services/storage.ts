import { UserProfile, AppSettings, QuestionCategory, QuizHistoryItem } from '../types/math';

const USER_STORAGE_KEY = 'math_adventure_100_user_v1';
const SETTINGS_STORAGE_KEY = 'math_adventure_100_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  musicEnabled: false,
  timerEnabled: true,
  difficulty: 'medium',
  animationSpeed: 'normal'
};

const initialCategoryStats: Record<QuestionCategory, { attempted: number; correct: number }> = {
  basic_addition: { attempted: 0, correct: 0 },
  basic_subtraction: { attempted: 0, correct: 0 },
  make_ten: { attempted: 0, correct: 0 },
  counting_steps: { attempted: 0, correct: 0 },
  tens_decompose: { attempted: 0, correct: 0 },
  carry_borrow: { attempted: 0, correct: 0 },
  mental_tricks: { attempted: 0, correct: 0 },
  mixed_challenge: { attempted: 0, correct: 0 }
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Budi Petualang',
  avatar: 'miko',
  level: 1,
  xp: 150,
  stars: 12,
  completedLessons: ['level-1-benda-konkret'],
  badges: ['first_step', 'apple_counter'],
  wrongQuestionIds: [],
  categoryStats: initialCategoryStats,
  history: [
    {
      id: 'init-1',
      date: new Date().toISOString().split('T')[0],
      mode: 'practice',
      category: 'basic_addition',
      totalQuestions: 5,
      correctAnswers: 5,
      scorePercentage: 100,
      durationSeconds: 45,
      earnedXp: 50,
      earnedStars: 5
    }
  ],
  dailyStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyChallengeCompletedDates: []
};

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      categoryStats: {
        ...initialCategoryStats,
        ...(parsed.categoryStats || {})
      }
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.warn('Failed to save user profile to localStorage', err);
  }
}

export function resetUserProfile(): UserProfile {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ignore
  }
  const clean = {
    ...DEFAULT_PROFILE,
    name: 'Teman Miko',
    level: 1,
    xp: 0,
    stars: 0,
    completedLessons: [],
    badges: [],
    wrongQuestionIds: [],
    categoryStats: { ...initialCategoryStats },
    history: [],
    dailyStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    dailyChallengeCompletedDates: []
  };
  saveUserProfile(clean);
  return clean;
}

export function loadAppSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAppSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save settings', err);
  }
}

// Helper to calculate level from XP
export function calculateLevel(xp: number): number {
  // Each level takes approx 100 XP + 50 * level
  // Level 1: 0 - 150
  // Level 2: 151 - 350
  // Level 3: 351 - 650, etc.
  if (xp < 150) return 1;
  if (xp < 350) return 2;
  if (xp < 650) return 3;
  if (xp < 1050) return 4;
  if (xp < 1550) return 5;
  if (xp < 2150) return 6;
  if (xp < 2850) return 7;
  return 8;
}

export function getXpForNextLevel(currentLevel: number): { currentLevelXp: number; nextLevelXp: number } {
  const brackets = [0, 150, 350, 650, 1050, 1550, 2150, 2850, 4000];
  const cur = brackets[currentLevel - 1] || 0;
  const nxt = brackets[currentLevel] || 4000;
  return { currentLevelXp: cur, nextLevelXp: nxt };
}
