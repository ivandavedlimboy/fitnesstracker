import React, { useState } from 'react';
import { Camera, Calculator, Target, Award, Edit3 } from 'lucide-react';
import { User } from '../types';
import { BMIModal } from './BMIModal';
import { calculateDailyCalorieGoal } from '../utils/calculations';

interface UserProfileProps {
  user: User;
  setUser: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const [showBMIModal, setShowBMIModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempBio, setTempBio] = useState(user.bio);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUser({ ...user, profilePicture: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoalChange = (goal: 'moderate' | 'hard' | 'extreme') => {
    const newDailyCalorieGoal = calculateDailyCalorieGoal(user.bmi, goal);
    setUser({ 
      ...user, 
      goal,
      dailyCalorieGoal: newDailyCalorieGoal
    });
  };

  const handleNameSave = () => {
    setUser({ ...user, name: tempName });
    setIsEditingName(false);
  };

  const handleBioSave = () => {
    setUser({ ...user, bio: tempBio });
    setIsEditingBio(false);
  };

  const goalLabels = {
    moderate: { label: 'Moderate', color: 'bg-green-100 text-green-700', desc: 'Basic health maintenance' },
    hard: { label: 'Hard', color: 'bg-yellow-100 text-yellow-700', desc: 'Improve fitness level' },
    extreme: { label: 'Extreme', color: 'bg-red-100 text-red-700', desc: 'Peak performance' }
  };

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-xl">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <Camera className="w-8 h-8 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            {/* Name */}
            <div>
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="text-3xl font-bold text-[#3A3A3A] bg-transparent border-b-2 border-[#1DA1F2] focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                  />
                  <button
                    onClick={handleNameSave}
                    className="text-[#7ED957] hover:text-[#6BC544] transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 justify-center md:justify-start">
                  <h2 className="text-3xl font-bold text-[#3A3A3A]">{user.name}</h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              {isEditingBio ? (
                <div className="flex items-center space-x-2">
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="text-gray-600 bg-transparent border border-[#1DA1F2] rounded-lg p-2 focus:outline-none resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleBioSave}
                    className="text-[#7ED957] hover:text-[#6BC544] transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-start space-x-2 justify-center md:justify-start">
                  <p className="text-gray-600 max-w-md">{user.bio}</p>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-gray-400 hover:text-[#1DA1F2] transition-colors mt-1"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Function Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BMI Calculator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1DA1F2] to-[#7ED957] rounded-full flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#3A3A3A]">BMI Calculator</h3>
            </div>
            <button
              onClick={() => setShowBMIModal(true)}
              className="bg-[#1DA1F2] hover:bg-[#1a91d9] text-white px-4 py-2 rounded-full transition-colors font-medium"
            >
              Calculate
            </button>
          </div>
          
          {user.bmi ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">BMI Value:</span>
                <span className="font-bold text-[#3A3A3A] text-lg">{user.bmi.value.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Category:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.bmi.category === 'normal' ? 'bg-green-100 text-green-700' :
                  user.bmi.category === 'underweight' ? 'bg-blue-100 text-blue-700' :
                  user.bmi.category === 'overweight' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {user.bmi.category.charAt(0).toUpperCase() + user.bmi.category.slice(1)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Calculate your BMI to see detailed health metrics</p>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#7ED957] to-[#1DA1F2] rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A3A3A]">Achievements</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {user.achievements.length > 0 ? (
              user.achievements.slice(0, 5).map((achievement) => (
                <div
                  key={achievement.id}
                  className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  title={achievement.title}
                >
                  🏆
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Complete activities to earn achievements</p>
            )}
          </div>
        </div>

        {/* Goal Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1DA1F2] to-[#7ED957] rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A3A3A]">Fitness Goal</h3>
          </div>
          
          <div className="space-y-2">
            {(['moderate', 'hard', 'extreme'] as const).map((goal) => (
              <label key={goal} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="goal"
                  value={goal}
                  checked={user.goal === goal}
                  onChange={() => handleGoalChange(goal)}
                  className="text-[#7ED957] focus:ring-[#7ED957]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#3A3A3A]">{goalLabels[goal].label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${goalLabels[goal].color}`}>
                      {goalLabels[goal].desc}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Daily Calorie Goal */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#7ED957] to-[#1DA1F2] rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A3A3A]">Daily Burn Goal</h3>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7ED957] mb-2">
              {user.dailyCalorieGoal}
            </div>
            <div className="text-gray-600 text-sm">calories per day</div>
          </div>
        </div>
      </div>

      {showBMIModal && (
        <BMIModal
          onClose={() => setShowBMIModal(false)}
          onSave={(bmiData) => {
            const newDailyCalorieGoal = calculateDailyCalorieGoal(bmiData, user.goal);
            setUser({ 
              ...user, 
              bmi: bmiData,
              dailyCalorieGoal: newDailyCalorieGoal
            });
          }}
          currentData={user.bmi}
        />
      )}
    </div>
  );
};