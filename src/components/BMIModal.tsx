import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { BMI } from '../types';

interface BMIModalProps {
  onClose: () => void;
  onSave: (bmi: BMI) => void;
  currentData: BMI | null;
}

export const BMIModal: React.FC<BMIModalProps> = ({ onClose, onSave, currentData }) => {
  const [formData, setFormData] = useState({
    age: currentData?.age || '',
    height: currentData?.height || '',
    weight: currentData?.weight || '',
    gender: currentData?.gender || 'male'
  });

  const calculateBMI = () => {
    const height = parseFloat(formData.height) / 100; // Convert cm to m
    const weight = parseFloat(formData.weight);
    const bmiValue = weight / (height * height);

    let category: BMI['category'];
    if (bmiValue < 18.5) category = 'underweight';
    else if (bmiValue < 25) category = 'normal';
    else if (bmiValue < 30) category = 'overweight';
    else category = 'obese';

    const bmiData: BMI = {
      value: bmiValue,
      category,
      age: parseInt(formData.age),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      gender: formData.gender as 'male' | 'female'
    };

    onSave(bmiData);
    onClose();
  };

  const isValid = formData.age && formData.height && formData.weight;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1DA1F2] to-[#7ED957] rounded-full flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#3A3A3A]">BMI Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age (years)
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
              placeholder="Enter your height in cm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
              placeholder="Enter your weight in kg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  className="text-[#1DA1F2] focus:ring-[#1DA1F2]"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  className="text-[#1DA1F2] focus:ring-[#1DA1F2]"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={calculateBMI}
            disabled={!isValid}
            className="flex-1 py-3 px-4 bg-[#1DA1F2] hover:bg-[#1a91d9] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Calculate BMI
          </button>
        </div>
      </div>
    </div>
  );
};