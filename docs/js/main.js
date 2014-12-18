jQuery(document).ready(function($){
	//open interest point description
	$('.cb-single-point').children('a').on('click', function(){
		var selectedPoint = $(this).parent('li');
		if( selectedPoint.hasClass('is-open') ) {
			selectedPoint.removeClass('is-open').addClass('visited');
		} else {
			selectedPoint.addClass('is-open').siblings('.cb-single-point.is-open').removeClass('is-open').addClass('visited');
		}
	});
	//close interest point description
	$('.cb-close-info').on('click', function(event){
		event.preventDefault();
		$(this).parents('.cb-single-point').eq(0).removeClass('is-open').addClass('visited');
	});

	//on desktop, switch from product intro div to product mockup div
	$('#cb-start, #cb-product-tour').on('click', function(event){
		event.preventDefault();
		//detect the CSS media query using .cb-product-intro::before content value
		var mq = window.getComputedStyle(document.querySelector('.cb-product-intro'), '::before').getPropertyValue('content');
		if(mq == 'mobile') {
			$('body,html').animate({'scrollTop': $($(this).attr('href')).offset().top }, 200); 
		} else {
			$('.cb-product').addClass('is-product-tour').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('.cb-close-product-tour').addClass('is-visible');
				$('.cb-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
					$(this).addClass('points-pulsing');
				});
			});
		}
	});
    
	//on desktop, switch from product mockup div to product intro div
	$('.cb-close-product-tour').on('click', function(){
		$('.cb-product').removeClass('is-product-tour');
		$('.cb-close-product-tour').removeClass('is-visible');
		$('.cb-points-container').removeClass('points-enlarged points-pulsing');
	});
});
