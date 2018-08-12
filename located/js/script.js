// parallex START
var ypos,start;
function parallex () {
	ypos = window.pageYOffset;
	start = document.getElementById('start');
	start.style.top = ypos * .6 +'px';
}
window.addEventListener('scroll',parallex);

// BETWEEN - DROP WTF
	var s = skrollr.init({
		edgeStrategy: 'set',
		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
			}
		}
	});

// LINK TO index1.html
  $(window).on('keydown', function(e){
    console.log("asdf");
    if(e.which == 13){
    window.location.href = "index1.html";
  }
});

// TEXT BLUE SCREEEN
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {


var printText = $('.text').data('text');

var contentArray = printText.split('/n');
$.each(contentArray, function(index, newLine) {
  $('.text').append('<span style="display:block;" id="'+index+'"></span>');

  var lineID = index;
  var self = $(this);
    setTimeout(function () {
      $.each(self, function(index, chunk){
          setTimeout(function () {
            $('#'+lineID).append("<span>"+chunk+"</span>");
            $('#text-box').scrollTop($('#text-box').height());
          }, index*5);
      });

    }, index*100);
});
}
});
