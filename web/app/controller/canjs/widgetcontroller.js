/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

( function(){
    WidgetController = can.Control({
        defaults:{
            attendanceView : BASE_URL+"/app/ejs/attendanceView.ejs",
            teacherView : BASE_URL+"/app/ejs/TeachersView.ejs"
        }
        },{
            init: function(){
                var self = this;
                can.ajax({
				url: BASE_URL+"/app/data/attendence.json",
				dataType: "json",
				success: function(data) {
                                   self.createWidget('Attendence',data.student_attendence);
                                }
                }); 
                can.ajax({
				//url: BASE_URL+"/app/data/attendence.json",
                                url:'parent/getTeacherlistforparentpage.do',
				dataType: "json",
				success: function(data) {
                                   self.creatTeaceherWidget('Teacher List',data);
                                }
                });  
                $(this.element).sortable({
                    connectWith: self.element
                })
            },
            createWidget: function(title,value){
                console.log(this, $(this.element));
                console.log("Data",value);
                 $(this.element).append(can.view(this.options.attendanceView,{
                    title:title
                }));
                this.attendenceCalender(value);
             },
            deleteWidget: function(title,value){
                console.log(this, $(this.element));
                console.log("Data",value);
                 $(this.element).remove();
                this.attendenceCalender(value);
             },
             attendenceCalender: function(value){
                 var self = this;
                 $( "#datepicker" ).datepicker({ 
                 minDate:-90,
                 maxDate:'D',
                 changeMonth: true, 
                 dateFormat: "dd-mm-yy",
                 changeYear: true,
                 onChangeMonthYear: function() {
                    can.ajax({
				url: BASE_URL+"/app/data/attendence.json",
				dataType: "json",
				success: function(data) {
                                     self.attendenceCalender(data.student_attendence);
                               }
                        });               
                    }
                 });
               	$("#datepicker").datepicker({dateFormat: "dd-mm-yy"}).datepicker("setDate", "0");
                abscent_count=0;
                present_count=0;
                late_count=0;
                
                for(var j=0;j<value.length; j++){
                        var d = new Date(value[j].Date);
                    for(var i=0;i< $(".ui-state-default:visible").length ;i++){
                        if($($(".ui-state-default:visible").get(i)).text() == d.getDate() && d. getFullYear()== $(".ui-datepicker-year").val() && d.getMonth() == $(".ui-datepicker-month").val())
                        { 
                            if( value[j].Attendence_Flag == "T" && value[j].Student_Id == "S001"){
                            $($(".ui-state-default:visible").get(i)).removeClass("abscent_class");
                            $($(".ui-state-default:visible").get(i)).removeClass("late_class");
                            $($(".ui-state-default:visible").get(i)).addClass("present_class");  
                            present_count++;
                            }
                            else if(value[j].Attendence_Flag == "L" && value[j].Student_Id == "S001"){
                            $($(".ui-state-default:visible").get(i)).removeClass("present_class");
                            $($(".ui-state-default:visible").get(i)).removeClass("abscent_class");                          
                            $($(".ui-state-default:visible").get(i)).addClass("late_class"); 
                            late_count++;
                            }
                            else{
                            $($(".ui-state-default:visible").get(i)).removeClass("present_class");
                            $($(".ui-state-default:visible").get(i)).removeClass("late_class");
                            $($(".ui-state-default:visible").get(i)).addClass("abscent_class"); 
                            abscent_count++
                            }
                        }
                    }
                }
                $($(".attendence_count_font").get(0)).text(present_count+" Days");
                 $($(".attendence_percenrage").get(0)).css("width",(present_count/26)*100+"%")
                $($(".attendence_count_font").get(1)).text(abscent_count+" Days");
                 $($(".attendence_percenrage").get(1)).css("width",(abscent_count/26)*100+"%")
                $($(".attendence_count_font").get(2)).text(late_count+" Days");
                  $($(".attendence_percenrage").get(2)).css("width",(late_count/26)*100+"%")
            },
             creatTeaceherWidget: function(title,data){
                 $(this.element).append(can.view(this.options.teacherView,{title:title,data:data}));
             }
        });
})();
