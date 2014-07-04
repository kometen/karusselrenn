Meteor.publish('participants', function () {
	return Participants.find();
});

Meteor.publish('clubs', function () {
	return Clubs.find();
});

Meteor.publish('races', function () {
	return Races.find();
});

Meteor.publish('participantsInRace', function () {
	return ParticipantsInRace.find();
//	return ParticipantsInRace.find({raceId: raceId}, {sort: {submitted: 1}});
});