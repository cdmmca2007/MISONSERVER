 var currRow;
 /*AjaxRowExpander = function(config, previewURL){
    AjaxRowExpander.superclass.constructor.call(this, config, previewURL);
    this.previewURL = previewURL;
    this.enableCaching = false;
};
Ext.extend(AjaxRowExpander, Ext.grid.RowExpander, {
    getBodyContent : function(record, index){
        var body = '<div id="tmp">Loading…</div>';
        Ext.Ajax.request({
           url: this.previewURL + record.monthly_fee_id,
           disableCaching: true,
           success: function(response, options) {
              // Ext.getDom('articleReportsPreview' + options.objId).innerHTML = response.responseText;
              alert('success');
           },
           failure: function(error) {
             ///  alert(DWRUtil.toDescriptiveString(error, 3));
             alert('failure');
           },
           objId: record.monthly_fee_id
        });
 
        return body;
    },
    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            body.innerHTML = this.getBodyContent(record, rowIndex);
            return true;
        } else{
            return false;
        }
    }
});
*/

function showFeeStructureDetails(rec){
     
       Ext.StoreManager.lookup('StudentMonthlyFee').load({
         params:{monthly_fee_id :rec.data.monthly_fee_id
         }
       });

       var app1=app.getController('Dashboard')
       var Tab = Ext.create('MyApp.view.payment.EditStudentMonthlyFee');
       app1.getDashboard().add(Tab);
       app1.getDashboard().setActiveTab(Tab);  
 }

function addFineToStudent(rec) {
    
    var win = Ext.getCmp('addfine_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:rec?'Remove Fine Form':'Add Fine Form',
            id:rec?'removefinetostud_win':'addfinetostud_win',
            width:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/fee_struc.jpg',
                formTitle:'Add Fine'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:400
            },
            url:'ppppp',
            formItems :[
            {
                name : 'sessionid',                
                id:'sessionid',
                hidden:true,
                value:SETTING.Users.properties.session_id
            },  
            {
                name : 'monthly_fee_id',                
                id:'monthly_fee_id',
                hidden:true,
                value:rec?rec.data.monthly_fee_id:null
            }, 
            
            {
                xtype:'combobox',
                fieldLabel :'Select Fine Type',
                id:'finetype',
                name:'finetype',                
                store:Ext.create('MyApp.store.FineListCombo').load({
                                      params:{sessionid:SETTING.Users.properties.session_id}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fine Type .... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                       
                       var finetypeid=Ext.getCmp("finetype").getValue();
                       if(finetypeid!=null){
                           Ext.getCmp('fineid').getStore().load({
                                params:{
                                        finetypeid:finetypeid
                                }
                           });
                           
                       }
                       
                       
                    }
               }
            },{
                xtype:'combobox',
                fieldLabel :'Select Fine Rule',
                id:'fineid',
                name:'fineid',                
                store:'FineRuleComboStore',
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Fine Rule .... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                       
                    }
               },/*renderer:function(value){
                     value=value.substring(0,value.indexOf(':'));
                     return '<b>'+value+'</b>';
            }*/
            }
            ],
            buttons :[
            {
                text: 'Add',
                action: 'save',
                scope:this,
                handler:saveFineToStudent
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}
function saveFineToStudent(btn) {
    
       var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
                       
            Ext.Ajax.request({
                url:'payment/addfinetostudmonfee.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                Ext.Msg.alert('Success','Fine added to select student successfully');
                var rec=Ext.getCmp('StudentFeeModulegrid').getSelectionModel().getSelection()[0];                       
                var response = eval('('+res.responseText+')');
                if(rec!=null && response.fineamount!=null){
                  var record = Ext.getCmp('StudentFeeModulegrid').getStore().getAt(currRow);
                  record.set("fineamount",response.fineamount);
                }
                }
            });
        }
    
}
 
