/**
*
*Script do layout
*
*@author Code Universe
*
**/

(function($, URL){

	var hamburguer = function() {
		$('body').on('click', '.hamburguer', function() {
			$('.links').toggle();
		});
	}

	$(document).ready(function() {
		hamburguer();
	})
})($, URL);