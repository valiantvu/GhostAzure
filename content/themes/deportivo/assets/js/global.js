/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){
		var bigint = 5000;
		$("div.home div.articles article").each(function(i){
			$(this).css('z-index', bigint-i);
			if($(this).find('a.thumb img').length == 0)
				$(this).addClass('no-thumb');
		});
		$("div.home div.articles, .post-content").fitVids();
		
		/* Mobile Menu */
		
		$('nav.mobile').html($('#header nav').html());
		$('#header div.mobile.selector').click(function(){
			$('body').toggleClass('open');
		});
		$('div.overlay.mobile').click(function(){
			$('body').removeClass('open');
		});
		
		/* Parallax Effect */
		
		$('body').parallax("50%", 0.2);
		
		/* Header Scroll Effect */
		
		$(window).scroll(function(){
	        var $this = $(this),
	            pos   = $this.scrollTop();
	        if (pos > 50){
	            $('#header').addClass('small');
	        } else {
	            $('#header').removeClass('small');
	        }
	    });
		
		/* Sticky Menu */
		
		$('#sidebar').sticky({ topSpacing: 80, bottomSpacing: 20 });
		
		/* Featured Image Single Post */
		
		var mainImage = null;
		mainImage = $('div.single img[alt=main-image]');

		if ( mainImage.length > 0){
			var mainImageSource = mainImage.attr('src');
			$('div.single article header div.main-image').html('<img src="'+mainImageSource+'">');
			mainImage.remove();
		}
		
		/* Gallery */
		
		$('div#gallery img').wrap(function() {
			return '<a href="'+$(this).attr('src')+'" class="ep-one-third" rel="gallery"></a>';
		});
		$('div#gallery a:nth-child(3n)').addClass('ep-last');
		$('div#gallery').append('<div class="clear"></div');
		$('div#gallery a').fancybox({
			type: 'image',
			closeBtn: false,
			loop: false,
				helpers: {
					buttons: {}
				}
		});
		$('div#gallery').fadeIn();
		
		/* Scroll Animations */

		if($('body').hasClass('enable_animations') && !$('html').hasClass('ie7') && !$('html').hasClass('ie8') && !$('html').hasClass('ie9')){
			check_animation();
			$(window).scroll(function() {
				check_animation();
			});
		}else{
			$('.animated').removeClass('animated opacity0');	
		}
		function check_animation(){
			$('.animated:appeared').each(function(i){
				var $this = $(this),
				animation = $(this).data('animation');
				setTimeout(function(){
					$this.addClass(animation);
				}, 100 * i);
			});
		}
		
		/* Code Prettify */
		
		prettyPrint();
		
		/* Back to top button */
	
		$(window).scroll(function() {
			if($(this).scrollTop() > 220) $('#back-to-top').addClass('visible');
			else $('#back-to-top').removeClass('visible');
		});
		
		$('#back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
		})
		
		/* Google Map Integration */
		
		if($('#map_canvas').length > 0){
			var map_canvas = $('#map_canvas');
			var lat = map_canvas.attr('latitude');
			var lng = map_canvas.attr('longitude');
			var zoom = map_canvas.attr('zoom');
			var location = map_canvas.attr('location');
			if(!zoom) zoom = 16;
			if(lat && lng && zoom){
				map_canvas.wrap('<div class="map"></div>');
				if(location) $('div.map').append('<h3 class="location"><i class="fa fa-map-marker"></i>'+location+'</h3>');
				initialize(lat, lng, zoom);
			}
		}
    }); // end: document.ready

	
	function initialize(lat, lng, zoom) {
		var latlng = new google.maps.LatLng(lat, lng);
		var myOptions = {
		  zoom: parseInt(zoom),
		  center: latlng,
		  scrollwheel: false
		};
		var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
		//map.setMapTypeId('roadmap');
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			animation: google.maps.Animation.DROP
		});
		google.maps.event.addDomListener(window, 'resize', function(){
			map.setCenter(latlng);
		});	
	}

}(jQuery));