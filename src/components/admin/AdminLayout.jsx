
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Award, 
  Users, 
  BookOpen, 
  Building, 
  LogOut, 
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AdminLayout = ({ children, activeTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out Successfully! 👋",
      description: "See you next time!",
    });
    navigate('/admin/login');
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Award, path: '/admin/dashboard?tab=overview' },
    { id: 'students', label: 'Students', icon: Users, path: '/admin/dashboard?tab=students' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/admin/dashboard?tab=subjects' },
    { id: 'departments', label: 'Departments', icon: Building, path: '/admin/dashboard?tab=departments' },
    { id: 'results', label: 'Results', icon: Award, path: '/admin/dashboard?tab=results' },
    { id: 'profile', label: 'Profile', icon: UserIcon, path: '/admin/profile' },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="w-64 sidebar-gradient shadow-2xl flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8 gradient-text">Admin Panel</h1>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  to={item.path}
                  key={item.id}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="p-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
