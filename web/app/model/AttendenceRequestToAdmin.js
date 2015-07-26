Ext.define('MyApp.model.AttendenceRequestToAdmin', {
   extend: 'Ext.data.Model',
     fields: [	
        'pid', 
	'batchid', 
        'classid',
        'sessionid',
	'batchname',
	'studentid', 
	'studentname',
	'attendencefromdate', 
	'attendencetodate', 
	'markattendencestatus', 
        'attendencestatustext',	
	'createdby', 
	'modifiedby', 
	'createdon', 
	'modifiedon', 
	'attendencemarkdate', 
	'requeststatus', 
	'requeststatustext', 	
	'requestby',
	'reason'
	]
});