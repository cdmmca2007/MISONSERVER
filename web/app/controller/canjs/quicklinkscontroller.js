/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

( function(){
    QuickLinksController = can.Control({
        defaults:{
            view : BASE_URL+"/app/ejs/quicklink.ejs",
            timeTableView: BASE_URL+"/app/ejs/timetable.ejs",
            homeWorkView: BASE_URL+"/app/ejs/homework.ejs",
            tutorialView: BASE_URL+"/app/ejs/tutorial.ejs",
            paymentGrid : BASE_URL+"/app/ejs/paymentgrid.ejs",
            diaryView : BASE_URL+"/app/ejs/digitaldiary.ejs", 
            examreportcardView : BASE_URL+"/app/ejs/examreportcard.ejs", 
            $content:null
        }
    },{
        init: function(){
            var self = this;
            $.ajax({
                url:'dashboard/get.do?id=Widget_QUICKLINKS',
                dataType:'json',
                success : function(response){
                      var data = new can.Observe(response);
                      console.log(data);
                      $(self.element).html(can.view(self.options.view,data));
                }
            })
            self.recentUpdate();
            this.options.$content=$("#content-body");
        },
        '.quick-links click': function(el, event){
            $("#student-content-body .toolbar").html('')
            $("#content-body").html("");
            $("#student-content-body .content-title").html($(el).text());
             $(".quick-links-selected text").text(el.text());
             top_margine=-260;
             top_margine=top_margine+el.position().top+"px";
             //$(".quick-links-selected").css("margin-top", top_margine);
             
             $(".quick-links-selected").animate({"margin-top": top_margine}, 500);
            var callback = $(el).attr('callback');
            console.log(callback);
            this[callback]();
        },
        recentUpdate:function(){
           var self = this;
            Models.RecentUpdates.findAll({},function(data){
                $(self.element).html(can.view(self.options.recentUpdates,data));
            }); 
        },
        createTimeTable: function(){      
             var self =this;
             $.ajax({
                url:'timetable/get.do',
                data:{
                    classid:SETTING.student.classid,
                    sessionid:SETTING.Users.session_id
                },
                dataType:'json',
                success : function(response){
                       self.options.$content.html(can.view(self.options.timeTableView,
                         response.rows));
                }
            })
        },
        showHomeWork: function(){
           
        var self =this;
             $.ajax({
                url:'homework/get.do?sessionid=00a24b9a-5bb2-4466-b629-f9d91de9e551&classid=d6f54930-7210-4bf3-ab90-3976752d4d9a&createdby=19e2e30f-9ada-41fa-95bd-c9d499b88fe2',
                dataType:'json',
                success : function(response){
                    self.options.$content.html(can.view(self.options.homeWorkView,{
                        columns:[{
                                header:'Title',
                                field:'title'
                                },{
                                header:'Subject',
                                field:'subject'
                                },{
                                header:'Assigned On',
                                field:'createdon'
                                },{
                                header:'Assigned By',
                                field:'createdby'
                                },{
                                header:'Actions',
                                field:''
                                }
                        ],
                        data:new can.Observe.List(response.rows)
                    }));
                }
            }) 
    },
        showDigitalDairy: function(){
            var self =this;
            $("#student-content-body .toolbar").append('<span class="as-on-date">Sort by:</span><input type="text" id="page-number" class="date-picker">')
             self.options.$content.html(can.view(self.options.diaryView));
             $.ajax({
                url:'digitaldairy/get.do?classid=d6f54930-7210-4bf3-ab90-3976752d4d9a&studentid=486375a5-26ea-4826-9a55-65e609eeb3e4&createdby=ac12bb64-0007-4147-a891-ae471d7c8750&sessionid=00a24b9a-5bb2-4466-b629-f9d91de9e551',
                dataType:'json',
                success : function(response){
                     new DiaryController('#digital-diary',{
                        data:response.rows 
                     });
                }
            })
        },
        showReportCardToParent: function(){
             
           var self =this;
             $.ajax({
                url:'classes/getexmdetlforparnt.do',
                method:'GET',
                headers:{
                    'Content-Type':'application/json'  
                },
                dataType:'json',
                success : function(response){
                     self.options.$content.html(can.view(self.options.examreportcardView,{data:response}));
                     $("#tabs").tabs();
                     
                }
            });
        },
        showFeeDetailsParent:function(){
            var self =this;
             $.ajax({
                url:'studentmonthlyfeeparent/get.do?userid=0e041a43-2930-4364-89aa-37058858a9c2&sessionid=00a24b9a-5bb2-4466-b629-f9d91de9e551',
                dataType:'json',
                success : function(response){
                     self.options.$content.html(can.view(self.options.paymentGrid,{
                         columns:[{
                                 header:'Session',
                                 field:'year'
                         },{
                                 header:'Month',
                                 field:'month'
                         },{
                                 header:'Class',
                                 field:'classname'
                         },{
                                 header:'Total Amount',
                                 field:'amount'
                         },{
                                 header:'Paid on',
                                 field:'paid_on'
                         },{
                                 header:'Status',
                                 field:'status'
                         }],
                         
                         data:new can.Observe.List(response.rows)}));
                }
            })   
        },
        showTutorial:function(){
            var self =this;
             $.ajax({
                url:'tutorial/get.do?_dc=1392546698282&sessionid=00a24b9a-5bb2-4466-b629-f9d91de9e551&isparent=0&batchid=1c00279b-5fde-4586-93a1-46618e73aaf3',
                dataType:'json',
                success : function(response){
                      self.options.$content.html(can.view(self.options.tutorialView,response));
                }
            }) 
        }
    })     
})();
