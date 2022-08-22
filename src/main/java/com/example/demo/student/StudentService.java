package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {
    @Autowired
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){

        return studentRepository.findAll();

    }

    public void addStudent(Student student) {
        if (studentRepository.selectExistsEmail(student.getEmail())){
            throw new BadRequestException("Email is taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException("Student doesnt exist");
        }
        studentRepository.deleteById(studentId);
    }
}
