import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DropZone from '../components/Upload/DropZone';
import useStore from '../store/useStore';

const { FiShield, FiZap, FiImage, FiClock } = FiIcons;

const LandingView = () => {
  const { stats } = useStore();

  const trustBadges = [
    {
      icon: FiShield,
      title: 'Secure Upload',
      description: 'Your images are processed securely and never stored'
    },
    {
      icon: FiZap,
      title: 'Instant Processing',
      description: 'Get enhanced images in seconds'
    },
    {
      icon: FiImage,
      title: 'Multiple Formats',
      description: 'Support for JPG, PNG, and WebP'
    },
    {
      icon: FiClock,
      title: 'Free Tier',
      description: '10 images per day, up to 5MB each'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Product Images{' '}
          <span className="text-primary-600">in Seconds</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Professional-grade image enhancement powered by AI. Perfect for e-commerce,
          marketplaces, and social media.
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <DropZone />
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {trustBadges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 text-center border border-gray-200 dark:border-dark-700"
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={badge.icon} className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {badge.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {badge.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Usage Stats */}
      {stats.imagesProcessed > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-primary-600">
              {stats.imagesProcessed.toLocaleString()}
            </span>{' '}
            images processed today
          </p>
        </motion.div>
      )}

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: 'Upload',
              description: 'Drag & drop your product images',
              icon: FiUpload,
            },
            {
              step: 2,
              title: 'Analyze',
              description: 'Our AI analyzes your images',
              icon: FiSearch,
            },
            {
              step: 3,
              title: 'Process',
              description: 'Apply enhancements automatically',
              icon: FiZap,
            },
            {
              step: 4,
              title: 'Download',
              description: 'Get your enhanced images',
              icon: FiDownload,
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary-600">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const FiUpload = FiIcons.FiUpload;
const FiSearch = FiIcons.FiSearch;
const FiDownload = FiIcons.FiDownload;

export default LandingView;