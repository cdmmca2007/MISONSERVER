/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

import com.dlabs.mis.model.AttendanceSheet;
import org.junit.*;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 *
 * @author Kamlesh the admin
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { 
    "/app-context.xml"
})
public class AttendanceControllerTest {
    
    @Autowired
    AttendanceController attendanceController;
    
    public AttendanceControllerTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of getAttendanceSheets method, of class AttendanceController.
     */
    @Test
    public void testGetAttendanceSheets() {
        System.out.println("getAttendanceSheets");
        
        String result = attendanceController.getAttendanceSheets();
        System.out.println(result);
        assertNotNull(result);
        
    }

    /**
     * Test of addAttendanceSheet method, of class AttendanceController.
     */
   
    public void testAddAttendanceSheet() {
        System.out.println("addAttendanceSheet");
        AttendanceSheet sheet = null;
        AttendanceController instance = new AttendanceController();
        AttendanceSheet expResult = null;
        AttendanceSheet result = instance.addAttendanceSheet(sheet);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of deleteAttendaceSheet method, of class AttendanceController.
     */
   
    public void testDeleteAttendaceSheet() {
        System.out.println("deleteAttendaceSheet");
        int sheetId = 0;
        AttendanceController instance = new AttendanceController();
        String expResult = "";
        String result = instance.deleteAttendaceSheet(sheetId);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of updateAttendaceSheet method, of class AttendanceController.
     */
  
    public void testUpdateAttendaceSheet() {
        System.out.println("updateAttendaceSheet");
        int id = 0;
        AttendanceSheet sheet = null;
        AttendanceController instance = new AttendanceController();
        AttendanceSheet expResult = null;
        AttendanceSheet result = instance.updateAttendaceSheet(id, sheet);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getMonthlyAttendance method, of class AttendanceController.
     */

    public void testGetMonthlyAttendance() {
        System.out.println("getMonthlyAttendance");
        AttendanceController instance = new AttendanceController();
        String expResult = "";
        String result = instance.getMonthlyAttendance();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
}
