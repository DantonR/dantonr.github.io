//  API'S & PLUGINS


// --------------------------------
//  	      PAGEPILING
// --------------------------------

// pagepiling initializing, needs to come first
$('#pagepiling').pagepiling({
	verticalCentered: false,
	scrollingSpeed: 50,
	navigation: false
	// normalScrollElements: '#map .mapboxgl-map, .mapboxgl-control-container'
});
$.fn.pagepiling.setAllowScrolling(false);
// pagepiling end


// --------------------------------
//  	       MAPBOX
// --------------------------------
var token = 'pk.eyJ1IjoiZGFudG9uciIsImEiOiJjamk5d3EzbGsxMWJvM2twYXF0amoybTZyIn0.KXnE7KK1UNlZWKzcHpy19g';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFudG9uciIsImEiOiJjamk5d3EzbGsxMWJvM2twYXF0amoybTZyIn0.KXnE7KK1UNlZWKzcHpy19g';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10',
center: [172, -41.279],
zoom: 4
});

var directions = new MapboxDirections({
  accessToken: token,
  unit: 'metric',
  profile: 'mapbox/driving'
});

map.addControl(directions, 'top-left');
// mapbox end


// --------------------------------
//  	      DATE PICKER
// --------------------------------
var dateFormat = 'mm/dd/yy',
	from = $('#pickDate')
		.datepicker({
			dateFormat: 'dd/mm/yy',
			defaultDate: 0,
			minDate: 0,
			numberOfMonths: 1
		})
		.on('change', function() {
			to.datepicker('option', 'minDate', getDate(this));
		}),
	to = $('#dropDate').datepicker({
		dateFormat: 'dd/mm/yy',
		defaultDate: 0,
		minDate: 0,
		numberOfMonths: 1
	});

// sets return date to only show from pickDate
function getDate(element) {
	var dateFormat = 'dd/mm/yy';
	var newDate = $('#pickDate').datepicker({dateFormat: 'mm/dd/yy'});
	var date;
	try {
		date = $.datepicker.parseDate(dateFormat, element.value);
	} catch (error) {
		date = null;
	}
	return date;
}

function compareDates(startDate, endDate) {
		var date1 = new Date(startDate);
		var date2 = new Date(endDate);
		var timeDiff = date2.getTime() - date1.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diffDays;
	}


// These three lines go inside your funation to check the number of days

//
