/* this controller is used to control scale section of the report*/
(function (namespace) {
	if(!namespace){throw new Error("Can js Library not found");}
	namespace.Grid = namespace.Control({
		defaults : {			
			loading:true
		}
	}, {
		init: function(){
			 var format = d3.time.format("%d-%b-%Y, %I:%M %p")
			 this.options.$refresh.html("Refreshed: "+format(new Date()));
			 $('#snapshot-icons #my_timeframe').hide();
		}
	});
})(can);