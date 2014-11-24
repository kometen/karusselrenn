Template.racesList.helpers({
	races: function () {
		return Races.find({}, {sort: {date: 1}});
	},
	loggedIn: function () {
		return Meteor.userId();
	}
});

Template.racesList.events({
	'click input.new': function (e) {
		e.preventDefault();

		bootbox.dialog({
			title: "Enter race details",
			message:'<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="name">Name</label> ' +
						'<div class="controls"> ' +
							'<input id="name" name="name" type="text" placeholder="Racename"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="location">Location</label> ' +
						'<div class="controls"> ' +
							'<input id="location" name="location" type="text" placeholder="Location"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="date">Date</label> ' +
						'<div class="controls"> ' +
							'<input id="date" name="date" type="text" placeholder="Date"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="time">Time</label> ' +
						'<div class="controls"> ' +
							'<input id="time" name="time" type="text" placeholder="Time"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="form-group"> ' +
						'<label class="control-label" for="interval">Interval</label> ' +
						'<div class="controls"> ' +
							'<input id="interval" name="interval" type="text" placeholder="Interval"> ' +
						'</div> ' +
					'</div> ' +
				'</form>',
			buttons: {
				success: {
					label: "Save",
					className: "btn-success",
					callback: function () {
						var race = {
							name: $('#name').val(),
							location: $('#location').val(),
							date: $('#date').val(),
							time: $('#time').val(),
							interval: $('#interval').val()
						}
						console.log("add race with name " + race.name + " at " + race.location);
						Meteor.call('postRace', race, function (error, id) {
							if (error) {
								return alert(error.reason);
							}
							Router.go('racePage', {_id: id});
						});
					}
				},
				cancel: {
					label: "Cancel",
					className: "btn-default",
					callback: function () {
						console.log("cancel adding race");
					}
				}
			}
		});
	}
});
