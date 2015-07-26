Ext.define('MyApp.model.AttendanceSheet', {
    extend: 'Ext.data.Model',
    fields:[
        {name:'id', type:'int'},
        {name:'month', type: 'date', dateFormat: 'M-Y'},
        {name:'batchId'},
        {name:'class'},
        {name:'classId'},
        {name:'sessionid'}
       ],
       hasMany: [
        {model: 'MyApp.model.MonthlyAttendance', name: 'attendance'}
    ],
     proxy: {
        type: 'rest',
        url : 'mis/attendancesheet'
    }
  });
  
  
