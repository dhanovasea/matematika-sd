export type MathOperation = 'addition' | 'subtraction';

export type QuestionCategory =
  | 'basic_addition'        // Level 1-2: Penjumlahan Dasar 1-20
  | 'basic_subtraction'     // Level 1-2: Pengurangan Dasar 1-20
  | 'make_ten'              // Level 3: Pasangan Bilangan 10
  | 'counting_steps'        // Level 2 & 5: Menghitung Maju & Mundur
  | 'tens_decompose'        // Level 4: Memecah Puluhan & Satuan
  | 'carry_borrow'          // Level 6: Bersusun Menyimpan & Meminjam
  | 'mental_tricks'         // Level 7: Trik Cepat (+/- 9, 11, Bulat 100)
  | 'mixed_challenge';      // Level 8: Tantangan Campuran 1-100

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type InteractionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'number_line'
  | 'concrete_apple'
  | 'base_ten_blocks';

export interface Question {
  id: string;
  operation: MathOperation;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  question: string;
  num1: number;
  num2: number;
  answer: number;
  options: number[];
  recommendedMethod: string;
  explanation: string;
  alternativeExplanation?: string;
  interactionType: InteractionType;
  hint1?: string;
  hint2?: string;
}

export interface CategoryInfo {
  id: QuestionCategory;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  badgeName: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category?: string;
}

export interface CategoryStat {
  attempted: number;
  correct: number;
}

export interface QuizHistoryItem {
  id: string;
  date: string;
  mode: 'practice' | 'exam' | 'daily' | 'game';
  category?: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  durationSeconds: number;
  earnedXp: number;
  earnedStars: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  stars: number;
  completedLessons: string[];
  badges: string[]; // badge IDs
  wrongQuestionIds: string[];
  categoryStats: Record<QuestionCategory, CategoryStat>;
  history: QuizHistoryItem[];
  dailyStreak: number;
  lastActiveDate: string;
  dailyChallengeCompletedDates: string[];
}

export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  timerEnabled: boolean;
  difficulty: DifficultyLevel;
  animationSpeed: 'normal' | 'fast';
}

export type MainTab =
  | 'adventure'
  | 'academy'
  | 'practice'
  | 'minigames'
  | 'daily'
  | 'exam'
  | 'badges'
  | 'progress'
  | 'settings';
