Ext.define('MyApp.model.HostelRoomAllocation', {
   extend: 'Ext.data.Model',
     fields: [         
            'pid',
            'hostelid',
            'hostel',
            'roomid',
            'room',
            'batchid',
            'sessionid',
            'allocatedto',
            'name',
            'fromdate',
            'todate',
            'tothostelfee',
            'feepaidstatus',
            'paid',
            'paidon',
            'paidby',
            'comment',
            'allocateto',
            'studentid' ,
            'teacherid',
            'totamount'
     ]
});
