$(function() {
  $('.sidebar .minimize a').click(function(e) {
    e.preventDefault();
    $(this).closest('.sidebar').toggleClass('collapsed');
    $(this).children('i').toggleClass('fui-arrow-left fui-arrow-right');
  });

  $('.sidebar nav > ul > li').not('.settings, .minimize').children('a').click(function(e) {
    $(this).parent().siblings('li').removeClass('active');
    $(this).parent().addClass('active');
  });
});
