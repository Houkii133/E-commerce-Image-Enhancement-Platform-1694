import React from 'react';
import { motion } from 'framer-motion';
import DropZone from '../components/Upload/DropZone';
import useStore from '../store/useStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUpload, FiFileText, FiCheckCircle } = FiIcons;

const UploadView = () => {
  const { images } = useStore();

  const features = [
    {
      icon: FiUpload,
      title: 'Batch Upload',
      description: 'Upload multiple images at once with drag & drop support'
    },
    {
      icon: FiFileText,
      title: 'Multiple Formats',
      description: 'Support for JPG, PNG, WebP, HEIC formats up to 50MB each'
    },
    {
      icon: FiCheckCircle,
      title: 'Instant Processing',
      description: 'Start processing immediately after upload completion'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Upload Your Images
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Enhance your product images with AI-powered tools designed for e-commerce
        </p>
      </motion.div>

      <DropZone />

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Uploads */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Uploads ({images.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.slice(0, 6).map((image) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-700"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadView;