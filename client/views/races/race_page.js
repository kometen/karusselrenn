Template.racePage.participants = function () {
	var objects = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}}).map(function (doc, index, cursor) {
		var i = _.extend(doc, {
			index: (index + 1),
			time: moment(doc.starttime, "HH:mm").add('seconds', doc.interval * index).format("HH:mm:ss")
		});
		return i;
	});
	return objects;
};