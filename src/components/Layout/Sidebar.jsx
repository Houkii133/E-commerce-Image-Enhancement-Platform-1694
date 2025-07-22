import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import useStore from '../../store/useStore';

const { FiUpload, FiImage, FiEdit, FiDownload, FiFolder, FiBarChart3, FiSettings, FiHelpCircle, FiHome, FiZap } = FiIcons;

const Sidebar = ({ currentView, setCurrentView }) => {
  const { images, stats } = useStore();

  const menuItems = [
    { id: 'landing', label: 'Home', icon: FiHome, count: null },
    { id: 'upload', label: 'Upload', icon: FiUpload, count: null },
    { id: 'gallery', label: 'Gallery', icon: FiImage, count: images.length },
    { id: 'processing', label: 'Enhance', icon: FiZap, count: null },
    { id: 'downloads', label: 'Downloads', icon: FiDownload, count: null },
    { id: 'projects', label: 'Projects', icon: FiFolder, count: null },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3, count: null },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: FiSettings },
    { id: 'help', label: 'Help', icon: FiHelpCircle },
  ];

  return (
    <motion.aside
      className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors
              ${currentView === item.id
                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'}`}
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.count !== null && (
              <span className="text-xs bg-gray-200 dark:bg-dark-600 px-2 py-1 rounded-full">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Stats Summary */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Processed</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {stats.imagesProcessed}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Free Tier</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {10 - stats.imagesProcessed} left today
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="p-4 border-t border-gray-200 dark:border-dark-700 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
              ${currentView === item.id
                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'}`}
          >
            <SafeIcon icon={item.icon} className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;