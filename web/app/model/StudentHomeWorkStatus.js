Ext.define('MyApp.model.StudentHomeWorkStatus', {
   extend: 'Ext.data.Model',
     fields: [    
        'pid', 
	'homeworkid', 
	'studentid',
        'studentname',
	'status',
        'statusname',
	'submitteddate', 
	'docpath', 
	'uploadedby', 
        'uploadedname', 
	'uploadedon'
]
});
