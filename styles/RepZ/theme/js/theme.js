$(document).ready(function() {
	

	$(document).pjax('a', '#content', { 
        fragment: '#content', 
        timeout: 3000,
        id: 'eZnvloqeotUjYqAuuCIMMcaf6v6ZvxKAUO3Xux4Nd0YDQmmPLNLL0aEdlPdxYE8pKEKSkZCKWi5rORWZgYaXKfyRFAqzia8D4daaVCD7N3oezyAhQlvecsFpCdSKlExP',
        extra: [
        	'.pageTitle h1',
        	'#heading'
        ]
    });

	//History navigate
    window.addEventListener('popstate', function(event) {
    	$.pjax.reload('#content', { 
	        fragment: '#content', 
	        timeout: 3000,
	        id: 'eZnvloqeotUjYqAuuCIMMcaf6v6ZvxKAUO3Xux4Nd0YDQmmPLNLL0aEdlPdxYE8pKEKSkZCKWi5rORWZgYaXKfyRFAqzia8D4daaVCD7N3oezyAhQlvecsFpCdSKlExP',
	        extra: [
	        	'.pageTitle h1',
	        	'#heading'
	        ]
	    });
	});

    $(document).on('submit', 'form', function(event) {
		$.pjax.submit(event, '#content', { 
	        fragment: '#content', 
	        timeout: 3000,
	        id: 'eZnvloqeotUjYqAuuCIMMcaf6v6ZvxKAUO3Xux4Nd0YDQmmPLNLL0aEdlPdxYE8pKEKSkZCKWi5rORWZgYaXKfyRFAqzia8D4daaVCD7N3oezyAhQlvecsFpCdSKlExP',
	        extra: [
	        	'.pageTitle h1',
	        	'#heading'
	        ]
	    });
	});

    /*
	$(document).on('click', function(event) {
		//Lets just check if the child has a href
		//console.log($(this).children('a'));
		console.log($(this).html());
		$(this).children('a').click();
	});
	*/

});