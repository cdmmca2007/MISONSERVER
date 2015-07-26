package com.dlabs.mis.dao;


import com.dlabs.mis.model.User;
import com.kjava.util.DateHelper;

/**
 *
 * @author Kamlesh Kumar Sah
 */
public class MySqlQuery {

    
   public static String getSearchStringQuery(String ss,Object[] obj){
        StringBuilder s = new StringBuilder();
        if(ss!=null && !ss.isEmpty()){
            s.append(" (");
            for(int i=0; i<obj.length; i++){
                s.append(obj[i]+" like '%"+ss+"%'");
                if(i<obj.length-1){
                    s.append(" or ");
                }
            }
            s.append(")");
        }
        return s.toString();
    }
    public static String[] getAllUserQuery(int page,int row, String orderBy,java.lang.String ss){
        String s = getSearchStringQuery(ss, new Object[]{"name"});
        String FROM_QUERY = " from users u inner join roles on u.roleid=roles.id "
                + " inner join userlogin on u.userid = userlogin.userid and userlogin.status=1 ";
        if(s!=null && !s.isEmpty()){
            FROM_QUERY +=" where "+s;
        }
        String fields = "userlogin.username as userName, u.userid as userId,'' as  sal, u.name,"
                + "u.emailid as emailId,u.contactno as contactNo,u.address ,roles.name as role, u.roleid as roleId,"
                + " u.gender, u.city, u.dob  ";
        return getQuery(fields,FROM_QUERY,page,row,orderBy);
    }
     public static String[] getAllDoctorQuery(int page,int row, String orderBy,java.lang.String ss){
        String s = getSearchStringQuery(ss, new Object[]{"fname","lname"});
        String FROM_QUERY = " from doctor d left join configmaster m1 on d.specialisation=m1.masterid " +
                " left join configmaster m2 on d.category=m2.masterid left join configmaster m3 on d.type=m3.masterid ";
        if(!s.isEmpty()){
            FROM_QUERY +=" where "+s;
        }
        String fields = "d.id, sal, fname, lname, emailid,dob," +
                "contactno , area , city, m1.value as speciality, m2.value as category,m3.value as type , doa ";
        return getQuery(fields,FROM_QUERY,page,row,orderBy);
    }
    public static String getUserDetail(int userid)
    {
        
        String query = "select users.userid as userid, username as loginid, sal, fname, lname, concat(fname,' ',lname) as name ,emailid," +
                "contactno as contactno,address ,roletype as role, users.roleid, image, status, gender, city, dob from users inner join roles on users.roleid=roles.roleid " +
                "inner join userlogin on users.userid = userlogin.userid and users.userid='"+userid+"'";
        return query;
    }
    public static String getUserById() {
        String FROM_QUERY = " from users inner join roles on users.roleid=roles.roleid " +
                "inner join userlogin on users.userid = userlogin.userid where users.userid=?";
        String fields = "users.userid, username as loginid, sal, fname, lname, concat(fname,' ',lname) as name ,emailid," +
                "contactno as contactno ,roletype as userrole, users.roleid, image, status, gender, city, dob ";
        return FROM_QUERY + fields;
    }

    public static String getDeleteQuery(String string, String string0) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public static String[] getApplicantInsertQuery(String name , String email ,String add ,String city,String state,String contact,String edu,int ctc,String comments) {
        String query[]=new String[2];
        query[0] ="INSERT INTO jobapplicant(fname,emailid,address,city,state,contactno,education,currentctc,placed,migrationflag,createddate,comment,jobid) "
                + "VALUES('"+name+"','"+email+"','"+add+"','"+city+"','"+state+"','"+contact+"','"+edu+"',"+ctc+",0,0,now(),'"+comments+"',101)";
       // query[1] ="INSERT INTO RESUMES(applicantid , path , uploadedon) values(?,?,now())";
        query[1] ="select max(applicantid) from jobapplicant";
        return query;
    }
    public static String getResumeInsertQuery(int applicantid , String filename){
      return "INSERT INTO RESUMES(applicantid , path , uploadedon) values("+applicantid+",'"+filename+"',now())";
    }

    public static String getApplicantInsertQueryFromCsv(){
        return "insert into jobapplicant(fname,emailid,address,contactno,education,currentctc,placed,experiance,migrationflag,createddate,location,employer,skillset,resumetitle,roles,industry,dob,jobcategory)"
                + "values(?,?,?,?,?,?,0,?,3,?,?,?,?,?,?,?,?,?)";
    }

     public static String[] getUserDeleteQuery() {
       String query[]=new String[2];
            query[0]="delete from users where userid=?";
            query[1]="delete from userlogin where userid=?";
       return query;
    }

    public static String[] getUserInsertQuery() {

        String Query[]=new String[3];

        Query[0]="Insert into Users(userid,name,dob,gender,address,city,emailid,contactno,roleid,createdon,modifiedon)"
                + " values(?,?,?,?,?,?,?,?,?,now(),now()) ";
        Query[1]="insert into userlogin(userid,username,password,sequerityques,ans,status) values(?,?,?,?,?,1)";
        Query[2]="Select username from userlogin where username = ? ";
        return Query;
    }

