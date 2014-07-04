Template.racePage.helpers({
	participants: function () {
		return ParticipantsInRace.find({raceId: this._id});
	}
});