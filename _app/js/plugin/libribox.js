(function($){

	jQuery.fn.libribox = function(options){

		// BEGIN plagin options

		options = $.extend({
			boxCenter: true
		}, options);

		// END plagin options

		var wFlagBox,
			hFlagBox,
			boxCenter = options.boxCenter,
			$boxWrap  = $(this),
			$body	  = $('body'),
			$box 	  = $boxWrap.find('.c-modal__box'),
			$boxBg	  = $boxWrap.find('.c-modal__overlay'),
			$boxClose = $boxWrap.find('.c-modal__close'),
			$boxBind  = $('.c-modal__bind');

		$box.each(function(){

			var $thisBox = $(this);

			wFlagBox = true;
			hFlagBox = true;

			$boxWrap.css({
				width: '100%',
				height: '100%',
				position: 'fixed',
				zIndex: 999,
				left: '-100%',
				top: '-100%',
				opacity: 0,
				visibility: 'hidden'
			});

			$boxBg.css({
				width: '100%',
				height: '100%',	
				position: 'absolute',
				left: 0,
				top: 0
			});

			if ( boxCenter ) {

				$thisBox.css({
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: - ( $thisBox.innerHeight()/2 ),
					marginLeft: - ( $thisBox.innerWidth()/2 )
				});

				centerBox();
			}
		});
		
		$boxBind.click(function() {

			$body.addClass('_modal-active');

			$boxWrap.filter('[data-number="' + ( $(this).attr('data-number') ) + '"]').css({
				'visibility': 'visible',
				left: 0,
				top: 0
			}).fadeTo(500, 1).fadeIn();

			centerBox();

		});

		$boxClose.click(function() {

			$boxWrap.fadeOut();
			$body.removeClass('_modal-active');

		});

		function centerBox(){
			
			if( $(window).width()<$box.innerWidth() ) {

				if ( wFlagBox ) {

					$box.css({
						position: 'absolute',
						left: 0,
						marginLeft: 0
					});

					wFlagBox=false;
				}

			} else {

				if ( !wFlagBox ) {

					$box.css({
						position: 'fixed',
						left: '50%'
					});

					wFlagBox=true;
				}

				$box.css({
					marginLeft: - ( $box.innerWidth()/2 )
				});
			}

			if ( $(window).height() < $box.innerHeight() ) {

				if ( hFlagBox ) {

					$box.css({
						position: 'absolute',
						top: 0,
						marginTop: 0
					});

					hFlagBox=false;
				}

			} else {

				if( !hFlagBox ) {

					$box.css({
						position: 'fixed',
						top: '50%'
					});

					hFlagBox=true;
				}

				$box.css({
					marginTop: - ( $box.innerHeight()/2 )
				});
			}
		}

		if ( boxCenter ) {

			$(window).resize(function() {

				$box.each( function() {
					centerBox();
				});

			});
			
		}

	};
	
})(jQuery);