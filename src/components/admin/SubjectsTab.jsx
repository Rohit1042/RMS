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

const SubjectsTab = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const openDialog = (item = null) => {
    setEditingItem(item);
    setFormData(item || { fullMarks: 100 }); // Default fullMarks to 100
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
        updateSubject(editingItem.id, formData);
        toast({ title: "Subject Updated! ✅", description: "Subject information has been updated successfully." });
      } else {
        addSubject(formData);
        toast({ title: "Subject Added! 🎉", description: "New subject has been added successfully." });
      }
      closeDialog();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while saving subject data.", variant: "destructive" });
    }
  };

  const handleDelete = (id) => {
    try {
      deleteSubject(id);
      toast({ title: "Subject Deleted! 🗑️", description: "Subject has been removed successfully." });
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while deleting subject data.", variant: "destructive" });
    }
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
              <DialogDescription className="text-gray-300">
                {editingItem ? 'Update subject information.' : 'Enter subject details to add to the system.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Subject Name</Label>
                <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 border-white/20" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="code">Subject Code</Label>
                  <Input id="code" value={formData.code || ''} onChange={(e) => setFormData({...formData, code: e.target.value})} className="bg-white/10 border-white/20" required />
                </div>
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Input id="credits" type="number" value={formData.credits || ''} onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})} className="bg-white/10 border-white/20" required />
                </div>
                <div>
                  <Label htmlFor="fullMarks">Full Marks</Label>
                  <Input id="fullMarks" type="number" value={formData.fullMarks || ''} onChange={(e) => setFormData({...formData, fullMarks: parseInt(e.target.value)})} className="bg-white/10 border-white/20" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-green-600 to-blue-600">{editingItem ? 'Update' : 'Add'} Subject</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Subjects List</CardTitle>
          <CardDescription className="text-gray-300">Manage academic subjects and courses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Subject Name</TableHead>
                <TableHead className="text-white">Code</TableHead>
                <TableHead className="text-white">Credits</TableHead>
                <TableHead className="text-white">Full Marks</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.id} className="hover:bg-white/5">
                  <TableCell className="text-white">{subject.name}</TableCell>
                  <TableCell className="text-white">{subject.code}</TableCell>
                  <TableCell className="text-white">{subject.credits}</TableCell>
                  <TableCell className="text-white">{subject.fullMarks || 100}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openDialog(subject)} className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(subject.id)}><Trash2 className="w-4 h-4" /></Button>
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

export default SubjectsTab;