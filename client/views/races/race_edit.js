Template.raceEdit.events({
	'submit form': function (e) {
		e.preventDefault();

		var currentRaceId = this._id;

		var raceProperties = {
			name: $(e.target).find('[name=name]').val(),
			location: $(e.target).find('[name=location]').val(),
			date: $(e.target).find('[name=date]').val(),
			time: $(e.target).find('[name=time]').val(),
			interval: $(e.target).find('[name=interval]').val(),
			club: $(e.target).find('[name=club]').val()
		}

		Races.update(currentRaceId, {$set: raceProperties}, function (error) {
			if (error) {
				return alert(error.reason);
			} else {
				Router.go('racePage', {_id: currentRaceId});
			}
		});
	},

	'click .delete': function (e) {
		e.preventDefault();

		if (confirm('Delete race?')) {
			var currentRaceId = this._id;
			Races.remove(currentRaceId);
			Router.go('racesList')
		}
	}
});