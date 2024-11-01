import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="flex flex-col items-center max-w-lg mx-auto text-center">
        <div className="relative">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute -bottom-2 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500 blur-sm" />
        </div>
        
        <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for seems to have wandered off to listen to some tunes. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-green-400 rounded-xl hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <HomeIcon className="w-5 h-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 dark:focus:ring-offset-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;