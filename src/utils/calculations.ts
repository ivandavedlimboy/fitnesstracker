import { BMI } from '../types';

export const calculateDailyCalorieGoal = (bmi: BMI | null, goal: 'moderate' | 'hard' | 'extreme'): number => {
  if (!bmi) {
    // Default baseline calories if no BMI data
    const baselineCalories = 2000;
    const goalMultipliers = {
      moderate: 1.0,
      hard: 1.3,
      extreme: 1.6
    };
    return Math.round(baselineCalories * goalMultipliers[goal]);
  }

  // Calculate BMR (Basal Metabolic Rate) using Harris-Benedict equation
  let bmr: number;
  if (bmi.gender === 'male') {
    bmr = 88.362 + (13.397 * bmi.weight) + (4.799 * bmi.height) - (5.677 * bmi.age);
  } else {
    bmr = 447.593 + (9.247 * bmi.weight) + (3.098 * bmi.height) - (4.330 * bmi.age);
  }

  // Activity level multipliers based on goal
  const goalMultipliers = {
    moderate: 1.4, // Light activity
    hard: 1.6,     // Moderate activity
    extreme: 1.8   // Very active
  };

  // Calculate total daily energy expenditure
  const tdee = bmr * goalMultipliers[goal];

  // For weight loss/maintenance, we want calories to burn through exercise
  // This is typically 20-30% of TDEE for effective fitness goals
  const exerciseCalorieTarget = tdee * 0.25;

  return Math.round(exerciseCalorieTarget);
};