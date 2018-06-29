


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
	if (typeof v.mapboxDistance[0] === 'number') {
		console.log('working');
	}
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
		startDate: document.getElementById('pickDate'),
		endDate: document.getElementById('dropDate'),
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
			$.fn.pagepiling.moveSectionDown();
		}, false);

		// * page 2 button press *
		v.scrollBtns[1].addEventListener('click', function(){
			$.fn.pagepiling.moveSectionDown();
		}, false);

		// * page 3 button press *
		v.scrollBtns[2].addEventListener('click', function(){
			app.getDates(v.startDate, v.endDate);
			app.compareData('motorbike', vehicles.motorbike, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Motorbike' );
			app.compareData('smallCar', vehicles.smallCar, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Small Car' );
			app.compareData('largeCar', vehicles.largeCar, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Large Car' );
			app.compareData('motorhome', vehicles.motorhome, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Motorhome'  );

			// run the function getDates, taking the date inputs as arguments
			if (v.seatsNeeded.value === '') {
				console.log('Please specify the seats needed');
			} else if(v.daysTraveling[0] > 15) {
				console.log('Max days is 15');
			} else if (v.daysTraveling[0] > 15 && v.seatsNeeded.value === '') {
				console.log('Please specify seats needed and dont blah');
			} else if (v.pageFourDiv.children.length === 1) {
				console.log('There are no vehicle for this travel time');
			} else {
				$.fn.pagepiling.moveSectionDown();
			}

		}, false);

		// * page 4 individual vehicle buttons *
		app.chooseVehicle('#motorbikeBtn', 'Motorbike', vehicles.motorbike);
		app.chooseVehicle('#smallCarBtn', 'Small Car', vehicles.smallCar);
		app.chooseVehicle('#largeCarBtn', 'Large Car', vehicles.largeCar);
		app.chooseVehicle('#motorhomeBtn', 'Motorhome', vehicles.motorhome);

		// expand the vehicle div when clicked on, and hide the others
		$(".page-four__content").on('click', '.page-4__card', function(){
			$(this).toggleClass('page-4__card--large').siblings().toggleClass('page-4__card--transparent');
			v.selectedVehicle.splice(0, 1);
			v.selectedVehicle.push(this.id);
		});

		// *go back buttons*
		v.body.addEventListener('click', function(e){
			if (e.target.innerHTML === 'GO BACK') {
				$.fn.pagepiling.moveSectionUp();
			}
		}, false);
	}, // event listener ending






	// -------------------------
	//  	FUNCTIONS
	// -------------------------

	// take the dates given and calculate the amount of days traveling
	getDates: function(b, a) {
		var v = app.vars
		var pickDate = $('#pickDate').datepicker('getDate');
		var dropDate = $('#dropDate').datepicker('getDate');
		compareDates(pickDate, dropDate);
		v.dates.splice(0, 2);
		v.dates.push(pickDate, dropDate);
		var date1 = new Date(v.dates[0]);
		var date2 = new Date(v.dates[1]);
		var timeDiff = date1.getTime() - date2.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		app.vars.daysTraveling.splice(0, 1);
		app.vars.daysTraveling.push(Math.abs(diffDays));
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
	}, // delete this function

	// take the data given and create vehicles based on that
	compareData: function(objName, obj, seats, days, displayName){
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
	},

	// show the final page data
	chooseVehicle: function(buttonId, vehicleName, dataItem){
		var v = app.vars;
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




	// show the vehicles depending on inputs
	$('#scrollBtnThree').click(function(){

	});

	// when selecting go back on the fourth page, delete the current vehicles in the page
	$('#fourthBackBtn').on('click', function(){
		deleteChildren();
	});

	// when selecting go back on the fourth page, delete the current vehicles in the page
	function deleteChildren(){
		var p = app.vars.pageFourDiv
		var l = p.childNodes.length - 1;

		for(var i = 2; i < l; i++){
			p.removeChild(p.childNodes[2]);
		}
	};










}();
