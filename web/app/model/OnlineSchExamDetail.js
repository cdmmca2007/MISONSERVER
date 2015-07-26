Ext.define('MyApp.model.OnlineSchExamDetail', {
   extend: 'Ext.data.Model',
     fields: [	
         'id',
        'pid', 
	'examname', 
	'classid', 
        'class',
	'subjectid', 
        'subject',
	'ismandatory', 
	'publishexam', 
	'createdby', 
	'createddon', 
	'modifiedby', 
	'modifiedon',
        'scheduledby',
        'scheduleddate',
        'scheduleddatetxt',
        'status',
        'tot_ques_in_exam',
        'statustext',
        'comment'
]
});
