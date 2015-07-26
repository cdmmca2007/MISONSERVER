<%@page import="net.sf.jasperreports.engine.JREmptyDataSource"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.kjava.base.db.DaoUtil"%>
<%@page import="net.sf.jasperreports.engine.JRResultSetDataSource"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.kjava.base.db.DbPool"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.Connection"%>
<%@page import="net.sf.jasperreports.engine.JRException"%>
<%@page import="net.sf.jasperreports.engine.JRExporterParameter"%>
<%@page import="net.sf.jasperreports.engine.JasperCompileManager"%>
<%@page import="net.sf.jasperreports.engine.JasperExportManager"%>
<%@page import="net.sf.jasperreports.engine.JasperFillManager"%>
<%@page import="net.sf.jasperreports.engine.JasperPrint"%>
<%@page import="net.sf.jasperreports.engine.JasperReport"%>
<%@page import="net.sf.jasperreports.engine.export.JRXlsExporter"%>

<%  
Connection connection =DbPool.getConnection();     
 try {    
 JasperReport jasperReport;
 JasperPrint jasperPrint;
 
 HashMap jasperParameter = new HashMap();
 jasperReport = JasperCompileManager.compileReport("C://sample_report.jrxml");
 //jasperParameter.put("amount",100);
 //jasperParameter.put("schoolname","PMS");
 //jasperParameter.put("modulename","Timetable");
 jasperParameter.put("batchid","1c00279b-5fde-4586-93a1-46618e73aaf3");
  //ResultSet rs=DaoUtil.executeQuery(connection,query);
  //JRResultSetDataSource dataSource = new JRResultSetDataSource(rs);
  //jasperParameter.put("TableDataSource",dataSource);
  jasperPrint = JasperFillManager.fillReport(jasperReport,jasperParameter,connection); 
  JasperExportManager.exportReportToPdfFile(jasperPrint, "C://sample_report.pdf");
  JasperExportManager.exportReportToHtmlFile(jasperPrint, "C://sample_report.html" ); 
 
  JRXlsExporter exporter = new JRXlsExporter();
  exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
  exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, "C://simple_report.xls" );
  exporter.exportReport();
 }
 catch(Exception ex){
 }
 
 finally {
     connection.close();
} 
%>