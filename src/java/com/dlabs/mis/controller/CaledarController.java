package com.dlabs.mis.controller;

import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.CalendarDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.model.Calendar;
import com.dlabs.mis.model.Event;
import com.dlabs.mis.model.Master;
import com.kjava.base.db.DbPool;
import com.kjava.util.DateHelper;
import java.sql.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Kamlesh the admin
 */
@Controller
public class CaledarController {

    @Autowired
    CalendarDAO calendarDAO;
    Connection conn = null;

    @RequestMapping(value = URLMap.CALENDARS, method = RequestMethod.GET)
    @ResponseBody
    public String getCalendars() {
        try {
            conn = DbPool.getConnection();
            return calendarDAO.getAllCalendars(conn).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }
    @RequestMapping(value = URLMap.CALENDAR, method = RequestMethod.GET)
    @ResponseBody
    public String getCalendar(@PathVariable("id") int calId) {
        try {
            conn = DbPool.getConnection();
            return calendarDAO.getAllCalendar(conn, calId).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }
    @RequestMapping(value = URLMap.CALENDAR, method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteCalendar(@PathVariable("id") int calId) {
        String result = "{sucess:true}";
        try {
            conn = DbPool.getConnection();
            calendarDAO.deleteCalendar(conn, calId);
            conn.commit();
        } catch (Exception ex) {
            result = "{sucess:false}";
        } finally {
            DbPool.close(conn);
        }
        return result;
    }
    @RequestMapping(value = URLMap.ADD_CALENDAR, method = RequestMethod.POST)
    @ResponseBody
    public Calendar addCalendar(@RequestBody Calendar calendar) {
        try {
            conn = DbPool.getConnection();
            calendar= calendarDAO.addCalendar(conn, calendar);
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
        } finally {
            DbPool.close(conn);
        }
        return calendar;
    }
    @RequestMapping(value = URLMap.CALENDAR, method = RequestMethod.PUT)
    @ResponseBody
    public Calendar updateCalendar(@PathVariable("id") int id,@RequestBody Calendar calendar) {
        try {
            calendar.setId(id);
            conn = DbPool.getConnection();
            calendar= calendarDAO.updateCalendar(conn, calendar);
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
        } finally {
            DbPool.close(conn);
        }
        return calendar;
    }
    
    
    
    @RequestMapping(value = URLMap.EVENTS, method = RequestMethod.POST)
    @ResponseBody
    public Event addEvent(@RequestBody Event event) {
        try {
            conn = DbPool.getConnection();
            event=calendarDAO.addEvent(conn, event);
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
        } finally {
            DbPool.close(conn);
        }
        return event;
    }
    
    @RequestMapping(value = URLMap.EVENTS_ID, method = RequestMethod.PUT)
    @ResponseBody
    public Event updatevent(@PathVariable("eventId") int id,@RequestBody Event event) {
        try {
            event.setEventId(id);
            conn = DbPool.getConnection();
            event= calendarDAO.updateEvent(conn, event);
            conn.commit();
        } catch (Exception ex) {
            DbPool.rollback(conn);
        } finally {
            DbPool.close(conn);
        }
        return event;
    }
    @RequestMapping(value = URLMap.EVENTS, method = RequestMethod.GET)
    @ResponseBody
    public String getEvents(@RequestParam("start") String start, @RequestParam("end") String end) {
        try {
            conn = DbPool.getConnection();
            return calendarDAO.getAllEvents(conn,start,end).toString();
        } catch (Exception ex) {
        } finally {
            DbPool.close(conn);
        }
        return "";
    }
//    @RequestMapping(value = URLMap.CALENDAR, method = RequestMethod.GET)
//    @ResponseBody
//    public String getCalendarEvent(@PathVariable("id") int calId) {
//        try {
//            conn = DbPool.getConnection();
//            return calendarDAO.getAllCalendar(conn, calId).toString();
//        } catch (Exception ex) {
//        } finally {
//            DbPool.close(conn);
//        }
//        return "";
//    }
    @RequestMapping(value = URLMap.EVENTS_ID, method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteEvent(@PathVariable("eventId") int eventId) {
        String result = "{sucess:true}";
        try {
            conn = DbPool.getConnection();
            calendarDAO.deleteEvent(conn, eventId);
            conn.commit();
        } catch (Exception ex) {
            result = "{sucess:false}";
        } finally {
            DbPool.close(conn);
        }
        return result;
    }
}
