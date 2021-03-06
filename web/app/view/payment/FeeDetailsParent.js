Ext.define('MyApp.view.payment.FeeDetailsParent' ,{
    extend: 'Ext.panel.Panel',
    closable:true,
    title: 'Current Month Fee Detail',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    id:'feedetailsparent',
    items:[
        {
            xtype:'panel',
            title:'Current Month Fee Detail'
        }
    ],    
    initComponent: function() {

    var masterSM = Ext.create('Ext.selection.CheckboxModel',{
            singleSelect:true,
            listeners:{

                selectionchange : function(sm){
                } 
            }
        });

        this.items = [
        {
            xtype:'grid',
            store:'StudentFeePayment',
            id:'parent_fee_grid',
            closable:true,
            title:'Student Fee Detail',
            alias: 'widget.studentfeeparent',
            height:250,
            selModel:masterSM,
            viewConfig:{
             
                forceFit:true,
                stripeRows:false ,
                enableRowBody: true,
                showPreview: true,
                getRowClass: function(record, rowIndex,rp){
                    if(record.data.paid_status=='1'){              
                    return "rowcontent";
                    }else{
                        return "rowcontent1";
                    }
             }
            },                
            columns:[
            Ext.create('Ext.grid.RowNumberer'),
            {
                header: 'Session',  
                dataIndex: 'year', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'class',  
                dataIndex: 'classname', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },             
            {
                header: 'Month',  
                dataIndex: 'month', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Tot Amount',  
                dataIndex: 'amount', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Due Date',  
                dataIndex: 'due_date', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Status',  
                dataIndex: 'status', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Paid By',  
                dataIndex: 'paid_by', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Paid On',  
                dataIndex: 'paid_on', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            },
            {
                header: 'Paid Amount',  
                dataIndex: 'paid_amount', 
                flex:1,
                style :'color:#17385B;font-weight:bold'
            }

            ],
            tbar:[{
                xtype:'combobox',
                id:'feesession',
                emptyText: 'Select Year',       
                store:Ext.create('MyApp.store.Combo').load({
                                       params:{propertyId:-1}}),//For Session
                Autoload:true,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                name:'type'

                },
                {
                        xtype: 'combobox',
                        emptyText: 'Select Month',
                        id:'feemonth',
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

                             }
                        }
                     },{
                    xtype: 'combo',
                    emptyText: 'Select Class',
                    id:'classcombo1',
                    hidden:true,
                    store:Ext.create('MyApp.store.Combo').load({
                                                   params:{propertyId:2}}),//For Teacher
                    typeAhead: true,
                    queryMode: 'local',
                    Autoload:true,
                    valueField :'id',
                    displayField :'value',  
                    listeners:{
                         select: function(component){
                         }
                    }
                 },{
                    xtype:'button',
                    text:'View Fee Details',
                    iconCls: 'icon-edit',
                    listeners:{
                    }                            
                },{
                    xtype:'button',
                    text:'Pay Fee',
                    iconCls: 'icon-edit',
                    listeners:{
                        render: function(component){
                             component.getEl().on('click', function(){
                                var rec=Ext.getCmp('parent_fee_grid').getSelectionModel().getSelection()[0]; 
                                
                                if(rec.data.paid_status=='0')
                                window.open('proceedPayment.jsp?mppid='+rec.data.monthly_fee_id,'_blank','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=700');
                                else
                                Ext.Msg.alert('Warning','Fee for this month is already paid');
                               });
                      }
                  }
                },{
                    xtype:'splitbutton',
                    text:'Download Receipt',
                    iconCls: 'icon-add',
                    arrowAlign:'right',
                    menu: [{text: 'PDF'},{text: 'MS-Word'}],
                    listeners:{
                        render: function(component){
                            component.getEl().on('click', function(){

                            });
                        }
                    }
                }
              ]        
            
        },{
            title:'Complete Fee Details',
            xtype:'panel',
            extend: 'Ext.panel.Panel',
            store:'Master',
            id:'innerfeepanel',
            viewConfig:{
                forceFit:true
            },
            flex:1,
            html:'fgfdgkldfjgfdjglkfjg'
       }
    ],
        this.callParent(arguments);
    },
    onRender : function(){        
        this.callParent(arguments);
    },
    afterRender :function(){     
       this.callParent();
       this.maindataStore=Ext.getCmp('parent_fee_grid').getStore();     
    }
  });
