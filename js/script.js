// test your own javascript within this function
var testingJs = function(){
	//get directions
}();

directions.on('route', function(directions){
	// console.log(directions.route['0'].distance / 1000);
	// distance.innerHTML = directions.route["0"].distance / 1000;
	app.vars.mapboxDistance.push(directions.route["0"].distance);
	console.log(app.vars.mapboxDistance);
});

// APP START
var app = {
	// ** variables *
	vars: {
		body: document.querySelector('body'),
		mapBoxDiv: document.getElementById('map'),
		scrollBtns: document.querySelectorAll('.btn-primary'),

		// input fields
		startDate: document.getElementById('startDate'),
		endDate: document.getElementById('endDate'),
		seatsNeeded: document.getElementById('seatsNeeded'),

		// the arrays that will contain the dates & days traveling
		dates: ['itemOne', 'itemTwo'],
		daysTraveling: ['a'],

		// array containing map data
		mapboxDistance: [],

		// the divs containing the different vehicle options
		bike: document.getElementById('bike'),
		smallCar: document.getElementById('smallCar'),
		largeCar: document.getElementById('largeCar'),
		motorhome: document.getElementById('motorhome'),


		// final display of information
		infoDisplay: document.getElementById('infoDisplay'),
		infoPickup: document.getElementById('infoPickup'),
		infoDropoff: document.getElementById('infoDropoff'),
		infoDays: document.getElementById('infoDays'),
		infoDistance: document.getElementById('infoDistance'),
		infoVehicle: document.getElementById('infoVehicle'),
		infoCost: document.getElementById('infoCost')
	},
	// ** variables end **

	// **event listeners**
	eventListeners: function() {

		// * page 2 button press *
		app.vars.scrollBtns[1].addEventListener('click', function(){
			console.log(app.vars.mapboxObj);
		}, false)

		// * page 3 button press *
		app.vars.scrollBtns[2].addEventListener('click', function(){
			app.getDates(app.vars.startDate, app.vars.endDate);
			app.showVehicles(parseInt(app.vars.seatsNeeded.value), app.vars.daysTraveling[0] );
		}, false);

		// * page 4 button press *
		app.vars.scrollBtns[3].addEventListener('click', function(){
			var v = app.vars;
			app.displayInfo(v.startDate, v.endDate, v.daysTraveling[0]);
		}, false);

		// *up & down buttons*
		app.vars.body.addEventListener('click', function(e){

			if(e.target.className === 'btn btn-primary') {
				$.fn.pagepiling.moveSectionDown();
			} else if (e.target.innerHTML === 'GO BACK') {
				$.fn.pagepiling.moveSectionUp();
			}
		}, false);


	}, // **event listeners end**

	// ** functions **

	// get map data
	getMapData: function() {

	},


	// take the dates given and calculate the amount of days traveling
	getDates: function(b, a) {
		app.vars.dates.splice(0, 2);
		app.vars.dates.push(a.value, b.value);
		var date1 = new Date(app.vars.dates[0]);
		var date2 = new Date(app.vars.dates[1]);
		var timeDiff = date1.getTime() - date2.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		app.vars.daysTraveling.splice(0, 1);
		app.vars.daysTraveling.push(diffDays);
		console.log(app.vars.dates);
		console.log(app.vars.daysTraveling[0]);
	}, // get dates end

	// show or hide vehicles based on seats needed and days traveling
	showVehicles: function(seats, days) {
		// show/hide motorbike
		if(seats === vehicles.motorbike.seats[0] && days >= vehicles.motorbike.days[0] && days <= vehicles.motorbike.days[1]) {
			app.vars.bike.style.display = 'block';
		} else {
			app.vars.bike.style.display = 'none';
		}
		// show/hide small car
		if(seats >= vehicles.smallCar.seats[0] &&  seats <= vehicles.smallCar.seats[1] && days >= vehicles.smallCar.days[0] && days <= vehicles.smallCar.days[1]) {
			app.vars.smallCar.style.display = 'block';
		} else {
			app.vars.smallCar.style.display = 'none';
		}
		// show/hide large car
		if(seats >= vehicles.largeCar.seats[0] &&  seats <= vehicles.largeCar.seats[1] && days >= vehicles.largeCar.days[0] && days <= vehicles.largeCar.days[1]) {
			app.vars.largeCar.style.display = 'block';
		} else {
			app.vars.largeCar.style.display = 'none';
		}
		// show/hide motorhome
		if(seats >= vehicles.motorhome.seats[0] &&  seats <= vehicles.motorhome.seats[1] && days >= vehicles.motorhome.days[0] && days <= vehicles.motorhome.days[1]) {
			app.vars.motorhome.style.display = 'block';
		} else {
			app.vars.motorhome.style.display = 'none';
		}
	}, // show vehicles end

	// change the info on the last page based on the users input + data
	displayInfo: function(pickup, dropoff, days) {
		var v = app.vars;
		v.infoPickup.innerHTML = pickup.value;
		v.infoDropoff.innerHTML = dropoff.value;
		v.infoDays.innerHTML = days;
	},

	// mapbox function









	// ** functions end **




}; // APP END




app.eventListeners();

// CONSOLE LOGS
console.dir(app.displayInfo());