    public static String[] getUserUpdateQuery() {
        String query[]=new String[2];
               query[0]="update Users set name=?,dob=?,gender=?,address=?,city=?,emailid=?,contactno=?,roleid=?,modifiedon=now() where userid = ?";
               query[1]="update userlogin set username=? where userid=?";
        return query;
    }
   /* public static String verifyUser(){
        String FROM_QUERY = " from users inner join roles on users.roleid=roles.roleid " +
                "inner join userlogin on users.userid = userlogin.userid ";
        String fields = "users.userid,username as loginid,sal,concat(fname,' ',lname) as name,emailid," +
                "contactno as contact,users.ROLEID as userrole";
        String where = " where username=? and PASSWORD=?";
        return "SELECT "+fields+FROM_QUERY+where;
    }*/
     public static String verifyUser(){
        String FROM_QUERY = " from users  inner join userlogin on users.userid = userlogin.userid inner join roles on users.roleid = roles.id ";
        String fields = "users.name,users.emailid,users.contactno,users.address,users.city,users.gender,users.dob,users.userid,username,'' as sal,emailid," +
                "users.roleid,roles.permValue ";
        String where = " where username=? and PASSWORD=?";
        return "SELECT "+fields+FROM_QUERY+where;
    }
   /*------------------audit trail query---------------------*/
    public static String[] getAuditTrailQuery(String ss, String orderby) {
        String q[]=new String[2];
        ///String s = ss.isEmpty()?"":" where "+getSearchStringQuery(ss, new Object[]{"details"});
        String s = ss.isEmpty()?"":" where "+ ss;
        q[1] = "select att.actiontype,at.* , usr.name AS actionby from actions att inner join audittrail at on att.actionid = " +
                "at.actionid INNER JOIN users usr     ON usr.userid = at.userid "+s +" order by "+orderby;
        q[0] = "select count(1) as count from actions att inner join audittrail at on att.actionid = " +
                "at.actionid INNER JOIN users usr     ON usr.userid = at.userid  "+s;
        return q;
    }
    public static String addAudtitTrail() {
       return "insert into audittrail(actionid,params,ipaddr,userid,ts) values(?,?,?,?,?)";
    }
    private static String[] getQuery(String fields, String FROM_QUERY, int start,int limit,String orderBy) {
        String q[]= new String[2];
        q[0] = "SELECT count(1) as count "+FROM_QUERY;
        q[1] = "SELECT "+fields+" "+FROM_QUERY+" "+(orderBy.isEmpty()?"":"order by "+orderBy);
        q[1] = q[1]+" LIMIT "+limit+" OFFSET "+start;
        return q;
    }

    public static String deleteQuery(String tablename ,String colname) {

        return "Delete from " + tablename + " where " + colname + " =?";
    }
   
   /*--------------------------ExcelSheet File Management :Start------------------------------------------*/
     public static String[] getExcelSheetUploadQuery(int page,int row,String orderBy){
         String FROM_QUERY = "From ExcelSheetUpload " ;
         String fields = "UploadId ,fileName,UploadOn,UploadedBy";

        return getQuery(fields,FROM_QUERY,page,row,orderBy);
     }
     public static String getExcelSheetUploadQuery(){

         String Query = "insert into ExcelSheetUpload(fileName,UploadOn,UploadedBy) values()";

        return Query;
     }
   /*--------------------------ExcelSheet File Management :End------------------------------------------*/


  

     /*--------------------------Combo Box Entry Query :End------------------------------------------*/
    public static String getComboBoxQuery(int x){

        return "Select value from configmaster where configid="+x+"";
    }
    public static String getStateQuery(int x){

        return "Select stateid,name from states where countryid="+x+"";
    }
    public static String[] getCityQuery(int x){

        String query[]=new String[2];
        query[0]="Select cityid,name from cities where stateid="+x+"";
        query[1]="select count(*) as count from cities where stateid="+x+"";
        return query;
    }
    public static String getCompanyListQuery(){
        String query=null;
        query ="select distinct clientid , clientname from client";
        return query;
    }
    public static String getExperience(){
        String query=null;
        query ="select value from configmaster where configid=6 and value is not null order by value";
        return query;

    }
    public static String getClientJobQuery(String name){
        String query=null;
        query ="select requirementid , jobtitle from clientjob where clientid="+name+"";
        return query;

    }

    public static String getApplicantInterviewDetail(int applicantid){
     String query=null;
     query  ="select C.clientname , J.jobtitle , S.interviewdate , S.timing , S.status from callschedule S, client C, clientjob J "
             + "where S.applicantid="+applicantid+" and C.clientid=S.clinetid and S.requirementid = J.requirementid;";
     return query;
    }

    public static String getApplicantFeedbackDetail(int applicantid){
     String query=null;
     query  ="select * from callfeedback where applicantid="+applicantid+"";
     return query;
 }

    public static String[] getAllSearch(int page, int rows, String searchField, String searchString,String orderBy) {

        String fields = " S.scheduleid, concat(concat(A.fname ,' ') ,A.lname) as applicantname,C.clientname as companyname,CJ.jobtitle as requirementid,concat(concat(U.fname ,' ') ,U.lname) as username,"
                + "S.interviewdate,S.timing,S.comment,S.status,case S.result when 1 then 'Placed' when 0 then 'Rejected' end as result,S.intertviewer as interviewer,S.venue,S.interviewtype,S.modifyon,S.emailreminder,S.modifyby";
        String FROM_QUERY = "from callschedule S,jobapplicant A,client C,clientjob CJ,Users U where S.applicantid=A.applicantid and S.clinetid in (select clientid from client where clientname like '%"+searchString+"%') and S.userid=U.userid and S.requirementid=CJ.requirementid";
        return getQuery(fields,FROM_QUERY,page,rows,orderBy);

    }

 
}

 
