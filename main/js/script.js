$(document).ready(function() {
  $("a.popoverLink").popover({
    'trigger': 'hover',
    'html': true
  });

  $('[data-toggle="tooltip"]').tooltip();

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
      var goToElem = "#" + goToName;

      $('html,body').animate({
        scrollTop: $(goToElem).offset().top
      }, 'slow');
      return false;
    });
  });

  // Send Mixpanel
  mixpanel.track("homepage_view");
  mixpanel.track("page_view", {
    'item': 'CV'
  });
});

var goto = function(elem) {
  console.log(elem);

  var goToName = $(elem).attr("data-goto");
  var goToElem = "#" + goToName;

  $('html,body').animate({
    scrollTop: $(goToElem).offset().top
  }, 'slow');
}

var track_resume_download_click = function() {
  mixpanel.track("resume_download");
};
var track_click = function(itemName) {
  mixpanel.track("click", {
    'item': itemName
  });
};
var track_term_search = function(term) {
  mixpanel.track("term_search", {
    'term': term
  });
};
/**
 * Followint Code is from http://percywegmann.com
 * Function from here - http://www.qodo.co.uk/blog/javascript-trim-leading-and-trailing-spaces
 */
String.prototype.trim = function() {
  var s = this;
  s = s.replace(/(^\s*)|(\s*$)/gi, "");
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");
  return s;
}

function check_valid_term(str) {
  var html_tag = new RegExp("/\b(basefont|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE|abbr|acronym|address|applet|article|aside|audio|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|del|details|dfn|dialog|dir|div|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|iframe|ins|kbd|keygen|label|legend|map|mark|menu|meter|nav|noframes|noscript|object|optgroup|output|progress|ruby|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|textarea|tfoot|thead|time|title|track|var|video)/");
  if (html_tag.test(str) !== true) {
    return true;
  } else {
    return false;
  }
}

// Highliter Functions
function highlightTerms() {
  var value = $("#skills").val();
  if (value && value !== '') {
    if (value.length < 3) {
      console.log("term Length", value.length);
      $("#searchMessage").html("Invalid Term");
    } else {
      console.log("term Length", value.length);
      doHighlightTerms($("#skills").val());
      $("#skills").val("").focus();
    }
  }
}

function doHighlightTerms(terms) {
  exitHighlightMode();
  var termsArray = terms.split(",");
  var mainArea = $("#mainArea");
  var totalMatches = 0;
  for (var i = 0; i < termsArray.length; i++) {
    var term = termsArray[i].trim();
    track_term_search(term);
    var regex = new RegExp("(" + term + ")([^a-zA-Z:])", "gi");
    var html = mainArea.html();
    var matches = html.match(regex);
    if (matches && matches.length > 0) {
      mainArea.html(html.replace(regex, "<span class='highlighted'>$1</span>$2"));
      totalMatches += matches.length;
    }
  }
  console.log(totalMatches);
  if (totalMatches > 0) {
    $("#searchMessage").html('"' + terms + '" found ' + totalMatches + " times");
    mainArea.html(html.replace(regex, "<span class='highlighted'>$1</span>$2"));
  } else {
    $("#searchMessage").html('"' + terms + '" not found');
  }
}

function exitHighlightMode() {
  $("span.highlighted").removeClass("highlighted");
  $("#searchMessage").html("");
}

//POS2

function highlightTermsPos2(value) {
  var value = $("#skillsPos2").val();
  if (value && value !== '') {
    if (value.length < 3) {
      console.log("term Length", value.length);
      $("#searchMessagePos2").html("Invalid Term");
    } else {
      doHighlightTermsPos2($("#skillsPos2").val());
      $("#skillsPos2").val("").focus();
    }
  }
}

function doHighlightTermsPos2(terms) {
  exitHighlightModePos2();
  var termsArray = terms.split(",");
  var mainArea = $("#mainArea");
  var totalMatches = 0;
  for (var i = 0; i < termsArray.length; i++) {
    var term = termsArray[i].trim();
    track_term_search(term);
    var regex = new RegExp("(" + term + ")([^a-zA-Z:])", "gi");
    var html = mainArea.html();
    var matches = html.match(regex);
    if (matches && matches.length > 0) {
      mainArea.html(html.replace(regex, "<span class='highlighted'>$1</span>$2"));
      totalMatches += matches.length;
    }
  }
  if (totalMatches > 0) {
    $("#searchMessagePos2").html('"' + terms + '" found ' + totalMatches + " times");
    mainArea.html(html.replace(regex, "<span class='highlighted'>$1</span>$2"));
  } else {
    $("#searchMessagePos2").html('"' + terms + '" not found');
  }
}

function exitHighlightModePos2() {
  $("span.highlighted").removeClass("highlighted");
  $("#searchMessagePos2").html("");
}
