(function() {
  $(function() {
    $('a[href="#fakelink"]').click(function(e) {
      return e.preventDefault()
    });

    $('a.droplink').click(function(e) {
      var $drop, $link;
      $link = $(e.currentTarget);
      $drop = $link.siblings('.dropdown');
      if ($link.is('.active') || $drop.is('.active')) {
        $link.removeClass('active');
        $drop.removeClass('active');
      } else {
        $link.addClass('active');
        $drop.addClass('active');
      }
      return false;
    });

    $('.js-clipboard').each(function() {
      var $btn = $(this)
      if (!$btn.data('zeroclipboard-bound')) {
        $btn.attr('data-clipboard-text', $('#' + $btn.data('ref-id')).text().trim())
        $btn.data('zeroclipboard-bound', true)
        var clip = new ZeroClipboard(this)
        clip.on('aftercopy', function(e) {
          $this = $(e.target)
          var html = $this.html()
          $this.html('<i class="icon icon-clipboard pad0r"></i>' + 'Copied to clipboard!')
          setTimeout(function() {
            $this.html(html)
          }, 1000);
        });
      }
    });
    
    if($('#typeahead').length) {
      $('#typeahead').typeahead({
        source: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
        "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
        "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
        "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota",
        "North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
        "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]
      });
    }    

    document.body.className += ' animate'
    window.prettyPrint && prettyPrint()
  });
}).call(this);
