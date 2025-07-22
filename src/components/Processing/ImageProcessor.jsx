import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import BeforeAfterSlider from '../Preview/BeforeAfterSlider';
import QuickSettings from './QuickSettings';
import ProcessingResults from '../Results/ProcessingResults';
import { ImageEnhancer } from '../../utils/imageEnhancer';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

const { FiLoader, FiZap, FiImage, FiCrop, FiTrash2, FiDownload } = FiIcons;

const ImageProcessor = ({ image }) => {
  const { updateImage } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingType, setProcessingType] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [processingTime, setProcessingTime] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('jpg');
  const [quality, setQuality] = useState(90);
  const [showResults, setShowResults] = useState(false);

  const resetProcess = () => {
    setProcessedImage(null);
    setShowResults(false);
  };

  const handleProcess = async (type, options = {}) => {
    if (isProcessing) return;
    
    // Validate free tier limits
    const validation = ImageEnhancer.validateFreeTier(image.file);
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }
    
    setIsProcessing(true);
    setProcessingType(type);
    const startTime = Date.now();
    
    try {
      let result;
      switch (type) {
        case 'auto-enhance':
          result = await ImageEnhancer.autoEnhance(image.file);
          break;
        case 'background-removal':
          result = await ImageEnhancer.removeBackground(image.file);
          break;
        case 'resize':
          result = await ImageEnhancer.resizeImage(image.file, options.width, options.height);
          break;
        case 'preset':
          result = await ImageEnhancer.applyPreset(image.file, options.preset);
          break;
        case 'upscale':
          result = await ImageEnhancer.upscaleImage(image.file, options.scale || 2);
          break;
        default:
          throw new Error('Unknown processing type');
      }
      
      const endTime = Date.now();
      setProcessingTime(((endTime - startTime) / 1000).toFixed(1));
      
      // Create a processed image object
      const processedImageObj = {
        file: result,
        url: URL.createObjectURL(result),
        size: result.size,
        format: result.type.split('/')[1],
        width: 0,
        height: 0
      };
      
      // Get dimensions
      const img = new Image();
      img.onload = () => {
        processedImageObj.width = img.width;
        processedImageObj.height = img.height;
        setProcessedImage(processedImageObj);
        setShowResults(true);
      };
      img.src = processedImageObj.url;
      
      // Update the image in store
      updateImage(image.id, {
        processedFile: result,
        processed: true,
        processing: false
      });
      
      toast.success('Processing completed successfully!');
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };
  
  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
  };
  
  const handleApplyPreset = (preset) => {
    handleProcess('preset', { preset });
  };
  
  const handleDownload = () => {
    if (!processedImage) return;
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = processedImage.url;
    downloadLink.download = `enhanced-${image.name}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast.success('Download started!');
  };
  
  const handleProcessMore = () => {
    resetProcess();
  };
  
  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Original Image Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Original Image
              </h2>
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-700">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{image.metadata.width} × {image.metadata.height}</span>
                <span>•</span>
                <span>{image.metadata.format.toUpperCase()}</span>
                <span>•</span>
                <span>{(image.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
            
            {/* Processing Options */}
            <div className="mt-6 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Enhancement Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleProcess('auto-enhance')}
                  disabled={isProcessing}
                  className="flex items-center justify-center space-x-3 p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                >
                  <SafeIcon icon={FiZap} className="w-5 h-5 text-primary-600" />
                  <span className="font-medium">Auto Enhance</span>
                </button>
                <button
                  onClick={() => handleProcess('background-removal')}
                  disabled={isProcessing}
                  className="flex items-center justify-center space-x-3 p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                >
                  <SafeIcon icon={FiImage} className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Remove Background</span>
                </button>
                <button
                  onClick={() => handleProcess('resize', { width: 1000, height: 1000 })}
                  disabled={isProcessing}
                  className="flex items-center justify-center space-x-3 p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                >
                  <SafeIcon icon={FiCrop} className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Resize (1000×1000)</span>
                </button>
                <button
                  onClick={() => handleProcess('upscale', { scale: 2 })}
                  disabled={isProcessing}
                  className="flex items-center justify-center space-x-3 p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                >
                  <SafeIcon icon={FiZap} className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">2x Upscale</span>
                </button>
              </div>
              
              {/* Common Size Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Common E-commerce Sizes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleProcess('resize', { width: 1600, height: 1600 })}
                    disabled={isProcessing}
                    className="p-2 text-sm text-center border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                  >
                    Amazon (1600×1600)
                  </button>
                  <button
                    onClick={() => handleProcess('resize', { width: 2048, height: 2048 })}
                    disabled={isProcessing}
                    className="p-2 text-sm text-center border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                  >
                    Shopify (2048×2048)
                  </button>
                  <button
                    onClick={() => handleProcess('resize', { width: 2000, height: 2000 })}
                    disabled={isProcessing}
                    className="p-2 text-sm text-center border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                  >
                    Square (2000×2000)
                  </button>
                </div>
              </div>
              
              {/* Processing Indicator */}
              {isProcessing && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiLoader} className="w-5 h-5 text-blue-600 animate-spin mr-2" />
                  <span className="text-blue-700 dark:text-blue-300">
                    {processingType === 'auto-enhance' && 'Enhancing image...'}
                    {processingType === 'background-removal' && 'Removing background...'}
                    {processingType === 'resize' && 'Resizing image...'}
                    {processingType === 'preset' && 'Applying preset...'}
                    {processingType === 'upscale' && 'Upscaling image...'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Settings Panel */}
          <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Settings
            </h2>
            <QuickSettings
              onApplyPreset={handleApplyPreset}
              onFormatChange={handleFormatChange}
              onQualityChange={handleQualityChange}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Before/After Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Before & After
              </h2>
              <BeforeAfterSlider
                beforeImage={image.url}
                afterImage={processedImage.url}
                alt={image.name}
              />
              
              <div className="mt-6 flex flex-wrap justify-between text-sm">
                <div className="space-y-1 text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">Original:</span> {image.metadata.width} × {image.metadata.height} ({image.metadata.format.toUpperCase()})</p>
                  <p><span className="font-medium">Size:</span> {(image.size / 1024).toFixed(1)} KB</p>
                </div>
                <div className="space-y-1 text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">Enhanced:</span> {processedImage.width} × {processedImage.height} ({processedImage.format.toUpperCase()})</p>
                  <p><span className="font-medium">Size:</span> {(processedImage.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleProcessMore}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiZap} className="w-4 h-4" />
                  <span>Process Again</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Panel */}
          <div>
            <ProcessingResults
              originalImage={{
                size: image.size,
                width: image.metadata.width,
                height: image.metadata.height,
                format: image.metadata.format
              }}
              processedImage={{
                size: processedImage.size,
                width: processedImage.width,
                height: processedImage.height,
                format: processedImage.format
              }}
              processingTime={processingTime}
              onDownload={handleDownload}
              onShare={handleShare}
              onProcessMore={handleProcessMore}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;