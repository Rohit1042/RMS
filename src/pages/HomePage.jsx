
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6 pb-4 gradient-text">
            Result Management System
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            A comprehensive platform for managing academic results, student data, and institutional operations with modern design and seamless functionality.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          <Card className="glass-effect border-white/20 card-hover">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Complete CRUD operations for student records, profiles, and academic information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 card-hover">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-white">Subject & Department</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Manage subjects, departments, and academic structure with ease.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 card-hover">
            <CardHeader className="text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-white">Result Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Advanced result management with grades, CGPA calculation, and analytics.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 card-hover">
            <CardHeader className="text-center">
              <GraduationCap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Student Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Easy result lookup and PDF download functionality for students.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/admin/login">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
              Admin Dashboard
            </Button>
          </Link>

          <Link to="/student">
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
              Student Portal
            </Button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-300">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-300">Subjects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-gray-300">Departments</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-300">Results</div>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
         <div>
          <footer>
          <p className="text-center text-white mx-auto">© 2025 Result Management System by SAR | All rights reserved  </p>
        </footer>
         </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
