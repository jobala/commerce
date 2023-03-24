(function($) {

	$(window).load(function() {

		var $headerBtn			= $('.c-header__btn'),
			$firstBtnNext		= $('.c-first__btn-next'),
			$anchor				= $('._c-anchor'),
			$header				= $('.c-header'),
			anchorPosition		= $anchor.offset().top - $header.innerHeight(),

			$modalForm			= $('.c-m-form'),
			$modalBeforeYouGo	= $('.c-m-before-you-go'),
			$modalVideo			= $('.c-m-video');

		if ( $headerBtn.length ) {

			$headerBtn.click(function(){
				scrollTo($(this));
			});
		};

		if ( $firstBtnNext.length ) {
			$firstBtnNext.click(function(){
				scrollTo($(this));
			});
		};

		function scrollTo($this) {

			var val = $this.index(),

			// Need to scroll to section
			curPos = $(document).scrollTop(),
			scrollTime = Math.abs(anchorPosition - curPos)/1.73;

			$("body,html").stop().animate({
				"scrollTop": anchorPosition
			}, scrollTime);

			return false;
		}

		if ( $('.c-testimonials').length ) {

			var nameTestimonials  = [],
				photoTestimonials = [];

			$('.c-testimonials__swiper-pagination > li').each(function() {
				nameTestimonials.push( $(this).find('.e-name').text() );
				photoTestimonials.push( $(this).find('.e-photo').html() );
			});

			var swiper = new Swiper('.c-testimonials__swiper-container', {
				wrapperClass: 'c-testimonials__swiper-wrapper',
				slideClass: 'c-testimonials__swiper-slide',
				bulletClass: 'item',
				bulletActiveClass: 'active',

				pagination: '.c-testimonials__swiper-pagination',
				paginationClickable: true,
				paginationBulletRender: function (index, className) {
					return '<li class="' + className + '">' +
					'<div class="e-photo">' + photoTestimonials[index] + '</div>' +
					'<div class="e-name">' + nameTestimonials[index] + '</div></li>';
				},

				grabCursor: true,

				autoplay: '3000',
				loop: true,

				spaceBetween: 50
			});
		}

		if ( $modalForm.length ) {

			$modalForm.libribox();
		};

		if ( $modalBeforeYouGo.length ) {

			$modalBeforeYouGo.libribox();
		};

		if ( $modalVideo.length ) {

			$modalVideo.libribox();

			function pauseYTVideo() {
				player.pauseVideo();
			}

			$modalVideo.find('.c-modal__close').click(function(event) {
				pauseYTVideo();
			});
		};
	});

})(jQuery);