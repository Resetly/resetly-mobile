/**
 * Resetly theme pack.
 *
 * Design intent:
 *   Primary  – Deep calm navy (#1A2E4A / #5A8FBF) — anchors trust and focus.
 *   Accent   – Soft teal-green (#3D9E7A / #5DCCA9) — progress, achievement, hope.
 *   Surfaces – Off-white and pale blue-grey; not stark white on either mode.
 *   Text     – Near-black with high contrast; secondary in muted slate.
 *   Semantic – Standard green/amber/red for success / warning / danger.
 */
import type { ThemePack } from '../types';

export const resetlyPack: ThemePack = {
  name: 'resetly',
  light: {
    text: '#1A2332',
    textSecondary: '#5A6A7E',
    background: '#F5F7FA',
    backgroundElement: '#EBF0F7',
    backgroundSelected: '#D8E4F0',
    primary: '#1A2E4A',
    onPrimary: '#FFFFFF',
    accent: '#3D9E7A',
    onAccent: '#FFFFFF',
    danger: '#C8384A',
    warning: '#D97706',
    success: '#2D8653',
    border: '#D4DCE8',
    card: '#FFFFFF',
    onCard: '#1A2332',
  },
  dark: {
    text: '#E8EDF5',
    textSecondary: '#8A9AB5',
    background: '#0D1520',
    backgroundElement: '#162032',
    backgroundSelected: '#1E2E45',
    primary: '#5A8FBF',
    onPrimary: '#0D1520',
    accent: '#5DCCA9',
    onAccent: '#0D1520',
    danger: '#FF6B76',
    warning: '#FBBF24',
    success: '#4CC97F',
    border: '#1E2E45',
    card: '#162032',
    onCard: '#E8EDF5',
  },
};

