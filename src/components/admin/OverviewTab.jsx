import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Building, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';

const OverviewTab = () => {
  const { students, subjects, departments, results } = useData();

  const overviewCards = [
    { title: 'Total Students', value: students.length, icon: Users, color: 'text-blue-400' },
    { title: 'Total Subjects', value: subjects.length, icon: BookOpen, color: 'text-green-400' },
    { title: 'Total Departments', value: departments.length, icon: Building, color: 'text-yellow-400' },
    { title: 'Total Results', value: results.length, icon: Award, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-effect border-white/20 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{card.value}</div>
              <p className="text-xs text-gray-300">
                {card.title.toLowerCase().includes('students') ? 'Active students in system' : 
                 card.title.toLowerCase().includes('subjects') ? 'Available subjects' :
                 card.title.toLowerCase().includes('departments') ? 'Academic departments' :
                 'Published results'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewTab;