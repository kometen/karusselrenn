Template.raceEdit.rendered = function () {
	$('.datepicker').datepicker({
		autoclose: true
	});

	$('.timepicker').timepicker({
		minuteStep: 5,
		showInputs: false,
		showMeridian: false,
		disableFocus: true
	});
}

Template.raceSubmit.rendered = function () {
	$('.datepicker').datepicker({
		autoclose: true
	});

	$('.timepicker').timepicker({
		minuteStep: 5,
		showInputs: false,
		showMeridian: false,
		disableFocus: true
	});
}