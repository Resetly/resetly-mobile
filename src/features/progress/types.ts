export interface WeeklySnapshot {
  weekLabel: string; // e.g. "Oct 21–27"
  completionRate: number; // 0–1
  totalCompleted: number;
  totalTarget: number;
}

export interface ProgressSummary {
  currentWeek: WeeklySnapshot;
  history: WeeklySnapshot[];
  longestStreak: number;
  totalHabitsTracked: number;
}

