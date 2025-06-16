import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Mail, Phone, Save, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567890',
    role: 'Administrator',
    avatarUrl: 'https://i.pravatar.cc/150?u=admin', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated! ✅',
      description: 'Your profile information has been saved. (This is a demo)',
    });
  };

  return (
    <AdminLayout activeTab="profile">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center space-x-3 mb-8">
          <User className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl font-bold text-white gradient-text">Admin Profile</h1>
        </div>

        <Card className="glass-effect border-white/20 shadow-2xl">
          <CardHeader className="text-center border-b border-white/10 pb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-32 h-32 mx-auto mb-4"
            >
              <Avatar className="w-32 h-32 border-4 border-purple-500 shadow-lg">
                <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                <AvatarFallback className="text-4xl bg-gray-700 text-white">
                  {profileData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full bg-white/80 hover:bg-white text-purple-600 border-purple-500"
                  onClick={() => toast({ title: "🚧 Feature not implemented", description: "Avatar upload is coming soon!"})}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
            <CardTitle className="text-3xl text-white">{profileData.name}</CardTitle>
            <CardDescription className="text-lg text-purple-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-green-400" />
              {profileData.role}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-70"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              {isEditing ? (
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default ProfilePage;