function addDiscountToStudent(rec) {
    
    var subjectstore = Ext.StoreManager.lookup('StudentDiscount');
    var classid=rec.data.batch_id;
    var win;
    if(!win){
        win=Ext.create('Ext.window.Window', {
            title:'Add Discount for :<b><font color=red>'+rec.data.studentname+'</font></b>',
            id:'addSubjects',
            width:600,
            height:300,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/createuser.png',
                formTitle:'Discount option for :<b><font color=red>'+rec.data.studentname+'</font></b>'
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:580
            },
            url:'ppppp',
            items :[
              {
                  xtype: 'fieldcontainer',
                  combineErrors: true,
                  layout: 'hbox',
                  items: [
                       {
                        xtype:Ext.create('MyApp.view.payment.StudentDiscount'),                        
                        store:Ext.StoreManager.lookup('StudentDiscount').load({
                                      params:{classid:Ext.getCmp("classcombo").getValue(),
                                              sessionid:SETTING.Users.properties.session_id,
                                              studentid:rec.data.student_id        
                                }
                        })
                  }]
              } 
            ],
            buttons :[
            {
                text: 'Save',
                action: 'save',
                scope:this,
                listeners:{
                render: function(component){
                component.getEl().on('click', function(){                                        
                    saveDiscountToStudent(rec);
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
 
function markFeePaid(obj){
     var win = Ext.getCmp('addfine_win');
    if(!win){
        win=Ext.create('Ext.app.view.component.AppWindow', {
            title:'Fee Payment Confirmation',
            id:'fee_payment_confirmation',
            width:500,
            closeAction:'destroy',
            top:{
                image:BASE_URL+'resources/images/portal-icon/fee_struc.jpg',
                formTitle:'Fee Payment Confirmation For '+obj.studentname
            },
            defaults:{
                xtype:'textfield',
                value:'',
                width:400
            },
            formItems :[
            
            {
                name : 'paid_by',                
                id:'paid_by',
                hidden:true,
                value:SETTING.Users.userId
            },
            {
                name : 'monthly_fee_id',                
                id:'monthly_fee_id',
                hidden:true,
                value:obj?obj.monthly_fee_id:null
            }, {
                 fieldLabel :'Total Payable Amount',
                name : 'payable_amount',                
                id:'payable_amount',
                readOnly:true,
                value:parseFloat((obj.amount?parseFloat(obj.amount):parseFloat(0)) + (obj.fineamount?parseFloat(obj.fineamount):parseFloat(0)) - (obj.discountamount?parseFloat(obj.discountamount):parseFloat(0)))
            },{
                fieldLabel :'Total Paid Amount',
                name : 'paid_amount',                
                id:'paid_amount',
                value:parseFloat((obj.amount?parseFloat(obj.amount):parseFloat(0)) + (obj.fineamount?parseFloat(obj.fineamount):parseFloat(0)) - (obj.discountamount?parseFloat(obj.discountamount):parseFloat(0)))
            },{
                fieldLabel :'Payment Recieved From',
                name : 'received_from',                
                id:'received_from'
            },  
            {
                xtype:'combobox',
                fieldLabel :'Select Relation with Student',
                id:'relationtype',
                name:'relationtype',                
                store:Ext.create('MyApp.store.Master').load({
                                      params:{propertyId:55}}),
                typeAhead: true,
                queryMode: 'local',
                emptyText: 'Select a Relation Type .... ',
                Autoload:true,
                valueField :'id',
                displayField :'value',
                listeners:{
                    select: function(component){
                    }
               }
            }
            ],
            buttons :[
            {
                text: 'Pay',
                action: 'save',
                scope:this,
                handler:markFeePaidConfirm
            },
            {xtype:'btncancel'}
            ]
        });
    }
    win.show();
    
}

function markFeePaidConfirm(btn){
    
    var form = btn.up('window').down('form').getForm();
        if(form.isValid()){
            var obj = form.getValues();
            Ext.Ajax.request({
                url:'markpaidfee/pay.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    
                     var rec = eval('('+res.responseText+')');
                     if(rec.markpaid==1)
                         Ext.Msg.alert('Success','Fee Marked successfully');
                     else
                         Ext.Msg.alert('failer','Fee Marked failed');
                 //   app.getController('Class').getClassStore().add(rec);
                }
            });
      }
     
}

 Ext.define('MyApp.view.payment.StudentFeeModule' ,{
    extend: 'Ext.grid.Panel',
    closable:true,
    title: 'Student Fee Management',
    id:'StudentFeeModulegrid',
    layout:'fit',
    alias: 'widget.StudentFeeModule',
   // plugins: new AjaxRowExpander({}, 'studentmonthlyfee/get.do?monthly_fee_id='),
    viewConfig:{
        forceFit:true,
        emptyText:'<div class="no-results">No Results To display</div>',
        stripeRows:false ,
        enableRowBody: true,
        showPreview: true,      
        getRowClass: function(record, rowIndex,rp){
            if(record.data.markpaid=='1'){              
            return "rowcontent";
            }else{
                return "rowcontent1";
            }
    }
    },    
    store:'StudentFeeModule',    
    initComponent: function() {

    this.columns=[
    Ext.create('Ext.grid.RowNumberer'),
    {
        header: 'mothly_fee_id',
        dataIndex:'mothly_fee_id',       
        hidden :true
    },{
        header: 'studentid',
        dataIndex:'student_id',       
        hidden :true
    },
    {
        header: 'Class Name',
        dataIndex:'classname',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        hidden:true,
    },
    {
        header:'Student Name',
        dataIndex:'studentname',
        style :'color:#17385B;font-weight:bold',
        width:'10%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },

    {
        header:'Fee Teamplate',
        dataIndex:'template',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        hidden:true
    },{
        header:'Month',
        dataIndex:'for_month',
        style :'color:#17385B;font-weight:bold',
        width:'7%'
    },{
        header:'Due Date',
        dataIndex:'due_date',
        style :'color:#17385B;font-weight:bold',
        width:'7%'
    },
    
    {
        header:'Total Fee',
        dataIndex:'amount',
        style :'color:#17385B;font-weight:bold',
        width:'6%'
    },{
        header:'Fine Amount',
        dataIndex:'fineamount',
        style :'color:#17385B;font-weight:bold',
        width:'7%'
    },{
        header:'Discount',
        dataIndex:'discountamount',
        style :'color:#17385B;font-weight:bold',
        width:'6%'
    },{
        header:'Payable Amount',
        dataIndex:'payamount',
        style :'color:#17385B;font-weight:bold',
        width:'9%',
        renderer : function(value,metadata,record){
            value=parseFloat((record.data.amount?parseFloat(record.data.amount):parseFloat(0)) + (record.data.fineamount?parseFloat(record.data.fineamount):parseFloat(0)) - (record.data.discountamount?parseFloat(record.data.discountamount):parseFloat(0)));
            return value;  
          }                   
    },{
        header:'Paid Amount',
        dataIndex:'paid_amount',
        style :'color:#17385B;font-weight:bold',
        width:'7%'
    },{ 
        header:'Mark Paid',
        dataIndex:'markpaid',
        xtype:'checkcolumn',
        style :'color:#17385B;font-weight:bold;align:center',
        width:'7%',
        stopSelection: false,
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
            var obj =Ext.StoreMgr.lookup('StudentFeeModule').getAt(rowIndex).data;
            if(obj!=null){
            Ext.Msg.confirm("Alert","Are you sure want mark fee paid for Student :<b>"+obj.studentname+'</b>', function(btn){
            if(btn=='yes'){
                if(checked){
                
                markFeePaid(obj);    
                        
               /* Ext.Ajax.request({
                url:'markpaidfee/pay.do',
                type:'json',
                headers:{
                    'Content-Type':'application/json'
                },
                params:Ext.JSON.encode(obj),
                success: function(res){
                    
                     var rec = eval('('+res.responseText+')');
                     if(rec.markpaid==1)
                         Ext.Msg.alert('Success','Fee Marked successfully');
                     else
                         Ext.Msg.alert('failer','Fee Marked failed');
                 //   app.getController('Class').getClassStore().add(rec);
                }
                });*/
                } 
                
            }
            });
            } 
          }
        }
    },{
        header:'Paid Status',
        dataIndex:'paid_status',
        style :'color:#17385B;font-weight:bold',
        width:'9%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },{
        header:'Paid Date',
        dataIndex:'paid_on',
        style :'color:#17385B;font-weight:bold',
        width:'10%'
        
    },{
        header:'Paid By',
        dataIndex:'paymentreceicvedfrom',
        style :'color:#17385B;font-weight:bold',
        width:'10%',
        renderer:function(value){
            if(value==null)
            return '<b>'+'N/A'+'</b>';
            else
            return '<b>'+value+'</b>';    
        }
    }
    ];
    this.listeners={
        cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            currRow=rowIndex;
        }
    };
    this.selModel=Ext.create('Ext.selection.CheckboxModel',{
        singleSelect:true
    });
    this.tbar =[{
        xtype:'combobox',
        id:'session',
        emptyText: 'Select Session',   
        store:Ext.create('MyApp.store.Combo').load({
                                      params:{propertyId:-1}}),//For Session
        Autoload:true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        value:SETTING.Users.properties.session_id,
        name:'type',
            listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('session').getValue();
                var classid  =Ext.getCmp('classcombo').getValue();
                var month=Ext.getCmp('month').getValue();                
                
               Ext.getCmp('classcombo').getStore().load({
                     params:{
                             propertyId:2,///Class List
                             classid   :sessionid,
                             teacherid :SETTING.Users.userId
                     }
               });
                if(sessionid!=null && classid!=null && month!=null)    
                {
                     Ext.getCmp('StudentFeeModulegrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid,
                             month     :month
                     }
                     });
                }    

            }
       }

    },{
       xtype: 'combo',
       emptyText: 'Select Class',
       text   : 'Class',
       id:'classcombo',
       store:Ext.create('MyApp.store.ClassCombo1').load({
                                      params:{propertyId:2,
                                              classid:SETTING.Users.properties.session_id,
                                              teacherid :SETTING.Users.userId
                                    }}),
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('session').getValue();
                var classid  =Ext.getCmp('classcombo').getValue();
                var month=Ext.getCmp('month').getValue();                
                
                Ext.getCmp('studentcombo').getStore().load({
                     params:{
                             propertyId:7,///Student List
                             classid   :classid+'&'+sessionid,
                             teacherid :SETTING.Users.userId
                     }
               });
                if(sessionid!=null && classid!=null && month!=null)    
                {
                     Ext.getCmp('StudentFeeModulegrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid,
                             month     :month
                     }
                     });
                }    
               
               
            }
       }
    },
    {
       xtype: 'combobox',
       emptyText: 'Select Student',
       text   : 'Student',
       id:'studentcombo',
       store:'ClassCombo',
       typeAhead: true,
       queryMode: 'local',
       Autoload:true,
       valueField :'id',
       displayField :'value',  
       listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('session').getValue();
                var classid  =Ext.getCmp('classcombo').getValue();
                var month=Ext.getCmp('month').getValue();
                var studentid=Ext.getCmp('studentcombo').getValue();
                var warningmsg;
                if(month==null)
                   month=0;
                if(sessionid!=null && classid!=null)    
                {
                     Ext.getCmp('StudentFeeModulegrid').getStore().load({
                     params:{                             
                             classid   :classid+':'+studentid ,
                             sessionid :sessionid,
                             month     :month                             
                     }
                     });
                }    
                
            }
       }
    },{
       xtype: 'combobox',
       emptyText: 'Select Month',
       id:'month',
       store:Ext.create('Ext.data.Store', {
            fields: ['id', 'value'],
            data : [
            {"id":"1","value":"January"},
            {"id":"2","value":"February"},
            {"id":"3","value":"March"},
            {"id":"4","value":"April"},
            {"id":"5","value":"May"},
            {"id":"6","value":"June"},
            {"id":"7","value":"July"},
            {"id":"8","value":"August"},            
            {"id":"9","value":"September"},
            {"id":"10","value":"October"},
            {"id":"11","value":"November"},
            {"id":"12","value":"December"},
            {"id":"13","value":"All Month"}
        ]
        }),
        typeAhead: true,
        queryMode: 'local',
        displayField: 'value',
        valueField: 'id',
        name:'type',
        listeners:{
            select: function(component){
                var sessionid=Ext.getCmp('session').getValue();
                var classid  =Ext.getCmp('classcombo').getValue();
                var month=Ext.getCmp('month').getValue();                
                if(sessionid!=null && classid!=null && month!=null)    
                {
                     Ext.getCmp('StudentFeeModulegrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid,
                             month     :month
                     }
                     });
                }    

            }
       }
    },{
        xtype:'button',
        text:'View Fee',
        iconCls: 'icon-edit',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    
                var sessionid=Ext.getCmp('session').getValue();
                var classid  =Ext.getCmp('classcombo').getValue();
                var month=Ext.getCmp('month').getValue();
                
                
                var warningmsg;
                if(sessionid!=null && classid!=null && month!=null)    
                {
                     Ext.getCmp('StudentFeeModulegrid').getStore().load({
                     params:{                             
                             classid   :classid ,
                             sessionid :sessionid,
                             month     :month
                     }
                     });
                }  
                else if(sessionid!=null && classid!=null && Ext.getCmp('studentcombo').getValue()!=null) {

                     if(month==null)
                     month=0;   
                    
                     Ext.getCmp('StudentFeeModulegrid').getStore().load({
                     params:{                             
                             classid   :classid+':'+Ext.getCmp('studentcombo').getValue() ,
                             sessionid :sessionid,
                             month     :month                             
                     }
                     });
                }
                else
                    Ext.Msg.alert('Warning','To View ,Please Select Session , Month and Class');                     
                });
                
            }
        }
    },
    {
        xtype:'button',
        text:'Edit Fee',
        iconCls: 'icon-edit',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('StudentFeeModulegrid').getSelectionModel().getSelection()[0];                       
                       
                    if(rec.data.markpaid==1){
                        Ext.Msg.alert('Success','Fee Already Paid,so cant be modified');   
                    }
                    else{
                    showFeeStructureDetails(rec);
                    }
                    });

            }
        }
    },{
        xtype:'button',
        text:'Add Fine',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('StudentFeeModulegrid').getSelectionModel().getSelection()[0];                       
                    if(rec!=null){                       
                        addFineToStudent(rec);
                    }
                    });

            }
        }
    },,{
        xtype:'button',
        text:'Add Discount',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('StudentFeeModulegrid').getSelectionModel().getSelection()[0];                       
                       
                    if(rec!=null){
                        addDiscountToStudent(rec);
                    }
                 });

            }
        }
    },{
        xtype:'button',
        text:'Generate Reciept',
        iconCls: 'icon-add',
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    var rec=Ext.getCmp('StudentFeeModulegrid').getSelectionModel().getSelection()[0];                       
                       
                    if(rec.data.markpaid==""){
                        Ext.Msg.alert('Success','Reciept Can not be generated ,Fee Not Paid');   
                    }
                    else{
                var data={
                    'monthly_fee_id':rec.data.monthly_fee_id 
                };
              
                Ext.Ajax.request({
                    url:'payment/paymtrecipt.do',
                    type:'json',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    params:Ext.JSON.encode(data),
                    success: function(res){
                        var alldata = eval('('+res.responseText+')');
                        Ext.create('MyApp.view.payment.MonthlyPaymentReciept',{
                                    title:'Monthly Fee Payment Reciept',
                                    paymentDetail:alldata
                        }).show();

                    }
                    }); 
                        
                    }
                    });

            }
        }
    },{
        xtype:'splitbutton',
        text:'Send Notification to Parent',
        iconCls: 'icon-add',
        arrowAlign:'right',
        menu: [{text: 'By Email'},{text: 'By SMS'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                 
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
                    //addFeeTemplate();
                    });

            }
        }
    },{
        xtype:'splitbutton',
        text:'Send Notification to Parent',
        iconCls: 'icon-add',
        arrowAlign:'right',
        menu: [{text: 'By Email'},{text: 'By SMS'}],
        listeners:{
            render: function(component){
                component.getEl().on('click', function(){
                    });

            }
        }
    },{
                xtype:'splitbutton',
                text:'Export Data',
                arrowAlign:'right',
                iconCls: 'icon-add',
                menu: [{text: 'PDF'},{text: 'Excelsheet'}],
                listeners:{
                    render: function(component){
                        component.getEl().on('click', function(){
                                 //download();
                                 Ext.Msg.alert('Success','Please wait,while file is being downloaded');
                            });

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


  
