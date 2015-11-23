/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.model;

import java.util.List;
import java.util.Map;
/**
 *
 * @author user
 */
public class ExcelModel {
    List<Column> column;
    List<Map<String,Object>> data;

    public List<Column> getColumn() {
        return column;
    }

    public void setColumn(List<Column> column) {
        this.column = column;
    }

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }
    
}
