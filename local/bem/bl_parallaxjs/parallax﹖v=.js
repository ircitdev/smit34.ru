

jQuery(document).ready(function($) {
	{}//scroll parallax3 ------------------------------------------------
  (function parallax(){
    $('.parallaxic-container').each(function(){
      $(this).prepend('<img src="'+$(this).attr('data-image')+'" class="parallaxic-image" style="display:inline;position:absolute" data-type="parallax" data-speed="'+$(this).attr('data-speed')+'" data-scale="'+$(this).attr('data-scale')+'" width="100%">');
    });

    $('.parallaxic-container').css({
    	position: 'relative',
    	overflow: 'hidden'
    });

    $('parallaxic-image').css({
    	position: 'absolute',
    	top: '0',
    	left: '0',
    	/* width:100%;  */
    	'max-height': 'none',
    	'max-width': 'none',

    });

		$('.parallaxic-image').each(function(){


        var bgobj = $(this); // assigning the object
		      //var $window = $(window);

        var yPos = -((bgobj.parents('.parallaxic-container').offset().top-$(window).scrollTop()) / bgobj.data('speed'));

        function positionImg(bgobj){
          var yPos = -((bgobj.parents('.parallaxic-container').offset().top-$(window).scrollTop()) / bgobj.data('speed'));// - currentMousePos.y/80;


          //Корректировка размеров бэкграунда

          //adjustThumb(bgobj)
          // /Корректировка размеров бэкграунда


          // Put together our final background position
          var coords = 'translate(0px, '+ Math.ceil(yPos) + 'px) scale('+ bgobj.data('scale') +')';
          //bgobj.detach();
          // Move the background
          //console.log(coords);
          bgobj.css({
            "transform":coords,
            "-webkit-transform":coords,
            "-moz-transform":coords,
            "-o-transform":coords
          });
        }

        positionImg(bgobj);

        $(window).scroll(function(){
			  //console.log(bgobj.parents('.parallaxic-container').offset().top, $window.scrollTop() )
          positionImg(bgobj);
		    });
		});

		var obj = $(".bl-services-3d .parallaxic-image")
		var parenth = obj.parent().outerHeight();
		var parentw = obj.parent().outerWidth();
		//console.log('parentw:', parentw, 'parenth2:', parenth);
		var parentaspect = (parentw/parenth).toFixed(1);
		var speed = (5/parentaspect).toFixed(1);
		obj.attr('data-speed', speed);
		//console.log('parentaspect:', parentaspect, 'speed:', speed);
		{}
  })();
	// /scroll parallax3------------------------------------------------
})
