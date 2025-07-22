import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import useStore from '../../store/useStore';

const { FiImage, FiTrendingUp, FiHardDrive, FiCreditCard } = FiIcons;

const StatsCards = () => {
  const { stats } = useStore();

  const cards = [
    {
      title: 'Images Processed',
      value: stats.imagesProcessed,
      icon: FiImage,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Storage Used',
      value: `${(stats.storageUsed / (1024 * 1024)).toFixed(1)} MB`,
      icon: FiHardDrive,
      color: 'green',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Credits Remaining',
      value: stats.creditsRemaining,
      icon: FiCreditCard,
      color: 'purple',
      change: '-8',
      changeType: 'neutral'
    },
    {
      title: 'Processing Speed',
      value: '2.3s avg',
      icon: FiTrendingUp,
      color: 'orange',
      change: '-15%',
      changeType: 'positive'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(card.color)}`}>
              <SafeIcon icon={card.icon} className="w-6 h-6" />
            </div>
            <div className={`text-sm font-medium ${
              card.changeType === 'positive' 
                ? 'text-green-600 dark:text-green-400' 
                : card.changeType === 'negative'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {card.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {card.value}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;