/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.dlabs.mis.model.Calendar;
import com.dlabs.mis.model.Event;
import com.kjava.base.ReadableException;
import com.kjava.base.db.DaoUtil;
import com.kjava.base.util.JSONUtil;
import com.kjava.util.DateHelper;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kamlesh the admin
 */
@Repository
public class CalendarDAO {
    @Autowired
    JSONUtil jsonUtil;
    @Autowired
    private Properties sqlQueries;
    public Calendar addCalendar(Connection conn, Calendar cal) throws ReadableException, SQLException{
        DaoUtil.executeUpdate(conn, sqlQueries.getProperty("ADD_CALENDAR"), 
                new Object[]{cal.getTitle(),cal.getDescription(),cal.getColor(),cal.isHidden()});
        ResultSet rs = DaoUtil.executeQuery(conn, sqlQueries.getProperty("NEW_CALENDAR"), null);
        if(rs.next()){
            cal.setId(rs.getInt("id"));
        }
        return cal;
    }
    public Calendar updateCalendar(Connection conn, Calendar cal) throws ReadableException{
        DaoUtil.executeUpdate(conn, sqlQueries.getProperty("UPDATE_CALENDAR"), 
                new Object[]{cal.getTitle(),cal.getDescription(),cal.getColor(),cal.getId()});
        return cal;
    }
    public Event addEvent(Connection conn, Event event) throws ReadableException, SQLException{
       DaoUtil.executeUpdate(conn, sqlQueries.getProperty("ADD_EVENT"), 
                new Object[]{
                    event.getCalendarId(),event.getTitle(),
                    event.getStartDate(),event.getEndDate(),
                    event.getLocation(),event.getNotes(),
                    event.getUrl(),event.getReminder(),
                    event.isIsAllDay(),event.isIsNew()
                });
        ResultSet rs = DaoUtil.executeQuery(conn, sqlQueries.getProperty("NEW_EVENT"), null);
        if(rs.next()){
            event.setEventId(rs.getInt("id"));
        }
        return event;
    }

    public JSONObject getAllCalendars(Connection conn) throws ReadableException {
        String query = sqlQueries.getProperty("GET_CALENDARS");
        ResultSet rs = DaoUtil.executeQuery(conn, query, null);
        return jsonUtil.getJsonObject(rs, 0, 1, 25);
        
    }

    public Object getAllCalendar(Connection conn, int calId) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public int deleteCalendar(Connection conn, int calId) throws ReadableException {
        return DaoUtil.executeUpdate(conn, sqlQueries.getProperty("DEL_CALENDAR"), new Object[]{calId});
    }

    public Event updateEvent(Connection conn, Event event) throws ReadableException {
        DaoUtil.executeUpdate(conn, sqlQueries.getProperty("UPDATE_EVENT"), 
                new Object[]{
                    event.getCalendarId(),event.getTitle(),
                    event.getStartDate(),event.getEndDate(),
                    event.getLocation(),event.getNotes(),
                    event.getUrl(),event.getReminder(),
                    event.isIsAllDay(),event.isIsNew()
                });
        return event;
    }

    public Object getAllEvents(Connection conn, String start, String end) throws ReadableException {
        try {
            String query = sqlQueries.getProperty("GET_EVENTS");
             long s = DateHelper.getDate(start, "MM-dd-yyyy")/1000;
             long e = DateHelper.getDate(end, "MM-dd-yyyy")/1000+86399;
            ResultSet rs = DaoUtil.executeQuery(conn, query, new Object[]{s,e});
            return jsonUtil.getJsonObject(rs, 0, 1, 25);
        } catch (ParseException ex) {
            Logger.getLogger(CalendarDAO.class.getName()).log(Level.SEVERE, null, ex);
            throw new ReadableException(ex, "Exception in parsing date"+ex.getMessage(), this.getClass().getName(), "getAllEvents");
        }
    }

    public int deleteEvent(Connection conn, int eventId) throws ReadableException {
        return DaoUtil.executeUpdate(conn, sqlQueries.getProperty("DEL_EVENT"), new Object[]{eventId});
    }
}
