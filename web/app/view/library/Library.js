function addBook(rec){

    var win = Ext.getCmp('book_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Edit Book Window':'Add New Book Window',
            id:rec?'editbook_win':'addbook_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/book.jpg',
                formTitle:rec?'Edit Book Details For<b>'+rec.data.title+'</b>':'<b>Add New Book Details in Library</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:500
            },
            url:'ppppp',
            formItems :[
            {
                name : 'id',                
                id:'name',
                hidden:true,
                value:rec?rec.data.id:null
            },
            {
                name : 'bookno',                
                id:'bookno',
                fieldLabel: 'Book No',
                value:rec?rec.data.bookno:null,
                hidden:true
            },
            {
                name : 'title',
                fieldLabel: 'Book Title',
                id:'title',
                value:rec?rec.data.title:null
            },{
                xtype:'combobox',
                fieldLabel :'Book Type',
                id:'booktype',
                name:'booktype',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:21}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Book Type...',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                value:rec?rec.data.booktype:null
            },
            {
                name : 'publisher',
                fieldLabel: 'Publisher Name',
                id:'publisher',
                value:rec?rec.data.publisher:null
            },{
                name : 'author',
                fieldLabel: 'Author Name',
                id:'author',
                value:rec?rec.data.author:null
            },{
                name : 'bookcode',
                fieldLabel: 'Book Code',
                id:'bookcode',
                value:rec?rec.data.bookcode:null
            },{
                name : 'bookedition',
                fieldLabel: 'Book Edition',
                id:'bookedition',
                value:rec?rec.data.bookedition:null
            },{
                name : 'price',
                fieldLabel: 'Book Price',
                id:'price',
                value:rec?rec.data.price:null
               
            },{
                xtype:'combobox',
                fieldLabel :'For Subject',
                id:'forsubject',
                name:'forsubject',                
                value:rec?rec.data.forsubject:null,
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:2}}),//For Location
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Subject...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },{
                xtype:'combobox',
                fieldLabel :'For Class',
                id:'forclass',
                name:'forclass',   
                hidden:true,
                store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-2}}),//Get Session Details
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Class...',
                Autoload:true,
                valueField :'id',
                displayField :'value'
            },{
                xtype: 'checkbox',
                name : 'softcopyavailable',
                fieldLabel: 'Softcopy Available',
                value:rec?rec.data.softcopyavailable:null,
                id:'softcopyavailable',
                listeners:{
                    select: function(component){
                     //  var softcopy=Ext.getCmp('softcopyavailable').getValue();
                       alert("softcopy"); 
                     /*  if(issueto==='1'){
                            Ext.getCmp('classid').hide();
                            Ext.getCmp('studentid').hide();
                            Ext.getCmp('teacherid').show();
                        }else if(issueto==='2'){
                            Ext.getCmp('teacherid').hide();
                            Ext.getCmp('classid').show();
                            Ext.getCmp('studentid').show();
                        }*/
                    }
               }
            },{
                xtype: 'fileuploadfield',
                fieldLabel :'Upload File',
                id:'softcopy',
                name:'softcopy',
                hidden:true,
                buttonText: '',
                buttonConfig: {
                iconCls: 'upload-icon'
                }
            },{
                name : 'totalcopy',
                fieldLabel: 'Total Copy Of Book',
                id:'totalcopy',
                value:rec?rec.data.totalcopy:null
               
                
            },{
                xtype: 'textarea',
                name : 'description',
                fieldLabel: 'Description',
                id:'description',
                value:rec?rec.data.description:null,
               
            },{
                name : 'tag',
                fieldLabel: 'Tag',
                id:'tag'
            }
            ],
            buttons :[
            {
                text: rec?'Edit':'Add',
                action: 'save',
                scope:this,
                handler:saveBook
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function issueBook(rec,record){
    
    var win = Ext.getCmp('issuebook_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Issue Book Window',
            id:'issuebook_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'You are Issuing Book :<b>'+rec.data.title+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:500
            },
            formItems :[
            {
                name : 'bookid',                
                id:'bookid',
                hidden:true,
                value:rec.data.id
            },{
                name : 'issuedby',                
                id:'issuedby',
                hidden:true,
                value:SETTING.Users.userId
            },
            {
                name : 'title',
                fieldLabel: 'Book Title',
                id:'title',
                value:rec.data.title
            },{
                xtype:'combobox',
                fieldLabel :'Issue To',
                id:'issueto',
                name:'issueto',                
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"1","value":"Teacher"},
                    {"id":"2","value":"Student"}
                ]
                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Issue to ...',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                        var issueto=Ext.getCmp('issueto').getValue();
                        
                       if(issueto==='1'){
                            Ext.getCmp('classid').hide();
                            Ext.getCmp('studentid').hide();
                            Ext.getCmp('teacherid').show();
                        }else if(issueto==='2'){
                            Ext.getCmp('teacherid').hide();
                            Ext.getCmp('classid').show();
                            Ext.getCmp('studentid').show();
                        }
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Teacher',
                id:'teacherid',
                name:'teacherid',                
                store:Ext.create('MyApp.store.Combo').load(
                          {
                                      params:{propertyId:5
                          }}
                ),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Teacher Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true
            },{
                xtype:'combobox',
                fieldLabel :'Select Class',
                id:'classid',
                name:'classid',                
                store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Class Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true,
                listeners:{
                    select: function(component){
                    var classid=Ext.getCmp('classid').getValue();
                    Ext.getCmp('studentid').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :classid+'&'+SETTING.Users.properties.session_id,
                             teacherid :SETTING.Users.userId
                     }
               });
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Student',
                id:'studentid',
                name:'studentid',                
                store:'ClassCombo',
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Student Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true
            },{
                xtype:'datefield',
                name : 'fromdate',
                fieldLabel: 'Issue Date From ',
                id:'fromdate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
                },
            {
                xtype:'datefield',
                name : 'todate',
                fieldLabel: 'Return Date',
                id:'todate',
                format: 'm d Y',
                altFormats: 'm,d,Y|m.d.Y'
            },
            {
                xtype: 'textarea',
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
            }
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                handler:saveIssueBook
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show(); 
    
}
function saveBook(btn){
    
      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            
            if(obj.softcopyavailable=='on')
                obj.softcopyavailable=1;
            else 
                obj.softcopyavailable=0;
            
            Ext.Ajax.request({
                url:'library/addbk.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.id!==""){
                     Ext.Msg.alert('Success','Book added successfully');
                     Ext.getCmp('book_grid').getStore().reload();
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}

function saveIssueBook(btn){

      var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            obj.fromdate=new Date(obj.fromdate).getTime();
            obj.todate  =new Date(obj.todate).getTime();
            obj.sessionid=SETTING.Users.properties.session_id;
            
            Ext.Ajax.request({
                url:'library/issbk.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.id!==""){
                     Ext.Msg.alert('Success','Book Issued successfully');
                     var rec=Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];
                     Ext.getCmp('bookdetailgrid').getStore().reload({
                                      params:{id:rec.data.id}})//For Session
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}

function returnBook(v_rec){
   
    var win = Ext.getCmp('returnbook_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Return Book Window',
            id:'returnbook_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Return Book :<b>'+v_rec.data.title+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:500
            },
            formItems :[
            {
                name : 'id',                
                id:'id',
                hidden:true,
                value:v_rec.data.id
            },{
                name : 'bookid',                
                id:'bookid',
                hidden:true,
                value:v_rec.data.bookid
            },{
                name : 'returnby',                
                id:'returnby',
                hidden:true,
                value:SETTING.Users.userId
            },
            {
                name : 'rtitle',
                fieldLabel: 'Book Title',
                id:'rtitle',
                value:v_rec.data.title
            },{
                xtype:'datefield',
                name : 'rfromdate',
                fieldLabel: 'Issue Date',
                id:'rfromdate',
                format: 'm-d-Y',
                altFormats: 'm-d-Y|m.d.Y',
                value:Ext.Date.parse(v_rec.data.fromdate,'d-m-Y'),
                readOnly:true
                },
              {
                xtype:'datefield',
                name : 'rtodate',
                fieldLabel: 'Due Date',
                id:'rtodate',
                format: 'm-d-Y',
                altFormats: 'm-d-Y|m.d.Y',
                value : Ext.Date.parse(v_rec.data.todate,'d-m-Y'),
                readOnly:true
              },
              {
                xtype:'datefield',
                name : 'returndate',
                fieldLabel: 'Return Date ',
                id:'returndate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y'
              },
             {
                xtype: 'checkbox',
                name : 'returnedflag',
                fieldLabel: 'Fine Applicable',
                id:'returnedflag',
                handler: function() {
                    var check = Ext.getCmp('returnedflag')
                    if(check.getValue())
                        Ext.getCmp('fineamount').show();
                    else
                        Ext.getCmp('fineamount').hide();
                }
            },   
            {
                name : 'fineamount',
                fieldLabel: 'Fine Amount',
                id:'fineamount',
                hidden:true
            },
            {
                xtype: 'textarea',
                name : 'description',
                fieldLabel: 'Comment',
                id:'description'
            }
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                handler:savereturnBook
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show(); 
    
}

function reissueBook(rec1){
    var win = Ext.getCmp('reissuebook_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Book Renewal Window',
            id:'reissuebook_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Renewal Book :<b>'+rec1.data.title+'</b>'
            },
            defaults:{
                xtype:'textfield',
                width:500
            },
            formItems :[
            {
                name : 'id',                
                id:'id',
                hidden:true,
                value:rec1.data.id
            },{
                name : 'bookid',                
                id:'bookid',
                hidden:true,
                value:rec1.data.bookid
            },{
                name : 'issuedby',                
                id:'issuedby',
                hidden:true,
                value:SETTING.Users.userId
            },
            {
                name : 'rtitle',
                fieldLabel: 'Book Title',
                id:'rtitle',
                value:rec1.data.title
            },{
                xtype:'datefield',
                name : 'rrfromdate',
                fieldLabel: 'Issued Date',
                id:'rrfromdate',
                format: 'm-d-Y',
                altFormats: 'm-d-Y|m.d.Y',
                value:Ext.Date.parse(rec1.data.fromdate,'d-m-Y'),
                readOnly:true
                },
              {
                xtype:'datefield',
                name : 'todate',
                fieldLabel: 'Next Due Date',
                id:'todate',
                format: 'm d Y',
                altFormats: 'm-d-Y|m.d.Y',
                value : Ext.Date.parse(rec1.data.todate,'d-m-Y')
              }
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                handler:saverenewalBook
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show(); 
}

function saverenewalBook(btn){
   
    var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            obj.todate=new Date(obj.todate).getTime();
            Ext.Ajax.request({
            
                url:'library/renewbk.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
      
                    if(rec.result===1){
                     Ext.Msg.alert('Success','Issued Book ReNewal Done successfully');
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
    
}

function savereturnBook(btn){

  var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            obj.returndate=new Date(obj.returndate).getTime();
            obj.sessionid=SETTING.Users.properties.session_id;
            if(obj.returnedflag==='on')
                obj.returnedflag=1;
            else  
                obj.returnedflag=0;
            Ext.Ajax.request({
                url:'library/returnbk.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
      
                    if(rec.result===1){
                     var grid = Ext.getCmp('booktransgrid');
                     grid.getStore().remove(grid.getSelectionModel().getSelection());
                     if(rec.totbookrequest > 0) {
                        Ext.Msg.confirm("Success","Issued Book Returned  successfully . This book is request by "+rec.totbookrequest +" Person. Pleade press Yes to see the Requester name", function(btn){
                           if(btn==='yes'){
                             showRequesterDetails(rec);
                           }
                        });
                    }else
                        Ext.Msg.alert('Success','Issued Book Returned  successfully');
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}


function showRequesterDetails(rec){
   
    var bookid=rec.bookid;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Requester Details for Book:<b><font color=red>'+rec.title+'</font></b>',
            id:'requesterwindow',
            width:600,
            height:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Requester Details for Book :<b><font color=red>'+rec.title+'</font></b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:580
            },
            items :[
              {
                  xtype: 'fieldcontainer',
                  combineErrors: true,
                  layout: 'hbox',
                  items: [
                       {
                        xtype:Ext.create('MyApp.view.library.BookRequesterList'),                        
                        store:Ext.StoreManager.lookup('BookRequesterList').load({
                                      params:{bookid:bookid}
                        })
                  }]
              } 
            ],
            buttons :[
            {
                text: 'Print',
                action: 'print',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                    ///saveClassSubject(rec)
                 });
                }
              }
                    
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}

function showBookedHistory(rec){
   
    var bookid=rec.data.id;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Requester Details for Book:<b><font color=red>'+rec.title+'</font></b>',
            id:'requesterwindow',
            width:700,
            height:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Requester Details for Book :<b><font color=red>'+rec.title+'</font></b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:700
            },
            items :[
              {
                  xtype: 'fieldcontainer',
                  combineErrors: true,
                  layout: 'hbox',
                  items: [
                       {
                        xtype:Ext.create('MyApp.view.library.BookedHistory'),                        
                        store:Ext.StoreManager.lookup('BookedHistory').load({
                                      params:{bookid:bookid}
                        })
                  }]
              } 
            ],
            buttons :[
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
}


function demandOrRequestBook(rec){
    
var win = Ext.getCmp('demandreqbook_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Request / Demand Book  Form Window',
            id:'demandreqbook_win',
            width:550,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/requestbook.jpg',
                formTitle:'Request for Book :<b>'+rec.data.title+'</b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:500
            },
            formItems :[
            {
                name : 'bookid',                
                id:'bookid',
                hidden:true,
                value:rec.data.id
            },
            {
                name : 'sessionid',                
                id:'sessionid',
                hidden:true,
                value:SETTING.Users.properties.session_id
            },
            
            {
                name : 'title',
                fieldLabel: 'Book Title',
                id:'title',
                value:rec.data.title
            },{
                xtype:'combobox',
                fieldLabel :'Requested By',
                id:'requestedby',
                name:'requestedby',                
                store:Ext.create('Ext.data.Store', {
                    fields: ['id', 'value'],
                    data : [
                    {"id":"1","value":"Teacher"},
                    {"id":"2","value":"Student"}
                ]
                }),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Requester ...',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                        var issueto=Ext.getCmp('requestedby').getValue();
                        
                       if(issueto==='1'){
                            Ext.getCmp('classid').hide();
                            Ext.getCmp('studentid').hide();
                            Ext.getCmp('teacherid').show();
                        }else if(issueto==='2'){
                            Ext.getCmp('teacherid').hide();
                            Ext.getCmp('classid').show();
                            Ext.getCmp('studentid').show();
                        }
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Teacher',
                id:'teacherid',
                name:'teacherid',                
                store:Ext.create('MyApp.store.Combo').load(
                          {
                                      params:{propertyId:5
                          }}
                ),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Teacher Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true
            },{
                xtype:'combobox',
                fieldLabel :'Select Class',
                id:'classid',
                name:'classid',                
                store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Class Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true,
                listeners:{
                    select: function(component){
                    var classid=Ext.getCmp('classid').getValue();
                    Ext.getCmp('studentid').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :classid+'&'+SETTING.Users.properties.session_id,
                             teacherid :SETTING.Users.userId
                     }
               });
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Student',
                id:'studentid',
                name:'studentid',                
                store:'ClassCombo',
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select Student Name',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                hidden:true
            },{
                xtype:'datefield',
                name : 'enddate',
                fieldLabel: 'Notify If Book Available before Date',
                id:'enddate',
                format: 'm d Y',
                altFormats: 'm,d,Y|m.d.Y'
            },
            {
                xtype: 'textarea',
                name : 'description',
                fieldLabel: 'Description',
                id:'description'
            }
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                handler:saveRequestOrDemandBook
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();     
    
}

function saveRequestOrDemandBook(btn){
    var form = btn.up('window').down('form').getForm();
      if(form.isValid()){
            var obj = form.getValues();
            
            obj.enddate=new Date(obj.enddate).getTime();
            Ext.Ajax.request({
                url:'library/addbookreq.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    var rec = eval('('+res.responseText+')');
                    if(rec.result=='1'){
                     Ext.Msg.alert('Success','Book Request added successfully. You will be notified on availablity of this Book');
                    }
                    else
                    Ext.Msg.alert('Failer','Unexpected Error Occured,Please Contact Admin');    
                 //   var rec = eval('('+res.responseText+')');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
        }
}


Ext.define('MyApp.view.library.Library' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Library Management',
    id:'librarygrid',    
    alias: 'widget.library',    
    layout:{
        type:'hbox',
        align:'stretch'
    },
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>'
    },        
    initComponent: function() {
    var masterSM = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{

                selectionchange : function(sm){

                Ext.getCmp('bookEdit').setDisabled((sm.getCount()==0));
                Ext.getCmp('bookDelete').setDisabled((sm.getCount()==0));
                Ext.getCmp('bookIssue').setDisabled((sm.getCount()==0));
                Ext.getCmp('bookHistory').setDisabled((sm.getCount()==0));
                Ext.getCmp('bookDemand').setDisabled((sm.getCount()==0));
                
                if(sm.getCount()===1) {    
                    var rec=Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];
                    Ext.StoreMgr.lookup('BookDetail').load({
                            params:{'id':rec.data.id
                    }}
                 );
                }
                } 
            }
        });
    this.items=[
        {
            xtype:'grid',
            store:'BookList',
            id:'book_grid',
            title:'Book List',
            width:'30%',
            selModel:masterSM,
            vieConfig:{
                forceFit:true
            },
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Book Id',  
                dataIndex: 'id', 
                hidden:true
            },
            {
                header: 'Book No',  
                dataIndex: 'bookno', 
                style :'color:#17385B;font-weight:bold',
                hidden:true
            },{
                header: 'Book Code',  
                dataIndex: 'bookcode', 
                style :'color:#17385B;font-weight:bold',
                width:'20%'
            },{
                header: 'Book Name',  
                dataIndex: 'title', 
                style :'color:#17385B;font-weight:bold',
                width:'40%'
            },
            
            {
                header: 'Author',  
                dataIndex: 'author', 
                style :'color:#17385B;font-weight:bold',
                width:'30%'
            }
            ] 
        },{
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            ///store:'',
            id:'innerpanel-1',
            layout:{
               type:'vbox',
               align:'stretch'
            },
            viewConfig:{
                forceFit:true
            },
            flex:1,
            items:[
                {
                    title:'Book Detail',
                    xtype:'panel',
                    extend: 'Ext.panel.Panel',
                    id   :'place',
                    height:150,
                    items:[{
                        xtype:'grid',
                        id   :'bookdetailgrid',
                        store:'BookDetail',
                        height:150,
                        vieConfig:{
                           forceFit:true
                        },
                        columns:[
                            {header :'<font color=red><b>Publisher</b></font>',dataIndex:'publisher',flex:1,
                             renderer: function(value) {         
                                  return "<font color=red><b>" + value + "</b></font>";
                             }   
                             },
                            {header :'<font color=green><b>Subject</b></font>',width:'20%',dataIndex:'forsubject',flex:1},
                            {header :'<font color=green><b>Category</b></font>',width:'20%',dataIndex:'booktype'},
                            {header :'<font color=green><b>Book Code</b></font>',width:'15%',dataIndex:'bookcode'},
                            {header :'<font color=green><b>Book Edition</b></font>',width:'15%',dataIndex:'bookedition'},
                            {header :'<font color=green><b>Price</b></font>',width:'15%',dataIndex:'price'},
                            {header :'<font color=green><b>Tot Copy </b></font>',dataIndex:'totalcopy',hidden:true},
                            {header :'<font color=red><b>Tot Issued</b></font>',dataIndex:'totissued',hidden:true,
                             renderer: function(value) {         
                                  return "<font color=red><b>" + value + "</b></font>";
                             }   

                            }                            
                        ]
                    }

                    ]
                },
                {
                    xtype:'grid',
                    id   :'booktransgrid',
                    title:'Return / Renew Book',
                    store:'BookTransaction',
                    selModel:Ext.create('Ext.selection.CheckboxModel',{
                    singleSelect:true,
                        listeners:{                
                                selectionchange:function(sm){

                                   Ext.getCmp('returnButton').setDisabled((sm.getCount()==0));
                                   Ext.getCmp('renewButton').setDisabled((sm.getCount()==0));
                                   Ext.getCmp('alertButton').setDisabled((sm.getCount()==0));
                  
                                }
                            }
                    }),viewConfig:{
                        forceFit:true,
                        emptyText:'<div class="no-results">No Results To display</div>',
                        stripeRows:false ,
                        enableRowBody: true,
                        showPreview: true,      
                        getRowClass: function(record, rowIndex,rp){
                            
                            if(record.data.todateorg < new Date().getTime()){              
                            return "rowcontent1";
                            }else{
                                return "rowcontent";
                            }
                    }
                    },
                    columns:[
                            Ext.create('Ext.grid.RowNumberer'),
                            {header :'<font color=green><b>Book No</b></font>',
                             dataIndex:'bookno',
                             width:'7%'
                            },
                            {header :'<font color=green><b>Book Code</b></font>',
                             dataIndex:'bookcode',
                             width:'10%'
                            },
                            {header :'<font color=green><b>Title</b></font>',
                                width:'15%',
                             dataIndex:'title',flex:1
                            },
                            {header :'<font color=green><b>Teacher</b></font>',
                             id:'teachername',   width:'12%',
                             dataIndex:'teachername'},
                            {header :'<font color=green><b>Class</b></font>',
                             dataIndex:'classname',flex:1,width:'10%',
                             id:'classname'   
                             },
                            {header :'<font color=green><b>Student</b></font>',
                             dataIndex:'studentname',flex:1,width:'12%',
                             id:'studentname'   
                             },
                            {header :'<font color=green><b>From Date</b></font>',
                             dataIndex:'fromdate',width:'10%'},
                            {header :'<font color=green><b>To Date</b></font>',
                             dataIndex:'todate',
                             width:'10%',
                            },
                            {header :'<font color=green><b>Description</b></font>',
                             dataIndex:'description',width:'10%'}
                        ],
                    tbar :[{
                        xtype:'combobox',
                        id:'rissueto',
                        name:'rissueto',                
                        store:Ext.create('Ext.data.Store', {
                            fields: ['id', 'value'],
                            data : [
                            {"id":"1","value":"Teacher"},
                            {"id":"2","value":"Student"}
                        ]
                        }),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Issue to ...',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        listeners:{
                            select: function(component){
                                var issueto=Ext.getCmp('rissueto').getValue();

                               if(issueto==='1'){
                                    Ext.getCmp('rclassid').hide();
                                    Ext.getCmp('rstudentid').hide();
                                    Ext.getCmp('studentname').hide();
                                    Ext.getCmp('classname').hide();
                                    Ext.getCmp('rteacherid').show();
                                    Ext.getCmp('teachername').show();
                                    
                                    Ext.getCmp('booktransgrid').getStore().load({
                                                         params:{
                                                             issueto  :1,
                                                             teacherid:null,
                                                             classid  :null,
                                                             sessionid:SETTING.Users.properties.session_id,
                                                             studentid:null
                                                         }
                                    });
                                    
                               }else if(issueto==='2'){
                                    Ext.getCmp('rteacherid').hide();
                                    Ext.getCmp('teachername').hide();
                                    Ext.getCmp('rclassid').show();
                                    Ext.getCmp('rstudentid').show();
                                    Ext.getCmp('classname').show();
                                    Ext.getCmp('studentname').show();
                                }
                            }
                            }
                     },{
                        xtype:'combobox',
                        id:'rteacherid',
                        name:'rteacherid',                
                        store:Ext.create('MyApp.store.Combo').load(
                                  {
                                       params:{propertyId:5
                                  }}
                        ),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Teacher Name',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        hidden:true,
                        listeners:{
                            select :function(component){
                                var issueto=Ext.getCmp('rissueto').getValue();
                                if(issueto!==null){
                                var teacherid=Ext.getCmp('rteacherid').getValue();
                                Ext.getCmp('booktransgrid').getStore().load({
                                                         params:{
                                                             issueto  :1,
                                                             teacherid:teacherid,
                                                             classid  :null,
                                                             sessionid:SETTING.Users.properties.session_id,
                                                             studentid:null
                                                         }
                                });
                              }
                              else{
                                 Ext.Msg.alert('Warning','Please Select Issued To....');   
                              }
                            }
                        }
                    },{
                        xtype:'combobox',
                        id:'rclassid',
                        name:'rclassid',                
                        store:Ext.create('MyApp.store.ClassCombo1').load({
                                              params:{propertyId:2,
                                                      classid:SETTING.Users.properties.session_id,
                                                      teacherid :SETTING.Users.userId
                                            }}),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Class Name',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        hidden:true,
                        listeners:{
                            select: function(component){
                            var classid=Ext.getCmp('rclassid').getValue();
                            
                            Ext.getCmp('booktransgrid').getStore().load({
                                        params:{
                                                issueto  :2,
                                                teacherid:null,
                                                classid  :classid,
                                                sessionid:SETTING.Users.properties.session_id,
                                                studentid:null
                                              }
                                    });

                            
                            Ext.getCmp('rstudentid').getStore().load({
                             params:{
                                     propertyId:7,///Student List
                                     classid   :classid+'&'+SETTING.Users.properties.session_id,
                                     teacherid :SETTING.Users.userId
                            }
                            
                            
                       });

                            }
                       }

                    },{
                        xtype:'combobox',
                        id:'rstudentid',
                        name:'rstudentid',                
                        store:'ClassCombo',
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Select Student .....',
                        Autoload:true,
                        valueField :'id',
                        displayField :'value',
                        hidden:true,
                        listeners:{
                            select: function(component){

                           var classid=Ext.getCmp('rclassid').getValue();
                           var studid=Ext.getCmp('rstudentid').getValue();
                                Ext.getCmp('booktransgrid').getStore().load({
                                        params:{
                                                issueto  :2,
                                                teacherid:null,
                                                classid  :classid,
                                                sessionid:SETTING.Users.properties.session_id,
                                                studentid:studid
                                              }
                               });
                            }
                        }                  
                    },{
                    xtype:'button',
                    text:'<font color:"#17385B"><b>Return Book</b></font>',
                    iconCls: 'icon-edit',
                    id:'returnButton',
                    disabled: true,
                    scope :this,
                    listeners:{
                        render: function(component){
                            component.getEl().on('click', function(){                    
                                var rec=Ext.getCmp('booktransgrid').getSelectionModel().getSelection()[0];
                                if(rec===null){
                                    Ext.Msg.alert('Warning','Please Select From Grid to Return Book....');   
                                }
                                else{
                                    returnBook(rec);
                                }
                            });

                        }
                    }
                    },{
                    xtype:'button',
                    text:'<font color:"#17385B"><b>Reissued Book</b></font>',
                    iconCls: 'icon-edit',
                    id:'renewButton',
                    disabled: true,
                    scope :this,
                    listeners:{
                        render: function(component){
                            component.getEl().on('click', function(){                    
                                var rec=Ext.getCmp('booktransgrid').getSelectionModel().getSelection()[0];
                                if(rec===null){
                                    Ext.Msg.alert('Warning','Please Select From Grid to Reissue Book....');   
                                }
                                else{
                                    reissueBook(rec);
                                }
                            });
                        }
                    }
                    },,{
                    xtype:'button',
                    text:'<font color:"#17385B"><b>Send Due Alert</b></font>',
                    iconCls: 'icon-edit',
                    id:'alertButton',
                    disabled: true,
                    scope :this,
                    listeners:{
                        render: function(component){
                            component.getEl().on('click', function(){                    
                                var rec=Ext.getCmp('booktransgrid').getSelectionModel().getSelection()[0];
                              
                            });

                        }
                    }
                    }]    
                 }
            ]
        }
    ];
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true,
        listeners:{
                selectionchange:function(sm){
                 /*  Ext.getCmp('bookEdit').setDisabled((sm.getCount()==0));*/
                }
            }
    });
    this.tbar =[{
                        xtype:'combobox',
                        id:'booksearchtype',
                        name:'booksearchtype',                
                        store:Ext.create('MyApp.store.GenericSearchComboBox').load({
                                              params:{module:'Library'
                                            }}),
                        typeAhead: true,
                        queryMode: 'local',
                        emptyText: 'Search Book by',
                        Autoload:true,
                        width:"110",
                        valueField :'id',
                        displayField :'value',
                        listeners:{
                            select: function(component){
                            var searchtype=Ext.getCmp('booksearchtype').getRawValue();
                            var field=Ext.getCmp('searchtext');
                            field.emptyText = "Search by "+searchtype;
                            field.applyEmptyText();
                        }
                       }

        },
        {
            xtype: 'textfield',
            id: 'searchtext',
            name: 'searchtext',
            emptyText: 'Enter Search Text',
            width: 150,
            listeners:  {
                specialkey: function (f,e) {    
                     if (e.getKey() == e.ENTER) {
                        
                        var searchcolumn=Ext.getCmp('booksearchtype').getValue();
                        var columnvalue=Ext.getCmp('searchtext').getValue();
                        if(searchcolumn!=null && columnvalue!=null) {
                        Ext.getCmp('book_grid').getStore().load({
                                                         params:{
                                                            columnname  :searchcolumn,
                                                            columnvalue :columnvalue,
                        }
                        });
                    }
                    }
                }
            }
        },
        {
        iconCls: 'icon-add',
        text: '<font color:"#17385B"><b>Add Book</b></font>',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    addBook(null);
                });

            }
        }
    },{
        iconCls: 'icon-edit',
        text: '<font color:"#17385B"><b>Edit Book</b></font>',
        disabled: true,
        id:'bookEdit',
        scope:this,
        handler: function(component){
                    var rec=Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];
                    if(rec!=null)
                        addBook(rec);
                    else
                        Ext.Msg.alert('Warning','Please Select Book from Book List Grid to Edit the Details');
        }
    },{
        iconCls: 'icon-delete',
        text: '<font color:"#17385B"><b>Delete Book</b></font>',
        disabled: true,        
        id:'bookDelete',
        handler: function(component){
            Ext.Msg.confirm("Alert","Are you sure want to delete Book", function(btn){
            if(btn==='yes'){
                var grid = Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];
                var data={  
                            'id':grid.data.id
                         }; 
                if(grid!=null){
                  Ext.Ajax.request({
                    url:'library/delbk.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var rec = eval('('+res.responseText+')');
                        if(rec.result==1) {
                        Ext.getCmp('book_grid').getStore().remove(Ext.getCmp('book_grid').getSelectionModel().getSelection());
                        Ext.Msg.alert('Success','Book Deleted Successfully');
                        }
                        else if(rec.result==3)
                        Ext.Msg.alert('Failure','Error Occured , Please Contact Admin');    
                        else if(rec.result==2)
                        Ext.Msg.alert('Warning','Book has booking History or Currently booked so can not be deleted');    
                         
                    }
                });  
                 

                }
            }
        });
        }
    },{
        xtype:'button',
        text:'<font color:"#17385B"><b>Issue Book</b></font>',
        iconCls: 'icon-add',
        id:'bookIssue',
        disabled: true,        
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){                    
                    var rec=Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];
                    if(rec===null)
                       Ext.Msg.alert('Warning','Please Select Book to be Issued'); 
                    else{ 
                       var store=Ext.getCmp('bookdetailgrid').getStore();
                       //Ext.StoreManager.lookup('BookDetail').getModifiedRecords();
                       var record=store.getAt(0);
                       if(record.data.totalcopy-record.data.totissued <= 0){
                         Ext.Msg.alert('Warning','All Copy of selected Book is Issued , Book is not in Stock'); 
                       }else{
                           issueBook(rec,record);
                       }
                    }
                });
            }
        }
    },{
        iconCls: 'icon-grid',
        text: '<font color:"#17385B"><b>Issued History</b></font>',
        id:'bookHistory',
        disabled: true,        
        handler: function(component){
              var rec=Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];            
              showBookedHistory(rec);
              
        }
    },{
        iconCls: 'icon-lookup',
        text: '<font color:"#17385B"><b>Demand/Request Book</b></font>',
        id:'bookDemand',
        disabled: true,        
        handler: function(component){
                
            var rec=Ext.getCmp('book_grid').getSelectionModel().getSelection()[0];
            if(rec!=null){
                demandOrRequestBook(rec);
            }
                
                
        }
    },{
        xtype:'splitbutton',
        text:'<font color:"#17385B"><b>Send Due Notification</b></font>',
        arrowAlign:'right',
        menu: [{text: '<b>Email</b>'},{text: '<b>SMS</b>'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    });

            }
        }
    }
    ];
    this.bbar = Ext.create('Ext.PagingToolbar', {
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying users {0} - {1} of {2}',
        emptyMsg: "No user to display",
        items:[{
        xtype:'button',
        text:'Print',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){

                })

            }
        }
    },{
        xtype:'splitbutton',
        text:'Export Data',
        arrowAlign:'right',
        menu: [{text: 'PDF'},{text: 'Excelsheet'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    //addFeeTemplate();
                    })

            }
        }
    }]
    });
    this.callParent(arguments);
    },
    onRender : function(){
        //this.selModel.on('selectionchange', this.onSelectChange);
        this.callParent(arguments);
    },
    selectionchange : function(sm, selected,eOpts){
        if(sm.getCount()){
              
    }
    }
});




