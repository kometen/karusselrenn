// This updates the page /races/_:id
Template.racePage.participants = function () {
	var objects = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}}).map(function (doc, index, cursor) {
		var i = _.extend(doc, {
			index: (index + 1),
			time: moment(doc.racestarttime, "HH:mm").seconds(doc.interval * index).format("HH:mm:ss")
//			time: moment(doc.starttime, "HH:mm").add('seconds', doc.interval * index).format("HH:mm:ss")
		});
//		console.log('startnumber: ' + doc.startnumber + ', starttime: ' + doc.time + ', name: ' + doc.name + ', index:' + index);
		return i;
	});
	return objects;
};