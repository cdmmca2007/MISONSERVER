Ext.define('MyApp.model.BookedHistory', {
   extend: 'Ext.data.Model',
     fields: [
            'requestername',
            'requestedbytxt',
            'class',
            'fromdate',
            'todate',
            'returnedflag',
            'description',
            'returneddate'
       ]
});
