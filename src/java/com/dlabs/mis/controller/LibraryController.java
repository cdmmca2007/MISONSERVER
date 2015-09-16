/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.controller;

/**
 *
 * @author cd
 */
import com.dlabs.constants.MISConstant;
import com.dlabs.constants.URLMap;
import com.dlabs.mis.dao.ClassDAO;
import com.dlabs.mis.dao.LibraryDAO;
import com.dlabs.mis.dao.MasterDAO;
import com.dlabs.mis.dao.PaymentDAO;
import com.dlabs.mis.model.*;
import com.dlabs.session.AuthHandler;

import com.kjava.base.db.DbPool;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class LibraryController {

        Connection conn = null;
       
        @Autowired
        private LibraryDAO libraryDAO;
        
        public void setlibraryDAO(LibraryDAO libraryDAO) {
        this.libraryDAO = libraryDAO;
        }
        
        
    @RequestMapping(value=URLMap.ADD_BOOK, method=RequestMethod.POST)
    @ResponseBody
    public BookDetail addBook(@RequestBody BookDetail obj){
        try{
            conn = DbPool.getConnection();
           return libraryDAO.addOrEditBook(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.GET_BOOKLIST, method= RequestMethod.GET)
    @ResponseBody
    public String getBookList(@RequestParam("columnname")  String columnname,
                              @RequestParam("columnvalue") String columnvalue
    ){
       try{
            String searchstring="";
            conn = DbPool.getConnection();
            if (columnname!=null && !columnname.equals("") && columnvalue !=null && !columnvalue.equals(""))
               searchstring=" "+columnname+" like"+"\"%"+columnvalue+"%\"";
           return libraryDAO.getAllBooksAsJson(conn,searchstring,0,25).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }


    @RequestMapping(value=URLMap.GET_BOOKDETAIL, method= RequestMethod.GET)
    @ResponseBody
    public String getBookDetail(@RequestParam("id") String id){
       try{
            conn = DbPool.getConnection();
           return libraryDAO.getBookDetail(conn,id).toString();
        }
       
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

    @RequestMapping(value=URLMap.ISSUE_BOOK, method=RequestMethod.POST)
    @ResponseBody
    public BookTransaction addIssueBook(@RequestBody BookTransaction obj){
        try{
            conn = DbPool.getConnection();
           return libraryDAO.addIssueBook(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }

    @RequestMapping(value=URLMap.GET_ISSUE_BOOK, method= RequestMethod.GET)
    @ResponseBody
    public String getAllIssuedBooksAsJson(@RequestParam("issueto") String issueto,
                                          @RequestParam("teacherid") String teacherid,
                                          @RequestParam("studentid") String studentid,
                                          @RequestParam("classid") String classid,
                                          @RequestParam("sessionid") String sessionid
            
            ){
       try{
            conn = DbPool.getConnection();
           return libraryDAO.getAllIssuedBooksAsJson(conn,Integer.parseInt(issueto),teacherid,classid,sessionid,studentid,1,25).toString();
        }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }

    @RequestMapping(value=URLMap.RETURN_ISSUE_BOOK, method=RequestMethod.POST)
    @ResponseBody
    public BookTransaction returnIssueBook(@RequestBody BookTransaction obj){
        try{
            conn = DbPool.getConnection();
           return libraryDAO.returnIssueBook(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    
    @RequestMapping(value=URLMap.RENEWAL_BOOK, method=RequestMethod.POST)
    @ResponseBody
    public BookTransaction renewalIssueBook(@RequestBody BookTransaction obj){
        try{
            conn = DbPool.getConnection();
           return libraryDAO.renewalIssueBook(conn,obj);
        }
        catch(Exception ex){
            
        }finally{
            DbPool.close(conn);
        }
        return obj;
    }
    @RequestMapping(value=URLMap.DELETE_BOOK, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> deleteBook(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("modifiedby",id);
           return libraryDAO.deleteBook(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
     }
    @RequestMapping(value=URLMap.ADD_BOOK_DEMAND, method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addBookRequest(HttpServletRequest request,@RequestBody Map<String,Object> model){
        
       try{
           conn = DbPool.getConnection();
           String id=AuthHandler.getUserId(request);
           model.put("createdby",id);
           model.put("modifiedby",id);
           return libraryDAO.addBookRequest(conn,model);
        }
        catch(Exception ex){
              
        }finally{
            DbPool.close(conn);
        }
        return model;
    }
    @RequestMapping(value=URLMap.GET_BOOK_REQUSTER_LIST, method= RequestMethod.GET)
    @ResponseBody
    public String getBookRequesterListAsJson(@RequestParam("bookid") String bookid
            
    ){
       try{
            conn = DbPool.getConnection();
           return libraryDAO.getBookRequesterListAsJson(conn,bookid,1,25).toString();
        }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
    @RequestMapping(value=URLMap.GET_BOOKED_HISTORY, method= RequestMethod.GET)
    @ResponseBody
    public String getAllBookHistoryAsJson(@RequestParam("bookid") String bookid
            ){
       try{
            conn = DbPool.getConnection();
           return libraryDAO.getAllBookHistoryAsJson(conn,bookid,1,25).toString();
        }
        catch(Exception ex){            
        }finally{
            DbPool.close(conn);
        }
        return ""; 
     }
}
