package com.dlabs.mis.services;

import com.dlabs.mis.model.Column;
import com.dlabs.mis.model.ExcelModel;
import java.lang.Number;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import jxl.CellView;
import jxl.format.Orientation;
import jxl.format.UnderlineStyle;
import jxl.format.VerticalAlignment;
import jxl.write.*;
import jxl.write.NumberFormats;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;
import org.springframework.stereotype.Service;


@Service("downloadService")
public class DownloadServiceImpl implements DownloadService {

    final static Logger logger = LoggerFactory.getLogger(DownloadServiceImpl.class);
    private static final Logger LOG = LoggerFactory.getLogger(DownloadServiceImpl.class);

    @Override
    public WritableWorkbook writeToWorkBook(WritableWorkbook workbook, ExcelModel model) {
        try {
            LOG.info("writeToWorkBook --> Work Book creation Started");
            String sheetName = "sheet1";
            WritableSheet workSheet = initialize(workbook, sheetName);
            WritableCellFormat headerFormat = setHeaderFormat();
            WritableCellFormat dataFormat = setDataFormat();
            WritableCellFormat labelFormat = this.getLabelCellFormat();
            WritableCellFormat parentDataFormat = setDataFormat();
            parentDataFormat.setBackground(jxl.format.Colour.LIGHT_GREEN);
            createExcelData(workSheet, headerFormat, dataFormat,parentDataFormat, labelFormat, model);

            return workbook;
        } catch (Exception ex) {
            logger.error("Exceptin in getLabelCellFormat",ex);
        }
        return workbook;
    }

    /**
     * Initialize the workbook object
     *
     * @param workbook
     * @param sheetName
     * @return Workbook
     */
    private WritableSheet initialize(WritableWorkbook workbook, String sheetName) {
        WritableSheet workSheet = null;
        workSheet = workbook.createSheet(sheetName, 0);
//			        workSheet.setColumnView(0, 30);
//					workSheet.setColumnView(1, 30);
//					workSheet.setColumnView(2, 30);
//					workSheet.setColumnView(3, 30);
//					workSheet.setColumnView(4, 30);
//					workSheet.setColumnView(5, 30);
        return workSheet;
    }

