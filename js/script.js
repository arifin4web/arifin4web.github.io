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

  // Send Mixpanel
  mixpanel.track("homepage_view");
});

var track_resume_download_click = function (){
  mixpanel.track("resume_download");
};
var track_click = function (itemName){
  mixpanel.track("click", {
    'item': itemName
  });
};
