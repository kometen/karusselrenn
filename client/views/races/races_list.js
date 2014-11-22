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
					'<div class="control-group"> ' +
						'<label class="control-label" for="name">Name</label> ' +
						'<div class="controls"> ' +
							'<input id="name" name="name" type="text" placeholder="Racename"> ' +
						'</div> ' +
					'</div> ' +
					'<div class="control-group"> ' +
						'<label class="control-label" for="location">Location</label> ' +
						'<div class="controls"> ' +
							'<input id="location" name="location" type="text" placeholder="Location"> ' +
						'</div> ' +
					'</div> ' +
				'</form>',
			buttons: {
				success: {
					label: "Save",
					className: "btn-success",
					callback: function () {
						console.log("add race");
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
