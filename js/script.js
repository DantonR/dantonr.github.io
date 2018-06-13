//  API'S & PLUGINS

// mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFudG9uciIsImEiOiJjamk5d3EzbGsxMWJvM2twYXF0amoybTZyIn0.KXnE7KK1UNlZWKzcHpy19g';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10',
center: [-77.035, 38.875],
zoom: 15
});

// pagepiling
$(document).ready(function() {
	$('#pagepiling').pagepiling({
		verticalCentered: false,
		scrollingSpeed: 200,
		normalScrollElements: '.mapboxgl-map'
	});
});

// material design
// mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));


// TEST JS IN THIS FUNCTION
var testingJs = function(){
	// PREVENT SCROLL TEST
	var mapBoxDiv = document.querySelector('.mapboxgl-canvas');
	console.dir(mapBoxDiv);
	mapBoxDiv.addEventListener('click', function(){
		console.log('clickkkking');
	}, false)

}();



// function preventScroll(e) {
// 	console.log('this is scroll');
// 	if (e.target.id === 'map') {
// 		console.log('hahah');
// 		$.fn.pagepiling.setAllowScrolling(false);
// 	} else {
// 		$.fn.pagepiling.setAllowScrolling(true);
// 	}
// }


// APP START
var app = {
	vars: {
		mapBoxDiv: document.getElementById('map'),
	},
	eventListeners: function() {
		app.vars.mapBoxDiv.addEventListener('scroll', function(){
			event.preventDefault();
		}, false)
	}
} // APP END

console.dir(app.vars.mapBoxDiv);
// app.eventListeners();
