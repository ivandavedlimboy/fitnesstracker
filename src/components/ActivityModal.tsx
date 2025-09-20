import React from 'react';
import { X } from 'lucide-react';
import { ACTIVITY_TEMPLATES } from '../utils/activities';
import { getActivityIcon } from '../utils/icons';

interface ActivityModalProps {
  onClose: () => void;
  onSelect: (activityName: string) => void;
  existingActivities: string[];
}

export const ActivityModal: React.FC<ActivityModalProps> = ({ 
  onClose, 
  onSelect, 
  existingActivities 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#3A3A3A]">Choose an Activity</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACTIVITY_TEMPLATES.map((template) => {
            const IconComponent = getActivityIcon(template.icon);
            const isAlreadyAdded = existingActivities.includes(template.name);
            
            return (
              <button
                key={template.name}
                onClick={() => !isAlreadyAdded && onSelect(template.name)}
                disabled={isAlreadyAdded}
                className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                  isAlreadyAdded
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                    : 'border-gray-200 hover:border-[#7ED957] hover:bg-green-50 hover:scale-105'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isAlreadyAdded 
                    ? 'bg-gray-200' 
                    : 'bg-gradient-to-r from-[#1DA1F2] to-[#7ED957]'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    isAlreadyAdded ? 'text-gray-400' : 'text-white'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${
                    isAlreadyAdded ? 'text-gray-400' : 'text-[#3A3A3A]'
                  }`}>
                    {template.name}
                    {isAlreadyAdded && <span className="ml-2 text-sm">(Added)</span>}
                  </h3>
                  <p className={`text-sm ${
                    isAlreadyAdded ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {template.caloriesPerMinute} cal/min
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};