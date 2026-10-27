export type HabitCategory = 'sleep' | 'nutrition' | 'movement' | 'mindfulness' | 'social' | 'custom';

export interface Habit {
  id: string;
  title: string;
  description: string;
  category: HabitCategory;
  /** Target days per week (1–7). */
  targetDaysPerWeek: number;
  /** Streak in days. */
  currentStreak: number;
  /** Best streak ever. */
  bestStreak: number;
  /** Completion rate 0–1 for the current week. */
  weeklyProgress: number;
  /** Whether the habit is completed today. */
  completedToday: boolean;
  /** Colour tag for the habit card (hex). */
  color: string;
}

export interface HabitLog {
  habitId: string;
  date: string; // ISO date YYYY-MM-DD
  completed: boolean;
  note?: string;
}

