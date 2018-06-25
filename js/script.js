


// when the user inputs locations into the mapbox fields, push the distance into an array
directions.on('route', function(directions){
	app.vars.mapboxDistance.push(directions.route["0"].distance / 1000);
});
console.log($('.btn-primary'));
// APP START
var app = {
	// --------------------------------
	//  	VARIABLES
	// --------------------------------
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

		// array containing selected vehicle
		selectedVehicle: ['a'],

		// the divs containing the different vehicle options
		bike: document.getElementById('bike'),
		smallCar: document.getElementById('smallCar'),
		largeCar: document.getElementById('largeCar'),
		motorhome: document.getElementById('motorhome'),

		// page 4 cards
		pageFourDiv: document.getElementsByClassName('page-four__content')[0],
		cards: document.getElementsByClassName('page-4__card'),

		// final display of information
		infoDisplay: document.getElementById('infoDisplay'),
		infoPickup: document.getElementById('infoPickup'),
		infoDropoff: document.getElementById('infoDropoff'),
		infoDays: document.getElementById('infoDays'),
		infoDistance: document.getElementById('infoDistance'),
		infoVehicle: document.getElementById('infoVehicle'),
		infoCost: document.getElementById('infoCost')
	},




	// --------------------------------
	//  	EVENT LISTENERS
	// --------------------------------

	eventListeners: function() {
		var v = app.vars;
		// * home page button press
		v.scrollBtns[0].addEventListener('click', function(){
			// $.fn.pagepiling.moveSectionDown();
		}, false);

		// * page 2 button press *
		v.scrollBtns[1].addEventListener('click', function(){
			// if (typeof v.mapboxDistance[0] === 'number') {
			// 	$.fn.pagepiling.moveSectionDown();
			// } else {
			// 	alert('You havent said where youre going!');
			// }
		}, false);

		// * page 3 button press *
		v.scrollBtns[2].addEventListener('click', function(){
			// run the function getDates, taking the date inputs as arguments
			app.getDates(v.startDate, v.endDate);
			// function that show/hides vehicles depending on the seats needed and amount of days traveling
			app.showVehicles(parseInt(v.seatsNeeded.value), v.daysTraveling[0] );
		}, false);

		// * click on card *
		// v.pageFourDiv.addEventListener('click', function(e){
		// 	console.dir(e.target);
		// });

		// * page 4 button press *
		// v.scrollBtns[3].addEventListener('click', function(){
		// 	app.displayInfo(v.startDate, v.endDate, v.daysTraveling[0], v.mapboxDistance[0], v.selectedVehicle[0]);
		// }, false);

		// *up & down buttons*
		v.body.addEventListener('click', function(e){

			if(e.target.className === 'btn btn-primary') {
				$.fn.pagepiling.moveSectionDown();
			} else if (e.target.innerHTML === 'GO BACK') {
				$.fn.pagepiling.moveSectionUp();
			}
		}, false);


	}, // event listener ending


	// -------------------------
	//  	FUNCTIONS
	// -------------------------

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
	}, // get dates end

	// show or hide vehicles based on seats needed and days traveling
	showVehicles: function(seats, days) {
		var v = app.vars;
		// show/hide motorbike
		if(seats === vehicles.motorbike.seats[0] && days >= vehicles.motorbike.days[0] && days <= vehicles.motorbike.days[1]) {
			v.bike.classList.remove('page-4__card--hidden');
			v.bike.classList.add('page-4__card');
		} else {
			v.bike.classList.add('page-4__card--hidden');
		}
		// show/hide small car
		if(seats >= vehicles.smallCar.seats[0] &&  seats <= vehicles.smallCar.seats[1] && days >= vehicles.smallCar.days[0] && days <= vehicles.smallCar.days[1]) {
			v.smallCar.classList.remove('page-4__card--hidden');
			v.smallCar.classList.add('page-4__card');
		} else {
			v.smallCar.classList.add('page-4__card--hidden');
		}
		// show/hide large car
		if(seats >= vehicles.largeCar.seats[0] &&  seats <= vehicles.largeCar.seats[1] && days >= vehicles.largeCar.days[0] && days <= vehicles.largeCar.days[1]) {
			v.largeCar.classList.remove('page-4__card--hidden');
			v.largeCar.classList.add('page-4__card');
		} else {
			v.largeCar.classList.add('page-4__card--hidden');
		}
		// show/hide motorhome
		if(seats >= vehicles.motorhome.seats[0] &&  seats <= vehicles.motorhome.seats[1] && days >= vehicles.motorhome.days[0] && days <= vehicles.motorhome.days[1]) {
			v.motorhome.classList.remove('page-4__card--hidden');
			v.motorhome.classList.add('page-4__card');
		} else {
			v.motorhome.classList.add('page-4__card--hidden');
		}
	}, // show vehicles end

	// change the info on the last page based on the users input + data
	displayInfo: function(pickup, dropoff, days, distance, vehicle) {
		var v = app.vars;
		v.infoPickup.innerHTML = pickup.value;
		v.infoDropoff.innerHTML = dropoff.value;
		v.infoDays.innerHTML = days;
		v.infoDistance.innerHTML = Math.ceil(distance) + 'km';
		v.infoCost.innerHTML = '$' + days *  109;
		v.infoVehicle.innerHTML = vehicle;
	},




}; // APP END

// -------------------------
//  	   CALLING
// -------------------------
app.eventListeners();


// -------------------------
//     CONSOLE LOGS
// -------------------------

// -------------------------
//          TEST JS
// -------------------------
var testingJs = function(){
	var v = app.vars;

	$(".page-four__content").on('click', '.page-4__card', function(){
		$(this).toggleClass('page-4__card--large').siblings().toggleClass('page-4__card--transparent');
		v.selectedVehicle.splice(0, 1);
		v.selectedVehicle.push(this.id);
		// console.dir(v.selectedVehicle);

	});

}();
