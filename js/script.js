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

  $('a.goto').each(function() {
    $(this).click(function() {
      var goToName = $(this).attr("data-goto");
      var goToElem = "#"+goToName;

      $('html,body').animate({
        scrollTop: $(goToElem).offset().top
      }, 'slow');
      return false;
    });
  });

  // Send Mixpanel
  mixpanel.track("homepage_view");
});

var goto = function(elem){
  console.log(elem);

  var goToName = $(elem).attr("data-goto");
  var goToElem = "#"+goToName;

  $('html,body').animate({
    scrollTop: $(goToElem).offset().top
  }, 'slow');
}

var track_resume_download_click = function (){
  mixpanel.track("resume_download");
};
var track_click = function (itemName){
  mixpanel.track("click", {
    'item': itemName
  });
};
