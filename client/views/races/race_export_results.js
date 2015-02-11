Template.raceExportResults.events({
	'submit form': function (e) {
		e.preventDefault();

		var raceId = this._id;
		var p = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}}).count();

		console.log('raceId: ' + raceId + ', count: ' + p);
	},
});