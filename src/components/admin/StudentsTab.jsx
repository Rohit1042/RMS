import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

const StudentsTab = () => {
  const { students, departments, addStudent, updateStudent, deleteStudent } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    department: undefined,
    dateOfBirth: '',
    phone: ''
  });

  const openDialog = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({
        rollNumber: item.rollNumber || '',
        name: item.name || '',
        email: item.email || '',
        department: item.department || undefined,
        dateOfBirth: item.dateOfBirth || '',
        phone: item.phone || ''
      });
    } else {
      setFormData({
        rollNumber: '',
        name: '',
        email: '',
        department: undefined,
        dateOfBirth: '',
        phone: ''
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      rollNumber: '',
      name: '',
      email: '',
      department: undefined,
      dateOfBirth: '',
      phone: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rollNumber || !formData.name || !formData.email || !formData.department || !formData.dateOfBirth) {
      toast({ title: "Missing Information", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    try {
      if (editingItem) {
        updateStudent(editingItem.id, formData);
        toast({ title: "Student Updated! ✅", description: "Student information has been updated successfully." });
      } else {
        addStudent(formData);
        toast({ title: "Student Added! 🎉", description: "New student has been added successfully." });
      }
      closeDialog();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while saving student data.", variant: "destructive" });
    }
  };

  const handleDelete = (id) => {
    try {
      deleteStudent(id);
      toast({ title: "Student Deleted! 🗑️", description: "Student has been removed successfully." });
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while deleting student data.", variant: "destructive" });
    }
  };

  const filteredStudents = students.filter(student =>
    (student.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.rollNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Student' : 'Add New Student'}</DialogTitle>
              <DialogDescription className="text-gray-300">
                {editingItem ? 'Update student information.' : 'Enter student details to add to the system.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" value={formData.rollNumber} onChange={(e) => setFormData({...formData, rollNumber: e.target.value})} className="bg-white/10 border-white/20" required />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 border-white/20" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/10 border-white/20" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={formData.department || undefined} 
                    onValueChange={(value) => setFormData({...formData, department: value})}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="bg-white/10 border-white/20" required />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/10 border-white/20" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">{editingItem ? 'Update' : 'Add'} Student</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Students List</CardTitle>
          <CardDescription className="text-gray-300">Manage student records and information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Roll Number</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Department</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-white/5">
                  <TableCell className="text-white">{student.rollNumber}</TableCell>
                  <TableCell className="text-white">{student.name}</TableCell>
                  <TableCell className="text-white">{student.email}</TableCell>
                  <TableCell className="text-white">{student.department}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(student)} className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTab;