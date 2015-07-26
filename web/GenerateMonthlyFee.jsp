<%-- 
    Document   : GenerateMonthlyFee
    Created on : Jun 15, 2013, 11:29:33 PM
    Author     : cd
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>JSP Page</title>
    <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/app.css" />
    <link rel="stylesheet" type="text/css" href="extjs/ux/css/CheckHeader.css" />
    <script type="text/javascript" src="extjs/ext-all.js"></script>
    <script type="text/javascript" language="Javascript">

    Ext.onReady(function(){
         var store = new Ext.data.ArrayStore({
         fields: [
             {name: 'srv'},
                       {name: 'app'},
                       {name: 'inst'},
                       {name: 'port'},
                       {name: 'ip'},
                       {name: 'db'}
                   ]
               });

                var grid = new Ext.grid.GridPanel({
                    store: store,
                    columns: [
                       {id:'srv', header: 'Class', width: 150, sortable: true, dataIndex: 'srv'},
                       {header: 'Month', width: 150, sortable: true, dataIndex: 'app'},
                       {header: 'Template', width: 75, sortable: true,  dataIndex: 'inst'},
                       {header: 'Generated Date', width: 125, sortable: false,  dataIndex: 'port'},
                       {header: 'Due Date', width: 100, sortable: true,  dataIndex: 'ip'},
                       {header: 'Total Calculated', width: 100, sortable: true,  dataIndex: 'ip'},
                       {header: 'Total Received', width: 100, sortable: true,  dataIndex: 'ip'},
                       {header: 'Edit/Modify', width: 150, sortable: true,  dataIndex: 'db'}
                    ],
                    stripeRows: true,
                    autoExpandColumn: 'srv',
                    height: 350,
                    width: 930,
                    title: 'Fee Generation Grid',
                    // config options for stateful behavior
                    stateful: true,
                    stateId: 'grid'
                });
            grid.render('grid-example');
               
            });
        </script>
    </head>
    <body>
        <div id='first' style="height: 100%;margin :10px 10px 10px 10px ;border: 1px solid #306da6">
            <div style="margin-top: 20px">
                <span style="margin-left: 20px">Select Session</span>
                <span>
                <select id='session'>
                    <option value="2013-2014">2013-2014</option>                    
                </select>                    
                </span>    
                
                <span>Select Month</span>
                <span>
                <select id='month'>
                    <option value="March">March</option>                    
                    <option value="April">April</option>                    
                    <option value="May">May</option>                    
                    <option value="June">June</option>                    
                    <option value="July">July</option>                    
                    <option value="August">August</option>                    
                    <option value="September">September</option>                    
                    <option value="October">October</option>                    
                    <option value="November">November</option>                    
                    <option value="December">December</option>                    
                    <option value="January">January</option>                    
                    <option value="Feburary">February</option>                    
                </select>
                </span>    
                <span>Select Class</span>
                <select id='class'>
                    <option value="ForAll">ForAll</option>                    
                    <option value="Class-1-A">Class-1-A</option>                    
                    <option value="Class-2-A">Class-2-A</option>                    
                    <option value="Class-3-A">Class-3-A</option>                                        
                </select>
                <input type="Button" value="Generate Fees">
            </div> 
            <div style="float: left;margin-top: 30px;margin-left: 20px">
                
                <span> Automate Fee Generation :<input type="checkbox"></span>
                <span>Select Fee Generation Date :<input type="date"></span>
                <span><input type="button" value="Automate Fee Generation"></span>
            </div>
            
            <div id="grid-example" style="float: left;margin-top: 20px;margin-left: 20px"></div>
       </div>
       
    </body>
</html>
