(function() {
  $(function() {
    $('input[data-toggle="clear"]').each(function(e) {
      $input = $(this)
      $clear = $('<i></i>')
        .addClass('icon icon-remove-sign clear quiet')
        .click(function() {
          $input.val('').focus()
          $(this).hide()
        });
      $input.after($clear)
      $input.keyup(function() { $clear.toggle(Boolean($input.val())) })
      $clear.toggle(Boolean($input.val()))
    });
  });
}).call(this);
