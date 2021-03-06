/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.dao;

import com.kjava.web.QueryModel;
import com.kjava.web.QueryProvider;
import java.io.IOException;
import java.util.Properties;

/**
 *
 * @author Kamlesh the admin
 */

public class QueryProvideImpl implements QueryProvider{
  
    Properties sqlQueries;
    Properties searchQueries; 
    Properties filterQueries;
    public QueryProvideImpl() throws IOException{
        ClassLoader l = Thread.currentThread().getContextClassLoader();
        sqlQueries = new Properties();
        searchQueries = new Properties();
        filterQueries = new Properties();
        sqlQueries.load(l.getResourceAsStream("SqlQueries.properties"));
        searchQueries.load(l.getResourceAsStream("SearchQueries.properties"));
        filterQueries.load(l.getResourceAsStream("FilterQuery.properties"));
    }
    public Properties getSqlQueries() {
        return sqlQueries;
    }

    public void setSqlQueries(Properties sqlQueries) {
        this.sqlQueries = sqlQueries;
    }

    public Properties getSearchQueries() {
        return searchQueries;
    }

    public void setSearchQueries(Properties searchQueries) {
        this.searchQueries = searchQueries;
    }

    public Properties getFilterQueries() {
        return filterQueries;
    }

    public void setFilterQueries(Properties filterQueries) {
        this.filterQueries = filterQueries;
    }
    
    @Override
    public String getQuery(String queryName, QueryModel model) {
        String query = sqlQueries.getProperty(queryName);
        return this.createQuery(query,queryName,model);
    }

    @Override
    public String getCountQuery(String queryName, QueryModel model) {
        if (sqlQueries.getProperty(queryName + "_COUNT") == null) {
            return null;
        }
        String query = sqlQueries.getProperty(queryName + "_COUNT");
        return this.createQuery(query, queryName, model);
    }
    public boolean hasCondition(String query){
        return query.indexOf("where")>-1;
    }
    public String createQuery(String query,String queryName, QueryModel model){
        if(model.getSearchString()!=null){
            query = query +" "+ searchQueries.getProperty(queryName);
            Object o =model.getParams().remove("ss");
            model.getParams().put("ss","%"+o.toString()+"%");
        }
        if(model.hasFilters()){
            String[] filters = model.getFilters();
            for(int i=0; i<filters.length; i++){
                if(hasCondition(query)){
                    query +=" and "+filterQueries.getProperty(filters[i]);
                } else{
                    query +=" where "+filterQueries.getProperty(filters[i]);
                }
            }
        }
        return query;
    }

}
