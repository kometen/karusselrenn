Template.racePage.participants = function () {
	var objects = ParticipantsInRace.find({raceId: this._id}, {sort: {submitted: 1}}).map(function (doc, index, cursor) {
		var i = _.extend(doc, {
			index: (index + 1),
			time: moment(doc.starttime, "HH:mm").add('seconds', doc.interval * index).format("HH:mm:ss")
		});
		if (!doc.starttime) {
			doc.starttime = i.time;
		}
		if (!doc.endtime) {
			doc.endtime = i.time;
			doc.racetime = moment(moment(doc.endtime, "HH:mm:ss").subtract(doc.starttime, "HH:mm:ss")).format("HH:mm:ss");
//			console.log('doc.endtime: ' + doc.endtime + ', doc.starttime: ' + doc.starttime + ', doc.racetime: ' + doc.racetime);
		};
		doc.startnumber = (index + 1);
//		console.log('startnumber: ' + doc.startnumber + ', starttime: ' + doc.starttime + ', name: ' + doc.name);
		return i;
	});
	return objects;
};