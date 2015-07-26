/* this controller is used to control scale section of the report*/
(function (namespace) {
	var eFn = function(){};
	var src = $('script[src*="grid.js"]').first().attr('src');
	src = src.substr(0,src.lastIndexOf("/"));
	console.log(src);
	if(!namespace){throw new Error("Can js Library not found");}
	namespace.Grid = namespace.Control({
		defaults : {			
			loading:true,
			view:src+"/view/grid.ejs",
			onSort:eFn,
			dataview:src+"/view/dataview.ejs"
		}
	}, {
		init: function(){
			var self = this , 
			opt = this.options;
			if(opt.groupField){
				opt.data.groups = this.getGetGroups(opt.groupField);
				self.options.dataview = src+"/view/groupview.ejs";
			}
			if(opt.summary){
				opt.data.summary = [];
				for(var i=0; i<opt.columns.length; i++){
					opt.data.summary[i]=0;
				}
			}
			can.view(opt.view, opt, function(frag){
				$view = can.$(self.element).html(frag);
				self.dataView = $view.find("tbody");
				self.onViewappend();
			});
		},
//		destroy: function() {
//			this.options=null;
//			can.Control.prototype.destroy.call( this );
//		},
		onViewappend : function(){
			
		},
		getGetGroups: function(groupField){
			var opt =this.options;
			groupField = groupField || this.options.groupField;
			var groupArray =[];
			opt.data.groupSummary=[];
			for(var i=0; i < this.options.data.length; i++){
				if(groupArray.indexOf(this.options.data[i][groupField])==-1){
					groupArray.push(this.options.data[i][groupField]);
				}
			}
			this.options.data.groupArray = groupArray;

			var data = groupArray.map(function(d,i){
				var temp=[];
				var obj ={};
				for(var c=0;c<opt.data.length;c++){
					if(opt.data[c][groupField]==d){
						temp.push(opt.data[c]);
						$.each(opt.columns, function(index,col){
							obj[col.field] =(obj[col.field]||0)+opt.data[c][col.field];
						});
					}

				}
				opt.data.groupSummary.push(obj);
				return temp;
			});
			console.log(opt.data.groupSummary);
			return data;
		},
		'.can-grid-sortable click': function(el, event){
			var self = this,
			opt = self.options,
			data =opt.data,
			field = $(el).data('field');
			$(self.element).find(".can-grid-sort-active").removeClass("can-grid-sort-active");
			$(el).addClass("can-grid-sort-active");
			var DESC = can.$(el).hasClass("can-grid-sort-desc");
			if(DESC){
				$(el).addClass("can-grid-sort-asc").removeClass("can-grid-sort-desc");
			}else{
				$(el).addClass("can-grid-sort-desc").removeClass("can-grid-sort-asc");
			};
			data.sort(function(a,b){
				if(DESC) 
					return a.attr(field)>b.attr(field)?1:-1;
					else
						return a.attr(field)>b.attr(field)?-1:1;

			});
			this.refresh();
			opt.onSort.call(el,event);
		},
		'.toggle.collapse click': function(el, event){
			var g = $(el).data('group');;
			$('.group_'+g).hide();			
			$(el).removeClass('collapse').addClass('expand');
		},
		'.toggle.expand click': function(el, event){
			var g = $(el).data('group');
			$('.group_'+g).show();	
			$(el).removeClass('expand').addClass('collapse');
		},
		refresh: function(){
			var self =this;
			self.dataView.find("*").remove();
			can.view(this.options.dataview ,this.options, function(frag){
				can.$(self.dataView).html(frag);
			});
		}
	});
})(can);