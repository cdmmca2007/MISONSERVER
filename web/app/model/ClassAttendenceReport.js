Ext.define('MyApp.model.ClassAttendenceReport', {
   extend: 'Ext.data.Model',
     fields: ['batch_id',
              'sessionid',
              'classname',
              'month',
              'percentage',
              'absent',
              'present'
             ]
});
