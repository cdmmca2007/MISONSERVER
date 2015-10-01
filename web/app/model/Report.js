Ext.define('MyApp.model.Report', {
   extend: 'Ext.data.Model',
     fields: [         
         'classname','month','percent',
         'tot_amount','tot_received','tot_pending',
         'present','absent','total','batch_id',
         'student','rollno','admissionno'
     ]
});

