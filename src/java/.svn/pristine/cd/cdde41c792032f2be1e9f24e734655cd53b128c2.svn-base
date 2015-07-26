/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 *
 * @author Kamlesh the admin
 */
public class RowMapper<T> {
    Set<Method> setterMethods;
    public RowMapper(Class object){
        Method [] m = object.getDeclaredMethods();
        for(int i=0; i<m.length; i++){
            if(m[i].getName().startsWith("set")){
                setterMethods.add(m[i]);
            }
        }
    }
//    public static List getList(ResultSet rs, RowMapper<T> ){
//        return new ArrayList();
//    }
}
