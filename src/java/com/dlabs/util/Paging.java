/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.util;

/**
 *
 * @author Kamlesh the admin
 */
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
public class Paging {
    private int start=0,limit=-1;
    private String searchString="";
    private Paging(HttpServletRequest request){
        this.start = request.getParameter("start")!=null?Integer.parseInt(request.getParameter("start")):0;
        if(request.getParameter("limit")!=null){
            this.limit = Integer.parseInt(request.getParameter("limit"));
        }
        if(request.getParameter("ss")!=null){
            this.searchString = request.getParameter("ss");
        }
    }
   
    public static Paging getInstance(HttpServletRequest request) {
          return new Paging(request);
    }

    public int getStart() {
        return start;
    }
    public void setStart(int start) {
        this.start = start;
    }
    public int getLimit() {
        return limit;
    }
    public void setLimit(int limit) {
        this.limit = limit;
    }
    public String getSearchString() {
        return searchString;
    }
    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }
    public boolean isPagingQuery(){
        return limit!=-1;
    }
}
