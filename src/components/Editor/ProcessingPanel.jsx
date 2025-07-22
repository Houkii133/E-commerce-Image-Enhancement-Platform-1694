import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { ImageProcessor } from '../../utils/imageProcessor';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

const { 
  FiZoomIn, FiImage, FiCrop, FiPalette, FiDroplet, 
  FiSquare, FiShuffle, FiSettings, FiLoader 
} = FiIcons;

const ProcessingPanel = ({ image }) => {
  const { updateImage } = useStore();
  const [activeSection, setActiveSection] = useState('enhance');
  const [processing, setProcessing] = useState(false);

  const sections = [
    { id: 'enhance', label: 'Enhance', icon: FiZoomIn },
    { id: 'format', label: 'Format', icon: FiImage },
    { id: 'crop', label: 'Crop & Resize', icon: FiCrop },
    { id: 'background', label: 'Background', icon: FiDroplet },
    { id: 'effects', label: 'Effects', icon: FiPalette },
    { id: 'watermark', label: 'Watermark', icon: FiSquare },
  ];

  const handleProcess = async (operation, params = {}) => {
    setProcessing(true);
    updateImage(image.id, { processing: true });
    
    try {
      let processedFile;
      
      switch (operation) {
        case 'upscale':
          processedFile = await ImageProcessor.upscaleImage(image.file, params.scale);
          break;
        case 'convert':
          processedFile = await ImageProcessor.convertFormat(image.file, params.format, params.quality);
          break;
        case 'removeBackground':
          processedFile = await ImageProcessor.removeBackground(image.file);
          break;
        case 'crop':
          processedFile = await ImageProcessor.cropToRatio(image.file, params.ratio);
          break;
        case 'resize':
          processedFile = await ImageProcessor.resizeToPreset(image.file, params.preset);
          break;
        case 'watermark':
          processedFile = await ImageProcessor.addWatermark(image.file, params.text, params.options);
          break;
        default:
          throw new Error('Unknown operation');
      }
      
      updateImage(image.id, { 
        processedFile,
        processed: true,
        processing: false,
        history: [...(image.history || []), { operation, params, timestamp: Date.now() }]
      });
      
      toast.success('Processing completed successfully!');
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Processing failed. Please try again.');
      updateImage(image.id, { processing: false });
    } finally {
      setProcessing(false);
    }
  };

  const renderEnhanceSection = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">AI Upscaling</h3>
      <div className="grid grid-cols-3 gap-2">
        {[2, 4, 8].map(scale => (
          <button
            key={scale}
            onClick={() => handleProcess('upscale', { scale })}
            disabled={processing}
            className="px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {scale}x
          </button>
        ))}
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mt-6">Quality Enhancement</h3>
      <div className="space-y-2">
        <button 
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left"
          disabled={processing}
        >
          Noise Reduction
        </button>
        <button 
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left"
          disabled={processing}
        >
          Sharpen Image
        </button>
        <button 
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left"
          disabled={processing}
        >
          Color Correction
        </button>
      </div>
    </div>
  );

  const renderFormatSection = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">Convert Format</h3>
      <div className="space-y-2">
        {['jpg', 'png', 'webp'].map(format => (
          <button
            key={format}
            onClick={() => handleProcess('convert', { format, quality: 0.9 })}
            disabled={processing}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left disabled:opacity-50"
          >
            Convert to {format.toUpperCase()}
          </button>
        ))}
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mt-6">Quality Settings</h3>
      <div className="space-y-2">
        <label className="block text-sm text-gray-600 dark:text-gray-400">
          Compression Level
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          defaultValue="0.9"
          className="w-full"
        />
      </div>
    </div>
  );

  const renderCropSection = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">Aspect Ratios</h3>
      <div className="grid grid-cols-2 gap-2">
        {['1:1', '4:3', '16:9', '3:2'].map(ratio => (
          <button
            key={ratio}
            onClick={() => handleProcess('crop', { ratio })}
            disabled={processing}
            className="px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {ratio}
          </button>
        ))}
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mt-6">Platform Presets</h3>
      <div className="space-y-2">
        {[
          { key: 'amazon', label: 'Amazon (2000×2000)' },
          { key: 'shopify', label: 'Shopify (1024×1024)' },
          { key: 'ebay', label: 'eBay (1600×1600)' },
          { key: 'instagram', label: 'Instagram (1080×1080)' },
        ].map(preset => (
          <button
            key={preset.key}
            onClick={() => handleProcess('resize', { preset: preset.key })}
            disabled={processing}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left disabled:opacity-50"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderBackgroundSection = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">Background Tools</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleProcess('removeBackground')}
          disabled={processing}
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left disabled:opacity-50"
        >
          Remove Background
        </button>
        <button 
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left"
          disabled={processing}
        >
          White Background
        </button>
        <button 
          className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg text-sm font-medium transition-colors text-left"
          disabled={processing}
        >
          Custom Background
        </button>
      </div>
    </div>
  );

  const renderWatermarkSection = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">Add Watermark</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Watermark text"
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
        />
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white">
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
        </select>
        <button
          onClick={() => handleProcess('watermark', { 
            text: 'Sample Watermark',
            options: { position: 'bottom-right', opacity: 0.5 }
          })}
          disabled={processing}
          className="w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          Add Watermark
        </button>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'enhance': return renderEnhanceSection();
      case 'format': return renderFormatSection();
      case 'crop': return renderCropSection();
      case 'background': return renderBackgroundSection();
      case 'watermark': return renderWatermarkSection();
      default: return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Section Tabs */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <SafeIcon icon={section.icon} className="w-4 h-4" />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {processing && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiLoader} className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-700 dark:text-blue-300">Processing...</span>
            </div>
          </div>
        )}
        
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessingPanel;