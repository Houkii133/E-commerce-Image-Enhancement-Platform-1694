import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiShoppingCart, FiShoppingBag, FiShare2, FiPrinter } = FiIcons;

const QuickSettings = ({ onApplyPreset, onFormatChange, onQualityChange }) => {
  const presets = [
    { id: 'amazon', icon: FiShoppingCart, label: 'Amazon Ready', description: '1600×1600, JPG' },
    { id: 'shopify', icon: FiShoppingBag, label: 'Shopify Optimized', description: '2048×2048, JPG' },
    { id: 'social', icon: FiShare2, label: 'Social Media', description: '1200×1200, PNG' },
    { id: 'print', icon: FiPrinter, label: 'High Quality Print', description: '3000×3000, PNG' },
  ];

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Output Format</h3>
        <div className="grid grid-cols-3 gap-2">
          {['JPG', 'PNG', 'WebP'].map(format => (
            <button
              key={format}
              onClick={() => onFormatChange(format.toLowerCase())}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Quality</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">90%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          defaultValue="90"
          onChange={(e) => onQualityChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Presets */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Presets</h3>
        <div className="space-y-2">
          {presets.map(preset => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <SafeIcon icon={preset.icon} className="w-5 h-5 text-gray-500" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {preset.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {preset.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Free Tier Notice */}
      <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4 text-sm">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Free Tier Limits</h4>
        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
          <li>• 10 images per day</li>
          <li>• Max 5MB per image</li>
          <li>• Basic enhancement only</li>
          <li>• Includes watermark</li>
        </ul>
      </div>
    </div>
  );
};

export default QuickSettings;