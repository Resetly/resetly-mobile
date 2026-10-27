/**
 * MOCK DATA — clearly labelled placeholder content for development and demo.
 * Replace with real API calls (useHabitsQuery) when the backend is connected.
 */
import type { Habit } from './types';

export const MOCK_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Morning Stillness',
    description: '10 minutes of quiet reflection before the day starts.',
    category: 'mindfulness',
    targetDaysPerWeek: 7,
    currentStreak: 14,
    bestStreak: 21,
    weeklyProgress: 0.71,
    completedToday: true,
    color: '#3D9E7A',
  },
  {
    id: 'habit-2',
    title: 'No Late-Night Scrolling',
    description: 'Put the phone down 30 min before sleep.',
    category: 'sleep',
    targetDaysPerWeek: 7,
    currentStreak: 5,
    bestStreak: 12,
    weeklyProgress: 0.57,
    completedToday: false,
    color: '#5A8FBF',
  },
  {
    id: 'habit-3',
    title: 'Drink 2L of Water',
    description: 'Consistent hydration throughout the day.',
    category: 'nutrition',
    targetDaysPerWeek: 7,
    currentStreak: 9,
    bestStreak: 22,
    weeklyProgress: 0.86,
    completedToday: true,
    color: '#2D4A7A',
  },
  {
    id: 'habit-4',
    title: '20-Minute Walk',
    description: 'A gentle daily walk to clear the mind.',
    category: 'movement',
    targetDaysPerWeek: 5,
    currentStreak: 3,
    bestStreak: 15,
    weeklyProgress: 0.4,
    completedToday: false,
    color: '#7B5EA7',
  },
];

export const MOCK_WEEKLY_STATS = {
  /** [!MOCK] These are example numbers only. */
  completedThisWeek: 18,
  totalThisWeek: 26,
  longestCurrentStreak: 14,
  habitsOnTrack: 3,
};

