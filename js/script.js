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
		mapboxOrigin: document.getElementById('mapbox-directions-origin-input').firstChild.children[1],
		mapboxDestination: document.getElementById('mapbox-directions-destination-input').firstChild.children[1],
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
		infoCost: document.getElementById('infoCost'),
		infoImage: document.getElementById('infoImage')
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


		// when the user inputs locations into the mapbox fields, push the distance into an array
		directions.on('route', function(directions){
			// when the users start point/destination is not valid, alert them with tooltip
			if(directions.route.length === 0) {
				v.mapboxDistance.splice(0, 1);
				v.mapboxDistance.push('a');
				$('.directions-control')[0].id = 'mbControls';
				$('.directions-control')[0].dataset.originalTitle = "This is not a valid route";
				$('.directions-control')[0].title = "This is not a valid route";
				$('.directions-control')[0].dataset.placement = "bottom";
				$('.directions-control')[0].dataset.toggle = "tooltip";
				$('.directions-control')[0].dataset.trigger = "manual";
				$('#mbControls').tooltip('show');
				setTimeout(function(){
					$('.tooltip').tooltip('hide');
				}, 3000);
			} else {
				v.mapboxDistance.splice(0, 1);
				v.mapboxDistance.push(directions.route["0"].distance / 1000);
				// take the value the user inputs to mapbox, and get the first word (origin & desitination)
				v.mapboxOriginVal.splice(0, 1);
				v.mapboxDestinationVal.splice(0, 1);
				origin = v.mapboxOrigin.value.split(',');
				v.mapboxOriginVal.push(origin[0]);
				destination = v.mapboxDestination.value.split(',');
				v.mapboxDestinationVal.push(destination[0]);
				$('#scrollBtnTwo')[0].style.transform = 'translateY(0px)';
			}
			console.dir(v.mapboxDistance);
		});



		// * page 2 button press *
		v.scrollBtns[1].addEventListener('click', function(){
			// validate the route the user has inputted
			app.mapboxValidation();
		}, false);

		// * page 3 button press *
		v.scrollBtns[2].addEventListener('click', function(){
			// take the input values and use them as arguments for the following functions
			app.getDates(v.startDate, v.endDate);
			app.compareData('motorbike', vehicles.motorbike, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Motorbike' );
			app.compareData('smallCar', vehicles.smallCar, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Small Car' );
			app.compareData('largeCar', vehicles.largeCar, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Large Car' );
			app.compareData('motorhome', vehicles.motorhome, parseInt(v.seatsNeeded.value), v.daysTraveling[0], 'Motorhome'  );

			// hide any tooltips that are showing
			$('.tooltip').tooltip('hide');

			// validate the inputs
			app.formValidation();
		}, false);



		// hide tooltips when new input is made, and show button on selecting the drop off date
		inputting('#seatsNeeded', 'input', false);
		inputting('#pickDate', 'change', false);
		inputting('#dropDate', 'change', true);

		function inputting(jqSelector, evnt, showBtn) {
			$(jqSelector).on(evnt, function(){
				$('.tooltip').tooltip('hide');
				if (showBtn === true) {
					$('#scrollBtnThree')[0].style.transform = 'translateY(0px)';
				}
			});
		}



		// * page 4 individual vehicle buttons *
		app.chooseVehicle('#motorbikeBtn', 'Motorbike', vehicles.motorbike, 'motorbike');
		app.chooseVehicle('#smallCarBtn', 'Small Car', vehicles.smallCar, 'smallCar');
		app.chooseVehicle('#largeCarBtn', 'Large Car', vehicles.largeCar, 'largeCar');
		app.chooseVehicle('#motorhomeBtn', 'Motorhome', vehicles.motorhome, 'motorhome');

		// expand the vehicle div when clicked on, and hide the others
		$(".page-four__content").on('click', '.page-4__card', function(){
			$(this).toggleClass('page-4__card--large').siblings().toggleClass('page-4__card--transparent');
			v.selectedVehicle.splice(0, 1);
			v.selectedVehicle.push(this.id);
		});

		// *go back buttons*
		v.body.addEventListener('click', function(e){
			if (e.target.innerHTML === 'GO BACK') {
				$('.tooltip').tooltip('hide');
				$.fn.pagepiling.moveSectionUp();
			}
		}, false);


		// when selecting go back on the fourth page, delete the current vehicles in the page
		$('#fourthBackBtn').on('click', function(){
			app.deleteChildren();
		});

	}, // event listener ending


	// -------------------------
	//  	FUNCTIONS
	// -------------------------


	mapboxValidation: function(){
		$('.directions-control')[0].id = 'mbControls';
		$('.directions-control')[0].dataset.originalTitle = "Please specify where you're going";
		$('.directions-control')[0].title = "Please specify where you're going";
		$('.directions-control')[0].dataset.placement = "bottom";
		$('.directions-control')[0].dataset.toggle = "tooltip";
		$('.directions-control')[0].dataset.trigger = "manual";
		if (v.mapboxDistance[0] === 'a') {
			$('#mbControls').tooltip('show');
			setTimeout(function(){
				$('.tooltip').tooltip('hide');
			}, 2000);
		} else if(v.mapboxDestination.value === '' || v.mapboxOrigin.value === ''){
			$('#mbControls').tooltip('show');
			setTimeout(function(){
				$('.tooltip').tooltip('hide');
			}, 2000);
		} else if(v.mapboxDistance.length === 0) {
			$('#mbControls').tooltip('show');
			setTimeout(function(){
				$('.tooltip').tooltip('hide');
			}, 2000);
		} else {
			$('.tooltip').tooltip('hide');
			$.fn.pagepiling.moveSectionDown();
		}
	},

	compareDates: function(startDate, endDate) {
		var date1 = new Date(startDate);
		var date2 = new Date(endDate);
		var timeDiff = date2.getTime() - date1.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diffDays;
	},
	// take the dates given and calculate the amount of days traveling
	getDates: function(b, a) {
		var v = app.vars;
		var pickDate = $('#pickDate').datepicker('getDate');
		var dropDate = $('#dropDate').datepicker('getDate');
		app.compareDates(pickDate, dropDate);
		v.dates.splice(0, 2);
		v.dates.push(pickDate, dropDate);
		var date1 = new Date(v.dates[0]);
		var date2 = new Date(v.dates[1]);
		var timeDiff = date1.getTime() - date2.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		app.vars.daysTraveling.splice(0, 1);
		app.vars.daysTraveling.push(Math.abs(diffDays));
	}, // get dates end

	// show/hide tooltips on page 3 depending on inputs
	formValidation: function() {
		if (v.seatsNeeded.value === '') {
			$('#seatsNeeded').tooltip('show');
		} else if (v.daysTraveling[0] === 0) {
			$('#dropDate').tooltip('show');
			setTimeout(function(){
				$('#dropDate').tooltip('hide');
			}, 2000);
		} else if(v.daysTraveling[0] > 15) {
			$('#dropDate')[0].dataset.originalTitle = 'The maximum days for travel is 15';
			$('#dropDate').tooltip('show');
		} else if (v.seatsNeeded.value === '1' && v.daysTraveling[0] > 10) {
			$('#seatsNeeded')[0].dataset.originalTitle = 'The maximum travel length for this option is 10 days';
			$('#seatsNeeded').tooltip('show');
		} else if ( (v.seatsNeeded.value === '3' || v.seatsNeeded.value === '4' || v.seatsNeeded.value === '5' || v.seatsNeeded.value === '6')  && v.daysTraveling[0] < 2) {
			$('#seatsNeeded')[0].dataset.originalTitle = 'You must be traveling for at least 3 days for this option';
			$('#seatsNeeded').tooltip('show');
		} else {
			$.fn.pagepiling.moveSectionDown();
		}
	},

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
			newVehicle += 		'<div class="hidden-text">';
			newVehicle += 			'<p class="center-align">Lorem ipsum dolor sit</p>';
			newVehicle += 			multipleSeats;
			newVehicle += 			'<p class="light"><strong>$' + obj.cost + '</strong> per day</p>';
			newVehicle += 			'<p class="margin-before green"><strong>Costs for your trip:</strong></p>';
			newVehicle += 			'<p class="light">Fuel (approx): <span class="right-align bold">$' + fuelCost + '</span></p>';
			newVehicle += 			'<p class="light">Vehicle hire<span class="right-align bold">$' + days * obj.cost + '</span></p>';
			newVehicle += 			'<hr>';
			newVehicle += 			'<p>Total<span class="right-align">$' + totalCost +'</span></p>';
			newVehicle += 		'</div>';
			newVehicle += 		'<button class="btn btn-primary center-align confirm" id="' + objName + 'Btn">Confirm</button>';
			newVehicle += 	'</div>';

			var choose = document.getElementById('choose');
			choose.insertAdjacentHTML('afterend', newVehicle);
		}
	},

	// show the final page data
	chooseVehicle: function(buttonId, vehicleName, dataItem, imgName){
		var v = app.vars;
		$(document).on('click', buttonId, function(){
			$.fn.pagepiling.moveSectionDown();
			setTimeout(function(){
				v.pageFiveCard.classList.add('page-five__card--show');
			}, 700);
			v.infoVehicle.innerHTML = vehicleName;
			v.infoCost.innerHTML = '$' + dataItem.cost * v.daysTraveling;
			v.infoPickup.innerHTML = v.mapboxOriginVal[0] + ' on the ' + v.startDate.value;
			v.infoDropoff.innerHTML = v.mapboxDestinationVal[0] + ' on the ' + v.endDate.value;
			v.infoDays.innerHTML = v.daysTraveling[0];
			v.infoDistance.innerHTML = Math.ceil(v.mapboxDistance[0]) + ' km';
			v.infoImage.src = 'img/' + imgName + '.png';
		});
	},

	// when selecting go back on the fourth page, delete the current vehicles in the page
	deleteChildren: function(){
		var p = app.vars.pageFourDiv;
		var l = p.childNodes.length - 1;

		for(var i = 2; i < l; i++){
			p.removeChild(p.childNodes[2]);
		}
	}




}; // APP END















// -------------------------
//  	   CALLING
// -------------------------
var v = app.vars;
app.eventListeners();
