$(function() {
  $('.subnav a').on('click', function() {
    $.scrollTo($(this).attr("href"), {
      axis: 'y',
      duration: 500
    });
    return false;
  });

  $('.component-list a').on('click', function() {
    $.scrollTo($(this).attr("href"), {
      axis: 'y',
      duration: 500,
      offset: { top: -20 }
    });
    return false;
  });

  $('.toggle-components').on('click', function() {
    $(this).children('i').toggleClass('fui-triangle-up fui-triangle-down');
    $(this).prev('ul').slideToggle(200, function() {
      $(this).parent().toggleClass('collapsed');
    });
  });

  $(".toggle-bg").on('click', function(e) {
    e && e.preventDefault();
    $(this).closest("section").toggleClass("bg-midnight-blue bg-clouds")
  });

  $('#sg-guidelines .control-btn').on('click', function() {
      $.scrollTo($(this).closest('section').next(), {
          axis : 'y',
          duration : 500
      });
      return false;
  });

  window.prettyPrint && prettyPrint()         
});