ParticipantsInRace = new Meteor.Collection('participantsInRace');

ParticipantsInRace.allow({
	update: ownsParticipantsInRace,
	remove: ownsParticipantsInRace
});

ParticipantsInRace.deny({
	update: function (userId, doc, fields) {
		// Only edit specified fields
		if ((_.without(fields, 'club', 'gender', 'name', 'starttime', 'startnumber', 'year').length > 0)) {
			console.log('without field: ' + fields);
		}
		return (_.without(fields, 'club', 'gender', 'name', 'starttime', 'startnumber', 'year').length > 0);
	}
});

Meteor.methods({
	addParticipantToRace: function (postAttributes) {
		var user = Meteor.user();

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, 'You need to log in to add participants to a race');
		}

		if (!postAttributes.name) {
			throw new Meteor.Error(422, 'Please fill in the participants name');
		}
		if (!postAttributes.year) {
			throw new Meteor.Error(422, 'Please fill in the year the participant was born');
		}
		if (!postAttributes.club) {
			throw new Meteor.Error(422, 'Please fill in the name of the club');
		}

		// whitelisted keys
		var participant = _.extend(_.pick(postAttributes, 'name', 'year', 'gender', 'club', 'participantId', 'raceId', 'interval', 'startdate', 'starttime', 'racestarttime'), {
			_id: postAttributes.participantId + '_' + postAttributes.raceId,
			ownerId: user._id,
			owner: user.username,
			submitted: new Date().getTime()
		});

		var participantId = ParticipantsInRace.upsert(participant._id, participant);

		return participantId;
	},
	registerRaceTime: function (postAttributes) {
		var user = Meteor.user();

		// ensure user is logged in
		if (!user) {
			throw new Meteor.Error(401, 'You need to log in to register a participants time');
		}

		if (!postAttributes.startnumber) {
			throw new Meteor.Error(422, 'Please fill in the participants startnumber');
		}
		if (!postAttributes.endtime) {
			throw new Meteor.Error(422, 'Please fill in the endtime');
		}

		// whitelisted keys
		var participant = _.extend(_.pick(postAttributes, 'startnumber', 'endtime', 'raceId'), {
			ownerId: user._id,
			owner: user.username,
			submitted: new Date().getTime()
		});

		var tmp = ParticipantsInRace.findOne({raceId: participant.raceId, startnumber: parseInt(participant.startnumber, 10)}, {fields: {starttime: 1}});
		participant.starttime = tmp.starttime;

		var hours = participant.endtime.substr(0, 2);
		var minutes = participant.endtime.substr(2, 2);
		var seconds = participant.endtime.substr(4, 2);
		var endtime = hours + ':' + minutes + ':' + seconds;
		var deltatime = moment(endtime, "HH:mm:ss") - moment(participant.starttime, "HH:mm:ss");
		var fdelta = moment().startOf('day').milliseconds(deltatime).format("HH:mm:ss");

		ParticipantsInRace.update({raceId: participant.raceId, startnumber: parseInt(participant.startnumber, 10)}, {$set: { endtime: endtime, racetime: fdelta }} );
	}
});