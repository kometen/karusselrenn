Template.raceSubmit.events({
	'submit form': function (e) {
		e.preventDefault();

		var race = {
			name: $(e.target).find('[name=name]').val(),
			location: $(e.target).find('[name=location]').val(),
			date: $(e.target).find('[name=date]').val(),
			time: $(e.target).find('[name=time]').val(),
			interval: $(e.target).find('[name=interval]').val()
		}

		Meteor.call('postRace', race, function (error, id) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('racePage', {_id: id});
		});
	}
});

Template.raceSubmit.rendered = function () {
	$('.datepicker').datepicker();
	$('.timepicker').datetimepicker({
		showOn: 'button',
		showSecond: true,
		dateFormat: 'dd-mm-yyyy',
		timeFormat: 'HH::mm:ss'
	});
}