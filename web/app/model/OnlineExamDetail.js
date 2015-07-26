Ext.define('MyApp.model.OnlineExamDetail', {
   extend: 'Ext.data.Model',
     fields: [		
        'id', 
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
	'deleted', 
	'deletedby', 
	'deletedon',
        'tot_ques_in_exam' 
]
});
