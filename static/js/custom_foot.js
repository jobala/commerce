(function ($) {
	$(document).ready(function() {
		$('a.post-author-format-type, .vcard.author a').click(function(event){
			return false;
		});

		/*tmp*/
		$('body.home').addClass('page_home');
		/*21/06*/
		setTimeout(
		  function()
		  {
		    $('html.no-touch body.page_home #wrap_all').append('<a id="advanced_menu_toggle" class="cktoggle" href="#" aria-hidden="true" data-av_icon="" data-av_iconfont="entypo-fontello"></a>');
		  	$('.cktoggle').click(function(event) {
		  	 		  event.preventDefault();
		  			  $(this).remove();
		  			  $('#header').removeClass('av_header_transparency');
		  	});
		  }, 7000);
		/**/
	});

})
(jQuery);
