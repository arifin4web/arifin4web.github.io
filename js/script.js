$(document).ready(function() {
  $("a.popoverLink").popover({
    'trigger': 'hover',
    'html': true
  });

  // ScrollTop Animatiom
  $('a.go-to-top').each(function() {
    $(this).click(function() {
      $('html,body').animate({
        scrollTop: 0
      }, 'slow');
      return false;
    });
  });
});
