(function($) {
  $(function() {
    $(window).resize().scroll();
    
    // Carousel
    (function(el){
      
      $(window).resize(function() {
        shift = el.eq(0).outerHeight() / 10;
        if (!el.hasClass('ani-processed')) {
          el.eq(0).data('scrollPos', el.eq(0).offset().top - $(window).height() + shift);
        }
      }).scroll(function() {
        if (!el.hasClass('ani-processed')) {
          if ($(window).scrollTop() >= el.eq(0).data('scrollPos')) {
            
            el.addClass('ani-processed');
            
            function carouselAnimation() {
              el.css('top', '0');
              var imgHeight = el.height();
              var lastPoint = imgHeight - 448*2;
              var intervalID = setInterval(function(){
                el.animate({
                  top: (el.css('top').slice(0, -2)) - 402
                }, {
                  duration: 1000,
                  easing: "easeInOutSine"
                });
                
                console.log((-(el.css('top').slice(0, -2))), lastPoint);
                
                if (-(el.css('top').slice(0, -2)) >= lastPoint){
                  clearInterval(intervalID);
                  setTimeout(function(){
                    el.animate({
                      top: 0
                    }, {
                      duration: 1000,
                      easing: "easeInOutSine",
                      complete: carouselAnimation
                    });
                  }, 3000);
                }
              }, 2000);
            }
            
            carouselAnimation();
          }
        }
      });
    })($('.image-scroll .image-holder img'));
  });
})(jQuery);