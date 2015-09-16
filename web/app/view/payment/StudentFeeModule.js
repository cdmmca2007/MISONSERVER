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
    },
    {
        header: 'Class Name',
        dataIndex:'classname',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },

    {
        header:'Student Name',
        dataIndex:'studentname',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },

    {
        header:'Fee Teamplate',
        dataIndex:'template',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },{
        header:'Month',
        dataIndex:'for_month',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },
    {
        header:'Paid Status',
        dataIndex:'paid_status',
        style :'color:#17385B;font-weight:bold',
        width:'15%',
        renderer:function(value){
            return '<b>'+value+'</b>';
        }
    },
    {
        header:'Total Amount',
        dataIndex:'amount',
        style :'color:#17385B;font-weight:bold',
        width:'15%'
    },{ 
        header:'Mark Paid',
        dataIndex:'markpaid',
        xtype:'checkcolumn',
        style :'color:#17385B;font-weight:bold;align:center',
        width:'10%',
        
        stopSelection: false,
        listeners :{
            checkchange: function(box, rowIndex,checked,eOpts ){
            var obj =Ext.StoreMgr.lookup('StudentFeeModule').getAt(rowIndex).data;
            if(obj!=null){
            Ext.Msg.confirm("Alert","Are you sure want mark fee paid for Student :<b>"+obj.studentname+'</b>', function(btn){
            if(btn=='yes'){
                if(checked){                
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
                } else{
                    alert('Failed');
                }
                
            }
            });
            } 
          }
        }
        
    }
    ];
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


  
