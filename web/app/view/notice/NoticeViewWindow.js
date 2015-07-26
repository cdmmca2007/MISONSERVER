var x=0;

Ext.define('MyApp.view.notice.NoticeViewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.noticeeview',
    bodyStyle: 'background:transparent;padding:5px 10px 10px;background:#FFF;font-size:11px',
    constructor: function(config) {

        this.callParent([Ext.apply({
            width: 700,
            height: 500, 
            autocreate: true,
            border: true,
            closeAction: 'hide',
            modal: true,
            resizable: false,
            buttonAlign : 'center',
            layout: 'fit',
            defaultFocus: 'title',
            onEsc: function(key, event){
                   event.target.blur(); // Remove the focus to avoid doing the validity checks when the window is shown again.
                   this.onCancel();
             },

            
                         buttons:[
                        {   
                            text: 'Previous',
                            action: 'previous',
                            scope:this,                            
                            handler:function (){                              
                            
                            if(x>0)
                             {   
                            var records = Ext.StoreManager.lookup('Notification').getAt(x-1);
                            x=x-1;
                            var tpl= this.getTemplate();
                            tpl.overwrite(this.body,records.data);
                             }
                            }
                        },{
                            text: 'Next',
                            action: 'next',
                            scope:this,                            
                            handler:function(){
                            var count=Ext.StoreManager.lookup('Notification').getCount();
                            
                            if(x<count-1) {
                            var records = Ext.StoreManager.lookup('Notification').getAt(x+1);
                            x=x+1;
                            var tpl= this.getTemplate();
                            tpl.overwrite(this.body,records.data);
                            }
                            
                            }
                        },{   
                            text: 'Cancel',
                            action: 'cancel',
                            scope:this,
                            handler:function(){
                                     this.hide();
                            }
                        },]
                        },
        
        
        config)]);
    },

    // private
    getTemplate: function(){
       var tpl = new Ext.XTemplate(
        '<hr>',
        '<div style="overflow:auto;width:650px">',
        '<div style="width:320px;float:left;height:120px">',
        
        '<div class="f-item"><div class="f-label"> <b>Notice Title</b> </div><font color=green><b>{title}    </b></font></div>',
        '<div class="f-item"><div class="f-label"> <b>Notice For  </b> </div><font color=green><b>{recipient}</b></font></div>',
        '<div class="f-item"><div class="f-label"> <b>Created By  </b> </div><font color=green><b>{createdby}</b></font></div>',        
        '<div class="f-item"><div class="f-label"> <b>Status      </b> </div><font color=green><b>{status}   </b></font></div>',        
        '</div>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Valid From Date</b></div><font color=green><b>{activatedate}</b></font>',
        '</div>',
        '<div style="width:220px;float:left">',
           '<div class="f-label"><b>Valid To Date</b></div><font color=green><b>{endactivatedate}</b></font>',
        '</div>',
        '</div>',
        '<div style="text-align:center;"><b>Notice Complete Description</b></div>',
        '<hr>',
        '<div style="overflow:auto;width:650px">',
        '<div style="width:620px;float:left;">',
        '<h2>Hello , </h2><br>',
        '{description}<br><br><br><br><br><br><br><br>',
        '<h2>Thank You</h2><br>',
        '</div>',
        '</div>'
    );
        return tpl;
    },
    initComponent: function() {
        this.callParent();
        this.prepareData();
        //this.tplItem = this.items.items[0];
    },
    onRender: function(){
        this.callParent();
        var tpl = this.getTemplate();
        var data = this.noticeView;
        tpl.overwrite(this.body,this.data);
        
    },
     afterRender: function() {
        this.callParent();  
       
    },
    prepareData: function(){        
         
        x=this.noticeView.index;
        
        this.data = {
            date:Ext.Date.format(new Date(),'d-m-Y'),
            title :this.noticeView.data.title,
            description :this.noticeView.data.description,
            recipient:this.noticeView.data.recipient,
            createdby :this.noticeView.data.createdby,
            status :this.noticeView.data.status,
            activatedate :this.noticeView.data.activatedate,
            endactivatedate:this.noticeView.data.endactivatedate    
        };      
    }
});


