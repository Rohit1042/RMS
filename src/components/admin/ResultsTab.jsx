import React, { useState, useEffect } from 'react';
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

const ResultsTab = () => {
  const { students, subjects, results, addResult, updateResult, deleteResult } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    rollNumber: '',
    semester: '',
    subjects: [], 
    totalMarks: 0,
    totalFullMarks: 0,
    percentage: 0,
    cgpa: 0,
  });

  const calculateGrade = (marks, fullMarks) => {
    const percentage = (marks / fullMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'F';
  };
  
  useEffect(() => {
    if (formData.subjects && formData.subjects.length > 0) {
      let obtainedMarks = 0;
      let totalFull = 0;
      formData.subjects.forEach(sub => {
        obtainedMarks += parseFloat(sub.marks || 0);
        totalFull += parseFloat(sub.fullMarks || 100);
      });
      const percentage = totalFull > 0 ? (obtainedMarks / totalFull) * 100 : 0;
      const cgpa = percentage > 0 ? (percentage / 10).toFixed(2) : 0;

      setFormData(prev => ({
        ...prev,
        totalMarks: obtainedMarks,
        totalFullMarks: totalFull,
        percentage: parseFloat(percentage.toFixed(2)),
        cgpa: parseFloat(cgpa),
      }));
    } else {
       setFormData(prev => ({
        ...prev,
        totalMarks: 0,
        totalFullMarks: 0,
        percentage: 0,
        cgpa: 0,
      }));
    }
  }, [formData.subjects]);


  const openDialog = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        studentId: '',
        rollNumber: '',
        semester: '',
        subjects: subjects.map(sub => ({
          subjectId: sub.id,
          subjectName: sub.name,
          marks: '',
          fullMarks: sub.fullMarks || 100,
          grade: '',
        })),
        totalMarks: 0,
        totalFullMarks: 0,
        percentage: 0,
        cgpa: 0,
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleStudentChange = (studentId) => {
    if (!studentId) {
      setFormData(prev => ({ ...prev, studentId: '', rollNumber: ''}));
      return;
    }
    const student = students.find(s => s.id === studentId);
    setFormData(prev => ({ ...prev, studentId, rollNumber: student ? student.rollNumber : '' }));
  };
  
  const handleSubjectMarksChange = (subjectId, marks) => {
    setFormData(prev => {
      const updatedSubjects = prev.subjects.map(sub => {
        if (sub.subjectId === subjectId) {
          const markValue = parseFloat(marks);
          if (marks === '') { 
            return { ...sub, marks: '', grade: '' };
          }
          if (isNaN(markValue) || markValue < 0 || markValue > sub.fullMarks) {
             toast({ title: "Invalid Marks", description: `Marks for ${sub.subjectName} must be between 0 and ${sub.fullMarks}.`, variant: "destructive"});
             return {...sub, marks: ''}; 
          }
          return { ...sub, marks: markValue, grade: calculateGrade(markValue, sub.fullMarks) };
        }
        return sub;
      });
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.studentId || !formData.semester) {
      toast({ title: "Missing Information", description: "Please select a student and enter semester.", variant: "destructive"});
      return;
    }
    const allMarksEntered = formData.subjects.every(sub => sub.marks !== '' && sub.marks !== null && !isNaN(parseFloat(sub.marks)));
    if(!allMarksEntered) {
       toast({ title: "Missing Marks", description: "Please enter marks for all subjects.", variant: "destructive"});
       return;
    }

    try {
      if (editingItem) {
        updateResult(editingItem.id, formData);
        toast({ title: "Result Updated! ✅", description: "Result has been updated successfully." });
      } else {
        addResult(formData);
        toast({ title: "Result Added! 🎉", description: "New result has been added successfully." });
      }
      closeDialog();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while saving result data.", variant: "destructive" });
    }
  };

  const handleDelete = (id) => {
    try {
      deleteResult(id);
      toast({ title: "Result Deleted! 🗑️", description: "Result has been removed successfully." });
    } catch (error)
 {
      toast({ title: "Error", description: "An error occurred while deleting result data.", variant: "destructive" });
    }
  };

  const filteredResults = results.filter(result =>
    result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search results by Roll No or Semester..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Result
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Result' : 'Add New Result'}</DialogTitle>
              <DialogDescription className="text-gray-300">
                {editingItem ? 'Update result details.' : 'Enter result details for a student.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student</Label>
                  <Select value={formData.studentId || undefined} onValueChange={handleStudentChange} disabled={!!editingItem}>
                    <SelectTrigger className="bg-white/10 border-white/20"><SelectValue placeholder="Select Student" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placeholder-disabled-value" disabled>Select Student</SelectItem>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name} ({student.rollNumber})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Input id="semester" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} className="bg-white/10 border-white/20" placeholder="e.g., Fall 2023" required />
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-semibold text-gray-200">Subject Marks</h3>
                {formData.subjects && formData.subjects.map((subjectEntry, index) => (
                  <div key={subjectEntry.subjectId || index} className="grid grid-cols-3 gap-3 items-center">
                    <Label htmlFor={`subject-marks-${subjectEntry.subjectId}`} className="col-span-1 text-gray-300 truncate" title={subjectEntry.subjectName}>
                      {subjectEntry.subjectName} (Full: {subjectEntry.fullMarks})
                    </Label>
                    <Input
                      id={`subject-marks-${subjectEntry.subjectId}`}
                      type="number"
                      placeholder="Marks"
                      value={subjectEntry.marks}
                      onChange={(e) => handleSubjectMarksChange(subjectEntry.subjectId, e.target.value)}
                      className="bg-white/10 border-white/20 col-span-1"
                      max={subjectEntry.fullMarks}
                      min="0"
                    />
                    <Input
                        type="text"
                        placeholder="Grade"
                        value={subjectEntry.grade}
                        className="bg-white/10 border-white/20 col-span-1"
                        disabled
                      />
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-md font-semibold text-gray-200 mb-2">Summary</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-300">
                  <p>Total Marks: <span className="font-bold text-white">{formData.totalMarks} / {formData.totalFullMarks}</span></p>
                  <p>Percentage: <span className="font-bold text-white">{formData.percentage}%</span></p>
                  <p>CGPA: <span className="font-bold text-white">{formData.cgpa}</span></p>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600">{editingItem ? 'Update' : 'Add'} Result</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Results List</CardTitle>
          <CardDescription className="text-gray-300">Manage student results and grades.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Roll Number</TableHead>
                <TableHead className="text-white">Semester</TableHead>
                <TableHead className="text-white">Total Marks</TableHead>
                <TableHead className="text-white">Percentage</TableHead>
                <TableHead className="text-white">CGPA</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id} className="hover:bg-white/5">
                  <TableCell className="text-white">{result.rollNumber}</TableCell>
                  <TableCell className="text-white">{result.semester}</TableCell>
                  <TableCell className="text-white">{result.totalMarks} / {result.totalFullMarks}</TableCell>
                  <TableCell className="text-white">{result.percentage}%</TableCell>
                  <TableCell className="text-white">{result.cgpa}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { openDialog(result); toast({title: "Note:", description:"Editing student and semester for existing results is disabled."}) }}
                        className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(result.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default ResultsTab;