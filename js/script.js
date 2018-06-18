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
		motorhome: document.getElementById('motorhome'),
		dates: ['itemOne', 'itemTwo'],
		daysTraveling: ['a'],

		// date2: new Date(app.vars.endDate.value)
	},
	// ** variables end **



	// **event listeners**
	eventListeners: function() {

		app.vars.scrollBtns[2].addEventListener('click', function(){
			app.getDates(app.vars.startDate, app.vars.endDate);
			app.showVehicles(parseInt(app.vars.seatsNeeded.value), app.vars.daysTraveling[0] );
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
	getDates: function(b, a) {
		app.vars.dates.splice(0, 2)
		app.vars.dates.push(a.value, b.value);
		var date1 = new Date(app.vars.dates[0]);
		var date2 = new Date(app.vars.dates[1]);
		var timeDiff = date1.getTime() - date2.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		app.vars.daysTraveling.splice(0, 1);
		app.vars.daysTraveling.push(diffDays);
		console.log(app.vars.daysTraveling[0]);
	},


	showVehicles: function(seats, days) {
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


} // APP END

app.eventListeners();

// CONSOLE LOGS
