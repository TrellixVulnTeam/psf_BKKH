package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/students")
@AllArgsConstructor
public class StudentController {
    @Autowired
    public final StudentService studentService;
    @GetMapping
    public List<Student> getAllStudents() {
//        return List.of(new Student(101L,"Simo101", "dddd", Gender.FEMALE));
        return studentService.getAllStudents();
    }
    //for commit
    @PostMapping
    public void addStudent(@RequestBody Student student) {

            studentService.addStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public  void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudent(studentId);

    }
}
