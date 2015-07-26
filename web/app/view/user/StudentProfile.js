Ext.define('Ext.app.view.user.StudentProfile', {
    extend:'Ext.panel.Panel',
    id:'student_profile',
    alias: 'widget.studentprofile',
    border:false,
    constructor: function(config){
         this.callParent([Ext.apply({
            tpl1:new Ext.Template('<span class="label1">Year: </span><span class="value1">{year}</span> <span class="label1">Class: </span><span class="value1">{class}</span><span class="label1">Area: </span><span class="value1">{address}</span>'),
            items :[{
                title:'Student Profile',
                style:'margin:5px 0px 0px 0px',
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[{
                        layout:'hbox',  
                        xtype:'container',
                        height:23,
                        style:'padding:0 10px 0 10px;border-bottom:1px solid #ddd;',
                       items:[{
                               xtype:'container',
                               flex:1,
                               items:[{
                                       xtype:'displayfield',
                                       value:'Pranesh Kumar (101)'
                                   },{
                                       xtype:'button',
                                       text:'ttt'
                                   }
                               ]         
                       },{
                            xtype:'displayfield',
                            value:'',
                            flex:1,
                            id:'details_'+this.id,
                            style:'text-align:right'
                       }
                           
                       ]
                },{
                        xtype:'container',
                        style:'padding:10px 10px 0 10px;border-bottom:1px solid #ddd;',
                        layout:{   
                            type:'hbox'
                        },
                        items:[
                            {
                                width:270,
                                xtype:'container',
                                layout:'hbox',
                                height:130,
                                items:[
                                    {
                                        xtype:'image',
                                        height:100,
                                        width:80,
                                        border:1,
                                        style: {
                                            borderColor: 'black',
                                            borderStyle: 'solid'
                                        },
                                        src:BASE_URL+'/resources/images/kamlesh.jpg'
                                    },this.usersDetails = Ext.create('Ext.container.Container',{                                     
                                       style:'padding:0 10px 10px 10px',
                                       html:"<table>"+
                                            "<tr> <td width=90 class='label-for'>Gender:</td><td class='label'> Male</td></tr>"+
                                            "<tr><td class='label-for'>Date Of Birth:</td><td class='label'>14 Nov 1984</td></tr>"+
                                            "<tr> <td class='label-for'>Nationality:</td><td class='label'>Indian</td></tr>"+
                                            "<tr> <td class='label-for'>Religion:</span><td class='label'>Hindu</td></tr>"+
                                            "<tr> <td class='label-for'>Age:</td><td class='label'>28</td></tr></table>"
                                    })
                                ]
                            },{
                                flex:1,
                                xtype:'container',
                                style:'padding:0 10px 0 10px;border-left:1px solid #ddd;',
                                html:"<table><tr>"+
                                        "<td style='width: 100px;'><span class='label-for label-detail2'>Father's Name:</span></td><td><span class='label'> Kamlesh Kumar SAH</span></td></tr>"+
                                    "<tr><td> <span class='label-for label-detail2'>Mother's Name:</span></td><td><span class='label'> Male</span></td></tr>"+
                                    "<tr><td> <span class='label-for label-detail2'>Contact:</span></td><td><span class='label'>8987678765</span></td></tr></table>"+
                                    "<hr/>"+
                                    "<table><tr>"+
                                    "<td style='width: 100px;'><span class='label-for label-detail2'>Street:</span></td><td><span class='label'>Vishrantwadi</span></td></tr>"+
                                    "<tr><td> <span class='label-for label-detail2'>City:</span></td><td><span class='label'>Pune</span></td></tr>"+
                                    "<tr><td> <span class='label-for label-detail2'>District:</span></td><td><span class='label'>Pune</span></td></tr>"+
                                    "<tr><td> <span class='label-for label-detail2'>State:</span></td><td><span class='label'>Maharashtra</span></td></tr>"+
                                    "<tr><td> <span class='label-for label-detail2'>ZIP Code:</span></td><td><span class='label'>898765</span></td></tr></table>"
                            }
                        ]
                                               
                    },{
                        xtype:'container',
                        layout:'column',
                        style:'padding:10px 5px 5px 5px',
                        defaults:{
                            columnWidth:.5
                        },
                        items:[
                            {
                                xtype:'portlet',
                                style:'margin:5px',
                                html:'<table><tr>'+
//    '<td>{title}</td>'+
//    '<td class="attendance-{mon}">&nbsp</td>'+
//    '<td class="attendance-{tue}">&nbsp</td>'+
//    '<td class="attendance-{wed}">&nbsp</td>'+
//    '<td class="attendance-{thu}">&nbsp</td>'+
//    '<td class="attendance-{fri}">&nbsp</td>'+
//    '<td class="attendance-{sat}">&nbsp</td>'+
//    '<td class="attendance-{sun}">&nbsp</td>'+
//    '</tr></table>',

    '<td>&nbsp;</td>'+
    '<td>Mon</td><td>Tue</td><td>Wed</td>'+
    '<td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td>'+
    '</tr>'+
    '<tr>'+
    '<td>Current Week</td>'+
    '<td class="attendance-Y">&nbsp</td>'+
    '<td class="attendance-Y">&nbsp</td>'+
    '<td class="attendance-Y">&nbsp</td>'+
    '<td class="attendance-N">&nbsp</td>'+
    '<td class="attendance-Y">&nbsp</td>'+
    '<td class="attendance-H">&nbsp</td>'+
    '<td class="attendance-H">&nbsp</td>'+
    '</tr></table>'                               
                            },{
                                xtype:'portlet',
                                html:'test',
                                style:'margin:5px'
                            }
                        ]
                    }
                ]
            }
        ]
         },config)]); 
    },
    initComponent : function(){
        this.callParent(arguments);
    },
    onRender : function(){
             Ext.getBody().mask();
            this.callParent(arguments);
            this.userRecords = {
                name:'kamlesh'
            };
            var tpl=new Ext.Template("<div> Name:{name}</div>",
            "<div>Age:</div>",
            "<div>Date Of Birth</div>"
        );
  
       this.tpl1.overwrite(Ext.get('details_'+this.id+"-inputEl"),{roll:101,'class':'5A'});
       
        Ext.getBody().unmask();
        }
});