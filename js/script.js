//  API'S & PLUGINS

// mapbox
// mapboxgl.accessToken = 'pk.eyJ1IjoiZGFudG9uciIsImEiOiJjamk5d3EzbGsxMWJvM2twYXF0amoybTZyIn0.KXnE7KK1UNlZWKzcHpy19g';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v10',
// center: [-77.035, 38.875],
// zoom: 15
// });
//
// var directions = new MapboxDirections({
//   accessToken: 'YOUR-MAPBOX-ACCESS-TOKEN',
//   unit: 'metric',
//   profile: 'mapbox/cycling'
// });

// map.addControl(directions, 'top-left');

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

}();

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
