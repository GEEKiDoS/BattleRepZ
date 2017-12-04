$(document).ready(function() {
	//Load background video
	var backgroundVideo = document.getElementById('backgroundVideo');
	backgroundVideo.load();
	backgroundVideo.addEventListener('loadeddata', function() {
	   $('#backgroundVideo').addClass('show');
	}, false);

	var nav = $('#heading');
	var height = $('#heading').height()-30;
	$(window).scroll(function () {
	    
	    if (height < $(window).scrollTop()) {
	        nav.addClass('dark');
	    }

	   if (height > $(window).scrollTop()) {
	           nav.removeClass('dark');
	    }
	});

});