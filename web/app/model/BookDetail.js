Ext.define('MyApp.model.BookDetail', {
   extend: 'Ext.data.Model',
     fields: ['batch_id',
              'sessionid',
              'id',
              'bookno',
              'booktype',
              'title', 
              'publisher',
              'author', 
              'bookcode', 
              'bookedition', 
              'description',
              'price', 
              'forsubject',
              'forclass',
              'softcopyavailable', 
              'totalcopy', 
              'totissued',
              'deleted', 
              'createdby', 
              'createdon',
              'modifiedon',
              'modifiedby'
             ]
});
