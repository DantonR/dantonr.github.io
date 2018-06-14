//  API'S & PLUGINS

// pagepiling initializing, needs to come first
$(document).ready(function() {
	$('#pagepiling').pagepiling({
		verticalCentered: false,
		scrollingSpeed: 200,
		normalScrollElements: '.mapboxgl-map'
	});
});

// mapbox initializing
var token = 'pk.eyJ1IjoiZGFudG9uciIsImEiOiJjamk5d3EzbGsxMWJvM2twYXF0amoybTZyIn0.KXnE7KK1UNlZWKzcHpy19g';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFudG9uciIsImEiOiJjamk5d3EzbGsxMWJvM2twYXF0amoybTZyIn0.KXnE7KK1UNlZWKzcHpy19g';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10',
center: [-77.035, 38.875],
zoom: 15
});

var directions = new MapboxDirections({
  accessToken: token,
  unit: 'metric',
  profile: 'mapbox/cycling'
});

map.addControl(directions, 'top-left');


// test your own javascript within this function
var testingJs = function(){
	// PREVENT SCROLL TEST
	var mapBoxDiv = document.querySelector('.mapboxgl-canvas');
	console.dir(mapBoxDiv);
	mapBoxDiv.addEventListener('click', function(){
		console.log('clickkkking');
	}, false)

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
