import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-pink-700 to-purple-800 opacity-80"></div>
      <div className="absolute top-10 left-10 w-60 h-60 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10 p-10 rounded-2xl glass-effect border-white/20 shadow-2xl max-w-lg"
      >
        <AlertTriangle className="w-24 h-24 text-yellow-300 mx-auto mb-8 animate-pulse-slow" />
        <h1 className="text-6xl font-extrabold text-white mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-200 mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;