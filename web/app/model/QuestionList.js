Ext.define('MyApp.model.QuestionList', {
   extend: 'Ext.data.Model',
     fields: [
        'id', 
	'examid', 
	'question', 
	'ans_type', 
	'createdby', 
	'createdon', 
	'modifiedby', 
	'modifiedon', 
	'deleted', 
	'deletedby'
       ]
});
