// test your own javascript within this function
var testingJs = function(){
	//get directions

	directions.on('route', function(directions){
		console.log(directions.route['0'].distance / 1000);
		distance.innerHTML = directions.route["0"].distance / 1000;
	});


}();




// APP START
var app = {
	// ** variables **
	vars: {
		body: document.querySelector('body'),
		mapBoxDiv: document.getElementById('map'),
		scrollBtns: document.querySelectorAll('.btn-primary'),
		seatsNeeded: document.getElementById('seatsNeeded'),
		startDate: document.getElementById('startDate'),
		endDate: document.getElementById('endDate'),
		bike: document.getElementById('bike'),
		smallCar: document.getElementById('smallCar'),
		largeCar: document.getElementById('largeCar'),
		motorhome: document.getElementById('motorhome')
	},
	// ** variables end **


	// **event listeners**
	eventListeners: function() {
		app.vars.scrollBtns[2].addEventListener('click', function(){
			var travelingDays = app.getDates(app.vars.startDate, app.vars.endDate);

			app.showVehicles(parseInt(app.vars.seatsNeeded.value), parseInt(travelingDays) );
		}, false),




		// *up & down buttons*
		app.vars.body.addEventListener('click', function(e){
			if(e.target.className === 'btn btn-primary') {
				$.fn.pagepiling.moveSectionDown();
			} else if (e.target.innerHTML === 'GO BACK') {
				$.fn.pagepiling.moveSectionUp();
			}
		}, false)
		// *up & down buttons end*
	}, // **event listeners end**




	// ** functions **
	getDates: function(a, b) {
		console.dir(a.value);
		splitA = a.value.split("-");
		splitB = b.value.split("-");

		// console.log(splitB[2] - splitA[2]);
		return(splitB[2] - splitA[2]);
	},

	showVehicles: function(seats, days) {
		console.log(days);
		// show motorbike
		if(seats === vehicles.motorbike.seats[0] && days >= vehicles.motorbike.days[0] && days <= vehicles.motorbike.days[1]) {
			app.vars.bike.style.display = 'block';
		} else {
			app.vars.bike.style.display = 'none';
		}
		if(seats >= vehicles.smallCar.seats[0] &&  seats <= vehicles.smallCar.seats[1] && days >= vehicles.smallCar.days[0] && days <= vehicles.smallCar.days[1]) {
			app.vars.smallCar.style.display = 'block';
		} else {
			app.vars.smallCar.style.display = 'none';
		}
		if(seats >= vehicles.largeCar.seats[0] &&  seats <= vehicles.largeCar.seats[1] && days >= vehicles.largeCar.days[0] && days <= vehicles.largeCar.days[1]) {
			app.vars.largeCar.style.display = 'block';
		} else {
			app.vars.largeCar.style.display = 'none';
		}
		if(seats >= vehicles.motorhome.seats[0] &&  seats <= vehicles.motorhome.seats[1] && days >= vehicles.motorhome.days[0] && days <= vehicles.motorhome.days[1]) {
			app.vars.motorhome.style.display = 'block';
		} else {
			app.vars.motorhome.style.display = 'none';
		}
	}
	// ** functions end **

	// '2018-06-18'


} // APP END

app.eventListeners();

// CONSOLE LOGS
console.dir(app.vars.bike);
