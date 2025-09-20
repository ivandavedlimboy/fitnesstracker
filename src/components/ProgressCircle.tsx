import React from 'react';
import { Target } from 'lucide-react';

interface ProgressCircleProps {
  progress: number;
  calories: number;
  goal: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, calories, goal }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7ED957" />
              <stop offset="100%" stopColor="#1DA1F2" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <Target className="w-6 h-6 text-[#1DA1F2]" />
        </div>
      </div>
      
      <div className="text-center mt-2">
        <div className="text-xs font-bold text-[#3A3A3A]">
          {calories}/{goal}
        </div>
        <div className="text-xs text-gray-500">calories</div>
      </div>
    </div>
  );
};