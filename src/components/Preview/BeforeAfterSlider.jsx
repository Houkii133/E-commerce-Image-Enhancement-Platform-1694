import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowLeft, FiArrowRight } = FiIcons;

const BeforeAfterSlider = ({ beforeImage, afterImage, alt = 'Image comparison' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square overflow-hidden rounded-lg cursor-col-resize"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Before Image (Full width) */}
      <img
        src={beforeImage}
        alt={`${alt} (before)`}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* After Image (Clipped) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt={`${alt} (after)`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(_, info) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const percentage = (info.point.x / rect.width) * 100;
          setSliderPosition(Math.max(0, Math.min(100, percentage)));
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex space-x-1">
            <SafeIcon icon={FiArrowLeft} className="w-3 h-3 text-gray-600" />
            <SafeIcon icon={FiArrowRight} className="w-3 h-3 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 rounded text-white text-sm">
        Before
      </div>
      <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-white text-sm">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;