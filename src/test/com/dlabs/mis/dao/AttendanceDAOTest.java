
package com.dlabs.mis.dao;

import com.dlabs.mis.model.AttendanceSheet;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
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
public class AttendanceDAOTest {
    @Autowired
    AttendanceDAO attendanceDAO;
    Connection conn = null;
    
    public AttendanceDAOTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }
    
    @Before
    public void setUp() throws Exception {
        conn = DbPool.getConnection();
    }

    @After
    public void tearDown() throws Exception {
        conn.commit();
        DbPool.close(conn);
    }


    /**
     * Test of updateAttendanceSheet method, of class AttendanceDAO.
     */
  
    public void testUpdateAttendanceSheet() {
        System.out.println("updateAttendanceSheet");
         AttendanceSheet sheet = new AttendanceSheet();
         sheet.setMonth("TEST-2013");
         sheet.setBatchId("2013kjkljkl");
         sheet.setId(2);
         assertNotNull(attendanceDAO.updateAttendanceSheet(conn,sheet));
    }

    /**
     * Test of getAttendanceSheets method, of class AttendanceDAO.
     */
 
    public void testGetAttendanceSheets() {
        try {
            System.out.println("getAttendanceSheets");
            JSONObject result = attendanceDAO.getAttendanceSheets(conn);
             System.out.println(result.toString());
             assertNotNull(result);
        } catch (ReadableException ex) {
            Logger.getLogger(AttendanceDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of addAttendanceSheet method, of class AttendanceDAO.
     */
    @Test
    public void testAddAttendanceSheet() {
        try {
            System.out.println("addAttendanceSheet");
            AttendanceSheet sheet = new AttendanceSheet();
            sheet.setMonth("Aug-2013");
            sheet.setBatchId("0fa296c7-56ee-1031-ba06-514c88c441f5");
            assertNotNull(attendanceDAO.addAttendanceSheet(conn, sheet));
        } catch (ReadableException ex) {
            Logger.getLogger(AttendanceDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(AttendanceDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        }

    }
    
    /**
     * Test of deleteAttendanceSheet method, of class AttendanceDAO.
     */
    
    public void testDeleteAttendanceSheet() {
        try {
            System.out.println("deleteAttendanceSheet");
            int sheetId = 7;
            assertNotNull(attendanceDAO.deleteAttendanceSheet(conn,sheetId));
        } catch (ReadableException ex) {
            Logger.getLogger(AttendanceDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
