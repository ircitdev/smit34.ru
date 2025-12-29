//console.log('///');


jQuery(document).ready(function($) {
	{}//mousemove parallax------------------------------------------------
	//console.log('!!!!!');

	$(document.body).on( "mousemove", function(e){
			var currentMousePos = { x: -1, y: -1 };
			currentMousePos.x = event.pageX;
			currentMousePos.y = event.pageY;

			//console.log(e.pageY)

			$(".parallaxic-image").each(function(index){
				//console.log(e.pageY)
				function getTransform(el) {
					var results = el.css('transform')//.match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)
					//console.log('inside:',el.css('transform'))

					if(!results) return [0, 0, 0];
					if(results[1] == '3d') return results.slice(2,5);

					results.push(0);
					return results.slice(5, 8);
				}

				//console.log($(this).css('transform'))

				/*var yPos = -(($(this).parents('.parallaxic-container').offset().top-$(window).scrollTop()) / $(this).data('speed')) - currentMousePos.y/80;
				var transform = 'translate(0px, '+yPos+ 'px) scale('+ $(this).data('scale') +')';
				//console.log('transform:',currentMousePos.y/100)
				$(this).css({
					"transform":transform,
					"-webkit-transform":transform,
					"-moz-transform":transform,
					"-o-transform":transform
				});*/
				var left = $(this).position().left;
				$(this).css({"left":(left-e.pageX)/30+60+"px"})
			})
		})
	// /mousemove parallax------------------------------------------------
})
