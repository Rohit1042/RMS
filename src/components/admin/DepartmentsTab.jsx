import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/components/ui/use-toast';

const DepartmentsTab = () => {
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const openDialog = (item = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        updateDepartment(editingItem.id, formData);
        toast({ title: "Department Updated! ✅", description: "Department information has been updated successfully." });
      } else {
        addDepartment(formData);
        toast({ title: "Department Added! 🎉", description: "New department has been added successfully." });
      }
      closeDialog();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while saving department data.", variant: "destructive" });
    }
  };

  const handleDelete = (id) => {
    try {
      deleteDepartment(id);
      toast({ title: "Department Deleted! 🗑️", description: "Department has been removed successfully." });
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while deleting department data.", variant: "destructive" });
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Department' : 'Add New Department'}</DialogTitle>
              <DialogDescription className="text-gray-300">
                {editingItem ? 'Update department information.' : 'Enter department details to add to the system.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Department Name</Label>
                <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 border-white/20" required />
              </div>
              <div>
                <Label htmlFor="code">Department Code</Label>
                <Input id="code" value={formData.code || ''} onChange={(e) => setFormData({...formData, code: e.target.value})} className="bg-white/10 border-white/20" required />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-yellow-600 to-orange-600">{editingItem ? 'Update' : 'Add'} Department</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Departments List</CardTitle>
          <CardDescription className="text-gray-300">Manage academic departments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Department Name</TableHead>
                <TableHead className="text-white">Code</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.id} className="hover:bg-white/5">
                  <TableCell className="text-white">{department.name}</TableCell>
                  <TableCell className="text-white">{department.code}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(department)} className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(department.id)}><Trash2 className="w-4 h-4" /></Button>
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

export default DepartmentsTab;