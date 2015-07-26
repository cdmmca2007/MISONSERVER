<%@page import="com.dlabs.mis.dao.StudentDAO"%>
<%@page import="com.dlabs.mis.model.NewStudent"%>
<%@page import="java.util.StringTokenizer"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.File"%>
<%@page import="java.util.Date"%>
<%@page import="com.kjava.base.db.DaoUtil"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.kjava.base.db.DbPool"%>
<%@page import="java.sql.Connection"%>
<%

BufferedReader br=new BufferedReader(new FileReader("d:\\kamlesh\\student1.txt"));
String line;
int addno=4000;
int count=0;
 Connection conn =DbPool.getConnection();       
while((line = br.readLine()) != null){
  
    String[] stud = line.split(",");
    NewStudent newstud=new NewStudent();
    newstud.setFname(stud[0]);
    newstud.setLname(stud[1]);
    newstud.setFathername(stud[2]);
    newstud.setMothername(stud[3]);
    newstud.setParentemailid(stud[4]);
    newstud.setParentmobile(stud[5]);
    newstud.setAddress("Swedon");
    newstud.setAdmissiondate(1387909800);
    newstud.setDob(1387909800);
    newstud.setAdmissiontype("95a6be39-bd4c-40d4-b629-e9c6234226b4");
    newstud.setClassid("74de9c20-bbde-47f3-907f-11097f56af8c");
    newstud.setSession_id("00a24b9a-5bb2-4466-b629-f9d91de9e551");
    newstud.setNationality("b6998699-8fb0-4967-8db4-ec23f7d7eaea");
    newstud.setReligion("ba8ee3fd-754f-4b56-87cd-90a681d769af");
    new StudentDAO().addOrEditStudent(conn,newstud);
    count++;
}
br.close();
conn.commit();
conn.close();
out.print(count);
%>

