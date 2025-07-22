import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import useStore from '../../store/useStore';

const { FiSun, FiMoon, FiUser, FiSettings, FiCreditCard } = FiIcons;

const Header = () => {
  const { darkMode, toggleDarkMode, user, stats } = useStore();

  return (
    <motion.header 
      className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">IE</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              ImageEnhancer Pro
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              E-commerce Image Processing
            </p>
          </div>
        </div>

        {/* User Info & Controls */}
        <div className="flex items-center space-x-4">
          {/* Credits */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-dark-700 px-3 py-2 rounded-lg">
            <SafeIcon icon={FiCreditCard} className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {stats.creditsRemaining} credits
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            <SafeIcon 
              icon={darkMode ? FiSun : FiMoon} 
              className="w-5 h-5 text-gray-600 dark:text-gray-400" 
            />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
            <SafeIcon icon={FiSettings} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-dark-700 px-3 py-2 rounded-lg">
            <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.name || 'Guest User'}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;