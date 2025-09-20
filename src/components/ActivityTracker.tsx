import React, { useState } from 'react';
import { Plus, Play, X, Clock } from 'lucide-react';
import { User, Activity } from '../types';
import { ActivityModal } from './ActivityModal';
import { TimerModal } from './TimerModal';
import { ProgressCircle } from './ProgressCircle';
import { ACTIVITY_TEMPLATES } from '../utils/activities';
import { getActivityIcon } from '../utils/icons';

interface ActivityTrackerProps {
  user: User;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  dailyProgress: number;
  setDailyProgress: (progress: number) => void;
}

export const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  user,
  activities,
  setActivities,
  dailyProgress,
  setDailyProgress
}) => {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const addActivity = (templateName: string) => {
    const template = ACTIVITY_TEMPLATES.find(t => t.name === templateName);
    if (!template) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      name: template.name,
      icon: template.icon,
      caloriesPerMinute: template.caloriesPerMinute,
      allocatedCalories: 0, // Will be calculated after adding
      requiredMinutes: 0, // Will be calculated after adding
      completed: false
    };

    const newActivities = [...activities, newActivity];
    calculateActivityAllocations(newActivities);
    setActivities(newActivities);
    setShowActivityModal(false);
  };

  const removeActivity = (activityId: string) => {
    const newActivities = activities.filter(a => a.id !== activityId);
    calculateActivityAllocations(newActivities);
    setActivities(newActivities);
  };

  const calculateActivityAllocations = (currentActivities: Activity[]) => {
    if (currentActivities.length === 0) return;

    const caloriesPerActivity = Math.floor(user.dailyCalorieGoal / currentActivities.length);
    
    currentActivities.forEach(activity => {
      activity.allocatedCalories = caloriesPerActivity;
      activity.requiredMinutes = Math.ceil(caloriesPerActivity / activity.caloriesPerMinute);
    });
  };

  const completeActivity = (activityId: string) => {
    setActivities(activities.map(activity => {
      if (activity.id === activityId) {
        const newProgress = dailyProgress + activity.allocatedCalories;
        setDailyProgress(Math.min(newProgress, user.dailyCalorieGoal));
        
        return {
          ...activity,
          completed: true,
          completedAt: new Date().toISOString()
        };
      }
      return activity;
    }));
    setSelectedActivity(null);
    setShowTimerModal(false);
  };

  const openTimer = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowTimerModal(true);
  };

  const progressPercentage = (dailyProgress / user.dailyCalorieGoal) * 100;
  const isGoalComplete = dailyProgress >= user.dailyCalorieGoal;

  return (
    <div className="space-y-8">
      {/* Header with Add Activity Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#3A3A3A]">Today's Activities</h2>
          <p className="text-gray-600">Track your daily fitness activities</p>
        </div>
        <button
          onClick={() => setShowActivityModal(true)}
          className="flex items-center space-x-2 bg-[#7ED957] hover:bg-[#6BC544] text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Activity</span>
        </button>
      </div>

      {/* Goal Achievement Banner */}
      {isGoalComplete && (
        <div className="bg-gradient-to-r from-[#7ED957] to-[#1DA1F2] rounded-2xl p-6 text-white text-center shadow-xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
          <p className="text-white/90">You've reached your daily calorie burn goal!</p>
        </div>
      )}

      {/* Activities Grid */}
      {activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const IconComponent = getActivityIcon(activity.icon);
            
            return (
              <div
                key={activity.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 ${
                  activity.completed 
                    ? 'opacity-75 bg-green-50/80' 
                    : 'hover:shadow-xl hover:scale-105'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activity.completed 
                        ? 'bg-green-100' 
                        : 'bg-gradient-to-r from-[#1DA1F2] to-[#7ED957]'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        activity.completed ? 'text-green-600' : 'text-white'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#3A3A3A]">{activity.name}</h3>
                      <p className="text-sm text-gray-500">{activity.requiredMinutes} minutes</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeActivity(activity.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    disabled={activity.completed}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Target Burn:</span>
                    <span className="font-semibold text-[#7ED957]">
                      {activity.allocatedCalories} cal
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <div className="flex items-center space-x-1 text-[#1DA1F2]">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">{activity.requiredMinutes}m</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openTimer(activity)}
                    disabled={activity.completed}
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activity.completed
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-[#1DA1F2] hover:bg-[#1a91d9] text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {activity.completed ? (
                      <>
                        <span>✓ Completed</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Start Activity</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Activities Added</h3>
          <p className="text-gray-500 mb-6">Add your first activity to start tracking your fitness goals</p>
          <button
            onClick={() => setShowActivityModal(true)}
            className="bg-[#7ED957] hover:bg-[#6BC544] text-white px-8 py-3 rounded-full transition-colors font-medium"
          >
            Add Your First Activity
          </button>
        </div>
      )}

      {/* Progress Circle - Fixed at bottom */}
      <div className="fixed bottom-8 right-8 z-40">
        <ProgressCircle
          progress={progressPercentage}
          calories={dailyProgress}
          goal={user.dailyCalorieGoal}
        />
      </div>

      {/* Modals */}
      {showActivityModal && (
        <ActivityModal
          onClose={() => setShowActivityModal(false)}
          onSelect={addActivity}
          existingActivities={activities.map(a => a.name)}
        />
      )}

      {showTimerModal && selectedActivity && (
        <TimerModal
          activity={selectedActivity}
          onClose={() => setShowTimerModal(false)}
          onComplete={() => completeActivity(selectedActivity.id)}
        />
      )}
    </div>
  );
};