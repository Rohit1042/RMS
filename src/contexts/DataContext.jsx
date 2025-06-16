
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const savedSubjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    const savedDepartments = JSON.parse(localStorage.getItem('departments') || '[]');
    const savedResults = JSON.parse(localStorage.getItem('results') || '[]');

    if (savedStudents.length === 0) {
      const defaultStudents = [
        {
          id: '1',
          rollNumber: 'CS001',
          name: 'John Doe',
          email: 'john@example.com',
          department: 'Computer Science',
          dateOfBirth: '2000-01-15',
          phone: '+1234567890'
        },
        {
          id: '2',
          rollNumber: 'CS002',
          name: 'Jane Smith',
          email: 'jane@example.com',
          department: 'Computer Science',
          dateOfBirth: '2000-03-22',
          phone: '+1234567891'
        }
      ];
      setStudents(defaultStudents);
      localStorage.setItem('students', JSON.stringify(defaultStudents));
    } else {
      setStudents(savedStudents);
    }

    if (savedSubjects.length === 0) {
      const defaultSubjects = [
        { id: '1', name: 'Mathematics', code: 'MATH101', credits: 3, fullMarks: 100 },
        { id: '2', name: 'Physics', code: 'PHY101', credits: 4, fullMarks: 100 },
        { id: '3', name: 'Programming', code: 'CS101', credits: 4, fullMarks: 100 }
      ];
      setSubjects(defaultSubjects);
      localStorage.setItem('subjects', JSON.stringify(defaultSubjects));
    } else {
      setSubjects(savedSubjects);
    }

    if (savedDepartments.length === 0) {
      const defaultDepartments = [
        { id: '1', name: 'Computer Science', code: 'CS' },
        { id: '2', name: 'Electrical Engineering', code: 'EE' },
        { id: '3', name: 'Mechanical Engineering', code: 'ME' }
      ];
      setDepartments(defaultDepartments);
      localStorage.setItem('departments', JSON.stringify(defaultDepartments));
    } else {
      setDepartments(savedDepartments);
    }

    if (savedResults.length === 0) {
      const defaultResults = [
        {
          id: '1',
          studentId: '1',
          rollNumber: 'CS001',
          semester: 'Fall 2023',
          subjects: [
            { subjectId: '1', subjectName: 'Mathematics', marks: 85, fullMarks: 100, grade: 'A' },
            { subjectId: '2', subjectName: 'Physics', marks: 78, fullMarks: 100, grade: 'B+' },
            { subjectId: '3', subjectName: 'Programming', marks: 92, fullMarks: 100, grade: 'A+' }
          ],
          totalMarks: 255,
          totalFullMarks: 300,
          percentage: 85,
          cgpa: 8.5
        },
        {
          id: '2',
          studentId: '2',
          rollNumber: 'CS002',
          semester: 'Fall 2023',
          subjects: [
            { subjectId: '1', subjectName: 'Mathematics', marks: 90, fullMarks: 100, grade: 'A+' },
            { subjectId: '2', subjectName: 'Physics', marks: 82, fullMarks: 100, grade: 'A' },
            { subjectId: '3', subjectName: 'Programming', marks: 88, fullMarks: 100, grade: 'A' }
          ],
          totalMarks: 260,
          totalFullMarks: 300,
          percentage: 86.67,
          cgpa: 8.7
        }
      ];
      setResults(defaultResults);
      localStorage.setItem('results', JSON.stringify(defaultResults));
    } else {
      setResults(savedResults);
    }
  };

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now().toString() };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    saveToStorage('students', updatedStudents);
    return newStudent;
  };

  const updateStudent = (id, updatedStudent) => {
    const updatedStudents = students.map(student => 
      student.id === id ? { ...student, ...updatedStudent } : student
    );
    setStudents(updatedStudents);
    saveToStorage('students', updatedStudents);
  };

  const deleteStudent = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    saveToStorage('students', updatedStudents);
  };

  const addSubject = (subject) => {
    const newSubject = { ...subject, id: Date.now().toString(), fullMarks: subject.fullMarks || 100 };
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    saveToStorage('subjects', updatedSubjects);
    return newSubject;
  };

  const updateSubject = (id, updatedSubject) => {
    const updatedSubjects = subjects.map(subject => 
      subject.id === id ? { ...subject, ...updatedSubject, fullMarks: updatedSubject.fullMarks || subject.fullMarks || 100 } : subject
    );
    setSubjects(updatedSubjects);
    saveToStorage('subjects', updatedSubjects);
  };

  const deleteSubject = (id) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== id);
    setSubjects(updatedSubjects);
    saveToStorage('subjects', updatedSubjects);
  };

  const addDepartment = (department) => {
    const newDepartment = { ...department, id: Date.now().toString() };
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    saveToStorage('departments', updatedDepartments);
    return newDepartment;
  };

  const updateDepartment = (id, updatedDepartment) => {
    const updatedDepartments = departments.map(department => 
      department.id === id ? { ...department, ...updatedDepartment } : department
    );
    setDepartments(updatedDepartments);
    saveToStorage('departments', updatedDepartments);
  };

  const deleteDepartment = (id) => {
    const updatedDepartments = departments.filter(department => department.id !== id);
    setDepartments(updatedDepartments);
    saveToStorage('departments', updatedDepartments);
  };

  const addResult = (resultData) => {
    const newResult = { ...resultData, id: Date.now().toString() };
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    saveToStorage('results', updatedResults);
    return newResult;
  };

  const updateResult = (id, updatedResultData) => {
    const updatedResults = results.map(result => 
      result.id === id ? { ...result, ...updatedResultData } : result
    );
    setResults(updatedResults);
    saveToStorage('results', updatedResults);
  };

  const deleteResult = (id) => {
    const updatedResults = results.filter(result => result.id !== id);
    setResults(updatedResults);
    saveToStorage('results', updatedResults);
  };

  const getStudentResult = (rollNumber, dateOfBirth) => {
    const student = students.find(s => s.rollNumber === rollNumber && s.dateOfBirth === dateOfBirth);
    if (!student) return null;
    
    const result = results.find(r => r.rollNumber === rollNumber);
    if (result) {
      const subjectsWithFullMarks = result.subjects.map(resSub => {
        const subjectDetails = subjects.find(s => s.id === resSub.subjectId || s.name === resSub.subjectName);
        return {
          ...resSub,
          fullMarks: subjectDetails ? subjectDetails.fullMarks : 100,
        };
      });
      const totalFullMarks = subjectsWithFullMarks.reduce((sum, sub) => sum + (sub.fullMarks || 100), 0);
      return { ...result, subjects: subjectsWithFullMarks, totalFullMarks };
    }
    return null;
  };

  const value = {
    students,
    subjects,
    departments,
    results,
    addStudent,
    updateStudent,
    deleteStudent,
    addSubject,
    updateSubject,
    deleteSubject,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addResult,
    updateResult,
    deleteResult,
    getStudentResult
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
