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
			message:'<div class="row"> ' +
				'<div class="span12"> ' +
				'<form class="form-horizontal"> ' +
				'<div class="form-group"> ' +
				'<label class="span4 control-label" for="name">Name</label> ' +
				'<div class="span4"> ' +
				'<input id="name" name="name" type="text" placeholder="Racename" class="form-control" input-md"> ' +
				'<span class="help-block">Here goes the racename</span> </div> ' +
				'</div> ' +
				'</form></div>',
			buttons: {
				success: {
					label: "Save",
					className: "btn-success",
					callback: function () {
						console.log("form dialog");
					}
				}
			}
		});
	}
});
