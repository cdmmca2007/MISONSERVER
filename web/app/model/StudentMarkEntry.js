Ext.define('MyApp.model.StudentMarkEntry', {
   extend: 'Ext.data.Model',
     fields: [
        'id', 
	'classname',
	'studentid', 
	'studentname',
        'examtype',
        'sessionname',
	'appeared', 
	{name:'markobtained',type: 'int'},
        'subjectname',
        {name:'maxmark',type: 'int'},
        'examname',
        {name:'passmark',type: 'int'},
	'passstatus', 
	'createdby', 
	'createdon', 
	'modifiedby', 
	'modifiedon',
        'comment'
     ]
});

