$(function() {
  $('#signup .mailgun').mailgun_validator({
    api_key: 'pubkey-48f4dfdf2e81bd0628a6331123947d12',
    in_progress: mailgun_progress,
    success: mailgun_success
  });

  function mailgun_progress() {
    $('#signup .mailgun-feedback').remove();
  }

  function mailgun_success(data) {        
    $field = $('#signup .mailgun').closest('fieldset')
    $field.append(mailgun_suggestion(data['is_valid'], data['did_you_mean']));
  }

  function mailgun_suggestion(is_valid, alternate) {
    if (alternate) {
      $suggestion = $('<a href="#fakelink" class="animate" tabindex=-1>')
                    .text(alternate)
                    .click(function(e) {
                      suggestion = $(this).text();
                      $('#signup .mailgun').val(suggestion);
                      $('#signup .mailgun-feedback').remove();
                    });

      return  $('<div>')
              .addClass('mailgun-feedback fill-darken0 dark pad1 slideDown')
              .append(
                $('<p class="small">')
                .append('<i class="icon icon-question-sign pad0r">')
                .append(document.createTextNode('Did you mean '))
                .append($suggestion)
                .append(document.createTextNode('?'))
              );
    } else if (!is_valid) {
      return  $('<small class="mailgun-feedback error-message slideDown">')
              .append('<i class="icon icon-warning-sign pad0r">')
              .append('Email is invalid');
    }
  }
});