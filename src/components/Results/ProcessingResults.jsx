import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { formatFileSize } from '../../utils/fileUtils';

const { FiDownload, FiClock, FiZap, FiShare2 } = FiIcons;

const ProcessingResults = ({ originalImage, processedImage, processingTime, onDownload, onShare, onProcessMore }) => {
  const compressionRatio = processedImage && originalImage
    ? ((1 - processedImage.size / originalImage.size) * 100).toFixed(1)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6"
    >
      {/* Processing Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Original Size</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatFileSize(originalImage.size)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">New Size</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatFileSize(processedImage.size)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Compression</div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {compressionRatio}%
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Processing Time</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {processingTime}s
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Download Enhanced Image</span>
        </button>
        <button
          onClick={onProcessMore}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiZap} className="w-4 h-4" />
          <span>Process More Images</span>
        </button>
        <button
          onClick={onShare}
          className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiShare2} className="w-4 h-4" />
          <span className="sr-only">Share</span>
        </button>
      </div>

      {/* Processing Details */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Processing Details
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiClock} className="w-4 h-4" />
            <span>Processed at {new Date().toLocaleTimeString()}</span>
          </div>
          <div>
            Original: {originalImage.width}×{originalImage.height} ({originalImage.format.toUpperCase()})
          </div>
          <div>
            Enhanced: {processedImage.width}×{processedImage.height} ({processedImage.format.toUpperCase()})
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingResults;