/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

( function(){
    DiaryController = can.Control({
        defaults:{
            recentUpdates : BASE_URL+"/app/ejs/recent-updates.ejs"
        }
        
        },{
        init: function(){
            var self =this;
            $('#book *').remove();
            var data = this.options.data;
            // Sample using dynamic pages with turn.js
            var numberOfPages = data.length; 
            if(numberOfPages>0){
                            // Adds the pages that the book will need
            function addPage(page, book) {
                console.log("page",page,"book",book);
                // 	First check if the page is already in the book
                if (!book.turn('hasPage', page)) {
                    // Create an element for this page
                    var element = $('<div />', {
                        'class': 'page '+((page%2==0) ? 'odd' : 'even'), 
                        'id': 'page-'+page
                        }).html('<i class="loader"></i>');
                    // If not then add the page
                    book.turn('addPage', element, page);
                    // Let's assum that the data is comming from the server and the request takes 1s.
                    setTimeout(function(){
                        element.html('<div class="data">Data for page '+page+'</div>');
                    }, 1000);
                }
            }

           
                $('#book').turn({
                    acceleration: true,
                    pages: numberOfPages,
                    elevation: 50,
                    gradients: !$.isTouch,
                    when: {
                        turning: function(e, page, view) {
                            console.log("page",page)

                            // Gets the range of pages that the book needs right now
                            var range = $(this).turn('range', page);

                            // Check if each page is within the book
                            for (page = range[0]; page<=range[1]; page++) 
                                addPage(page, $(this));

                        },

                        turned: function(e, page) {
                            $('#page-number').val(self.options.data[page]);
                        }
                    }
                });
               // $('#number-pages').html(numberOfPages);
//                $('#page-number').keydown(function(e){
//                    if (e.keyCode==13)
//                        $('#book').turn('page', $('#page-number').val());
//				
//                });
                  $('#page-number').datepicker({
                      showOn: "button",
                       buttonImage: "resources/images/calendar.gif",
                        buttonImageOnly: true,
                        onSelect: function(date){
                            self.getPageNumber(date);
                        }

                  });
                   $(window).bind('keydown', function(e){
                console.log("inside keydown",e);
                if (e.target && e.target.tagName.toLowerCase()!='input')
                    if (e.keyCode==37)
                        $('#book').turn('previous');
                    else if (e.keyCode==39)
                        $('#book').turn('next');

            });
            } else{
                this.addEmptyDiary();
            }
        },
        addEmptyDiary: function(){
             $('#book').append("<div class='empty-result'>Digital Diary is Empty</div>");
        },
        getPageNumber: function(date){
            var data = this.options.data;
            var page = 0;
            for(var i=0;i<data.length;i++){
                console.log(data,date);
            }
        }
    })
            
})();


