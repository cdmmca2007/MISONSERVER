Ext.define('MyApp.model.AdmissionSetting', {
   extend: 'Ext.data.Model',
     fields: [
        'pid', 
        'sessionid',
        'sessionname',
        'admission_start_date', 
        'admission_end_date', 
        'admission_department_head', 
        'admission_dept_head_name', 
        'enable_email_sending', 
        'enable_sms_sending', 
        'default_day_sch_aft_apply', 
        'is_interview_mandate', 
        'is_instracneexam_mandate', 
        'createdby', 
        'createdon', 
        'modifiedby', 
        'modifiedon'
     ]
});

