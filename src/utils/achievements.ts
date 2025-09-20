import { Achievement, User, Activity } from '../types';

export const checkAndAwardAchievements = (
  user: User,
  activities: Activity[],
  dailyProgress: number,
  setUser: (user: User) => void
): void => {
  const newAchievements: Achievement[] = [...user.achievements];
  const currentDate = new Date().toISOString();

  // Helper function to check if achievement already exists
  const hasAchievement = (id: string) => newAchievements.some(a => a.id === id);

  // Achievement 1: First Steps - Complete your first activity
  if (!hasAchievement('1') && activities.some(a => a.completed)) {
    newAchievements.push({
      id: '1',
      title: 'First Steps',
      description: 'Complete your first activity',
      icon: 'star',
      dateEarned: currentDate
    });
  }

  // Achievement 2: Goal Crusher - Reach your daily calorie goal
  if (!hasAchievement('2') && dailyProgress >= user.dailyCalorieGoal) {
    newAchievements.push({
      id: '2',
      title: 'Goal Crusher',
      description: 'Reach your daily calorie goal',
      icon: 'target',
      dateEarned: currentDate
    });
  }

  // Achievement 4: BMI Master - Calculate and update your BMI
  if (!hasAchievement('4') && user.bmi) {
    newAchievements.push({
      id: '4',
      title: 'BMI Master',
      description: 'Calculate and update your BMI',
      icon: 'trophy',
      dateEarned: currentDate
    });
  }

  // Achievement 5: Speed Demon - Complete 5 running activities
  const runningActivities = activities.filter(a => 
    a.completed && (a.name === 'Running' || a.name === 'Jogging')
  );
  if (!hasAchievement('5') && runningActivities.length >= 5) {
    newAchievements.push({
      id: '5',
      title: 'Speed Demon',
      description: 'Complete 5 running activities',
      icon: 'zap',
      dateEarned: currentDate
    });
  }

  // Achievement 8: Activity Explorer - Try 10 different activity types
  const uniqueActivityTypes = new Set(activities.filter(a => a.completed).map(a => a.name));
  if (!hasAchievement('8') && uniqueActivityTypes.size >= 10) {
    newAchievements.push({
      id: '8',
      title: 'Activity Explorer',
      description: 'Try 10 different activity types',
      icon: 'medal',
      dateEarned: currentDate
    });
  }

  // Update user if new achievements were earned
  if (newAchievements.length > user.achievements.length) {
    setUser({ ...user, achievements: newAchievements });
  }
};