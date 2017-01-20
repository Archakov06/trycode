$d.onready(function() {
	setTimeout(function(){
		requirejs(["/public/js/lib/ace/ext-emmet.js"], function(ace) {
			var editor = angular.element($d.get('.ng-scope')[0]).scope().editor;
		    editor.setOption("enableEmmet", true);
		});
	},3000);
});