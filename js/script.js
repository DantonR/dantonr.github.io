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
	$('#pagepiling').pagepiling();
});
