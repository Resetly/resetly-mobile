/**
 * Habits API — typed endpoint stubs.
 * All functions call the backend via the shared `api` client.
 * Until the backend is running, these will throw ApiError (network error).
 * The app uses mock data from `src/features/habits/mock-data.ts` in the meantime.
 */

import { api } from './client';
import type { Habit, HabitLog } from '@/features/habits/types';

export interface CreateHabitPayload {
  title: string;
  description: string;
  category: Habit['category'];
  targetDaysPerWeek: number;
  color: string;
}

export interface LogHabitPayload {
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  note?: string;
}

/** Fetch all habits for the authenticated user. */
export const fetchHabits = (): Promise<Habit[]> => api.get<Habit[]>('/habits');

/** Fetch a single habit by ID. */
export const fetchHabit = (id: string): Promise<Habit> => api.get<Habit>(`/habits/${id}`);

/** Create a new habit. */
export const createHabit = (payload: CreateHabitPayload): Promise<Habit> =>
  api.post<Habit>('/habits', payload);

/** Log a habit completion or skip. */
export const logHabit = (payload: LogHabitPayload): Promise<HabitLog> =>
  api.post<HabitLog>('/habits/log', payload);

/** Delete a habit. */
export const deleteHabit = (id: string): Promise<void> => api.delete(`/habits/${id}`);

