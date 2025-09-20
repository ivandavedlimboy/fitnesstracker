import React, { useState, useEffect } from 'react';
import { UserProfile } from './components/UserProfile';
import { ActivityTracker } from './components/ActivityTracker';
import { User, Activity } from './types';
import { User as UserIcon, Zap } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'user' | 'activity'>('user');
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Alex Johnson',
    bio: 'Fitness enthusiast on a journey to better health',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bmi: null,
    goal: 'moderate',
    dailyCalorieGoal: 2000,
    achievements: []
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [dailyProgress, setDailyProgress] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fitnessTrackerUser');
    const savedActivities = localStorage.getItem('fitnessTrackerActivities');
    const savedProgress = localStorage.getItem('fitnessTrackerProgress');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
    if (savedProgress) {
      setDailyProgress(parseInt(savedProgress));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('fitnessTrackerUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fitnessTrackerActivities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('fitnessTrackerProgress', dailyProgress.toString());
  }, [dailyProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#7ED957] to-[#1DA1F2] rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#3A3A3A]">FitTracker</h1>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('user')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === 'user'
                    ? 'bg-white text-[#1DA1F2] shadow-sm'
                    : 'text-gray-600 hover:text-[#1DA1F2]'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === 'activity'
                    ? 'bg-white text-[#7ED957] shadow-sm'
                    : 'text-gray-600 hover:text-[#7ED957]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="font-medium">Activity</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'user' ? (
          <UserProfile 
            user={user} 
            setUser={setUser} 
          />
        ) : (
          <ActivityTracker
            user={user}
            activities={activities}
            setActivities={setActivities}
            dailyProgress={dailyProgress}
            setDailyProgress={setDailyProgress}
            setUser={setUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;