    /**
     * *
     * This method is used to set the Header Format
     *
     * @return WritableCellFormat
     * @throws FatalException
     */
    private WritableCellFormat setHeaderFormat() {
        WritableCellFormat headerFormat = null;
        try {
            WritableFont headerFont = new WritableFont(WritableFont.createFont("Helvetica"),
                    WritableFont.DEFAULT_POINT_SIZE,
                    WritableFont.BOLD, false,
                    UnderlineStyle.NO_UNDERLINE);
            headerFormat = new WritableCellFormat(headerFont);
            headerFormat.setWrap(true);
            headerFormat.setAlignment(jxl.format.Alignment.CENTRE);
            headerFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
            headerFormat.setWrap(true);
            headerFormat.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.THIN, jxl.format.Colour.BLACK);
            headerFormat.setBackground(jxl.format.Colour.GRAY_25);
        } catch (WriteException we) {
            
        }
        return headerFormat;
    }

    /**
     * *
     * This method is used to set the Label Format
     *
     * @return WritableCellFormat
     * @throws FatalException
     */
    private WritableCellFormat getLabelCellFormat() {
        try {
            WritableFont dataFont = new WritableFont(WritableFont.createFont("Helvetica"),
                    WritableFont.DEFAULT_POINT_SIZE,
                    WritableFont.NO_BOLD, false,
                    UnderlineStyle.NO_UNDERLINE);

            WritableCellFormat dataFormat = new WritableCellFormat(dataFont);
            dataFormat.setWrap(true);
            dataFormat.setAlignment(jxl.format.Alignment.LEFT);
            dataFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
            dataFormat.setWrap(true);
            dataFormat.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.THIN,
                    jxl.format.Colour.BLACK);
            return dataFormat;
        } catch (WriteException we) {
            logger.error("Exceptin in getLabelCellFormat",we);
        }
        return null;
    }

    /**
     * *
     * This method is used to set the Data Format
     *
     * @return WritableCellFormat
     * @throws FatalException
     */
    private WritableCellFormat setDataFormat() {
        try {
            WritableFont dataFont = new WritableFont(WritableFont.createFont("Helvetica"),
                    WritableFont.DEFAULT_POINT_SIZE,
                    WritableFont.NO_BOLD, false,
                    UnderlineStyle.NO_UNDERLINE);

            WritableCellFormat dataFormat = new WritableCellFormat(NumberFormats.THOUSANDS_INTEGER);
            dataFormat.setFont(dataFont);
            dataFormat.setWrap(true);
            dataFormat.setAlignment(jxl.format.Alignment.RIGHT);
            dataFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
            dataFormat.setWrap(true);
            dataFormat.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.THIN,
                    jxl.format.Colour.BLACK);
            return dataFormat;
        } catch (WriteException we) {
            logger.error("Exceptin in getLabelCellFormat",we);
        }
        return null;
    }
   private void createExcelData(WritableSheet workSheet, WritableCellFormat headerFormat, WritableCellFormat dataFormat,WritableCellFormat parentDataFormat, WritableCellFormat labelFormat, ExcelModel model) throws Exception {
        int row = 1;
        try {
            List<Column> cols = model.getColumn();
            int c = 0;
            for (Column col : cols) {
                workSheet.addCell(new Label(c, row, col.getTitle(), headerFormat));
                c++;
            }
            List<Map<String, Object>> data = model.getData();
            row++;
            String field=new String();
            for (int i = 0; i < data.size(); i++) {
                c = 0;
                Map<String,Object> record=data.get(i);
                for (Column col : cols) {
                    String key=col.getData();
                    
                    if(record.get(key)!=null){
                    field=record.get(key).toString();
                    }
                    else{
                    field=null;    
                    }
                    
                    if(record.get("projectname")!=null && 
                            "All".equalsIgnoreCase(record.get("projectname").toString())){
                        workSheet.addCell(new Label(c, row, field, parentDataFormat));
                    }
                    else{
                        if("empno".equals(key)||"userName".equals(key)){
                            field="";
                        }
                        if("status".equals(key)&& field==null){
                            field="-";
                        }
                        if("projectname".equals(key)&& field==null){
                            field="-";
                        }
                    workSheet.addCell(new Label(c, row, field, dataFormat));
                    }
                    c++;
                }
                row++;
            }
        } catch (WriteException we) {
            throw new Exception("Error in Writing to excel", we);
        }
    }

    @Override
    public WritableWorkbook writeToWorkBookFromSqlRowSet(WritableWorkbook workbook, SqlRowSet data) {
        try {
            LOG.info("writeToWorkBook --> Work Book creation Started");
            String sheetName = "sheet1";
            WritableSheet workSheet = initialize(workbook, sheetName);
            WritableCellFormat headerFormat = setHeaderFormat();
            WritableCellFormat dataFormat = setDataFormat();
            WritableCellFormat labelFormat = this.getLabelCellFormat();
            createExcelDataFromSqlRowSet(workSheet, headerFormat, dataFormat, labelFormat, data);
            return workbook;
        } catch (Exception ex) {
            logger.error("Exceptin in getLabelCellFormat",ex);
        }
        return workbook;
    }

    private void createExcelDataFromSqlRowSet(WritableSheet workSheet, WritableCellFormat headerFormat, WritableCellFormat dataFormat, WritableCellFormat labelFormat, SqlRowSet data) {
        int row = 1;
        try {
            SqlRowSetMetaData columnmetadata=data.getMetaData();
            int colCount = columnmetadata.getColumnCount();
            
            for(int c=1 ; c<= colCount;c++){
               workSheet.addCell(new Label(c-1, row, columnmetadata.getColumnName(c), headerFormat));
            }
            row++;
            String field=new String();
            while(data.next()){
               for(int i=1;i<=colCount;i++){
                   if(data.getObject(i)!=null){
                       field=data.getString(i);
                   }else{
                       field=null;
                   }
                   workSheet.addCell(new Label(i-1, row, field, dataFormat));
               }
              row++; 
            }
        } catch (Exception we) {
            
        }
        
    }

}
