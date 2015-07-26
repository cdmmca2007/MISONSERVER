Ext.define('MyApp.model.BookTransaction', {
   extend: 'Ext.data.Model',
     fields: [
        'id', 
	'bookid', 
	'batchid', 
	'studentid', 
	'fromdate', 
	'todate', 
	'issueddate', 
	'issuedby', 
	'returnedflag', 
	'returneddate', 
	'renewedflag', 
	'renewdnumber', 
	'latefineflag', 
	'fineamount',
        'bookno','title',
        'description',
        'teachername',
        'studentname',
        'classname'
       ]
});
