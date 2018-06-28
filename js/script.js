


// when the user inputs locations into the mapbox fields, push the distance into an array
directions.on('route', function(directions){
	var v = app.vars;
	v.mapboxDistance.splice(0, 1);
	v.mapboxDistance.push(directions.route["0"].distance / 1000);
	// take the value the user inputs to mapbox, and get the first word (origin & desitination)
	v.mapboxOriginVal.splice(0, 1);
	v.mapboxDestinationVal.splice(0, 1);
	origin = v.mapboxOrigin.firstChild.children[1].value.split(',');
	v.mapboxOriginVal.push(origin[0]);
	destination = v.mapboxDestination.firstChild.children[1].value.split(',');
	v.mapboxDestinationVal.push(destination[0]);
	console.dir(v.mapboxDistance[0]);
});
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
		mapboxDistance: ['a'],

		//mapbox inputs
		mapboxOrigin: document.getElementById('mapbox-directions-origin-input'),
		mapboxDestination: document.getElementById('mapbox-directions-destination-input'),
		// mapbox input values
		mapboxOriginVal: ['a'],
		mapboxDestinationVal: ['a'],

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

		// page 5 card
		pageFiveCard: document.getElementsByClassName('page-five__card')[0],

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
		}, false);

		// * page 2 button press *
		v.scrollBtns[1].addEventListener('click', function(){

		}, false);

		// * page 3 button press *
		v.scrollBtns[2].addEventListener('click', function(){
			// run the function getDates, taking the date inputs as arguments
			app.getDates(v.startDate, v.endDate);
		}, false);


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


	var page = $(".page-four__content")[0]
	page.addEventListener('click', catTest, false);

	function catTest(e) {
		console.dir(e.target);
	}

	// expand the vehicle div when clicked on, and hide the others
	$(".page-four__content").on('click', '.page-4__card', function(){
		$(this).toggleClass('page-4__card--large').siblings().toggleClass('page-4__card--transparent');
		v.selectedVehicle.splice(0, 1);
		v.selectedVehicle.push(this.id);
	});



	// show the vehicles depending on inputs
	$('#scrollBtnThree').click(function(){
		app.getDates(v.startDate, v.endDate);
		compareData('motorbike', vehicles.motorbike, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Motorbike' );
		compareData('smallCar', vehicles.smallCar, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Small Car' );
		compareData('largeCar', vehicles.largeCar, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Large Car' );
		compareData('motorhome', vehicles.motorhome, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Motorhome'  );
	});

	// when selecting go back on the fourth page, delete the current vehicles in the page
	$('#fourthBackBtn').on('click', function(){
		deleteChildren();
	});

	// when selecting go back on the fourth page, delete the current vehicles in the page
	function deleteChildren(){
		var p = app.vars.pageFourDiv
		var l = p.childNodes.length - 1;
		console.log(l);

		for(var i = 2; i < l; i++){
			console.log(i);
			p.removeChild(p.childNodes[2]);
		}
	};



	// take the data given and create vehicles based on that
	function compareData(objName, obj, seats, days, displayName){
		var p4 = app.vars.pageFourDiv;
		var v = app.vars;
		var fuelCost =  Math.ceil( ((v.mapboxDistance[0] / 100) * obj.fuel) * 2.50 );
		var totalCost = fuelCost + (days * obj.cost);
		var multipleSeats = '<p class="light">For <strong>' + obj.seats[0] + ' - ' + obj.seats[1] + '</strong> People </p>';
		if (objName === 'motorbike') {
			multipleSeats = '<p class="light">For <strong>' + obj.seats[0] + '</strong> Person </p>';
		}
		if(seats >= obj.seats[0] &&  seats <= obj.seats[1] && days >= obj.days[0] && days <= obj.days[1]) {
			var newVehicle = '<div class="page-4__card" id=" '  + objName + ' ">';
			newVehicle += 		'<img class="card__img center-align" src="img/' + objName + '.png" alt="Two seater car" />';
			newVehicle += 		'<h2 class="center-align green">' + displayName + '</h2>';
			newVehicle += 		'<div>';
			newVehicle += 			'<p class="center-align">Lorem ipsum dolor sit</p>';
			newVehicle += 			multipleSeats;
			newVehicle += 			'<p class="light"><strong>$' + obj.cost + '</strong> per day</p>';
			newVehicle += 			'<p class="margin-before green"><strong>Costs for your trip:</strong></p>';
			newVehicle += 			'<p class="light">Fuel (approx): <span class="right-align bold">$' + fuelCost + '</span></p>';
			newVehicle += 			'<p class="light">Vehicle hire<span class="right-align bold">$' + days * obj.cost + '</span></p>';
			newVehicle += 			'<hr>';
			newVehicle += 			'<p>Total<span class="right-align">$' + totalCost +'</span></p>';
			newVehicle += 		'</div>';
			newVehicle += 		'<button class="btn btn-tertiary center-align confirm" id="' + objName + 'Btn">Confirm</button>';
			newVehicle += 	'</div>';

			var choose = document.getElementById('choose');
			choose.insertAdjacentHTML('afterend', newVehicle);
		}
	};


	// the confirm buttons on the expanded vehicle options
	chooseVehicle('#motorbikeBtn', 'Motorbike', vehicles.motorbike);
	chooseVehicle('#smallCarBtn', 'Small Car', vehicles.smallCar);
	chooseVehicle('#largeCarBtn', 'Large Car', vehicles.largeCar);
	chooseVehicle('#motorhomeBtn', 'Motorhome', vehicles.motorhome);


	// show the final page data
	function chooseVehicle(buttonId, vehicleName, dataItem){
		$(document).on('click', buttonId, function(){
			$.fn.pagepiling.moveSectionDown();
			setTimeout(function(){
				app.vars.pageFiveCard.style.transform = 'translateY(20px)';
			}, 700);
			v.infoVehicle.innerHTML = vehicleName;
			v.infoCost.innerHTML = '$' + dataItem.cost * v.daysTraveling;
			v.infoPickup.innerHTML = v.mapboxOriginVal[0] + ' on the ' + v.startDate.value;
			v.infoDropoff.innerHTML = v.mapboxDestinationVal[0] + ' on the ' + v.endDate.value;
			v.infoDays.innerHTML = v.daysTraveling[0];
			v.infoDistance.innerHTML = Math.ceil(v.mapboxDistance[0]) + ' km';
		});
	};
}();
