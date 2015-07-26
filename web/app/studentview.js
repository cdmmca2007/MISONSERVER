$.curCSS = function(el, a,b){
    return $(el).css(a,b);
}
 SETTING.Users = new Models.Users({
        userId:'',
        name:''
 });
 SETTING.student = new Models.Student({
     id:''
 });
(function(){
   $.ajax({
       url:'user/getUser.do',
       dataType:'json',
        success : function(response){
            loadStudentProfile(response.properties.studentid);
            var u = SETTING.Users;
            u.attr('userId',response.userId);
            u.attr('name',response.name);
            u.attr('dob',response.dob);
            u.attr('roleId',response.roleId);
            u.attr('permValue',response.permValue);
            u.attr('salutation',response.salutation);
            u.attr('gender',response.gender);
            u.attr('emailId',response.emailId);
            u.attr('address',response.address);
            u.attr('designation',response.designation);
            u.attr('teachertype',response.teachertype);
            u.attr('jobtype',response.jobtype);
            u.attr('contactNo',response.contactNo);
            u.attr('city',response.city);
            u.attr('userName',response.userLogin.userName);
            u.attr('schoolid',response.properties.schoolid);
            u.attr('session_id',response.properties.session_id);
            u.attr('schoolname',response.properties.schoolname);
            u.attr('year',response.properties.year);
            u.attr('studentid',response.properties.studentid);         
        }
   });
   
   //Kamlesh use this to get homework assigned to Student
   //We need to pass studentid and batchid...........both parameter is avilable in 
   //Users objects.
   $.ajax({
        //url:'workstatus/getstudhw.do?studentid='+SETTING.Users.properties.studentid+'&batchid='+SETTING.Users.properties.stud_batch_id,
       url:'workstatus/getstudhw.do?studentid=486375a5-26ea-4826-9a55-65e609eeb3e4&batchid=1c00279b-5fde-4586-93a1-46618e73aaf3',
       dataType:'json',
       success : function(response){
   }
   });
   //Kamlesh use this to get digitaldairy and all comments for Student
   //We need to pass studentid and batchid...........both parameter is avilable in 
   //Users objects.

   $.ajax({
       url:'digitaldairy/getstudentdairy.do?batchid=1c00279b-5fde-4586-93a1-46618e73aaf3&studentid=0d66be0f-6b67-44de-882e-7d31908736b2',
       dataType:'json',
       success : function(response){
   }
   });
   //Kamlesh use this to get student monthly attendece for Student
   //We need to pass studentid and batchid and month i.e 'Mar-2014'...........both parameter is avilable in 
   //Users objects.
   $.ajax({
       url:'studattendence/getstudattdnce.do?batchid=1c00279b-5fde-4586-93a1-46618e73aaf3&studentid=0d66be0f-6b67-44de-882e-7d31908736b2&month=Mar-2014',
       dataType:'json',
       success : function(response){
   }
   });

   
})();

function loadStudentProfile(studentId){
    $.ajax({
       url:'mis/student/'+studentId,
       dataType:'json',
        success : function(response){
          var s = SETTING.student;
          var res = response.rows[0];
          console.log("result_set",res);
          s.attr('id',res.studentid);
          s.attr('classid',res.classid);
          s.attr('classname',res.classname);
          s.attr('fname',res.fname);
          s.attr('lname',res.lname);
          s.attr('roll',res.roll_no);
          s.attr('addmission_no',res.addmission_no);
          s.attr('gender',res.gender);              
          s.attr('dob',res.dob);              
          s.attr('nationality',res.nationality);              
          s.attr('religion',res.religiontxt);              
          s.attr('age',res.age);              
          s.attr('street',res.address);              
          s.attr('city',res.city);              
          s.attr('district',res.city);              
          s.attr('state',res.state);              
          s.attr('zipCode',res.postalcode);              
          s.attr('fathername',res.fathername);              
          s.attr('mothername',res.mothername);              
          s.attr('contact',res.parentmobile);              
         //initializeContentController(res.rows[0].userid);
        }
   });
}

function loadTeacherDetails(studentId,sessionid){
    $.ajax({
       url:'mis/getstudclassteachers.do?studentId='+studentId+'&sessionid='+sessionid,
       dataType:'json',
        success : function(response){
          var s = SETTING.teacher;
          var res = response.rows[0];
          console.log("result_set",res);
          s.attr('fname',res.fname);
          s.attr('lname',res.lname);
          s.attr('roll',res.addmission_no);
          s.attr('gender',res.gender);              
          s.attr('dob',res.dob);              
          s.attr('nationality',res.nationality);              
          s.attr('religion',res.religiontxt);              
          s.attr('age',res.age);              
          s.attr('street',res.address);              
          s.attr('city',res.city);              
          s.attr('district',res.city);              
          s.attr('state',res.state);              
          s.attr('zipCode',res.postalcode);              
          s.attr('fathername',res.fathername);              
          s.attr('mothername',res.mothername);              
          s.attr('contact',res.parentmobile);              
         //initializeContentController(res.rows[0].userid);
        }
   })
}

$(function(){
   
    $('body').layout({ 
      //applyDefaultStyles: true,
      north__size:55
   });
   new TopController('#app-header',{
       user:SETTING.Users
   });
   new BradcrumbController('#app-header',{
       
   });
   new QuickLinksController('#quick-links',{
       ctrlContent:new ContentController('#content-body',{})
   });
   new ProfileController('#student-body',{
       student:SETTING.student
   });
   new WidgetController('#widget-list',{
       
   });
   
  
   $('#student-content-body').layout({ 
      applyDefaultStyles: true,
      east__size:270,
      west__size:151
   });
   $('body').click(function(ev){
      if(ev.target.className=="modal-mask"){
          $('.modal-win').remove();
          $('div.modal-mask').remove();
      }
   })
});

function showTeacherProfile(id,subject){
$.ajax({
       url:'teacher/getTcherPrf.do?tchrid='+id,
       dataType:'json',
        success : function(response){
            var SplitText = "Teacher Profile :"+response.fullname;
            var html="<div><div><img src='img/"+response.profilepic+"' height='150' width='150'></div><hr><div><div><span><label>Teacher Name:</label></span>"+response.fullname+"<span></span></div><div><span><label>Subject :</label></span><span>"+subject+"</span></div><div><span><label>Email-Id:"+response.emailid+"</label></span><span></span></div><div><span><label>Contact Number:</label></span><span>"+response.contactno+"</span></div><div><span><label>Address:</label></span><span>"+response.address+" , "+response.cityid+" , "+response.stateid+"</span></div></div><div>";
            var $dialog = $('<div></div>')
                .html(SplitText )
                .dialog({
                    height: 400,
                    width: 500,
                    title: SplitText});
            $dialog.dialog('open');
            $dialog.html(html); 
        }
   });
}
