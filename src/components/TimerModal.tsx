import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Square } from 'lucide-react';
import { Activity } from '../types';
import { getActivityIcon } from '../utils/icons';

interface TimerModalProps {
  activity: Activity;
  onClose: () => void;
  onComplete: () => void;
}

export const TimerModal: React.FC<TimerModalProps> = ({ activity, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(activity.requiredMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const IconComponent = getActivityIcon(activity.icon);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = activity.requiredMinutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(activity.requiredMinutes * 60);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#3A3A3A]">{activity.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center space-y-6">
          {/* Activity Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-[#1DA1F2] to-[#7ED957] rounded-full flex items-center justify-center mx-auto">
            <IconComponent className="w-10 h-10 text-white" />
          </div>

          {/* Progress Circle */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7ED957" />
                  <stop offset="100%" stopColor="#1DA1F2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3A3A3A]">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round(progress)}% complete
                </div>
              </div>
            </div>
          </div>

          {/* Activity Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Target Calories:</span>
              <span className="font-semibold text-[#7ED957]">{activity.allocatedCalories} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold text-[#1DA1F2]">{activity.requiredMinutes} minutes</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isCompleted ? (
              <>
                <button
                  onClick={isRunning ? handlePause : handleStart}
                  className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 shadow-lg ${
                    isRunning
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-[#7ED957] hover:bg-[#6BC544]'
                  } text-white`}
                >
                  {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
                
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-lg"
                >
                  <Square className="w-6 h-6" />
                </button>
              </>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-[#7ED957] hover:bg-[#6BC544] text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg"
              >
                Mark as Complete
              </button>
            )}
          </div>

          {isCompleted && (
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="font-semibold text-green-800 mb-1">Activity Complete!</h3>
              <p className="text-green-600 text-sm">
                You burned {activity.allocatedCalories} calories!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};