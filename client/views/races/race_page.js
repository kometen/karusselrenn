Template.racePage.participants = function () {
	var objects = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}}).map(function (doc, index, cursor) {
		var i = _.extend(doc, {index: (index + 1)});
		return i;
	});
	return objects;
};