import React from 'react';
import { motion } from 'framer-motion';
import StatsCards from '../components/Dashboard/StatsCards';
import useStore from '../store/useStore';

const AnalyticsView = () => {
  const { darkMode } = useStore();

  // Sample data for charts - using simple chart components instead of ReactECharts
  const processingData = [
    { day: 'Mon', processed: 12, credits: 8 },
    { day: 'Tue', processed: 18, credits: 12 },
    { day: 'Wed', processed: 15, credits: 10 },
    { day: 'Thu', processed: 22, credits: 15 },
    { day: 'Fri', processed: 28, credits: 19 },
    { day: 'Sat', processed: 35, credits: 24 },
    { day: 'Sun', processed: 42, credits: 28 },
  ];

  const formatData = [
    { name: 'JPG', value: 1048, color: '#3b82f6' },
    { name: 'PNG', value: 735, color: '#10b981' },
    { name: 'WebP', value: 580, color: '#f59e0b' },
    { name: 'HEIC', value: 484, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your image processing performance and usage statistics
        </p>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Processing Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Processing Trend
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {processingData.map((item, index) => (
              <div key={item.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center space-y-1">
                  <div
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${(item.processed / 42) * 100}%` }}
                  />
                  <div
                    className="w-8 bg-purple-500 rounded-t"
                    style={{ height: `${(item.credits / 28) * 80}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Images Processed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Credits Used</span>
            </div>
          </div>
        </motion.div>

        {/* Format Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Format Distribution
          </h3>
          <div className="space-y-4">
            {formatData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            { action: 'Upscaled product-image-01.jpg', time: '2 minutes ago', type: 'upscale' },
            { action: 'Removed background from hero-banner.png', time: '5 minutes ago', type: 'background' },
            { action: 'Converted 5 images to WebP format', time: '10 minutes ago', type: 'convert' },
            { action: 'Resized images for Amazon listing', time: '15 minutes ago', type: 'resize' },
            { action: 'Added watermark to product photos', time: '1 hour ago', type: 'watermark' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'upscale' ? 'bg-blue-500' :
                  activity.type === 'background' ? 'bg-green-500' :
                  activity.type === 'convert' ? 'bg-purple-500' :
                  activity.type === 'resize' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}></div>
                <span className="text-gray-900 dark:text-white">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsView;