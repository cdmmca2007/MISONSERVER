
package com.dlabs.session;

import com.kjava.base.ReadableException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Dikshant
 */
public class RequestHandler {
    public static final String SAL="sal";
    public static final String GENDER="gender";
    public static final String ROLEID="role";
    public static final String FNAME="fname";
    public static final String LNAME="lname";
    public static final String LOGINID="loginid";
    public static final String CITY="city";
    public static final String CONTACT_NO="contactno";
    public static final String DOB="dob";

    public static final String USER_NAME="username";
    public static final String CLIENT_ID="clientid";
    public static final String CLIENT_NAME="clientname";
    public static final String WEBSITE="website";
    public static final String APPROVING_MANAGER="approvingmanager";
    public static final String CONTACT_PERSON="contactperson";
    public static final String ADDRESS="address";
    public static final String CONTACTO_NO="contactno";
    public static final String EMAILID="emailid";
    public static final String JOINING_DATE="joining";
    public static final String ABOUT_CLIENT="aboutclient";
    public static final String DELETE="del";
    public static final String ADD="add";
    public static final String EDIT="edit";
    public static final String OPER="oper";
    public static final String SEARCH="searchOper";
    public static final String SEARCH_FIELD="searchField";
    public static final String SEARCH_STRING="searchString";
    public static final String COMPANY_NAME ="companyname";
    public static final String JOB_TITLE    ="jobtitle";
    public static final String JOB_TYPE     ="jobtype";
    public static final String DESIGNATION  = "designation";
    public static final String NO_OF_VACANCIES     = "noofvacancies";
    public static final String EXPERIENCE   = "exp";
    public static final String EXPERIENCE1   = "experience";
    public static final String START_DATE   = "startdate";
    public static final String END_DATE     = "enddate";
    public static final String QUALIFICATION=  "qualification";
    public static final String DESCRIPTION  =   "desc";
    public static final String DESCRIPTION1  =   "description";
    public static String SCHEDULE_DATE= "interviewdate";
    public static String INTERVIEWER  = "interviewer";
    public static String COMMENT      = "desc" ;
    public static String REASON       = "Reason";
    public static String USER_ID      = "userid";
    public static String APPLICANT_ID = "applicantid";
    public static String TIMING       = "timing";
    public static String REQUIRMENT_ID= "requirementid";
    public static String NEXT_DATE    = "nextdate";
    public static String CALL_DATE    = "calldate";
    public static String VENUE        = "venue";
    public static String INTERVIEW_TYPE = "interviewtype";
    public static String SCHEDULE_ID    = "scheduleid";
    public static String RESULT       = "result";
    public static String STATUS       ="status";
    public static String EMAIL_REMINDER= "emailreminder";
    public static String CREATED_ON   = "created_on";
    public static String MODIFY_ON   = "modify_on";
    public static String MODIFY_BY   = "modify_by";
    public static String SALARY_RANGE   = "salaryrange";
    public static String SKILL_SET  = "skillset";
    public static String JOB_PROFILE  = "jobprofile"; 
    public static String EMPLOYER     = "employer";
    public static String CTC  = "ctc";
    public static String EXP_SALARY= "expsalary";
    public static String ADD_INFO  = "addinfo";
    public static String EDUCATION ="qualification";
    public static String PLACED ="placed";
    public static String PKG    ="pkg";
    public static String PACKAGE_RECEIVED    ="package";
    public static String TAG    ="tag";
    public static String TAGNAME   ="tagname";
    public static String TAGVALUE   ="tagvalue";

//mail
    public static final String TO  =   "to";
    public static final String SUBJECT ="sub";
    public static final String MESSAGE = "msg";
    public static final String GROUPID= "groupid";
    public static final String CC= "cc";
    public static final String BCC= "bcc";

    public static final int EDIT_REC = 2;
    public static final int ADD_REC = 1;
    public static String PRODUCTNAME="productname";
    public static String COMPANYNAME="company";
    public static String PRODUCTTYPE="type";
    public static String REMARKS="remarks";
    public static String PRICE="price";
    public static String MANAGERID="manager";
    public static String DOJ="doj";
    public static String HEADQUARTER="headquarter";
    public static String COMPAIGNNAME="compaignname";
    public static String CDATE="cdate";
    public static String SPECIALISATION="specialisation";
    public static String SPECIALISATION1="speciality";
    public static String COMPAIGNID="compaignid";
    public static String PSFORMATID="psformatid";
    public static String PRODUCTID ="productid";
    public static String MONTH     ="month";
    public static String YEAR      ="year";
    public static String PRIMARYTARGET="primary";
    public static String SECONDARYTARGET="secondory";
    public static String CLINICNAME ="clinicname";
    public static String AREA ="area";
    public static String ID ="id";
    public static String DOCTOR="docname";
    public static String NAME="name";
    public static String CATEGORY="category";
    public static String DOA="doa";
    public static String TYPE="type";

    public static float getFloat(HttpServletRequest request, String param) {
        float f = -1.0f;
        if(request.getParameter(param)!=null){
            f = Float.parseFloat(request.getParameter(param));
        }
        return f;
    }

    public static String getOrderBy(HttpServletRequest request) {
        String o = "";
        if(request.getParameter("sidx")!=null){
            o+=request.getParameter("sidx");
            if(request.getParameter("sord")!=null)
                o=o+" "+request.getParameter("sord");
        }
        return o;
    }

    public static String getSearchString(HttpServletRequest request) {
        if(request.getParameter("ss")!=null){
            if(request.getParameter("ss").length()>1)
                return request.getParameter("ss");
        }
        return "";
    }

     public static String getString(HttpServletRequest request,String parameter) {
           String ret="";
           if (request.getParameter(parameter)!=null)
               ret=request.getParameter(parameter);
           return ret;
     }
     public static int getInt(HttpServletRequest request,String parameter) {
            int ret=-1;
           if (request.getParameter(parameter)!=null)
               ret=Integer.parseInt(request.getParameter(parameter));
           return ret;
     }

     public static boolean getBoolean(HttpServletRequest request,String parameter) {
            boolean ret=false;
           if (request.getParameter(parameter)!=null)
               ret=Boolean.parseBoolean(request.getParameter(parameter));
           return ret;
     }
     public static Date getDate(HttpServletRequest request,String parameter){
           Date obj=null;
           if (request.getParameter(parameter)!=null)
               obj=new Date(request.getParameter(parameter));
           return obj;

     }
      public static Date getDate(HttpServletRequest req,String p , String format) throws ReadableException{
          Date d=null;
          try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            if(req.getParameter(p)!=null)
            d = sdf.parse(req.getParameter(p));
            //else
           // d = sdf.parse(req.getParameter(p));
        } catch (ParseException ex) {
           throw new ReadableException(ex,ex.getMessage(),"RequestHandler","getDate");
        }
            return d;
    }

    public static long getLongDate(HttpServletRequest req, String p, String format) throws ReadableException {
        long d = 0;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            if (req.getParameter(p) != null) {
                d = sdf.parse(req.getParameter(p)).getTime();
            }
        } catch (ParseException ex) {
            throw new ReadableException(ex,ex.getMessage(),"RequestHandler", "getDate");
        }
        return d;
    }
    public static int getOperator(HttpServletRequest req) {
        if(req.getParameter("oper")!=null){
            if(req.getParameter("oper").equals("add"))
                return ADD_REC;
            else
                return EDIT_REC;
        }
        return -1;
        
    }
    public static int getPageNo(HttpServletRequest req){
        int p = 0;
        if (req.getParameter("page") != null) {
            p = Integer.parseInt(req.getParameter("page"));
        }
        return p;
    }
     public static int getLimit(HttpServletRequest req){
        int p = 15;
        if (req.getParameter("rows") != null) {
            p = Integer.parseInt(req.getParameter("rows"));
        }
        return p;
    }
}
