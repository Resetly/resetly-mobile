/**
 * MOCK DATA — progress summaries for demo only.
 * Replace with useProgressQuery when backend is connected.
 */
import type { ProgressSummary } from './types';

export const MOCK_PROGRESS: ProgressSummary = {
  currentWeek: {
    weekLabel: 'Oct 21–27',
    completionRate: 0.69,
    totalCompleted: 18,
    totalTarget: 26,
  },
  history: [
    { weekLabel: 'Oct 14–20', completionRate: 0.58, totalCompleted: 15, totalTarget: 26 },
    { weekLabel: 'Oct 7–13',  completionRate: 0.73, totalCompleted: 19, totalTarget: 26 },
    { weekLabel: 'Sep 30–Oct 6', completionRate: 0.5, totalCompleted: 13, totalTarget: 26 },
    { weekLabel: 'Sep 23–29', completionRate: 0.81, totalCompleted: 21, totalTarget: 26 },
    { weekLabel: 'Sep 16–22', completionRate: 0.65, totalCompleted: 17, totalTarget: 26 },
  ],
  longestStreak: 21,
  totalHabitsTracked: 4,
};

