// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function(num) {
  return new Array(num + 1).join(this);
};

$(function() {
  // Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };

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

  var datepickerSelector = '#datepicker-01';
  if ($(datepickerSelector).length > 0) {
    $(datepickerSelector).datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: "d MM, yy",
      yearRange: '-1:+1'
    }).prev('.btn').on('click', function (e) {
      e && e.preventDefault();
      $(datepickerSelector).focus();
    });
    $.extend($.datepicker, {_checkOffset:function(inst,offset,isFixed){return offset}});

    // Now let's align datepicker with the prepend button
    $(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth() - 2});
  }

  $(".toggle-bg").on('click', function(e) {
    e && e.preventDefault();
    $(this).closest("section").toggleClass("bg-midnight-blue bg-clouds")
  });

  // Custom Selects
  if ($(".form select").length > 0)
    $(".form select").selectpicker({style: 'btn-wide'});  
  
  if ($("select").length > 0)
    $("select").selectpicker({style: 'btn-wide btn-primary', menuStyle: 'dropdown-inverse'});  

  var $slider = $("#slider");
  if ($slider.length > 0) {
    $slider.slider({
      min: 1,
      max: 5,
      value: 4,
      orientation: "horizontal",
      range: "min"
    }).addSliderSegments($slider.slider("option").max);
  }

  var $slider2 = $("#slider2")
    , slider2ValueMultiplier = 100
    , slider2Options;

  if ($slider2.length > 0) {
    $slider2.slider({
      min: 1,
      max: 5,
      values: [2, 4],
      orientation: "horizontal",
      range: true,
      slide: function(event, ui) {
        $slider2.find(".ui-slider-value:first")
          .text("$" + ui.values[0] * slider2ValueMultiplier)
          .end()
          .find(".ui-slider-value:last")
          .text("$" + ui.values[1] * slider2ValueMultiplier);
      }
    });

    slider2Options = $slider2.slider("option");
    $slider2.addSliderSegments(slider2Options.max)
      .find(".ui-slider-value:first")
      .text("$" + slider2Options.values[0] * slider2ValueMultiplier)
      .end()
      .find(".ui-slider-value:last")
      .text("$" + slider2Options.values[1] * slider2ValueMultiplier);
  }

  // jQuery UI spinner
  $.widget( "ui.customspinner", $.ui.spinner, {
    widgetEventPrefix: $.ui.spinner.prototype.widgetEventPrefix,
    _buttonHtml: function() { // Remove arrows on the buttons
      return "" +
      "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +
        "<span class='ui-icon " + this.options.icons.up + "'></span>" +
      "</a>" +
      "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
        "<span class='ui-icon " + this.options.icons.down + "'></span>" +
      "</a>";
    }
  });

  $('.spinner').customspinner({
    min: -99,
    max: 99
  }).on('focus', function () {
    $(this).closest('.ui-spinner').addClass('focus');
  }).on('blur', function () {
    $(this).closest('.ui-spinner').removeClass('focus');
  });

  $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

  // Tabs
  $(".nav-tabs a").on('click', function (e) {
    e.preventDefault();
    $(this).tab("show");
  })

  // Table: Toggle all checkboxes
  $('.table .toggle-all').on('click', function() {
    var ch = $(this).find(':checkbox').prop('checked');
    $(this).closest('.table').find('tbody :checkbox').checkbox(!ch ? 'check' : 'uncheck');
  });

  // Table: Add class row selected
  $('.table tbody :checkbox').on('check uncheck toggle', function (e) {
    var $this = $(this)
      , check = $this.prop('checked')
      , toggle = e.type == 'toggle'
      , checkboxes = $('.table tbody :checkbox')
      , checkAll = checkboxes.length == checkboxes.filter(':checked').length

    $this.closest('tr')[check ? 'addClass' : 'removeClass']('selected-row');
    if (toggle) $this.closest('.table').find('.toggle-all :checkbox').checkbox(checkAll ? 'check' : 'uncheck');
  });

  // Tags Input
  $(".tagsinput").tagsInput();

  // Tooltips
  $("[data-toggle=tooltip]").tooltip("show");

  // Add style class name to tooltips
  $(".tooltip").addClass(function() {
    if ($(this).prev().attr("data-tooltip-style")) {
      return "tooltip-" + $(this).prev().attr("data-tooltip-style");
    }
  });

  // add click functionality to list-check
  $('.list-check > li h3 a').on('click', function() {
    selector = '> .checkbox [data-toggle="checkbox"]'
    $(this).closest('li').find(selector).checkbox('toggle');
  });

  window.prettyPrint && prettyPrint()         
});

$(window).scroll(function() {
  $('#download').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+600) {
      $(this).addClass("slideUp");
    }
  });
});