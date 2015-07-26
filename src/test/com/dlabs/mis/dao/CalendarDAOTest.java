/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Calendar;
import com.dlabs.mis.model.Event;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
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
public class CalendarDAOTest {
    @Autowired
    CalendarDAO calendarDAO;
     Connection conn;

    /**
     * Test of addCalendar method, of class CalendarDAO.
     */
    @Before
    public void setUp() throws Exception {
        conn = DbPool.getConnection();
    }

    @After
    public void tearDown() throws Exception {
        conn.commit();
        DbPool.close(conn);
    }
    
    @Test
    public void testAddCalendar() {
        try {
            System.out.println("addCalendar");
            Calendar cal = new Calendar();
            cal.setColor("#ff0000");
            cal.setDescription("this is test");
            cal.setHidden(false);
            cal.setTitle("Test");
            Calendar result = calendarDAO.addCalendar(conn, cal);
            assertTrue(result.getId()>0);
        } catch (ReadableException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(CalendarDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(CalendarDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of addEvent method, of class CalendarDAO.
     */
    @Test
    public void testAddEvent() {
        try {
            System.out.println("addEvent");
            Event event = new Event();
            event.setCalendarId(1);
            event.setTitle("Test");
            event.setEndDate(new Date().getTime());
            event.setStartDate(new Date().getTime());
            event.setIsAllDay(true);
            event.setLocation("Pune");
            event.setNotes("defgdfg");
            Event result = calendarDAO.addEvent(conn, event);
            assertTrue(result.getEventId()>0);
        } catch (ReadableException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(CalendarDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            DbPool.rollback(conn);
            Logger.getLogger(CalendarDAOTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
