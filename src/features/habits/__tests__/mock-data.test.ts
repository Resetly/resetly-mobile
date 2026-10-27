import { MOCK_HABITS, MOCK_WEEKLY_STATS } from '../mock-data';

describe('MOCK_HABITS', () => {
  it('contains at least one habit', () => {
    expect(MOCK_HABITS.length).toBeGreaterThan(0);
  });

  it('all habits have valid weeklyProgress (0–1)', () => {
    MOCK_HABITS.forEach((h) => {
      expect(h.weeklyProgress).toBeGreaterThanOrEqual(0);
      expect(h.weeklyProgress).toBeLessThanOrEqual(1);
    });
  });

  it('all habits have non-empty id and title', () => {
    MOCK_HABITS.forEach((h) => {
      expect(h.id).toBeTruthy();
      expect(h.title).toBeTruthy();
    });
  });
});

describe('MOCK_WEEKLY_STATS', () => {
  it('completed is not greater than total', () => {
    expect(MOCK_WEEKLY_STATS.completedThisWeek).toBeLessThanOrEqual(
      MOCK_WEEKLY_STATS.totalThisWeek,
    );
  });
});

