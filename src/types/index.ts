export interface User {
  id: string;
  name: string;
  bio: string;
  profilePicture: string;
  bmi: BMI | null;
  goal: 'moderate' | 'hard' | 'extreme';
  dailyCalorieGoal: number;
  achievements: Achievement[];
}

export interface BMI {
  value: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface Activity {
  id: string;
  name: string;
  icon: string;
  caloriesPerMinute: number;
  allocatedCalories: number;
  requiredMinutes: number;
  completed: boolean;
  completedAt?: string;
}

export interface ActivityTemplate {
  name: string;
  icon: string;
  caloriesPerMinute: number;
}