import React from 'react';
import { X, Trophy, Target, Calendar, Zap, Award, Star, Medal, Crown, Flame } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsModalProps {
  onClose: () => void;
  achievements: Achievement[];
}

const getAchievementIcon = (iconName: string) => {
  const iconMap = {
    trophy: Trophy,
    target: Target,
    calendar: Calendar,
    zap: Zap,
    award: Award,
    star: Star,
    medal: Medal,
    crown: Crown,
    flame: Flame
  };
  return iconMap[iconName as keyof typeof iconMap] || Trophy;
};

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ onClose, achievements }) => {
  // All possible achievements
  const allAchievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first activity',
      icon: 'star',
      dateEarned: ''
    },
    {
      id: '2',
      title: 'Goal Crusher',
      description: 'Reach your daily calorie goal',
      icon: 'target',
      dateEarned: ''
    },
    {
      id: '3',
      title: 'Week Warrior',
      description: 'Complete activities for 7 consecutive days',
      icon: 'calendar',
      dateEarned: ''
    },
    {
      id: '4',
      title: 'BMI Master',
      description: 'Calculate and update your BMI',
      icon: 'trophy',
      dateEarned: ''
    },
    {
      id: '5',
      title: 'Speed Demon',
      description: 'Complete 5 running activities',
      icon: 'zap',
      dateEarned: ''
    },
    {
      id: '6',
      title: 'Consistency King',
      description: 'Complete activities for 30 days',
      icon: 'crown',
      dateEarned: ''
    },
    {
      id: '7',
      title: 'Calorie Burner',
      description: 'Burn 10,000 total calories',
      icon: 'flame',
      dateEarned: ''
    },
    {
      id: '8',
      title: 'Activity Explorer',
      description: 'Try 10 different activity types',
      icon: 'medal',
      dateEarned: ''
    },
    {
      id: '9',
      title: 'Perfect Week',
      description: 'Reach daily goal every day for a week',
      icon: 'award',
      dateEarned: ''
    }
  ];

  // Mark earned achievements
  const achievementsWithStatus = allAchievements.map(achievement => {
    const earned = achievements.find(a => a.id === achievement.id);
    return {
      ...achievement,
      dateEarned: earned?.dateEarned || '',
      isEarned: !!earned
    };
  });

  const earnedCount = achievements.length;
  const totalCount = allAchievements.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#7ED957] to-[#1DA1F2] rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3A3A3A]">Achievements</h2>
              <p className="text-sm text-gray-600">{earnedCount} of {totalCount} unlocked</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{Math.round((earnedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#7ED957] to-[#1DA1F2] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(earnedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievementsWithStatus.map((achievement) => {
            const IconComponent = getAchievementIcon(achievement.icon);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  achievement.isEarned
                    ? 'border-[#7ED957] bg-green-50 shadow-md'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.isEarned
                      ? 'bg-gradient-to-r from-[#7ED957] to-[#1DA1F2]'
                      : 'bg-gray-300'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      achievement.isEarned ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${
                        achievement.isEarned ? 'text-[#3A3A3A]' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      {achievement.isEarned && (
                        <div className="w-5 h-5 bg-[#7ED957] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-sm ${
                      achievement.isEarned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.isEarned && achievement.dateEarned && (
                      <p className="text-xs text-[#7ED957] mt-1 font-medium">
                        Earned: {new Date(achievement.dateEarned).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {earnedCount === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Achievements Yet</h3>
            <p className="text-gray-500">Start completing activities to unlock your first achievement!</p>
          </div>
        )}
      </div>
    </div>
  );
};