
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Building, 
  Award, 
  LogOut, 
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import OverviewTab from '@/components/admin/OverviewTab';
import StudentsTab from '@/components/admin/StudentsTab';
import SubjectsTab from '@/components/admin/SubjectsTab';
import DepartmentsTab from '@/components/admin/DepartmentsTab';
import ResultsTab from '@/components/admin/ResultsTab';
import AdminLayout from '@/components/admin/AdminLayout';


const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['overview', 'students', 'subjects', 'departments', 'results'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview'); 
    }
  }, [location.search]);


  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'students':
        return <StudentsTab />;
      case 'subjects':
        return <SubjectsTab />;
      case 'departments':
        return <DepartmentsTab />;
      case 'results':
        return <ResultsTab />;
      default:
        return <OverviewTab />;
    }
  };


  return (
    <AdminLayout activeTab={activeTab}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
