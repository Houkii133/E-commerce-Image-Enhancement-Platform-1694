import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiZoomIn, FiZoomOut, FiRotateCw, FiMaximize2 } = FiIcons;

const PreviewPanel = ({ image }) => {
  const [zoom, setZoom] = useState(1);
  const [showComparison, setShowComparison] = useState(false);

  const originalUrl = image.url;
  const processedUrl = image.processedFile ? URL.createObjectURL(image.processedFile) : null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.1));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              showComparison
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            Compare
          </button>
          {processedUrl && (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              Processed
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiZoomOut} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiZoomIn} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiMaximize2} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-dark-900 relative">
        {showComparison && processedUrl ? (
          // Split comparison view
          <div className="h-full flex">
            <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-300 dark:border-dark-600">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Original</div>
              <div className="max-w-full max-h-full overflow-auto">
                <img
                  src={originalUrl}
                  alt="Original"
                  style={{ transform: `scale(${zoom})` }}
                  className="transition-transform origin-center"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Processed</div>
              <div className="max-w-full max-h-full overflow-auto">
                <img
                  src={processedUrl}
                  alt="Processed"
                  style={{ transform: `scale(${zoom})` }}
                  className="transition-transform origin-center"
                />
              </div>
            </div>
          </div>
        ) : (
          // Single image view
          <div className="h-full flex items-center justify-center overflow-auto">
            <motion.img
              src={processedUrl || originalUrl}
              alt={image.name}
              style={{ transform: `scale(${zoom})` }}
              className="max-w-full max-h-full object-contain transition-transform origin-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
        
        {/* Zoom overlay for mobile */}
        <div className="absolute bottom-4 right-4 md:hidden">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 p-2 flex items-center space-x-1">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
            >
              <SafeIcon icon={FiZoomOut} className="w-4 h-4" />
            </button>
            <span className="text-xs px-2">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
            >
              <SafeIcon icon={FiZoomIn} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;