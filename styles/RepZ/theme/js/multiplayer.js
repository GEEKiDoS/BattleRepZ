$(document).ready(function() {
	var serverDetails = $('#details');
	var height = $('#details').height()+120;
	$(window).scroll(function () {
	    if (height < $(window).scrollTop()) {
	    	serverDetails.css('margin-top', $(window).scrollTop()-height);
	    } else {
	    	serverDetails.css('margin-top', 0);
	    }
	});

});