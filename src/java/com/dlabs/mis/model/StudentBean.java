/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.Collection;
import java.util.Vector;

/**
 *
 * @author cd
 */
public class StudentBean {
    private String name;
    private String classname;
    private String school;
    private String age;

    public StudentBean(){
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
    
    public static Collection getStudentList()
    {
        Vector students = new Vector();
        try
        {
            StudentBean student = new StudentBean();
            student.setAge("101");
            student.setName("Steve");
            student.setClassname("Class-1A");
            student.setSchool("PMS");
            students.add(student);
            student = new StudentBean();
            student.setAge("102");
            student.setName("Mark");
            student.setClassname("Class-1-A");
            student.setSchool("LSMV");
            students.add(student);
        }
        catch(Exception ex)
        {
            System.out.println(ex);
        }
        return students;
    }
    
}
