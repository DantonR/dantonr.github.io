//  API'S & PLUGINS

// pagepiling initializing, needs to come first
$('#pagepiling').pagepiling({
	verticalCentered: false,
	scrollingSpeed: 50,
	// normalScrollElements: '#map .mapboxgl-map, .mapboxgl-control-container'
});
$.fn.pagepiling.setAllowScrolling(false);
// pagepiling end


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
  profile: 'mapbox/driving'
});

map.addControl(directions, 'top-left');
// mapbox end
