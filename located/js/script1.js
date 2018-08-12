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


	//TOGGLE CLICK - KLODER
	$('.test-b2').on('click', function (e) {
	    $('.test-b2').toggleClass("test-b2-popup");
	});

	$('.test-b1').on('click', function (e) {
			$('.test-b1').toggleClass("test-b1-popup");
	});

	$('.test-b3').on('click', function (e) {
	    $('.test-b3').toggleClass("test-b3-popup");
	});

	$('.test-b4').on('click', function (e) {
			$('.test-b4').toggleClass("test-b4-popup");
	});

	//parallex (bliver ikke brugt)
	var ypos,start;
	function parallex () {
		ypos = window.pageYOffset;
		start = document.getElementById('virtuel');
		start.style.top = ypos * .4 +'px';
	}
	window.addEventListener('scroll',parallex);

	//DAY-NIGHT
		var today = new Date().getHours();
	if (today >= 7 && today <= 19) {
	//   document.body.style.background = "Red"; DAY
	   $("#test-sky").css('background-image','url(../img/day.jpeg)');
	} else {
	  //  document.body.style.background = "Blue"; NIGHT
	     $("#test-sky").css('background-image','url(../img/night.jpg)');

	}

	//STREET VIEW


	//GoogleMaps
	function initMap() {
        var map = new google.maps.Map(document.getElementById('test-map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 12
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('YOU');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }


	//WEBCAM
	'use strict';

	var videoElement = document.querySelector('video');
	var audioSelect = document.querySelector('select#audioSource');
	var videoSelect = document.querySelector('select#videoSource');

	navigator.getUserMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	function gotSources(sourceInfos) {
		for (var i = 0; i !== sourceInfos.length; ++i) {
			var sourceInfo = sourceInfos[i];
			var option = document.createElement('option');
			option.value = sourceInfo.id;
			if (sourceInfo.kind === 'audio') {
				option.text = sourceInfo.label || 'microphone ' +
					(audioSelect.length + 1);
				audioSelect.appendChild(option);
			} else if (sourceInfo.kind === 'video') {
				option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
				videoSelect.appendChild(option);
			} else {
				console.log('Some other kind of source: ', sourceInfo);
			}
		}
	}

	if (typeof MediaStreamTrack === 'undefined' ||
			typeof MediaStreamTrack.getSources === 'undefined') {
		alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
	} else {
		MediaStreamTrack.getSources(gotSources);
	}

	function successCallback(stream) {
		window.stream = stream; // make stream available to console
		videoElement.src = window.URL.createObjectURL(stream);
		videoElement.play();
	}

	function errorCallback(error) {
		console.log('navigator.getUserMedia error: ', error);
	}

	function start() {
		if (window.stream) {
			videoElement.src = null;
			window.stream.stop();
		}
		var audioSource = audioSelect.value;
		var videoSource = videoSelect.value;
		var constraints = {
			audio: {
				optional: [{
					sourceId: audioSource
				}]
			},
			video: {
				optional: [{
					sourceId: videoSource
				}]
			}
		};
		navigator.getUserMedia(constraints, successCallback, errorCallback);
	}

	audioSelect.onchange = start;
	videoSelect.onchange = start;

	start();
