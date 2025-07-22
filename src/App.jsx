import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import UploadView from './views/UploadView';
import GalleryView from './views/GalleryView';
import LandingView from './views/LandingView';
import ProcessingView from './views/ProcessingView';
import AnalyticsView from './views/AnalyticsView';
import useStore from './store/useStore';
import './App.css';

function App() {
  const { darkMode } = useStore();
  const [currentView, setCurrentView] = useState('landing');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'upload':
        return <UploadView />;
      case 'gallery':
        return <GalleryView />;
      case 'processing':
        return <ProcessingView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'downloads':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Downloads</h1>
            <p className="text-gray-600 dark:text-gray-400">Download management coming soon...</p>
          </div>
        );
      case 'projects':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
            <p className="text-gray-600 dark:text-gray-400">Project management coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
          </div>
        );
      case 'help':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Help & Support</h1>
            <p className="text-gray-600 dark:text-gray-400">Help documentation coming soon...</p>
          </div>
        );
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#1e293b' : '#ffffff',
            color: darkMode ? '#ffffff' : '#374151',
            border: `1px solid ${darkMode ? '#475569' : '#e5e7eb'}`,
          },
        }}
      />
    </div>
  );
}

export default App;