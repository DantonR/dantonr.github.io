// test your own javascript within this function
var testingJs = function(){
	console.dir(document.getElementById('startDate'));

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
		startDate: document.getElementById('startDate'),
		endDate: document.getElementById('endDate')
	},
	// ** variables end **


	// **event listeners**
	eventListeners: function() {
		app.vars.scrollBtns[2].addEventListener('click', function(){
			app.getDates(app.vars.startDate, app.vars.endDate);
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
		console.dir(a);
		console.dir(b);
	},
	// ** functions end **




} // APP END

app.eventListeners();

// CONSOLE LOGS
// console.log(app.vars.scrollBtns)[0];
